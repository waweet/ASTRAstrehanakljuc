# Next steps

Predlagano zaporedje naslednjih PR-jev za ASTRA kalkulator:

## PR-002 - Vsebina in UX obrazca

Izvedeno v PR-002:

- jasnejša slovenska sporočila za napake v kalkulatorju,
- bolj eksplicitne oznake polj in pomoč pri vnosu,
- zahteva za telefon ali email pri povpraševanju,
- obvezna privolitev za uporabo podatkov za odgovor na povpraševanje,
- strukturiran osnutek emaila z informativnim izračunom,
- osnovna preverba ozke mobilne postavitve.

Pred produkcijo še manjka:

- pregled končnega GDPR/privacy besedila,
- potrjen produkcijski kontaktni naslov,
- odločitev, ali `mailto:` ostane dovolj ali je potreben backend/CRM,
- zaščita pred neželenimi povpraševanji, če bo dodan javni backend.

## PR-003 - Razširitev pricing modela

Izvedeno v PR-003:

- dodani vhodni podatki za naklon strehe,
- dodano število dimnikov in strešnih oken,
- dodana zahtevnost kleparskih detajlov,
- dodana odstranitev obstoječe kritine po zahtevnosti,
- dodan odvoz odpadnega materiala po zahtevnosti,
- cenovne vrednosti ostajajo v `src/pricing-config.js`,
- pricing logika ostaja v `src/pricing-engine.js`,
- dodani testi za nove faktorje, dodatke in negativne vnose.

Pred produkcijo še manjka:

- pregled in potrditev vseh placeholder cenovnih predpostavk,
- odločitev o obveznih podatkih za realno povpraševanje,
- pregled pravnega besedila o informativnem in nezavezujočem izračunu,
- bolj natančen model za oder, dvigalo, snegolove, dolžino žlebov in regijske razlike.

## PR-004 - Razlaga rezultata in struktura povpraševanja

Izvedeno v PR-004:

- rezultat prikazuje informativni razpon z jasnejšo razlago,
- dodani so glavni dejavniki, ki vplivajo na oceno,
- dodan je povzetek izbranih podatkov,
- dodan je seznam stvari, ki še niso potrjene,
- `mailto:` povpraševanje je strukturirano po razdelkih za lažji ASTRA pregled,
- statična arhitektura in brez-backend tok ostajata nespremenjena.

Pred produkcijo še manjka:

- odločitev, ali `mailto:` zadostuje ali je potreben backend/CRM,
- dodajanje fotografij strehe, če bo podprt realen oddajni tok,
- pravni pregled besedil o informativnem in nezavezujočem izračunu,
- potrjena politika obdelave povpraševanj in hranjenja podatkov.

## PR-005 - Katalog cenovnih predpostavk

Izvedeno v PR-005:

- dodan interni katalog cenovnih predpostavk v `docs/PRICING_ASSUMPTIONS.md`,
- dodan pregledni CSV v `docs/pricing-assumptions.csv`,
- katalog je dopolnjen iz lastnikovega spreadsheet vira `astra_cenik_poenostavljen_AI_v6.xlsx`,
- popisane so trenutno aktivne predpostavke iz kalkulatorja,
- dodane so razširjene postavke za sloje strehe, leseno konstrukcijo, kritino, kleparska dela, odstranitev, odvoz, dostop in pripravo gradbišča,
- razširjene postavke so jasno označene kot pregledne in še niso aktivne v kalkulatorju.

Pred naslednjo razširitvijo modela je potreben ASTRA pregled:

- katere postavke ostanejo,
- katere vrednosti se spremenijo,
- katere postavke se odstranijo,
- za katere postavke je potreben dobaviteljski predračun,
- katere potrjene postavke se lahko kasneje prenesejo v `src/pricing-config.js`.

## PR-006 - Aktivacija izbranih cenovnih postavk

Izvedeno v PR-006:

- izbran podsklop PR-005 kataloga je premaknjen v `src/pricing-config.js`,
- kalkulator podpira dodatne sloje strehe, zaključke kritine, kleparska dela ter dostop/pripravo,
- `docs/pricing-assumptions.csv` označi samo dejansko aktivirane vrstice kot `active_in_calculator`,
- rezultat in mailto povpraševanje vključujeta izbrane nove postavke,
- rezultat ostaja informativen in nezavezujoč.

Pred produkcijo še manjka:

- preverjanje ASTRA-potrjenih MVP testnih vrednosti na realnih primerih,
- odločitev, ali checkbox dovolilnice zadostujejo ali so potrebne natančne količine,
- pregled poenostavitev za oder, snegolove in kleparske obrobe,
- pravni pregled informativnega/neobvezujočega besedila.

## PR-007 - MVP test readiness

Izvedeno v PR-007:

- aktivne cene so označene kot ASTRA-potrjene vrednosti za omejeno MVP testiranje,
- dodan je MVP testni načrt za majhno skupino realnih uporabnikov,
- dodan je release/test checklist pred deljenjem s testerji,
- dokumentacija o cenah poudarja, da rezultat ostaja informativen in nezavezujoč,
- obnašanje kalkulatorja in numerične vrednosti niso spremenjeni.

Po MVP testiranju je naslednji priporočeni PR odvisen od povratnih informacij:

- mobile/visual polish, če se testerji težko prebijejo skozi obrazec,
- backend/lead delivery, če je `mailto:` preveč nezanesljiv,
- pricing refinement, če ASTRA ugotovi, da so razponi zavajajoči za tipične primere.

## PR-008 - Inquiry flow and visual polish

Izvedeno v PR-008:

- statični `mailto:` tok povpraševanja ima zdaj viden fallback panel,
- fallback panel prikaže ASTRA e-naslov, zadevo in pripravljeno besedilo povpraševanja,
- dodan je gumb za kopiranje pripravljenega povpraševanja,
- besedilo jasno pove, da aplikacija pripravi osnutek e-pošte in ne pošilja iz strežnika,
- glavna predstavitev jasneje uporablja ime `ASTRA Streha na ključ`,
- kontaktni razdelek, rezultat in dolgi obrazec so vizualno bolj berljivi na namizju in mobilnih širinah.

Omejitve po PR-007:

- backend pošiljanje e-pošte ni dodano,
- CRM integracija ni dodana,
- aplikacija je bolj pripravljena za omejeno MVP testiranje, vendar še ni produkcijsko finalna,
- če se `mailto:` v realnih testih izkaže za nezanesljiv, je naslednji korak backend ali druga potrjena dostavna pot za povpraševanja.

## Kasnejši produkcijski tok

- odločitev o backendu, email pošiljanju ali CRM povezavi,
- pripraviti okoljske nastavitve brez skrivnosti v repozitoriju,
- dodati dokumentiran postopek objave.
