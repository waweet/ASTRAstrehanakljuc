import { pricingConfig } from './pricing-config.js';

const DEFAULT_NOTE = 'Informativni razpon ni zavezujoča ponudba. Končna cena je odvisna od ogleda, dejanskega stanja konstrukcije, dostopa, detajlov in izbranih materialov.';

export function calculateRoofQuote(input, config = pricingConfig) {
  if (!input || typeof input !== 'object') {
    throw new Error('Podatki za izračun so obvezni.');
  }

  const area = Number(input.area);

  if (!Number.isFinite(area) || area <= 0) {
    throw new Error('Površina strehe mora biti pozitivno število.');
  }

  const covering = getConfigItem(config.baseRatesByCovering, input.covering, 'kritina');
  const complexity = getConfigItem(config.complexityMultipliers, input.complexity, 'zahtevnost');
  const access = getConfigItem(config.accessMultipliers, input.access, 'dostopnost');
  const roofPitch = getConfigItem(config.roofPitchMultipliers, input.roofPitch || 'normal', 'naklon strehe');
  const flashingComplexity = getConfigItem(
    config.flashingComplexityMultipliers,
    input.flashingComplexity || 'normal',
    'kleparski detajli',
  );
  const existingRoofRemoval = getConfigItem(
    config.existingRoofRemovalCosts,
    getExistingRoofRemovalKey(input),
    'odstranitev obstoječe kritine',
  );
  const wasteHandling = getConfigItem(config.wasteHandlingCosts, input.wasteHandling || 'none', 'odvoz odpadnega materiala');
  const chimneyCount = readNonNegativeCount(input.chimneyCount, 'Število dimnikov');
  const roofWindowCount = readNonNegativeCount(input.roofWindowCount, 'Število strešnih oken');

  const breakdown = [];
  const base = area * covering.eurPerM2;
  breakdown.push({ label: `Osnovna izvedba - ${covering.label}`, amount: base });

  const existingRoofRemovalTotal = area * existingRoofRemoval.eurPerM2;
  if (existingRoofRemovalTotal > 0) {
    breakdown.push({ label: existingRoofRemoval.label, amount: existingRoofRemovalTotal });
  }

  const addonTotal = Object.entries(config.addons).reduce((sum, [key, addon]) => {
    if (!input[key]) return sum;
    const amount = area * addon.eurPerM2;
    breakdown.push({ label: addon.label, amount });
    return sum + amount;
  }, 0);

  const chimneyTotal = chimneyCount * config.chimneyUnitCost.eurPerUnit;
  if (chimneyTotal > 0) {
    breakdown.push({ label: `${config.chimneyUnitCost.label} (${chimneyCount})`, amount: chimneyTotal });
  }

  const roofWindowTotal = roofWindowCount * config.roofWindowUnitCost.eurPerUnit;
  if (roofWindowTotal > 0) {
    breakdown.push({ label: `${config.roofWindowUnitCost.label} (${roofWindowCount})`, amount: roofWindowTotal });
  }

  const wasteHandlingTotal = area * wasteHandling.eurPerM2;
  if (wasteHandlingTotal > 0) {
    breakdown.push({ label: wasteHandling.label, amount: wasteHandlingTotal });
  }

  const subtotalBeforeMultipliers = base + existingRoofRemovalTotal + addonTotal + chimneyTotal + roofWindowTotal + wasteHandlingTotal;
  const complexityAdjustment = subtotalBeforeMultipliers * (complexity.factor - 1);
  const afterComplexity = subtotalBeforeMultipliers + complexityAdjustment;
  const accessAdjustment = afterComplexity * (access.factor - 1);
  const afterAccess = afterComplexity + accessAdjustment;
  const roofPitchAdjustment = afterAccess * (roofPitch.factor - 1);
  const afterRoofPitch = afterAccess + roofPitchAdjustment;
  const flashingComplexityAdjustment = afterRoofPitch * (flashingComplexity.factor - 1);
  const subtotal = Math.max(afterRoofPitch + flashingComplexityAdjustment, config.minimumProjectValue);

  if (complexityAdjustment > 0) {
    breakdown.push({ label: complexity.label, amount: complexityAdjustment });
  }

  if (accessAdjustment > 0) {
    breakdown.push({ label: access.label, amount: accessAdjustment });
  }

  if (roofPitchAdjustment > 0) {
    breakdown.push({ label: roofPitch.label, amount: roofPitchAdjustment });
  }

  if (flashingComplexityAdjustment > 0) {
    breakdown.push({ label: flashingComplexity.label, amount: flashingComplexityAdjustment });
  }

  if (subtotal === config.minimumProjectValue && subtotalBeforeMultipliers < config.minimumProjectValue) {
    breakdown.push({ label: 'Minimalna vrednost projekta', amount: config.minimumProjectValue - subtotalBeforeMultipliers });
  }

  const low = roundToNearestTen(subtotal * config.estimateBand.lowFactor);
  const high = roundToNearestTen(subtotal * config.estimateBand.highFactor);

  return {
    low,
    high,
    midpoint: roundToNearestTen(subtotal),
    note: DEFAULT_NOTE,
    breakdown: breakdown.map((item) => ({
      label: item.label,
      amount: roundToNearestTen(item.amount),
    })),
  };
}

export function formatCurrency(value, locale = 'sl-SI') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

function getConfigItem(collection, key, label) {
  const normalizedKey = normalizeConfigKey(key);
  const item = collection[normalizedKey];
  if (!item) {
    throw new Error(`Neznana vrednost za ${label}: ${normalizedKey || 'ni izbrano'}`);
  }
  return item;
}

function normalizeConfigKey(key) {
  if (typeof key !== 'string') {
    return '';
  }

  return key.trim();
}

function getExistingRoofRemovalKey(input) {
  if (typeof input.existingRoofRemoval === 'string') {
    return input.existingRoofRemoval;
  }

  return input.tearOff ? 'simple' : 'none';
}

function readNonNegativeCount(value, label) {
  if (value === undefined || value === null || value === '') {
    return 0;
  }

  const count = Number(value);
  if (!Number.isInteger(count) || count < 0) {
    throw new Error(`${label} mora biti celo število 0 ali več.`);
  }

  return count;
}

function roundToNearestTen(value) {
  return Math.round(value / 10) * 10;
}
