import { calculateRoofQuote, formatCurrency } from '../src/pricing-engine.js';

const quoteForm = document.querySelector('#quote-form');
const leadForm = document.querySelector('#lead-form');
const priceRange = document.querySelector('#price-range');
const priceNote = document.querySelector('#price-note');
const breakdown = document.querySelector('#breakdown');
const priceDrivers = document.querySelector('#price-drivers');
const selectedSummary = document.querySelector('#selected-summary');
const includedItems = document.querySelector('#included-items');
const notConfirmed = document.querySelector('#not-confirmed');
const quoteError = document.querySelector('#quote-error');
const leadError = document.querySelector('#lead-error');
let latestQuote = null;
let latestQuoteInput = null;

const NOT_CONFIRMED_ITEMS = [
  'dejansko stanje konstrukcije',
  'natančne mere strehe',
  'oder ali dvigalo',
  'posebni detajli',
  'točne količine snegolovov in zaključkov',
  'točna dolžina žlebov',
  'končna izbira materialov',
  'termin izvedbe',
];

const OPTIONAL_COMPONENT_LABELS = [
  ['vaporPermeableMembrane', 'Paroprepustna folija'],
  ['roofBoarding', 'Deskanje / opaž'],
  ['roofBattens', 'Strešne letve'],
  ['counterBattens', 'Kontra letve'],
  ['ventilationLayer', 'Prezračevalni sloj'],
  ['ridgeTiles', 'Slemenjaki / sleme'],
  ['edgeTiles', 'Krajnik / krajna kritina'],
  ['snowGuards', 'Snegolovi'],
  ['valleyFlashing', 'Žlota'],
  ['eavesFlashing', 'Kapna obroba'],
  ['windBoardFlashing', 'Čelna / vetrna obroba'],
  ['scaffolding', 'Oder'],
  ['manualMaterialCarry', 'Ročni prenos materiala'],
  ['siteSetup', 'Postavitev gradbišča'],
];

function readQuoteForm(form) {
  const data = new FormData(form);
  return {
    area: data.get('area'),
    roofType: readString(data, 'roofType'),
    roofTypeLabel: readSelectedLabel(form, 'roofType'),
    covering: readString(data, 'covering'),
    coveringLabel: readSelectedLabel(form, 'covering'),
    complexity: readString(data, 'complexity'),
    complexityLabel: readSelectedLabel(form, 'complexity'),
    access: readString(data, 'access'),
    accessLabel: readSelectedLabel(form, 'access'),
    roofPitch: readString(data, 'roofPitch'),
    roofPitchLabel: readSelectedLabel(form, 'roofPitch'),
    chimneyCount: data.get('chimneyCount'),
    roofWindowCount: data.get('roofWindowCount'),
    flashingComplexity: readString(data, 'flashingComplexity'),
    flashingComplexityLabel: readSelectedLabel(form, 'flashingComplexity'),
    existingRoofRemoval: readString(data, 'existingRoofRemoval'),
    existingRoofRemovalLabel: readSelectedLabel(form, 'existingRoofRemoval'),
    wasteHandling: readString(data, 'wasteHandling'),
    wasteHandlingLabel: readSelectedLabel(form, 'wasteHandling'),
    insulation: data.has('insulation'),
    gutters: data.has('gutters'),
    vaporPermeableMembrane: data.has('vaporPermeableMembrane'),
    roofBoarding: data.has('roofBoarding'),
    roofBattens: data.has('roofBattens'),
    counterBattens: data.has('counterBattens'),
    ventilationLayer: data.has('ventilationLayer'),
    ridgeTiles: data.has('ridgeTiles'),
    edgeTiles: data.has('edgeTiles'),
    roofVentCount: data.get('roofVentCount'),
    snowGuards: data.has('snowGuards'),
    gutterLength: data.get('gutterLength'),
    downpipeLength: data.get('downpipeLength'),
    valleyFlashing: data.has('valleyFlashing'),
    eavesFlashing: data.has('eavesFlashing'),
    windBoardFlashing: data.has('windBoardFlashing'),
    scaffolding: data.has('scaffolding'),
    manualMaterialCarry: data.has('manualMaterialCarry'),
    siteSetup: data.has('siteSetup'),
  };
}

function renderQuote(result, input) {
  latestQuote = result;
  latestQuoteInput = input;
  hideError(quoteError);
  priceRange.textContent = `${formatCurrency(result.low)} - ${formatCurrency(result.high)} + DDV`;
  priceNote.textContent = result.note;
  breakdown.innerHTML = '';
  renderList(priceDrivers, buildPriceDrivers(input));
  renderDefinitionList(selectedSummary, buildSelectedSummary(input));
  renderList(includedItems, buildIncludedItems(input));
  renderList(notConfirmed, NOT_CONFIRMED_ITEMS);

  for (const item of result.breakdown) {
    const row = document.createElement('div');
    const label = document.createElement('dt');
    const value = document.createElement('dd');
    label.textContent = item.label;
    value.textContent = formatCurrency(item.amount);
    row.append(label, value);
    breakdown.append(row);
  }
}

function renderQuoteError(error) {
  latestQuote = null;
  latestQuoteInput = null;
  const message = getQuoteErrorMessage(error);
  showError(quoteError, message);
  priceRange.textContent = 'Preveri vnos';
  priceNote.textContent = message;
  breakdown.innerHTML = '';
  clearNode(priceDrivers);
  clearNode(selectedSummary);
  clearNode(includedItems);
  clearNode(notConfirmed);
}

function showError(container, message) {
  if (!container) return;
  container.textContent = message;
  container.hidden = false;
}

function hideError(container) {
  if (!container) return;
  container.textContent = '';
  container.hidden = true;
}

function clearNode(node) {
  if (!node) return;
  node.innerHTML = '';
  if (Array.isArray(node.children)) {
    node.children.length = 0;
  }
}

function renderList(container, items) {
  clearNode(container);

  for (const item of items) {
    const row = document.createElement('li');
    row.textContent = item;
    container.append(row);
  }
}

function renderDefinitionList(container, items) {
  clearNode(container);

  for (const item of items) {
    const row = document.createElement('div');
    const label = document.createElement('dt');
    const value = document.createElement('dd');
    label.textContent = item.label;
    value.textContent = item.value;
    row.append(label, value);
    container.append(row);
  }
}

function readString(data, key) {
  const value = data.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function readSelectedLabel(form, key) {
  const field = form.elements[key];
  return field instanceof HTMLSelectElement ? field.selectedOptions[0]?.textContent.trim() || '' : '';
}

function buildEstimateEmailSection() {
  if (!latestQuote) {
    return [
      'Zadnji informativni izračun:',
      'Ni bil uspešno izračunan.',
    ];
  }

  return [
    'Zadnji informativni izračun:',
    `${formatCurrency(latestQuote.low)} - ${formatCurrency(latestQuote.high)} + DDV`,
    latestQuote.note,
  ];
}

function buildSelectedSummary(input) {
  const selectedComponents = buildSelectedComponentLabels(input);
  const exactGutterLengths = hasExactGutterLengths(input);
  return [
    { label: 'Površina', value: `${input.area || ''} m²` },
    { label: 'Tip strehe', value: input.roofTypeLabel || input.roofType || '' },
    { label: 'Kritina / sistem', value: input.coveringLabel || input.covering || '' },
    { label: 'Zahtevnost oblike', value: input.complexityLabel || input.complexity || '' },
    { label: 'Dostopnost objekta', value: input.accessLabel || input.access || '' },
    { label: 'Naklon strehe', value: input.roofPitchLabel || input.roofPitch || '' },
    { label: 'Število dimnikov', value: input.chimneyCount || '0' },
    { label: 'Število strešnih oken', value: input.roofWindowCount || '0' },
    { label: 'Zahtevnost kleparskih detajlov', value: input.flashingComplexityLabel || input.flashingComplexity || '' },
    { label: 'Odstranitev obstoječe kritine', value: input.existingRoofRemovalLabel || input.existingRoofRemoval || '' },
    { label: 'Odvoz odpadnega materiala', value: input.wasteHandlingLabel || input.wasteHandling || '' },
    { label: 'Toplotna izolacija', value: input.insulation ? 'da' : 'ne' },
    { label: 'Žlebovi in osnovna kleparska dela', value: formatBroadGuttersValue(input.gutters, exactGutterLengths) },
    { label: 'Dodatne postavke strehe', value: selectedComponents.length ? selectedComponents.join(', ') : 'ni izbrano' },
  ];
}

function buildPriceDrivers(input) {
  const drivers = [];
  addIfSelected(drivers, input.complexity !== 'simple', input.complexityLabel || 'zahtevnost oblike strehe');
  addIfSelected(drivers, input.access !== 'normal', input.accessLabel || 'dostopnost objekta');
  addIfSelected(drivers, input.roofPitch === 'steep', input.roofPitchLabel || 'strm naklon');
  addIfSelected(drivers, Number(input.chimneyCount) > 0, formatCountLabel(input.chimneyCount, 'dimnik', 'dimnika', 'dimniki'));
  addIfSelected(drivers, Number(input.roofWindowCount) > 0, formatCountLabel(input.roofWindowCount, 'strešno okno', 'strešni okni', 'strešna okna'));
  addIfSelected(drivers, input.flashingComplexity === 'complex', input.flashingComplexityLabel || 'zahtevni kleparski detajli');
  addIfSelected(drivers, input.existingRoofRemoval !== 'none', input.existingRoofRemovalLabel || 'odstranitev obstoječe kritine');
  addIfSelected(drivers, input.wasteHandling !== 'none', input.wasteHandlingLabel || 'odvoz odpadnega materiala');
  addIfSelected(drivers, input.insulation, 'toplotna izolacija');
  addIfSelected(drivers, input.gutters && !hasExactGutterLengths(input), 'žlebovi in osnovna kleparska dela');
  drivers.push(...buildSelectedComponentLabels(input));

  if (drivers.length === 0) {
    drivers.push('osnovna izbira kritine in površina strehe');
  }

  return drivers;
}

function buildIncludedItems(input) {
  const items = ['izbrana kritina oziroma sistem'];
  addIfSelected(items, input.flashingComplexity, input.flashingComplexityLabel || 'izbrani kleparski detajli');
  addIfSelected(items, input.existingRoofRemoval !== 'none', input.existingRoofRemovalLabel || 'izbrana odstranitev kritine');
  addIfSelected(items, input.wasteHandling !== 'none', input.wasteHandlingLabel || 'izbrani odvoz odpadnega materiala');
  addIfSelected(items, input.insulation, 'toplotna izolacija');
  addIfSelected(items, input.gutters && !hasExactGutterLengths(input), 'žlebovi in osnovna kleparska dela');
  items.push(...buildSelectedComponentLabels(input));
  return items;
}

function hasExactGutterLengths(input) {
  return Number(input.gutterLength) > 0 || Number(input.downpipeLength) > 0;
}

function formatBroadGuttersValue(selected, exactGutterLengths) {
  if (!selected) return 'ne';
  if (exactGutterLengths) return 'preskočeno, ker so vnesene natančne dolžine';
  return 'da - okvirna ocena';
}

function buildSelectedComponentLabels(input) {
  const labels = [];

  for (const [key, label] of OPTIONAL_COMPONENT_LABELS) {
    addIfSelected(labels, input[key], label);
  }

  addIfSelected(labels, Number(input.roofVentCount) > 0, formatCountLabel(input.roofVentCount, 'zračnik na strehi', 'zračnika na strehi', 'zračniki na strehi'));
  addIfSelected(labels, Number(input.gutterLength) > 0, `žleb (${formatDecimal(input.gutterLength)} m)`);
  addIfSelected(labels, Number(input.downpipeLength) > 0, `vertikalna odtočna cev (${formatDecimal(input.downpipeLength)} m)`);

  return labels;
}

function addIfSelected(items, condition, value) {
  if (condition && value) {
    items.push(value);
  }
}

function formatCountLabel(value, singular, dual, plural) {
  const count = Number(value);
  if (count === 1) return `${count} ${singular}`;
  if (count === 2) return `${count} ${dual}`;
  return `${count} ${plural}`;
}

function formatDecimal(value) {
  const number = Number(value);
  return Number.isInteger(number) ? String(number) : number.toFixed(1);
}

function formatDefinitionLines(items) {
  return items.map((item) => `${item.label}: ${item.value}`);
}

function formatBulletLines(items) {
  return items.map((item) => `- ${item}`);
}

function buildInquirySubject(data) {
  const parts = ['Povpraševanje za streho na ključ - informativni izračun'];
  const name = readString(data, 'name');
  const location = readString(data, 'location');
  const context = [name, location].filter(Boolean).join(', ');

  if (context) {
    parts.push(context.slice(0, 70));
  }

  return parts.join(' - ');
}

function validateQuoteInput(input) {
  if (!String(input.area || '').trim()) {
    return {
      field: 'area',
      message: 'Vnesi površino strehe v m².',
    };
  }

  const area = Number(input.area);
  if (!Number.isFinite(area) || area <= 0) {
    return {
      field: 'area',
      message: 'Površina strehe mora biti pozitivno število.',
    };
  }

  const requiredChoices = [
    ['roofType', 'Izberi tip strehe.'],
    ['covering', 'Izberi kritino oziroma sistem.'],
    ['complexity', 'Izberi zahtevnost oblike strehe.'],
    ['access', 'Izberi dostopnost objekta.'],
    ['roofPitch', 'Izberi naklon strehe.'],
    ['flashingComplexity', 'Izberi zahtevnost kleparskih detajlov.'],
    ['existingRoofRemoval', 'Izberi način odstranitve obstoječe kritine.'],
    ['wasteHandling', 'Izberi možnost odvoza odpadnega materiala.'],
  ];

  for (const [field, message] of requiredChoices) {
    if (!input[field]) {
      return { field, message };
    }
  }

  const chimneyCountError = validateNonNegativeCount(input.chimneyCount, 'Število dimnikov', 'chimneyCount');
  if (chimneyCountError) return chimneyCountError;

  const roofWindowCountError = validateNonNegativeCount(input.roofWindowCount, 'Število strešnih oken', 'roofWindowCount');
  if (roofWindowCountError) return roofWindowCountError;

  const roofVentCountError = validateNonNegativeCount(input.roofVentCount, 'Število zračnikov na strehi', 'roofVentCount');
  if (roofVentCountError) return roofVentCountError;

  const gutterLengthError = validateNonNegativeLength(input.gutterLength, 'Dolžina žleba', 'gutterLength');
  if (gutterLengthError) return gutterLengthError;

  const downpipeLengthError = validateNonNegativeLength(input.downpipeLength, 'Dolžina vertikalne odtočne cevi', 'downpipeLength');
  if (downpipeLengthError) return downpipeLengthError;

  return null;
}

function validateLeadInput(data) {
  if (!readString(data, 'name')) {
    return {
      field: 'name',
      message: 'Vnesi ime in priimek.',
    };
  }

  if (!readString(data, 'phone') && !readString(data, 'email')) {
    return {
      field: 'phone',
      message: 'Vnesi telefon ali email, da lahko ASTRA odgovori na povpraševanje.',
    };
  }

  if (!data.has('consent')) {
    return {
      field: 'consent',
      message: 'Za pripravo povpraševanja potrdi, da lahko ASTRA group d.o.o. uporabi podatke za odgovor.',
    };
  }

  return null;
}

function getQuoteErrorMessage(error) {
  if (error.message?.startsWith('Neznana vrednost za kritina')) {
    return 'Izbrana kritina ni prepoznana. Osveži stran ali izberi drugo možnost.';
  }

  if (error.message?.startsWith('Neznana vrednost za zahtevnost')) {
    return 'Izbrana zahtevnost strehe ni prepoznana. Osveži stran ali izberi drugo možnost.';
  }

  if (error.message?.startsWith('Neznana vrednost za dostopnost')) {
    return 'Izbrana dostopnost objekta ni prepoznana. Osveži stran ali izberi drugo možnost.';
  }

  if (error.message?.startsWith('Neznana vrednost za naklon strehe')) {
    return 'Izbrani naklon strehe ni prepoznan. Osveži stran ali izberi drugo možnost.';
  }

  if (error.message?.startsWith('Neznana vrednost za kleparski detajli')) {
    return 'Izbrana zahtevnost kleparskih detajlov ni prepoznana. Osveži stran ali izberi drugo možnost.';
  }

  if (error.message?.startsWith('Neznana vrednost za odstranitev obstoječe kritine')) {
    return 'Izbrana odstranitev obstoječe kritine ni prepoznana. Osveži stran ali izberi drugo možnost.';
  }

  if (error.message?.startsWith('Neznana vrednost za odvoz odpadnega materiala')) {
    return 'Izbrani odvoz odpadnega materiala ni prepoznan. Osveži stran ali izberi drugo možnost.';
  }

  return error.message || 'Izračuna trenutno ni mogoče pripraviti. Preveri vnesene podatke.';
}

function validateNonNegativeCount(value, label, field) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const count = Number(value);
  if (!Number.isInteger(count) || count < 0) {
    return {
      field,
      message: `${label} mora biti celo število 0 ali več.`,
    };
  }

  return null;
}

function validateNonNegativeLength(value, label, field) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const length = Number(value);
  if (!Number.isFinite(length) || length < 0) {
    return {
      field,
      message: `${label} mora biti število 0 ali več.`,
    };
  }

  return null;
}

function focusField(form, fieldName) {
  const field = form.elements[fieldName];
  field?.focus?.();
}

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = readQuoteForm(quoteForm);
  const validationError = validateQuoteInput(input);

  if (validationError) {
    renderQuoteError(new Error(validationError.message));
    focusField(quoteForm, validationError.field);
    return;
  }

  try {
    const result = calculateRoofQuote(input);
    renderQuote(result, input);
  } catch (error) {
    renderQuoteError(error);
  }
});

leadForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(leadForm);
  const validationError = validateLeadInput(data);

  if (validationError) {
    showError(leadError, validationError.message);
    focusField(leadForm, validationError.field);
    return;
  }

  hideError(leadError);
  const subject = encodeURIComponent(buildInquirySubject(data));
  const body = encodeURIComponent([
    'Pozdravljeni,',
    '',
    'prosim za pregled podatkov za streho na ključ.',
    '',
    'Kontakt',
    '---',
    `Ime: ${readString(data, 'name')}`,
    `Telefon: ${readString(data, 'phone')}`,
    `Email: ${readString(data, 'email')}`,
    '',
    'Lokacija / objekt',
    '---',
    `Lokacija: ${readString(data, 'location')}`,
    '',
    'Opis strehe',
    '---',
    `${readString(data, 'message')}`,
    '',
    ...buildEstimateEmailSection(),
    '',
    'Izbrani podatki kalkulatorja',
    '---',
    ...formatDefinitionLines(buildSelectedSummary(latestQuoteInput || readQuoteForm(quoteForm))),
    '',
    'Dejavniki, ki vplivajo na oceno',
    '---',
    ...formatBulletLines(buildPriceDrivers(latestQuoteInput || readQuoteForm(quoteForm))),
    '',
    'Kaj še ni potrjeno',
    '---',
    ...formatBulletLines(NOT_CONFIRMED_ITEMS),
    '',
    'Soglasje',
    '---',
    'Stranka je potrdila, da lahko ASTRA group d.o.o. uporabi poslane podatke za odgovor na povpraševanje.',
    '',
    'Opomba o informativnosti',
    '---',
    'Informativni razpon ni zavezujoča ponudba. Za natančno ponudbo je potreben pregled podatkov, slik in izvedbenih pogojev.',
    '',
    'Lep pozdrav',
  ].join('\n'));

  window.location.href = `mailto:info@astragroup.si?subject=${subject}&body=${body}`;
});

try {
  const initialInput = readQuoteForm(quoteForm);
  renderQuote(calculateRoofQuote(initialInput), initialInput);
} catch (error) {
  renderQuoteError(error);
}
