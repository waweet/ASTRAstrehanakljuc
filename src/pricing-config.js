export const pricingConfig = {
  currency: 'EUR',
  vatLabel: '+ DDV',
  // PR-003 values are placeholder assumptions for MVP modeling only.
  // ASTRA group d.o.o. must review and confirm all pricing before production use.
  baseRatesByCovering: {
    clay_tiles: {
      label: 'Opečna kritina',
      eurPerM2: 155,
    },
    concrete_tiles: {
      label: 'Betonska kritina',
      eurPerM2: 135,
    },
    metal_sheet: {
      label: 'Pločevinasta kritina',
      eurPerM2: 125,
    },
    flat_membrane: {
      label: 'Ravna streha - membrana',
      eurPerM2: 145,
    },
  },
  complexityMultipliers: {
    simple: {
      label: 'Enostavna oblika',
      factor: 1,
    },
    medium: {
      label: 'Srednje zahtevna oblika',
      factor: 1.12,
    },
    complex: {
      label: 'Zahtevna oblika',
      factor: 1.25,
    },
  },
  accessMultipliers: {
    normal: {
      label: 'Normalna dostopnost',
      factor: 1,
    },
    difficult: {
      label: 'Zahtevna dostopnost',
      factor: 1.12,
    },
    very_difficult: {
      label: 'Zelo zahtevna dostopnost',
      factor: 1.22,
    },
  },
  roofPitchMultipliers: {
    low: {
      label: 'Nizek / enostaven naklon',
      factor: 1,
    },
    normal: {
      label: 'Običajen naklon',
      factor: 1,
    },
    steep: {
      label: 'Strm / zahtevnejši naklon',
      factor: 1.14,
    },
  },
  flashingComplexityMultipliers: {
    basic: {
      label: 'Osnovni kleparski detajli',
      factor: 1,
    },
    normal: {
      label: 'Običajni kleparski detajli',
      factor: 1,
    },
    complex: {
      label: 'Zahtevni kleparski detajli',
      factor: 1.1,
    },
  },
  chimneyUnitCost: {
    label: 'Dimniki - obrobe in detajli',
    eurPerUnit: 420,
  },
  roofWindowUnitCost: {
    label: 'Strešna okna - obrobe in detajli',
    eurPerUnit: 360,
  },
  existingRoofRemovalCosts: {
    none: {
      label: 'Brez odstranitve obstoječe kritine',
      eurPerM2: 0,
    },
    simple: {
      label: 'Odstranitev obstoječe kritine - enostavna',
      eurPerM2: 18,
    },
    difficult: {
      label: 'Odstranitev obstoječe kritine - zahtevna',
      eurPerM2: 28,
    },
  },
  wasteHandlingCosts: {
    none: {
      label: 'Odvoz odpadnega materiala ni vključen',
      eurPerM2: 0,
    },
    normal: {
      label: 'Vključen običajen odvoz odpadnega materiala',
      eurPerM2: 10,
    },
    difficult: {
      label: 'Vključen odvoz pri zahtevnem dostopu',
      eurPerM2: 18,
    },
  },
  addons: {
    insulation: {
      label: 'Toplotna izolacija',
      eurPerM2: 45,
    },
    gutters: {
      label: 'Žlebovi in osnovna kleparska dela',
      eurPerM2: 24,
    },
  },
  estimateBand: {
    lowFactor: 0.9,
    highFactor: 1.18,
  },
  minimumProjectValue: 6500,
};
