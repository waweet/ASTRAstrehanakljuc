# ASTRA Streha na ključ

Začetni repozitorij za informativni spletni kalkulator **streha na ključ** za podjetje ASTRA group d.o.o.

Namen aplikacije je hitro informativno ovrednotenje strehe, zajem dodatnih podatkov in oddaja povpraševanja. Aplikacija ne izdaja zavezujoče ponudbe.

## Trenutno stanje

MVP je pripravljen za omejeno testiranje z majhno skupino uporabnikov.

Trenutno stanje:

- statična aplikacija brez backenda,
- informativni kalkulator z ASTRA-potrjenimi MVP testnimi vrednostmi,
- nezavezujoč cenovni razpon,
- statični `mailto:` tok za povpraševanje s copy fallbackom,
- viden fallback panel z ASTRA e-naslovom, zadevo in pripravljenim besedilom,
- brez produkcijsko-finalnega pravnega/GDPR pregleda.

Povpraševanje se v trenutni različici ne pošilja iz backend strežnika. Aplikacija pripravi
osnutek e-pošte in prikaže kopirljivo fallback besedilo, če uporabnikova naprava nima
nastavljenega e-poštnega programa.

## Lokalni zagon

Brez namestitve odvisnosti:

```bash
python3 -m http.server 5173
```

Nato odpri:

```text
http://localhost:5173/app/
```

## MVP test deployment

The app is prepared for limited MVP testing as a static frontend.

- app path: `/app/`
- local run command: `npm start`
- deployment docs: `docs/DEPLOYMENT.md`
- backend: not added yet; inquiry uses `mailto:` plus copy fallback

## Testi

Zahteva Node.js 20+.

```bash
npm test
```

## Struktura

```text
app/                         Statični frontend prototip
src/                         Cenovna logika in konfiguracija
tests/                       Testi za pricing engine
docs/                        Produktni, cenovni in orkestracijski dokumenti
tasks/                       PR nalogi za coding agenta
AGENTS.md                    Projektna pravila za AI agente
```

## Opozorilo glede cen

Cene v `src/pricing-config.js` so ASTRA-potrjene vrednosti za omejeno MVP testiranje. Izračun ostaja informativen in nezavezujoč; natančna ponudba zahteva pregled podatkov, fotografij in izvedbenih pogojev.

## Naslednji korak

Po MVP testiranju je naslednji PR odvisen od povratnih informacij:

- mobile/visual polish, če se testerji težko znajdejo v obrazcu,
- backend/lead delivery, če je `mailto:` nezanesljiv,
- pricing refinement, če ASTRA ugotovi, da razponi potrebujejo prilagoditve.
