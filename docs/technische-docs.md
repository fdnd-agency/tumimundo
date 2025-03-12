# Technische Documentatie

## Projectstructuur
De codebase is georganiseerd in een logische structuur waarbij de belangrijkste functionaliteiten in aparte modules zijn ondergebracht:

- **`$lib/directus.js`**: Bevat de configuratie en instantie van Directus CMS.
- **`$lib/index.js`**: Bevat herbruikbare componenten.

## Belangrijke Componenten

### `fetchCollection(fetch, collectionName)`
Deze functie haalt gegevens op uit een specifieke collectie binnen het Directus CMS.

**Werking:**
1. Initialisatie van een Directus instantie.
2. Aanroep van de `readItems` functie om de opgegeven collectie op te halen.

### `fetchAllData(fetch)`
Haalt alle benodigde gegevens op in een enkele asynchrone operatie.

**Collecties:**
- `tm_users`, `tm_profile`, `tm_profile_statistics`, `tm_buddy`, etc.

### `retrieveFromAssets(url)`
Maakt een volledige URL aan voor assets op basis van de opgegeven bestandsnaam.

### `mapStoriesWithDetails(stories, audios, languages)`
Koppelt audio- en taalgegevens aan verhalen en verrijkt ze met aanvullende details zoals playtime en afbeeldingen.

### `mapPlaylistsWithDetails(playlists, stories, playlistStories)`
Verbindt verhalen met afspeellijsten en berekent de totale afspeeltijd.

### `mapProfilesWithImages(profiles)`
Voegt afbeeldingen toe aan profielen, waarbij standaard avatars worden gebruikt indien nodig.

## CMS Configuratie

### Contenttypes en instellingen
Het Directus CMS beheert meerdere contenttypes, waaronder:
- **`tm_users`**: Bevat gebruikersgegevens.
- **`tm_profile`**: Bevat profielinformatie.
- **`tm_story`**: Opslag van verhaalinformatie.

De koppeling met de front-end gebeurt via de `fetchCollection` en `fetchAllData` functies die REST API-aanroepen doen naar de Directus backend.

## API Documentatie
Indien er externe API's worden gebruikt, worden ze opgehaald via:

- **`PUBLIC_APIURL`**: Bevat de API-basis-URL.
- Gebruik van Directus SDK voor data-ophalen (`readItems`).

### Endpoints en voorbeeldaanroepen:

Voorbeeld:
```js
fetchCollection(fetch, 'tm_users')
  .then(data => console.log(data));
```

Dit haalt alle gebruikersgegevens op uit de Directus-collectie `tm_users`.

## Front-end Implementatie

De front-end gebruikt Svelte componenten zoals:

- **`Story.svelte`**: Weergave van individuele verhalen.
- **`Playlist.svelte`**: Toont afspeellijsten.
- **`Menu.svelte`**: Navigatiemenu-component.
- **`Continue-btn.svelte`**: Dynamische continue button
- **`Header.svelte`**: Bevat het navigatiemenu met actieve paginatoestand.
- **`InputField.svelte`**: Dynamische invoervelden voor tekst, e-mail en wachtwoord.
- **`Search.svelte`**: Bevat zoekfunctionaliteit met filterevents.
- **`Popup.svelte`**: Bevat popup voor home scherm


De belangrijkste functionaliteiten zijn:

1. **Scrollfunctionaliteit:**
   - `scrollCarousel(direction)` maakt het mogelijk om horizontaal door de verhalen te scrollen.
2. **Filtering:**
   - Taalfilters worden toegepast met checkboxes en JavaScript-events.
3. **Navigatie:**
   - Actieve pagina wordt dynamisch gemarkeerd met behulp van de `currentPage` variabele.

## Stijlen en Thema

De stijlen zijn gedefinieerd in een CSS-bestand en maken gebruik van custom properties (`:root`) voor consistentie in:

- **Kleuren:** `--color-text-light`, `--color-text`
- **Marges:** `--space-md`, `--space-lg`
- **Afmetingen:** `--border-radius`, `--font-size-lg`

Responsiviteit wordt bereikt via media queries en flexbox/grid lay-outsystemen.

