# Cenovni model

## Status

Ta cenovni model je delovna osnova. Številke niso potrjen končni cenik podjetja ASTRA group d.o.o.

Vrednosti v `src/pricing-config.js` so placeholder predpostavke za MVP. Pred javno uporabo jih mora pregledati in potrditi ASTRA group d.o.o.

Razširjen pregled aktivnih in prihodnjih cenovnih predpostavk je v `docs/PRICING_ASSUMPTIONS.md`. CSV različica za pregled je v `docs/pricing-assumptions.csv`.

PR-005 katalog uporablja lastnikov spreadsheet `astra_cenik_poenostavljen_AI_v6.xlsx` kot vhod za pregledne postavke, vendar tega ne aktivira v kalkulatorju.

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

Model še vedno ne predstavlja končne ponudbe. Ne vključuje vseh možnih postavk, kot so oder, dvigalo, snegolovi, dolžina žlebov v m¹, regijski faktorji, dejansko stanje konstrukcije ali posebni detajli na objektu.

Pred produkcijsko uporabo je treba:

- potrditi cenovne predpostavke v `src/pricing-config.js`,
- preveriti faktorje za zahtevnost,
- pravno pregledati opozorila o informativnosti,
- določiti, kateri podatki so obvezni za realno povpraševanje.

## Priporočena nadgradnja

V naslednji fazi naj pricing model podpira:

- snegolove,
- dolžino žlebov v m¹,
- oder,
- regijski faktor,
- ločen prikaz material / delo / dodatki.

PR-005 dodaja katalog cenovnih predpostavk za pregled, ne spreminja pa aktivnega izračuna.
