# Cenovni model

## Status

Ta cenovni model je delovna osnova. Številke niso potrjen končni cenik podjetja ASTRA group d.o.o.

## Osnovna formula

```text
osnovna izvedba = površina strehe × cena izbranega sistema na m²

dodatki =
  odstranitev stare kritine
  + izolacija
  + žlebovi / osnovna kleparska dela

vmesni seštevek = osnovna izvedba + dodatki

prilagoditve =
  zahtevnost oblike
  + zahtevnost dostopa

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

## Začetne kategorije

### Kritina / sistem

- Opečna kritina,
- Betonska kritina,
- Pločevinasta kritina,
- Ravna streha - membrana.

### Dodatki

- Odstranitev stare kritine,
- Toplotna izolacija,
- Žlebovi in osnovna kleparska dela.

### Faktorji

- Zahtevnost oblike,
- Dostopnost objekta.

## Priporočena nadgradnja

V naslednji fazi naj pricing model podpira:

- naklon strehe,
- število dimnikov,
- strešna okna,
- obrobe,
- snegolove,
- dolžino žlebov v m¹,
- odvoz po težavnosti,
- oder,
- regijski faktor,
- ločen prikaz material / delo / dodatki.
