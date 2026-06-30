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

  const breakdown = [];
  const base = area * covering.eurPerM2;
  breakdown.push({ label: `Osnovna izvedba - ${covering.label}`, amount: base });

  const addonTotal = Object.entries(config.addons).reduce((sum, [key, addon]) => {
    if (!input[key]) return sum;
    const amount = area * addon.eurPerM2;
    breakdown.push({ label: addon.label, amount });
    return sum + amount;
  }, 0);

  const subtotalBeforeMultipliers = base + addonTotal;
  const complexityAdjustment = subtotalBeforeMultipliers * (complexity.factor - 1);
  const afterComplexity = subtotalBeforeMultipliers + complexityAdjustment;
  const accessAdjustment = afterComplexity * (access.factor - 1);
  const subtotal = Math.max(afterComplexity + accessAdjustment, config.minimumProjectValue);

  if (complexityAdjustment > 0) {
    breakdown.push({ label: complexity.label, amount: complexityAdjustment });
  }

  if (accessAdjustment > 0) {
    breakdown.push({ label: access.label, amount: accessAdjustment });
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

function roundToNearestTen(value) {
  return Math.round(value / 10) * 10;
}
