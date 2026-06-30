import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculateRoofQuote, formatCurrency } from '../src/pricing-engine.js';

test('calculates a basic clay tile roof with tear-off and gutters', () => {
  const result = calculateRoofQuote({
    area: 180,
    covering: 'clay_tiles',
    complexity: 'simple',
    access: 'normal',
    tearOff: true,
    insulation: false,
    gutters: true,
  });

  assert.equal(result.midpoint, 35460);
  assert.equal(result.low, 31910);
  assert.equal(result.high, 41840);
  assert.ok(result.breakdown.some((item) => item.label.includes('Opečna kritina')));
  assert.ok(result.breakdown.some((item) => item.label.includes('Odstranitev')));
});

test('adds insulation and difficult access multipliers', () => {
  const result = calculateRoofQuote({
    area: 220,
    covering: 'metal_sheet',
    complexity: 'medium',
    access: 'difficult',
    tearOff: true,
    insulation: true,
    gutters: true,
  });

  assert.ok(result.midpoint > 50000);
  assert.ok(result.high > result.low);
  assert.ok(result.breakdown.some((item) => item.label.includes('Srednje zahtevna')));
  assert.ok(result.breakdown.some((item) => item.label.includes('Zahtevna dostopnost')));
});

test('applies minimum project value for very small roofs', () => {
  const result = calculateRoofQuote({
    area: 10,
    covering: 'concrete_tiles',
    complexity: 'simple',
    access: 'normal',
    tearOff: false,
    insulation: false,
    gutters: false,
  });

  assert.equal(result.midpoint, 6500);
  assert.equal(result.low, 5850);
  assert.equal(result.high, 7670);
});

test('rejects invalid area', () => {
  assert.throws(() => {
    calculateRoofQuote({
      area: 0,
      covering: 'clay_tiles',
      complexity: 'simple',
      access: 'normal',
    });
  }, /pozitivno/);
});

test('rejects unknown covering with a clear error', () => {
  assert.throws(() => {
    calculateRoofQuote({
      area: 180,
      covering: 'unknown_covering',
      complexity: 'simple',
      access: 'normal',
    });
  }, /Neznana vrednost za kritina: unknown_covering/);
});

test('complex roof with very difficult access is higher than simple roof for same area and covering', () => {
  const baseInput = {
    area: 180,
    covering: 'clay_tiles',
    tearOff: false,
    insulation: false,
    gutters: false,
  };

  const simple = calculateRoofQuote({
    ...baseInput,
    complexity: 'simple',
    access: 'normal',
  });
  const difficult = calculateRoofQuote({
    ...baseInput,
    complexity: 'complex',
    access: 'very_difficult',
  });

  assert.ok(difficult.low > simple.low);
  assert.ok(difficult.high > simple.high);
  assert.ok(difficult.midpoint > simple.midpoint);
});

test('steep roof gives a higher estimate than normal roof for same area and covering', () => {
  const normal = calculateRoofQuote({
    ...baseExpandedInput(),
    roofPitch: 'normal',
  });
  const steep = calculateRoofQuote({
    ...baseExpandedInput(),
    roofPitch: 'steep',
  });

  assert.ok(steep.low > normal.low);
  assert.ok(steep.high > normal.high);
});

test('more chimneys increase the estimate', () => {
  const noChimneys = calculateRoofQuote({
    ...baseExpandedInput(),
    chimneyCount: 0,
  });
  const threeChimneys = calculateRoofQuote({
    ...baseExpandedInput(),
    chimneyCount: 3,
  });

  assert.ok(threeChimneys.low > noChimneys.low);
  assert.ok(threeChimneys.high > noChimneys.high);
  assert.ok(threeChimneys.breakdown.some((item) => item.label.includes('Dimniki')));
});

test('more roof windows increase the estimate', () => {
  const noWindows = calculateRoofQuote({
    ...baseExpandedInput(),
    roofWindowCount: 0,
  });
  const twoWindows = calculateRoofQuote({
    ...baseExpandedInput(),
    roofWindowCount: 2,
  });

  assert.ok(twoWindows.low > noWindows.low);
  assert.ok(twoWindows.high > noWindows.high);
  assert.ok(twoWindows.breakdown.some((item) => item.label.includes('Strešna okna')));
});

test('complex flashing detail work increases the estimate', () => {
  const normal = calculateRoofQuote({
    ...baseExpandedInput(),
    flashingComplexity: 'normal',
  });
  const complex = calculateRoofQuote({
    ...baseExpandedInput(),
    flashingComplexity: 'complex',
  });

  assert.ok(complex.low > normal.low);
  assert.ok(complex.high > normal.high);
});

test('difficult existing-roof removal increases the estimate', () => {
  const simple = calculateRoofQuote({
    ...baseExpandedInput(),
    existingRoofRemoval: 'simple',
  });
  const difficult = calculateRoofQuote({
    ...baseExpandedInput(),
    existingRoofRemoval: 'difficult',
  });

  assert.ok(difficult.low > simple.low);
  assert.ok(difficult.high > simple.high);
});

test('difficult waste handling increases the estimate', () => {
  const normal = calculateRoofQuote({
    ...baseExpandedInput(),
    wasteHandling: 'normal',
  });
  const difficult = calculateRoofQuote({
    ...baseExpandedInput(),
    wasteHandling: 'difficult',
  });

  assert.ok(difficult.low > normal.low);
  assert.ok(difficult.high > normal.high);
});

test('rejects negative chimney count', () => {
  assert.throws(() => {
    calculateRoofQuote({
      ...baseExpandedInput(),
      chimneyCount: -1,
    });
  }, /Število dimnikov mora biti celo število 0 ali več/);
});

test('rejects negative roof window count', () => {
  assert.throws(() => {
    calculateRoofQuote({
      ...baseExpandedInput(),
      roofWindowCount: -1,
    });
  }, /Število strešnih oken mora biti celo število 0 ali več/);
});

test('formats currency for Slovenian locale', () => {
  assert.equal(formatCurrency(12500), '12.500 €');
});

function baseExpandedInput() {
  return {
    area: 180,
    covering: 'clay_tiles',
    complexity: 'simple',
    access: 'normal',
    roofPitch: 'normal',
    chimneyCount: 0,
    roofWindowCount: 0,
    flashingComplexity: 'normal',
    existingRoofRemoval: 'none',
    wasteHandling: 'none',
    insulation: false,
    gutters: false,
  };
}
