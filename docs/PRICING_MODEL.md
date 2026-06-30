# Cenovni model

## Status

Ta cenovni model je delovna osnova za omejeno MVP testiranje. Aktivne vrednosti v kalkulatorju so potrjene s strani ASTRA za MVP testno uporabo, vendar niso končni cenik podjetja ASTRA group d.o.o.

Vrednosti v `src/pricing-config.js` se uporabljajo samo za informativni in nezavezujoč izračun. Rezultat ni končna ponudba, ni pravno zavezujoča cena in ni zagotovljen strošek izvedbe.

Razširjen pregled aktivnih in prihodnjih cenovnih predpostavk je v `docs/PRICING_ASSUMPTIONS.md`. CSV različica za pregled je v `docs/pricing-assumptions.csv`.

PR-005 katalog uporablja lastnikov spreadsheet `astra_cenik_poenostavljen_AI_v6.xlsx` kot vhod za pregledne postavke, vendar tega ne aktivira v kalkulatorju.

Za natančno ponudbo je še vedno potreben ASTRA pregled podatkov, fotografij, dejanskega stanja strehe, dostopa in izvedbenih pogojev.

## Osnovna formula

```text
osnovna izvedba = površina strehe × cena izbranega sistema na m²

dodatki =
  odstranitev stare kritine
  + izolacija
  + žlebovi / osnovna kleparska dela
  + dimniki
  + strešna okna
  + odvoz odpadnega materiala
  + izbrani sloji strehe
  + izbrani zaključki kritine
  + izbrana kleparska dela
  + izbrani dodatki za dostop in pripravo

vmesni seštevek = osnovna izvedba + dodatki

prilagoditve =
  zahtevnost oblike
  + zahtevnost dostopa
  + naklon strehe
  + zahtevnost kleparskih detajlov

informativni razpon = vmesni seštevek × spodnji / zgornji faktor
```

## Zakaj cenovni razpon

Pri strehah je nevarno prikazati eno samo ceno, ker so velike razlike zaradi:

- stanja obstoječe konstrukcije,
- naklona,
- detajlov,
- dimnikov in strešnih oken,
- dostopa,
- odvoza materiala,
- izbrane kritine,
- kleparskih zaključkov,
- potrebe po odru ali dvigalu.

Zato aplikacija vrne razpon, npr.:

```text
Informativna ocena: 18.000–24.000 € + DDV
```

## Konfiguracija

Cene so trenutno v:

```text
src/pricing-config.js
```

Pravila:

- vse cene morajo ostati v konfiguraciji,
- UI ne sme vsebovati trdo zapisanih cen,
- vsaka sprememba pricing logike mora imeti test,
- pri javni uporabi mora biti jasno zapisano, da cena ni zavezujoča.

Pomembna ločnica:

- `src/pricing-config.js` vsebuje vrednosti, ki so aktivne v kalkulatorju,
- `docs/PRICING_ASSUMPTIONS.md` in `docs/pricing-assumptions.csv` vsebujeta tudi pregledne postavke, ki še niso aktivne in ne vplivajo na izračun.

Pregledne postavke se lahko premaknejo v konfiguracijo šele po potrditvi ASTRA in z ustreznimi testi.

## Začetne kategorije

### Kritina / sistem

- Opečna kritina,
- Betonska kritina,
- Pločevinasta kritina,
- Ravna streha - membrana.

### Dodatki

- Toplotna izolacija,
- Žlebovi in osnovna kleparska dela,
- Odstranitev obstoječe kritine,
- Dimniki,
- Strešna okna,
- Odvoz odpadnega materiala.

### PR-006 aktivirane dodatne postavke

PR-006 premakne majhen del PR-005 kataloga v aktivni kalkulator. Runtime vrednosti so v `src/pricing-config.js`, logika pa v `src/pricing-engine.js`.

Aktivirani sloji strehe:

- Paroprepustna folija,
- Deskanje / opaž,
- Strešne letve,
- Kontra letve,
- Prezračevalni sloj.

Aktivirani zaključki kritine:

- Slemenjaki / sleme,
- Krajnik / krajna kritina,
- Zračniki na strehi,
- Snegolovi.

Aktivirana kleparska dela:

- Žleb,
- Vertikalna odtočna cev,
- Žlota,
- Kapna obroba,
- Čelna / vetrna obroba.

Aktivirani dodatki za dostop in pripravo:

- Oder,
- Ročni prenos materiala,
- Postavitev gradbišča.

Postavke z znano dolžino, kot sta žleb in vertikalna odtočna cev, uporabljajo uporabnikov vnos v m¹. Nekatere checkbox postavke z enoto m¹ ali m² uporabljajo konfigurirane privzete dovolilnice, ker MVP ne zbira vseh natančnih mer. Te dovolilnice so del ASTRA-potrjenih MVP testnih vrednosti, vendar ostajajo informativne in ne nadomestijo natančnih izmer pred ponudbo.

### Faktorji

- Zahtevnost oblike,
- Dostopnost objekta,
- Naklon strehe,
- Zahtevnost kleparskih detajlov.

## PR-003 razširjeni vhodni podatki

Kalkulator zdaj upošteva dodatne strešne dejavnike, ki vplivajo na informativni razpon:

### Naklon strehe

- Nizek / enostaven naklon,
- Običajen naklon,
- Strm / zahtevnejši naklon.

Naklon je modeliran kot faktor, ker strmejše strehe praviloma zahtevajo več previdnosti, priprave in časa.

### Dimniki

Uporabnik vnese število dimnikov. Vsak dimnik doda konfiguriran znesek za obrobe in detajle.

### Strešna okna

Uporabnik vnese število strešnih oken. Vsako strešno okno doda konfiguriran znesek za obrobe in detajle.

### Kleparski detajli

- Osnovni kleparski detajli,
- Običajni kleparski detajli,
- Zahtevni kleparski detajli.

Zahtevni detajli so modelirani kot faktor na vmesni seštevek.

### Odstranitev obstoječe kritine

- Brez odstranitve,
- Enostavna odstranitev,
- Zahtevna odstranitev.

Odstranitev je modelirana kot znesek na m², ker je odvisna od površine strehe.

### Odvoz odpadnega materiala

- Ni vključeno,
- Vključen običajen odvoz,
- Vključen odvoz pri zahtevnem dostopu.

Odvoz je modeliran kot znesek na m², ker se količina materiala običajno poveča s površino.

## Omejitve modela

Model še vedno ne predstavlja končne ponudbe. Ne vključuje vseh možnih postavk, kot so dvigalo, regijski faktorji, dejansko stanje konstrukcije ali posebni detajli na objektu. Nekatere nove PR-006 postavke so še vedno poenostavljene z dovolilnicami in niso nadomestilo za ogled ali natančne izmere.

Pred produkcijsko uporabo je treba:

- preveriti potrjene MVP testne cenovne predpostavke na realnih primerih,
- preveriti faktorje za zahtevnost,
- pravno pregledati opozorila o informativnosti,
- določiti, kateri podatki so obvezni za realno povpraševanje.

## Priporočena nadgradnja

V naslednji fazi naj pricing model bolj natančno podpira:

- natančne količine snegolovov,
- natančne dolžine vseh kleparskih obrob,
- oder po dejanski površini,
- regijski faktor,
- ločen prikaz material / delo / dodatki.

PR-005 dodaja katalog cenovnih predpostavk za pregled, ne spreminja pa aktivnega izračuna.
PR-006 aktivira izbran podsklop kataloga, vendar rezultat ostaja informativen in nezavezujoč.
