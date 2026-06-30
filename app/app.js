import { calculateRoofQuote, formatCurrency } from '../src/pricing-engine.js';

const quoteForm = document.querySelector('#quote-form');
const leadForm = document.querySelector('#lead-form');
const priceRange = document.querySelector('#price-range');
const priceNote = document.querySelector('#price-note');
const breakdown = document.querySelector('#breakdown');
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
    tearOff: data.has('tearOff'),
    insulation: data.has('insulation'),
    gutters: data.has('gutters'),
  };
}

function renderQuote(result, input) {
  latestQuote = result;
  latestQuoteInput = input;
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
  priceRange.textContent = 'Izračun ni mogoč';
  priceNote.textContent = error.message;
  breakdown.innerHTML = '';
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
    `Odstranitev stare kritine: ${latestQuoteInput.tearOff ? 'da' : 'ne'}`,
    `Toplotna izolacija: ${latestQuoteInput.insulation ? 'da' : 'ne'}`,
    `Žlebovi in osnovna kleparska dela: ${latestQuoteInput.gutters ? 'da' : 'ne'}`,
  ];
}

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = readQuoteForm(quoteForm);

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
  const subject = encodeURIComponent('Povpraševanje za streho na ključ');
  const body = encodeURIComponent([
    'Pozdravljeni,',
    '',
    'prosim za odziv glede strehe na ključ.',
    '',
    `Ime: ${data.get('name') || ''}`,
    `Telefon: ${data.get('phone') || ''}`,
    `Email: ${data.get('email') || ''}`,
    `Lokacija: ${data.get('location') || ''}`,
    '',
    ...buildEstimateEmailSection(),
    '',
    'Opis:',
    `${data.get('message') || ''}`,
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
