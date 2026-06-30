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

test('formats currency for Slovenian locale', () => {
  assert.equal(formatCurrency(12500), '12.500 €');
});
