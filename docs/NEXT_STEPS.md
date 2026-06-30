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

- dodati parametre za naklon, dimnike, strešna okna in obrobe,
- posodobiti `src/pricing-config.js`,
- dodati teste za nove cenovne faktorje.

## PR-004 - Lead capture brez zunanjih servisov

- pripraviti bolj strukturiran povzetek povpraševanja,
- dodati GDPR besedilo in privolitev,
- ohraniti `mailto:` tok, dokler backend ali CRM ni potrjen.

## PR-005 - Priprava na produkcijski tok

- odločitev o backendu, email pošiljanju ali CRM povezavi,
- pripraviti okoljske nastavitve brez skrivnosti v repozitoriju,
- dodati dokumentiran postopek objave.
