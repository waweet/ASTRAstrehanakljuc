export const pricingConfig = {
  currency: 'EUR',
  vatLabel: '+ DDV',
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
  addons: {
    tearOff: {
      label: 'Odstranitev stare kritine',
      eurPerM2: 18,
    },
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
