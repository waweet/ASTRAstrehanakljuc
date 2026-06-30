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

## PR-004 - Lead capture brez zunanjih servisov

- pripraviti bolj strukturiran povzetek povpraševanja,
- dodati GDPR besedilo in privolitev,
- ohraniti `mailto:` tok, dokler backend ali CRM ni potrjen.

## PR-005 - Priprava na produkcijski tok

- odločitev o backendu, email pošiljanju ali CRM povezavi,
- pripraviti okoljske nastavitve brez skrivnosti v repozitoriju,
- dodati dokumentiran postopek objave.
