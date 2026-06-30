import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { test } from 'node:test';

test('lead form blocks missing consent and includes the latest estimate when consent is present', async () => {
  const html = readFileSync(new URL('../app/index.html', import.meta.url), 'utf8');
  assert.match(html, /<title>ASTRA Streha na ključ<\/title>/);
  assert.match(html, /ASTRA Streha na ključ/);
  assert.match(html, /<h1>Streha na ključ<\/h1>/);
  assert.match(html, /Informativni izračun za novo ali obnovljeno streho/);
  assert.match(html, /Pošlji povpraševanje/);
  assert.match(html, /Informativni izračun\s+ni zavezujoča ponudba/);
  assert.match(html, /name="roofPitch"/);
  assert.match(html, /name="chimneyCount"/);
  assert.match(html, /name="roofWindowCount"/);
  assert.match(html, /name="flashingComplexity"/);
  assert.match(html, /name="existingRoofRemoval"/);
  assert.match(html, /name="wasteHandling"/);
  assert.match(html, /name="vaporPermeableMembrane"/);
  assert.match(html, /name="roofBoarding"/);
  assert.match(html, /name="roofVentCount"/);
  assert.match(html, /name="gutterLength"/);
  assert.match(html, /name="siteSetup"/);

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
    inquiryFallback,
    inquiryEmail,
    inquirySubject,
    inquiryBody,
    inquiryMailtoLink,
    copyInquiryButton,
    copyStatus,
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
  quoteForm.setValue('roofVentCount', '-1');
  quoteForm.submit();
  assert.equal(quoteError.hidden, false);
  assert.match(quoteError.textContent, /Število zračnikov na strehi mora biti celo število 0 ali več/);

  quoteForm.setValue('roofVentCount', '2');
  quoteForm.setValue('gutterLength', '-1');
  quoteForm.submit();
  assert.equal(quoteError.hidden, false);
  assert.match(quoteError.textContent, /Dolžina žleba mora biti število 0 ali več/);

  quoteForm.setValue('gutterLength', '24');
  quoteForm.setValue('downpipeLength', '-1');
  quoteForm.submit();
  assert.equal(quoteError.hidden, false);
  assert.match(quoteError.textContent, /Dolžina vertikalne odtočne cevi mora biti število 0 ali več/);

  quoteForm.setValue('downpipeLength', '12');
  quoteForm.setChecked('vaporPermeableMembrane', true);
  quoteForm.setChecked('roofBoarding', true);
  quoteForm.setChecked('roofBattens', true);
  quoteForm.setChecked('counterBattens', true);
  quoteForm.setChecked('ventilationLayer', true);
  quoteForm.setChecked('ridgeTiles', true);
  quoteForm.setChecked('edgeTiles', true);
  quoteForm.setChecked('snowGuards', true);
  quoteForm.setChecked('valleyFlashing', true);
  quoteForm.setChecked('eavesFlashing', true);
  quoteForm.setChecked('windBoardFlashing', true);
  quoteForm.setChecked('scaffolding', true);
  quoteForm.setChecked('manualMaterialCarry', true);
  quoteForm.setChecked('siteSetup', true);
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
  assert.ok(hasRenderedText(priceDrivers, 'Paroprepustna folija'));
  assert.ok(hasRenderedText(priceDrivers, 'Deskanje / opaž'));
  assert.ok(hasRenderedText(priceDrivers, 'žleb (24 m)'));
  assert.ok(hasRenderedText(priceDrivers, 'Postavitev gradbišča'));
  assert.ok(hasRenderedText(selectedSummary, 'Opečna kritina'));
  assert.ok(hasRenderedText(selectedSummary, 'Zahtevni kleparski detajli'));
  assert.ok(hasRenderedText(selectedSummary, 'Snegolovi'));
  assert.ok(hasRenderedText(includedItems, 'Vključen odvoz pri zahtevnem dostopu'));
  assert.ok(hasRenderedText(includedItems, 'Ročni prenos materiala'));
  assert.ok(hasRenderedText(notConfirmed, 'dejansko stanje konstrukcije'));

  leadForm.submit();
  assert.equal(leadError.hidden, false);
  assert.match(leadError.textContent, /potrdi/);
  assert.equal(windowLocation.href, '');
  assert.equal(inquiryFallback.hidden, true);

  leadForm.setChecked('consent', true);
  leadForm.submit();

  const subject = decodeURIComponent(windowLocation.href.split('subject=')[1].split('&body=')[0]);
  const body = decodeURIComponent(windowLocation.href.split('body=')[1]);
  assert.match(windowLocation.href, /^mailto:info@astragroup\.si/);
  assert.equal(inquiryFallback.hidden, false);
  assert.equal(inquiryEmail.textContent, 'info@astragroup.si');
  assert.equal(inquirySubject.textContent, subject);
  assert.equal(inquiryBody.value, body);
  assert.equal(inquiryMailtoLink.href, windowLocation.href);
  assert.equal(copyInquiryButton.textContent, 'Kopiraj povpraševanje');
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
  assert.match(body, /Žlebovi in osnovna kleparska dela: preskočeno, ker so vnesene natančne dolžine/);
  assert.match(body, /Dodatne postavke strehe: .*Paroprepustna folija/);
  assert.match(body, /Dodatne postavke strehe: .*žleb \(24 m\)/);
  assert.match(body, /Dodatne postavke strehe: .*Postavitev gradbišča/);
  assert.match(body, /Dejavniki, ki vplivajo na oceno\n---/);
  assert.match(body, /- Strm \/ zahtevnejši naklon/);
  assert.match(body, /- Deskanje \/ opaž/);
  assert.match(body, /- žleb \(24 m\)/);
  assert.doesNotMatch(body, /- žlebovi in osnovna kleparska dela/);
  assert.match(body, /Kaj še ni potrjeno\n---/);
  assert.match(body, /- dejansko stanje konstrukcije/);
  assert.match(body, /Soglasje\n---/);
  assert.match(body, /Opomba o informativnosti\n---/);
  assert.match(body, /Za natančno ponudbo je potreben pregled podatkov/);

  await copyInquiryButton.click();
  assert.equal(globalThis.navigator.clipboard.lastCopiedText, body);
  assert.match(copyStatus.textContent, /kopirano/i);
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
      roofVentCount: '0',
      gutterLength: '0',
      downpipeLength: '0',
      insulation: false,
      gutters: true,
      vaporPermeableMembrane: false,
      roofBoarding: false,
      roofBattens: false,
      counterBattens: false,
      ventilationLayer: false,
      ridgeTiles: false,
      edgeTiles: false,
      snowGuards: false,
      valleyFlashing: false,
      eavesFlashing: false,
      windBoardFlashing: false,
      scaffolding: false,
      manualMaterialCarry: false,
      siteSetup: false,
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
  const inquiryFallback = createNode();
  const inquiryEmail = createNode();
  const inquirySubject = createNode();
  const inquiryBody = createNode();
  const inquiryMailtoLink = createNode();
  const copyInquiryButton = createNode();
  const copyStatus = createNode();
  quoteError.hidden = true;
  leadError.hidden = true;
  inquiryFallback.hidden = true;
  copyInquiryButton.textContent = 'Kopiraj povpraševanje';

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
    ['#inquiry-fallback', inquiryFallback],
    ['#inquiry-email', inquiryEmail],
    ['#inquiry-subject', inquirySubject],
    ['#inquiry-body', inquiryBody],
    ['#inquiry-mailto-link', inquiryMailtoLink],
    ['#copy-inquiry', copyInquiryButton],
    ['#copy-status', copyStatus],
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
  const clipboard = {
    lastCopiedText: '',
    async writeText(text) {
      this.lastCopiedText = text;
    },
  };
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      clipboard,
    },
  });

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
    inquiryFallback,
    inquiryEmail,
    inquirySubject,
    inquiryBody,
    inquiryMailtoLink,
    copyInquiryButton,
    copyStatus,
    windowLocation,
  };
}

function createNode() {
  return {
    textContent: '',
    innerHTML: '',
    value: '',
    href: '',
    hidden: false,
    children: [],
    listeners: new Map(),
    append(...nodes) {
      this.children.push(...nodes);
    },
    addEventListener(type, listener) {
      this.listeners.set(type, listener);
    },
    click() {
      return this.listeners.get('click')?.({ preventDefault() {} });
    },
    focus() {},
    select() {},
  };
}

function hasRenderedText(node, pattern) {
  return collectText(node).includes(pattern);
}

function collectText(node) {
  return [
    node.textContent,
    node.value,
    ...node.children.flatMap((child) => collectText(child)),
  ].join(' ');
}
