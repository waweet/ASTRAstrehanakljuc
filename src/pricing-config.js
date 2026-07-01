export const pricingConfig = {
  currency: 'EUR',
  vatLabel: '+ DDV',
  // Active values are ASTRA-confirmed MVP test values for limited testing.
  // They remain informative and non-binding and are not final offer prices.
  // Public production rollout still requires final ASTRA business and legal review.
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
  // PR-006 values are ASTRA-confirmed MVP test values from the reviewed catalog.
  // They remain informative and non-binding and are not final offer prices.
  // Public production rollout still requires final ASTRA business and legal review.
  roofLayerAddons: {
    vaporPermeableMembrane: {
      label: 'Paroprepustna folija',
      unit: 'm2',
      eurPerM2: 6,
    },
    roofBoarding: {
      label: 'Deskanje / opaž',
      unit: 'm2',
      eurPerM2: 22,
    },
    roofBattens: {
      label: 'Strešne letve',
      unit: 'm2',
      eurPerM2: 12,
    },
    counterBattens: {
      label: 'Kontra letve',
      unit: 'm2',
      eurPerM2: 10,
    },
    ventilationLayer: {
      label: 'Prezračevalni sloj',
      unit: 'm2',
      eurPerM2: 8,
    },
  },
  roofFinishAddons: {
    ridgeTiles: {
      label: 'Slemenjaki / sleme',
      unit: 'm1',
      eurPerM1: 34,
      defaultM1PerM2: 0.1,
    },
    edgeTiles: {
      label: 'Krajnik / krajna kritina',
      unit: 'm1',
      eurPerM1: 30,
      defaultM1PerM2: 0.12,
    },
    roofVents: {
      label: 'Zračniki na strehi',
      unit: 'kos',
      eurPerUnit: 55,
    },
    snowGuards: {
      label: 'Snegolovi',
      unit: 'm1',
      eurPerM1: 26,
      defaultM1PerM2: 0.2,
    },
  },
  sheetMetalAddons: {
    gutterLength: {
      label: 'Žleb',
      unit: 'm1',
      eurPerM1: 28,
    },
    downpipeLength: {
      label: 'Vertikalna odtočna cev',
      unit: 'm1',
      eurPerM1: 24,
    },
    valleyFlashing: {
      label: 'Žlota',
      unit: 'm1',
      eurPerM1: 48,
      defaultM1PerM2: 0.04,
    },
    eavesFlashing: {
      label: 'Kapna obroba',
      unit: 'm1',
      eurPerM1: 22,
      defaultM1PerM2: 0.14,
    },
    windBoardFlashing: {
      label: 'Čelna / vetrna obroba',
      unit: 'm1',
      eurPerM1: 30,
      defaultM1PerM2: 0.12,
    },
  },
  siteAccessAddons: {
    scaffolding: {
      label: 'Oder',
      unit: 'm2',
      eurPerM2: 12,
      defaultM2PerRoofM2: 0.6,
    },
    manualMaterialCarry: {
      label: 'Ročni prenos materiala',
      unit: 'm2',
      eurPerM2: 9,
    },
    siteSetup: {
      label: 'Postavitev gradbišča',
      unit: 'fixed',
      eurFixed: 350,
    },
  },
  estimateBand: {
    lowFactor: 0.9,
    highFactor: 1.18,
  },
  minimumProjectValue: 6500,
};
