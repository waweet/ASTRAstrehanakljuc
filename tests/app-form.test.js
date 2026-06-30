import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { test } from 'node:test';

test('lead form blocks missing consent and includes the latest estimate when consent is present', async () => {
  const html = readFileSync(new URL('../app/index.html', import.meta.url), 'utf8');
  assert.match(html, /name="roofPitch"/);
  assert.match(html, /name="chimneyCount"/);
  assert.match(html, /name="roofWindowCount"/);
  assert.match(html, /name="flashingComplexity"/);
  assert.match(html, /name="existingRoofRemoval"/);
  assert.match(html, /name="wasteHandling"/);

  const {
    quoteForm,
    leadForm,
    priceRange,
    priceNote,
    priceDrivers,
    selectedSummary,
    includedItems,
    notConfirmed,
    quoteError,
    leadError,
    windowLocation,
  } = setupDom();
  const appUrl = pathToFileURL(new URL('../app/app.js', import.meta.url).pathname);
  appUrl.search = `?test=${Date.now()}`;

  await import(appUrl.href);

  assert.match(priceRange.textContent, /\+ DDV/);
  assert.equal(quoteError.hidden, true);
  assert.match(priceNote.textContent, /Informativni razpon ni zavezujoča ponudba/);
  assert.doesNotMatch(priceNote.textContent, /dokončna ponudba|končna ponudba/i);

  quoteForm.setValue('area', '');
  quoteForm.submit();
  assert.equal(priceRange.textContent, 'Preveri vnos');
  assert.equal(quoteError.hidden, false);
  assert.match(quoteError.textContent, /Vnesi površino strehe/);

  quoteForm.setValue('area', '180');
  quoteForm.setSelect('covering', 'unknown_covering', 'Neznana kritina');
  quoteForm.submit();
  assert.equal(quoteError.hidden, false);
  assert.match(priceNote.textContent, /Izbrana kritina ni prepoznana/);

  quoteForm.setSelect('covering', 'clay_tiles', 'Opečna kritina');
  quoteForm.setValue('chimneyCount', '-1');
  quoteForm.submit();
  assert.equal(quoteError.hidden, false);
  assert.match(quoteError.textContent, /Število dimnikov mora biti celo število 0 ali več/);

  quoteForm.setValue('chimneyCount', '2');
  quoteForm.setValue('roofWindowCount', '-1');
  quoteForm.submit();
  assert.equal(quoteError.hidden, false);
  assert.match(quoteError.textContent, /Število strešnih oken mora biti celo število 0 ali več/);

  quoteForm.setValue('roofWindowCount', '1');
  quoteForm.setSelect('complexity', 'complex', 'Zahtevna');
  quoteForm.setSelect('access', 'very_difficult', 'Zelo zahtevna');
  quoteForm.setSelect('roofPitch', 'steep', 'Strm / zahtevnejši naklon');
  quoteForm.setSelect('flashingComplexity', 'complex', 'Zahtevni kleparski detajli');
  quoteForm.setSelect('existingRoofRemoval', 'difficult', 'Zahtevna odstranitev');
  quoteForm.setSelect('wasteHandling', 'difficult', 'Vključen odvoz pri zahtevnem dostopu');
  quoteForm.submit();
  assert.equal(quoteError.hidden, true);
  assert.match(priceRange.textContent, /\+ DDV/);
  assert.ok(hasRenderedText(priceDrivers, 'Zahtevna'));
  assert.ok(hasRenderedText(priceDrivers, 'Strm / zahtevnejši naklon'));
  assert.ok(hasRenderedText(priceDrivers, '2 dimnika'));
  assert.ok(hasRenderedText(priceDrivers, '1 strešno okno'));
  assert.ok(hasRenderedText(selectedSummary, 'Opečna kritina'));
  assert.ok(hasRenderedText(selectedSummary, 'Zahtevni kleparski detajli'));
  assert.ok(hasRenderedText(includedItems, 'Vključen odvoz pri zahtevnem dostopu'));
  assert.ok(hasRenderedText(notConfirmed, 'dejansko stanje konstrukcije'));

  leadForm.submit();
  assert.equal(leadError.hidden, false);
  assert.match(leadError.textContent, /potrdi/);
  assert.equal(windowLocation.href, '');

  leadForm.setChecked('consent', true);
  leadForm.submit();

  const subject = decodeURIComponent(windowLocation.href.split('subject=')[1].split('&body=')[0]);
  const body = decodeURIComponent(windowLocation.href.split('body=')[1]);
  assert.match(windowLocation.href, /^mailto:info@astragroup\.si/);
  assert.match(subject, /Povpraševanje za streho na ključ - informativni izračun/);
  assert.match(subject, /Test Stranka/);
  assert.match(subject, /Ljubljana/);
  assert.match(body, /Kontakt\n---/);
  assert.match(body, /Ime: Test Stranka/);
  assert.match(body, /Telefon: 040 000 000/);
  assert.match(body, /Lokacija \/ objekt\n---/);
  assert.match(body, /Opis strehe\n---\nStreha je starejša, lokacija Ljubljana, izvedba v nekaj mesecih\./);
  assert.match(body, /Zadnji informativni izračun:/);
  assert.match(body, /\+ DDV/);
  assert.match(body, /Informativni razpon ni zavezujoča ponudba/);
  assert.match(body, /Izbrani podatki kalkulatorja\n---/);
  assert.match(body, /Naklon strehe: Strm \/ zahtevnejši naklon/);
  assert.match(body, /Število dimnikov: 2/);
  assert.match(body, /Število strešnih oken: 1/);
  assert.match(body, /Zahtevnost kleparskih detajlov: Zahtevni kleparski detajli/);
  assert.match(body, /Odstranitev obstoječe kritine: Zahtevna odstranitev/);
  assert.match(body, /Odvoz odpadnega materiala: Vključen odvoz pri zahtevnem dostopu/);
  assert.match(body, /Dejavniki, ki vplivajo na oceno\n---/);
  assert.match(body, /- Strm \/ zahtevnejši naklon/);
  assert.match(body, /Kaj še ni potrjeno\n---/);
  assert.match(body, /- dejansko stanje konstrukcije/);
  assert.match(body, /Soglasje\n---/);
  assert.match(body, /Opomba o informativnosti\n---/);
  assert.match(body, /Za natančno ponudbo je potreben pregled podatkov/);
});

function setupDom() {
  class FakeSelect {
    constructor(value, label) {
      this.set(value, label);
    }

    set(value, label) {
      this.value = value;
      this.selectedOptions = [{ textContent: label }];
    }

    focus() {}
  }

  globalThis.HTMLSelectElement = FakeSelect;

  globalThis.FormData = class FakeFormData {
    constructor(form) {
      this.entries = form.getFormDataEntries();
    }

    get(key) {
      const entry = this.entries.find(([name]) => name === key);
      return entry ? entry[1] : null;
    }

    has(key) {
      return this.entries.some(([name]) => name === key);
    }
  };

  class FakeField {
    focus() {}
  }

  class FakeForm {
    constructor(values = {}, selects = {}) {
      this.values = { ...values };
      this.elements = {};
      this.listeners = new Map();

      for (const key of Object.keys(values)) {
        this.elements[key] = new FakeField();
      }

      for (const [key, select] of Object.entries(selects)) {
        this.elements[key] = select;
      }
    }

    addEventListener(type, listener) {
      this.listeners.set(type, listener);
    }

    submit() {
      this.listeners.get('submit')?.({ preventDefault() {} });
    }

    setValue(key, value) {
      this.values[key] = value;
    }

    setChecked(key, checked) {
      this.values[key] = checked;
    }

    setSelect(key, value, label) {
      this.elements[key].set(value, label);
    }

    getFormDataEntries() {
      const entries = [];

      for (const [key, value] of Object.entries(this.values)) {
        if (typeof value === 'boolean') {
          if (value) entries.push([key, 'on']);
        } else {
          entries.push([key, value]);
        }
      }

      for (const [key, field] of Object.entries(this.elements)) {
        if (field instanceof FakeSelect) {
          entries.push([key, field.value]);
        }
      }

      return entries;
    }
  }

  const quoteForm = new FakeForm(
    {
      area: '180',
      chimneyCount: '0',
      roofWindowCount: '0',
      insulation: false,
      gutters: true,
    },
    {
      roofType: new FakeSelect('dvokapnica', 'Dvokapnica'),
      covering: new FakeSelect('clay_tiles', 'Opečna kritina'),
      complexity: new FakeSelect('simple', 'Enostavna'),
      access: new FakeSelect('normal', 'Normalna'),
      roofPitch: new FakeSelect('normal', 'Običajen naklon'),
      flashingComplexity: new FakeSelect('normal', 'Običajni kleparski detajli'),
      existingRoofRemoval: new FakeSelect('simple', 'Enostavna odstranitev'),
      wasteHandling: new FakeSelect('normal', 'Vključen običajen odvoz'),
    },
  );

  const leadForm = new FakeForm({
    name: 'Test Stranka',
    phone: '040 000 000',
    email: 'test@example.com',
    location: 'Ljubljana',
    message: 'Streha je starejša, lokacija Ljubljana, izvedba v nekaj mesecih.',
    consent: false,
  });

  const priceRange = createNode();
  const priceNote = createNode();
  const breakdown = createNode();
  const priceDrivers = createNode();
  const selectedSummary = createNode();
  const includedItems = createNode();
  const notConfirmed = createNode();
  const quoteError = createNode();
  const leadError = createNode();
  quoteError.hidden = true;
  leadError.hidden = true;

  const selectors = new Map([
    ['#quote-form', quoteForm],
    ['#lead-form', leadForm],
    ['#price-range', priceRange],
    ['#price-note', priceNote],
    ['#breakdown', breakdown],
    ['#price-drivers', priceDrivers],
    ['#selected-summary', selectedSummary],
    ['#included-items', includedItems],
    ['#not-confirmed', notConfirmed],
    ['#quote-error', quoteError],
    ['#lead-error', leadError],
  ]);

  globalThis.document = {
    querySelector(selector) {
      return selectors.get(selector);
    },
    createElement() {
      return createNode();
    },
  };

  const windowLocation = { href: '' };
  globalThis.window = { location: windowLocation };

  return {
    quoteForm,
    leadForm,
    priceRange,
    priceNote,
    priceDrivers,
    selectedSummary,
    includedItems,
    notConfirmed,
    quoteError,
    leadError,
    windowLocation,
  };
}

function createNode() {
  return {
    textContent: '',
    innerHTML: '',
    hidden: false,
    children: [],
    append(...nodes) {
      this.children.push(...nodes);
    },
  };
}

function hasRenderedText(node, pattern) {
  return collectText(node).includes(pattern);
}

function collectText(node) {
  return [
    node.textContent,
    ...node.children.flatMap((child) => collectText(child)),
  ].join(' ');
}
