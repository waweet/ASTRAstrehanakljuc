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
- popisane so trenutno aktivne predpostavke iz kalkulatorja,
- dodane so razširjene postavke za sloje strehe, leseno konstrukcijo, kritino, kleparska dela, odstranitev, odvoz, dostop in pripravo gradbišča,
- razširjene postavke so jasno označene kot pregledne in še niso aktivne v kalkulatorju.

Pred naslednjo razširitvijo modela je potreben ASTRA pregled:

- katere postavke ostanejo,
- katere vrednosti se spremenijo,
- katere postavke se odstranijo,
- za katere postavke je potreben dobaviteljski predračun,
- katere potrjene postavke se lahko kasneje prenesejo v `src/pricing-config.js`.

## Kasnejši produkcijski tok

- odločitev o backendu, email pošiljanju ali CRM povezavi,
- pripraviti okoljske nastavitve brez skrivnosti v repozitoriju,
- dodati dokumentiran postopek objave.
