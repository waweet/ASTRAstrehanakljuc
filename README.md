# ASTRA Streha na ključ

Začetni repozitorij za informativni spletni kalkulator **streha na ključ** za podjetje ASTRA group d.o.o.

Namen aplikacije je hitro informativno ovrednotenje strehe, zajem dodatnih podatkov in oddaja povpraševanja. Aplikacija ne izdaja zavezujoče ponudbe.

## Trenutno stanje

Ta paket je pripravljen kot začetni GitHub skeleton:

- statični prototip kalkulatorja,
- osnovna cenovna konfiguracija,
- testirana pricing logika,
- osnutek email povpraševanja z zadnjim informativnim izračunom,
- produktni brief,
- pravila za AI koderja,
- prvi PR nalog za GPT-5.5 koderja.

## Lokalni zagon

Brez namestitve odvisnosti:

```bash
python3 -m http.server 5173
```

Nato odpri:

```text
http://localhost:5173/app/
```

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

Cene v `src/pricing-config.js` so začetne delovne predpostavke. Pred javno uporabo jih mora potrditi ASTRA group d.o.o.

## Naslednji korak

Prvi nalog za GPT-5.5 koderja je v:

```text
tasks/PR-001-GPT55.md
```
