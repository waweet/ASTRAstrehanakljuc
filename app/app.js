import { calculateRoofQuote, formatCurrency } from '../src/pricing-engine.js';

const quoteForm = document.querySelector('#quote-form');
const leadForm = document.querySelector('#lead-form');
const priceRange = document.querySelector('#price-range');
const priceNote = document.querySelector('#price-note');
const breakdown = document.querySelector('#breakdown');

function readQuoteForm(form) {
  const data = new FormData(form);
  return {
    area: Number(data.get('area')),
    roofType: String(data.get('roofType')),
    covering: String(data.get('covering')),
    complexity: String(data.get('complexity')),
    access: String(data.get('access')),
    tearOff: data.has('tearOff'),
    insulation: data.has('insulation'),
    gutters: data.has('gutters'),
  };
}

function renderQuote(result) {
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

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = readQuoteForm(quoteForm);
  const result = calculateRoofQuote(input);
  renderQuote(result);
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
    'Opis:',
    `${data.get('message') || ''}`,
    '',
    'Lep pozdrav',
  ].join('\n'));

  window.location.href = `mailto:info@astragroup.si?subject=${subject}&body=${body}`;
});

renderQuote(calculateRoofQuote(readQuoteForm(quoteForm)));
