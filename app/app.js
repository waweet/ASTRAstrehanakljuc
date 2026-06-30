import { calculateRoofQuote, formatCurrency } from '../src/pricing-engine.js';

const quoteForm = document.querySelector('#quote-form');
const leadForm = document.querySelector('#lead-form');
const priceRange = document.querySelector('#price-range');
const priceNote = document.querySelector('#price-note');
const breakdown = document.querySelector('#breakdown');
const quoteError = document.querySelector('#quote-error');
const leadError = document.querySelector('#lead-error');
let latestQuote = null;
let latestQuoteInput = null;

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
  };
}

function renderQuote(result, input) {
  latestQuote = result;
  latestQuoteInput = input;
  hideError(quoteError);
  priceRange.textContent = `${formatCurrency(result.low)} - ${formatCurrency(result.high)} + DDV`;
  priceNote.textContent = result.note;
  breakdown.innerHTML = '';

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
    '',
    'Podatki iz kalkulatorja:',
    `Površina: ${latestQuoteInput.area || ''} m²`,
    `Tip strehe: ${latestQuoteInput.roofTypeLabel || latestQuoteInput.roofType || ''}`,
    `Kritina / sistem: ${latestQuoteInput.coveringLabel || latestQuoteInput.covering || ''}`,
    `Zahtevnost oblike: ${latestQuoteInput.complexityLabel || latestQuoteInput.complexity || ''}`,
    `Dostopnost objekta: ${latestQuoteInput.accessLabel || latestQuoteInput.access || ''}`,
    `Naklon strehe: ${latestQuoteInput.roofPitchLabel || latestQuoteInput.roofPitch || ''}`,
    `Število dimnikov: ${latestQuoteInput.chimneyCount || '0'}`,
    `Število strešnih oken: ${latestQuoteInput.roofWindowCount || '0'}`,
    `Zahtevnost kleparskih detajlov: ${latestQuoteInput.flashingComplexityLabel || latestQuoteInput.flashingComplexity || ''}`,
    `Odstranitev obstoječe kritine: ${latestQuoteInput.existingRoofRemovalLabel || latestQuoteInput.existingRoofRemoval || ''}`,
    `Odvoz odpadnega materiala: ${latestQuoteInput.wasteHandlingLabel || latestQuoteInput.wasteHandling || ''}`,
    `Toplotna izolacija: ${latestQuoteInput.insulation ? 'da' : 'ne'}`,
    `Žlebovi in osnovna kleparska dela: ${latestQuoteInput.gutters ? 'da' : 'ne'}`,
  ];
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
  const subject = encodeURIComponent('Povpraševanje za streho na ključ');
  const body = encodeURIComponent([
    'Pozdravljeni,',
    '',
    'prosim za odziv glede strehe na ključ.',
    '',
    `Ime: ${readString(data, 'name')}`,
    `Telefon: ${readString(data, 'phone')}`,
    `Email: ${readString(data, 'email')}`,
    `Lokacija: ${readString(data, 'location')}`,
    `Soglasje za uporabo podatkov za odgovor: potrjeno`,
    '',
    ...buildEstimateEmailSection(),
    '',
    'Opis:',
    `${readString(data, 'message')}`,
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
