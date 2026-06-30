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

test('selecting paroprepustna folija increases the estimate', () => {
  const base = calculateRoofQuote(baseExpandedInput());
  const withMembrane = calculateRoofQuote({
    ...baseExpandedInput(),
    vaporPermeableMembrane: true,
  });

  assert.ok(withMembrane.low > base.low);
  assert.ok(withMembrane.high > base.high);
  assert.ok(withMembrane.breakdown.some((item) => item.label.includes('Paroprepustna folija')));
});

test('selecting deskanje increases the estimate', () => {
  const base = calculateRoofQuote(baseExpandedInput());
  const withBoarding = calculateRoofQuote({
    ...baseExpandedInput(),
    roofBoarding: true,
  });

  assert.ok(withBoarding.low > base.low);
  assert.ok(withBoarding.high > base.high);
  assert.ok(withBoarding.breakdown.some((item) => item.label.includes('Deskanje')));
});

test('selecting roof battens and counter battens increases the estimate', () => {
  const base = calculateRoofQuote(baseExpandedInput());
  const withBattens = calculateRoofQuote({
    ...baseExpandedInput(),
    roofBattens: true,
    counterBattens: true,
  });

  assert.ok(withBattens.low > base.low);
  assert.ok(withBattens.high > base.high);
  assert.ok(withBattens.breakdown.some((item) => item.label.includes('Strešne letve')));
  assert.ok(withBattens.breakdown.some((item) => item.label.includes('Kontra letve')));
});

test('selecting ventilation layer increases the estimate', () => {
  const base = calculateRoofQuote(baseExpandedInput());
  const withVentilation = calculateRoofQuote({
    ...baseExpandedInput(),
    ventilationLayer: true,
  });

  assert.ok(withVentilation.low > base.low);
  assert.ok(withVentilation.high > base.high);
  assert.ok(withVentilation.breakdown.some((item) => item.label.includes('Prezračevalni sloj')));
});

test('selecting sheet-metal items increases the estimate', () => {
  const base = calculateRoofQuote(baseExpandedInput());
  const withSheetMetal = calculateRoofQuote({
    ...baseExpandedInput(),
    gutterLength: 24,
    downpipeLength: 12,
    valleyFlashing: true,
  });

  assert.ok(withSheetMetal.low > base.low);
  assert.ok(withSheetMetal.high > base.high);
  assert.ok(withSheetMetal.breakdown.some((item) => item.label.includes('Žleb')));
  assert.ok(withSheetMetal.breakdown.some((item) => item.label.includes('Vertikalna odtočna cev')));
  assert.ok(withSheetMetal.breakdown.some((item) => item.label.includes('Žlota')));
});

test('broad gutters addon increases estimate when exact lengths are not provided', () => {
  const base = calculateRoofQuote(baseExpandedInput());
  const withBroadGutters = calculateRoofQuote({
    ...baseExpandedInput(),
    gutters: true,
  });

  assert.ok(withBroadGutters.low > base.low);
  assert.ok(withBroadGutters.high > base.high);
  assert.ok(withBroadGutters.breakdown.some((item) => item.label === 'Žlebovi in osnovna kleparska dela'));
});

test('exact gutter and downpipe lengths increase estimate separately', () => {
  const base = calculateRoofQuote(baseExpandedInput());
  const withGutterLength = calculateRoofQuote({
    ...baseExpandedInput(),
    gutterLength: 24,
  });
  const withDownpipeLength = calculateRoofQuote({
    ...baseExpandedInput(),
    downpipeLength: 12,
  });

  assert.ok(withGutterLength.low > base.low);
  assert.ok(withDownpipeLength.low > base.low);
  assert.ok(withGutterLength.breakdown.some((item) => item.label.includes('Žleb (24 m)')));
  assert.ok(withDownpipeLength.breakdown.some((item) => item.label.includes('Vertikalna odtočna cev (12 m)')));
});

test('exact gutter lengths prevent broad gutters double counting', () => {
  const result = calculateRoofQuote({
    ...baseExpandedInput(),
    gutters: true,
    gutterLength: 24,
    downpipeLength: 12,
  });

  assert.ok(result.breakdown.some((item) => item.label.includes('Žleb (24 m)')));
  assert.ok(result.breakdown.some((item) => item.label.includes('Vertikalna odtočna cev (12 m)')));
  assert.equal(result.breakdown.some((item) => item.label === 'Žlebovi in osnovna kleparska dela'), false);
});

test('selecting site setup increases the estimate', () => {
  const base = calculateRoofQuote(baseExpandedInput());
  const withSiteSetup = calculateRoofQuote({
    ...baseExpandedInput(),
    siteSetup: true,
  });

  assert.ok(withSiteSetup.low > base.low);
  assert.ok(withSiteSetup.high > base.high);
  assert.ok(withSiteSetup.breakdown.some((item) => item.label.includes('Postavitev gradbišča')));
});

test('rejects negative active component counts and lengths', () => {
  assert.throws(() => {
    calculateRoofQuote({
      ...baseExpandedInput(),
      roofVentCount: -1,
    });
  }, /Število zračnikov na strehi mora biti celo število 0 ali več/);

  assert.throws(() => {
    calculateRoofQuote({
      ...baseExpandedInput(),
      gutterLength: -0.5,
    });
  }, /Dolžina žleba mora biti število 0 ali več/);

  assert.throws(() => {
    calculateRoofQuote({
      ...baseExpandedInput(),
      downpipeLength: -1,
    });
  }, /Dolžina vertikalne odtočne cevi mora biti število 0 ali več/);
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
