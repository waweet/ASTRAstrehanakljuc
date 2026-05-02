# RoofApp MVP – PRD, ekrani, podatkovni model in logika izračuna

## 1. Namen produkta

Webapp je namenjen hitri pripravi **informativne ponudbe za streho na ključ** za:

- novogradnjo strehe,
- rekonstrukcijo strehe,
- menjavo kritine,
- dodatna strešna dela.

Primarni cilj MVP-ja ni priprava končne zavezujoče ponudbe, ampak:

- hitra ocena investicije,
- kvalifikacija povpraševanja,
- standardiziran vnos podatkov,
- priprava osnove za nadaljnjo natančno ponudbo.

---

## 2. Produktna vizija

Uporabnik v nekaj minutah vnese osnovne podatke o strehi, sistem pa izračuna:

- ocenjeno površino strehe,
- glavne količine,
- okvirni strošek materiala,
- okvirni strošek dela,
- dodatke in faktorje zahtevnosti,
- skupni cenovni razpon.

Dolgoročno naj se produkt razvije v:

- lead generator za krovce,
- interni quote builder,
- CRM za strešne projekte,
- AI pomočnika za prepoznavo tipa strehe in pripravo ponudbe.

---

## 3. Ciljni uporabniki

### Primarni uporabniki

1. **Končna stranka**
   - želi hitro informativno ceno,
   - nima vseh tehničnih podatkov,
   - želi razumeti okvir investicije.

2. **Izvajalec / krovec**
   - želi standardiziran zajem podatkov,
   - želi hitrejši predizračun,
   - želi zbirati bolj kvalificirana povpraševanja.

### Sekundarni uporabniki

3. **Komercialist / prodaja**
   - pregleda vnos,
   - prilagodi faktorje,
   - potrdi nadaljnji ogled.

4. **Administrator**
   - ureja cenike,
   - ureja pravila,
   - spremlja statistiko in uspešnost leadov.

---

## 4. Cilji MVP-ja

### Poslovni cilji

- zmanjšati čas priprave informativne ponudbe,
- povečati število kvalificiranih leadov,
- izboljšati standardizacijo vhodnih podatkov,
- zgraditi osnovo za nadaljnjo avtomatizacijo.

### Uporabniški cilji

- vnos v manj kot 5 minutah,
- jasen rezultat z razponom cene,
- razumljiv prikaz, kaj je vključeno in kaj ni,
- možnost oddaje kontakta za natančno ponudbo.

### Tehnični cilji

- modul za geometrijo strehe,
- modul za cenovni izračun,
- modul za administracijo cenikov in faktorjev,
- baza povpraševanj in slik.

---

## 5. Kaj MVP je in kaj ni

### MVP je

- večkorakovni obrazec,
- izračun informativne ponudbe,
- podpora za osnovne tipe streh,
- možnost vnosa dimenzij,
- možnost nalaganja slik kot dopolnitev,
- admin pregled vnosov,
- cenovni razpon in PDF povzetek.

### MVP ni

- avtomatski natančni izračun iz ene slike,
- BIM ali CAD modeliranje,
- končna zavezujoča pogodbena ponudba,
- popolna analiza konstrukcije,
- avtomatska statična presoja,
- popolna prepoznava poškodb z AI.

---

## 6. Obseg MVP-ja

### Podprte vrste projektov

- novogradnja strehe,
- rekonstrukcija strehe,
- menjava kritine,
- dodatna izolacija,
- osnovna kleparska dela.

### Podprti tipi streh v MVP

- enokapnica,
- dvokapnica,
- štirikapnica,
- ravna streha.

### Dodatni elementi v MVP

- strešna okna,
- dimniki,
- žlebovi in odtoki,
- snegolovi,
- osnovne obrobe,
- odstranitev stare kritine,
- odvoz materiala.

---

## 7. Ključne uporabniške zgodbe

### Kot končna stranka želim

- vnesti dimenzije strehe ali objekta,
- označiti tip strehe,
- izbrati tip kritine,
- vnesti dodatne elemente,
- prejeti okviren strošek investicije,
- oddati povpraševanje za natančno ponudbo.

### Kot krovec želim

- prejeti standardizirane podatke,
- videti slike in ključne faktorje,
- imeti informativni izračun kot osnovo za nadaljnji kontakt,
- upravljati cenike in pribitke.

### Kot administrator želim

- spreminjati cene materialov,
- spreminjati urne ali m2 cene dela,
- nastaviti regijske in zahtevnostne faktorje,
- pregledovati bazo leadov.

---

## 8. Predlagan uporabniški tok

1. Vstop na landing page.
2. Klik na CTA: **Izračunaj informativno ceno strehe**.
3. Izbira tipa projekta.
4. Vnos geometrije in tipa strehe.
5. Vnos materialov in dodatkov.
6. Vnos lokacije in izvedbenih faktorjev.
7. Upload slik.
8. Pregled vnosa.
9. Izračun rezultata.
10. Prikaz cenovnega razpona.
11. Oddaja kontakta.
12. Pošiljanje PDF povzetka.
13. Lead v admin panelu.

---

## 9. Seznam ekranov za MVP

### Ekran 1 – Landing page

**Namen:** pretvorba obiskovalca v uporabnika kalkulatorja.

Ključni elementi:
- glavni naslov,
- podnaslov,
- CTA gumb,
- kratek opis postopka v 3 korakih,
- primer informativnega rezultata,
- disclaimer, da gre za informativno ponudbo.

Predlog vsebine:
- "Informativna cena za novo streho ali rekonstrukcijo v nekaj minutah"
- "Vnesite podatke, naložite slike in prejmite okviren cenovni razpon"

### Ekran 2 – Izbira tipa projekta

Polja:
- novogradnja,
- rekonstrukcija,
- menjava kritine,
- drugo.

UI opombe:
- kartice z ikonami,
- kratka razlaga posamezne izbire.

### Ekran 3 – Osnovni podatki o objektu

Polja:
- lokacija objekta,
- vrsta objekta,
- leto gradnje,
- ali je objekt med deli naseljen.

Opombe:
- lokacija vpliva na logistični faktor,
- leto gradnje pomaga pri verjetnosti dodatnih sanacij.

### Ekran 4 – Geometrija strehe

Polja:
- tip strehe,
- dolžina objekta,
- širina objekta,
- naklon,
- dolžina napušča,
- število strešin,
- opcijsko: približna višina slemena.

UX opombe:
- ilustracije tipov streh,
- pomoč pri vnosu dimenzij,
- mini info tooltipi.

### Ekran 5 – Obstoječe stanje strehe

Polja:
- obstoječa kritina,
- ali se stara kritina odstrani,
- ali je potrebna menjava ostrešja,
- ali je potrebna nova folija,
- ali je potrebna izolacija,
- ali obstaja sum poškodb ali zamakanja.

Opombe:
- če uporabnik izbere salonit, sistem prikaže posebno opozorilo.

### Ekran 6 – Materiali in dodatni elementi

Polja:
- vrsta nove kritine,
- število strešnih oken,
- število dimnikov,
- žlebovi,
- snegolovi,
- strešne stopnice,
- obrobe,
- priprava za sončno elektrarno.

### Ekran 7 – Izvedbeni pogoji

Polja:
- dostopnost objekta,
- možnost dostave s tovornjakom,
- potreba po odru,
- zahtevnost montaže,
- oddaljenost od baze izvajalca.

Namen:
- logistika,
- strošek dela,
- varnostni pribitek,
- trajanje izvedbe.

### Ekran 8 – Nalaganje slik

Polja:
- upload fotografij,
- opis posebnosti,
- opcijsko: označi problematična mesta.

Namen:
- boljši pregled za izvajalca,
- kasnejša AI nadgradnja,
- manj nejasnosti pri povpraševanju.

### Ekran 9 – Pregled vnosa

Prikaz:
- povzetek vseh ključnih podatkov,
- možnost popravkov,
- gumb za izračun.

### Ekran 10 – Rezultat izračuna

Prikaz:
- ocenjena površina strehe,
- razpon cene materiala,
- razpon cene dela,
- dodatki,
- skupni razpon,
- vključeno / ni vključeno,
- priporočeni naslednji koraki.

CTA-ji:
- pošlji PDF,
- želim ogled,
- želim natančno ponudbo,
- pokličite me.

### Ekran 11 – Kontaktni obrazec

Polja:
- ime,
- telefon,
- email,
- termin za klic,
- dodatne opombe.

### Ekran 12 – Admin panel

Moduli:
- seznam leadov,
- podrobnosti leada,
- slike,
- ocena kalkulacije,
- ceniki,
- faktorji,
- pravila,
- osnovna analitika.

---

## 10. Podatkovni model MVP

### Entiteta: User / Lead

Polja:
- id
- full_name
- email
- phone
- consent_marketing
- created_at

### Entiteta: ProjectRequest

Polja:
- id
- lead_id
- project_type
- object_type
- location_city
- postal_code
- year_built
- inhabited_during_works
- notes
- status
- created_at
- updated_at

Statusi:
- draft
- calculated
- contact_submitted
- reviewed
- qualified
- rejected
- converted

### Entiteta: RoofGeometry

Polja:
- id
- project_request_id
- roof_type
- object_length_m
- object_width_m
- roof_pitch_deg
- eave_length_m
- ridge_height_m
- roof_planes_count
- estimated_roof_area_m2
- complexity_level

### Entiteta: ExistingRoofState

Polja:
- id
- project_request_id
- existing_cover_type
- demolition_required
- timber_replacement_required
- membrane_required
- insulation_required
- visible_damage
- asbestos_risk

### Entiteta: RoofFeatures

Polja:
- id
- project_request_id
- skylight_count
- chimney_count
- snow_guards_required
- roof_steps_required
- gutters_required
- flashing_required
- solar_prep_required
- dormer_count

### Entiteta: ExecutionFactors

Polja:
- id
- project_request_id
- site_access_level
- truck_access
- scaffolding_required
- install_difficulty_level
- distance_km
- regional_factor
- logistics_factor
- safety_factor

### Entiteta: UploadedImage

Polja:
- id
- project_request_id
- file_url
- sort_order
- uploaded_at
- ai_processed

### Entiteta: PriceCatalog

Polja:
- id
- item_code
- item_name
- category
- unit
- base_material_price
- base_labor_price
- valid_from
- active

Kategorije:
- covering
- timber
- membrane
- insulation
- guttering
- flashing
- demolition
- waste
- scaffolding
- skylight
- accessory

### Entiteta: PricingRule

Polja:
- id
- rule_name
- rule_type
- condition_json
- effect_json
- priority
- active

Rule types:
- multiplier
- fixed_add
- percentage_add
- warning
- exclusion

### Entiteta: CalculationResult

Polja:
- id
- project_request_id
- roof_area_m2
- material_cost_min
- material_cost_max
- labor_cost_min
- labor_cost_max
- extras_cost_min
- extras_cost_max
- total_cost_min
- total_cost_max
- disclaimer_text
- calculated_at

---

## 11. Logika izračuna za MVP

### 11.1 Osnovna filozofija

MVP vrne:
1. **realističen razpon**, ne ene same točke,
2. rezultat, ki temelji na pravilih,
3. jasno razlago, od kod pride cena.

Izračun je sestavljen iz:
- geometrije,
- količin,
- osnovnega cenika,
- faktorjev in pribitkov,
- razpona negotovosti.

### 11.2 Izračun površine strehe

- Enokapnica: `roof_area = object_length × effective_slope_length`
- Dvokapnica: `roof_area ≈ (object_length × object_width) / cos(pitch)`
- Štirikapnica: `roof_area ≈ plan_area × pitch_factor × hip_factor`
- Ravna streha: `roof_area = plan_area × reserve_factor`

Splošno:
- `pitch_factor = 1 / cos(pitch)`
- `hip_factor` tipično `1.05–1.15`
- `reserve_factor` tipično `1.03–1.08`
- odpad/razrez: `5–12 %`
- kompleksnost: `0–10 %`

Končna površina za cenjenje:
`priced_area = roof_area × waste_factor × complexity_factor`

### 11.3 Količine materiala

- Kritina: `cover_quantity = priced_area × covering_factor` (1.00–1.10)
- Folija: `membrane_quantity = priced_area`
- Letve/kontraletve: po m2 ali po tabelah glede na tip kritine
- Izolacija: `insulation_quantity = insulated_area × insulation_thickness`
- Žlebovi/obrobe: po dolžinah ključnih linij + po kosih
- Strešna okna: po kosu (osnovno/srednje/premium)

### 11.4 Strošek materiala

`material_cost = sum(quantity × unit_material_price)`

### 11.5 Strošek dela

`labor_cost = sum(quantity × unit_labor_price)`

Kategorije dela:
- demontaža,
- priprava podlage,
- montaža kritine,
- montaža kleparije,
- vgradnja oken,
- izolacija,
- odvoz in čiščenje.

### 11.6 Faktorji in pribitki

`adjusted_material = material_cost × regional_factor`

`adjusted_labor = labor_cost × access_factor × safety_factor × complexity_factor`

`extras = demolition + scaffolding + waste + transport + special_items`

`subtotal = adjusted_material + adjusted_labor + extras`

Primeri pravil:
- naklon > 35°: pribitek na delo,
- naklon > 45°: dodatni varnostni pribitek,
- visoka zahtevnost: +8–15 % na delo,
- slaba dostopnost: +5–12 % logistike,
- potreben oder: fiksni ali m2 dodatek,
- salonit: opozorilo + posebna obravnava.

### 11.7 Razpon cene

Scenariji:
- optimistični,
- srednji,
- konservativni.

Hevristike:
- material min/max: ±5–8 %,
- delo min/max: ±8–15 %,
- dodatki min/max: ±10–20 %.

Formula:
- `total_min = material_min + labor_min + extras_min`
- `total_max = material_max + labor_max + extras_max`

### 11.8 Vključeno / ni vključeno

Vključeno:
- demontaža stare kritine,
- nova kritina,
- nova folija,
- osnovna letvena podkonstrukcija,
- kleparski elementi,
- osnovna montaža.

Ni vključeno:
- večje statične sanacije,
- skrite poškodbe ostrešja,
- izredni transport,
- dvigalo, če ni posebej predvideno,
- nepredvidena gradbena dela.

---

## 12. Cenovni engine – priporočena arhitektura

### A. Input normalizer
- validacija vhodnih podatkov,
- pretvorba v standardne enote,
- preverjanje manjkajočih podatkov.

### B. Geometry calculator
- izračun površine,
- dolžine kapov,
- dolžine slemena,
- osnovna ocena količin.

### C. Pricing engine
- cenik,
- pravila,
- faktorji,
- scenariji min/mid/max.

---

## 13. Validacije v obrazcu

Obvezna polja:
- tip projekta,
- tip strehe,
- osnovne dimenzije,
- lokacija,
- tip kritine ali obstoječe stanje,
- vsaj en kontakt ob zaključku.

Pametne validacije:
- pri rekonstrukciji pokaži polja obstoječega stanja,
- pri ravni strehi skrij nekatere elemente,
- če je strešnih oken > 0, prikaži dodatne opcije,
- omogoči približne vrednosti, če ni natančnih mer.

---

## 14. Admin panel – MVP zahteve

- **Leads:** seznam, statusi, lokacije, datum, vrednost ocene.
- **Lead detail:** vsi podatki, slike, rezultat, interne opombe, sprememba statusa.
- **Price catalog:** dodajanje/urejanje cen materiala in dela, veljavnost po datumih.
- **Pricing rules:** seznam pravil, vklop/izklop, prioriteta, opis učinka.
- **Analytics:** št. izračunov, povprečen razpon, stopnja oddaje kontakta, top lokacije, top tipi streh.

---

## 15. Priporočena tehnična arhitektura

### Frontend
- Next.js
- React
- Tailwind CSS
- komponentni wizard obrazec

### Backend
- Supabase (Postgres, Auth, Storage, Edge Functions)

### PDF in email
- generiranje PDF povzetka,
- email po oddaji,
- možnost pošiljanja leadov izvajalcu.

### Kasnejše nadgradnje
- AI vision,
- geolokacija / maps,
- povezava s CRM,
- napredni kalkulator po postavkah,
- mobilna verzija za terenski ogled.

---

## 16. KPI-ji za MVP

Produktni KPI:
- completion rate obrazca,
- čas do rezultata,
- stopnja oddaje kontakta,
- povprečno št. slik na lead,
- delež uporabnikov, ki popravijo vnos po preview zaslonu.

Poslovni KPI:
- cena pridobljenega leada,
- delež kvalificiranih leadov,
- delež leadov za ogled,
- delež leadov, ki konvertirajo v ponudbo.

---

## 17. Roadmap po fazah

### Faza 1 – MVP
- wizard obrazec,
- osnovni pricing engine,
- admin panel,
- upload slik,
- PDF povzetek,
- lead management.

### Faza 2 – Pametnejša pomoč
- predizpolnjevanje iz slike,
- priporočila za tip strehe,
- predlog dodatnih del,
- primerjava 2–3 variant.

### Faza 3 – Profesionalno orodje
- večnivojski ceniki,
- več izvajalcev/ekip,
- ponudba po postavkah,
- obračuni,
- vodenje projekta.

---

## 18. Kaj razviti najprej – konkretni vrstni red

1. Pripravi Excel/JSON model cenika in pravil.
2. Definiraj vse inpute obrazca in obveznost.
3. Zgradi geometry calculator za 4 tipe streh.
4. Zgradi pricing engine min/mid/max.
5. Naredi wizard UI.
6. Shrani lead + rezultat + slike.
7. Dodaj PDF povzetek in admin panel.

---

## 19. Predlog sprint plana

### Sprint 1
- struktura podatkov,
- cenik model,
- wireframe,
- osnovni wizard.

### Sprint 2
- kalkulator geometrije,
- pricing engine,
- validacije obrazca,
- prikaz rezultata,
- kontaktni obrazec.

### Sprint 3
- upload slik,
- PDF generator,
- admin pregled leadov,
- osnovna analitika.
