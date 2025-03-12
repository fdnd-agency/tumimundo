# CONTRIBUTING.md

Welkom bij ons project! Hieronder vind je richtlijnen voor het bijdragen aan de codebase en workflow.

---

## Branch Conventies

- Gebruik de naamgeving: `feature/[naam]` voor nieuwe features.
- Gebruik `bugfix/[naam]` voor bugfixes.
- Zorg ervoor dat de branch-naam kort en duidelijk is.

---

## Commit Richtlijnen

- **Opmaak:** Begin commitberichten met een hoofdletter en zonder leestekens aan het einde.
- **Stijl:** Gebruik de imperatieve vorm, bijvoorbeeld `Add header animation`.
- **Labels:** Gebruik een format zoals `[Initialen] - [Label] [Korte beschrijving]`.
- **Toegestane labels:**
  - `Added` voor nieuwe features.
  - `Changed` voor wijzigingen.
  - `Removed` voor verwijderingen.
  - `Undo` en `Redo` voor wijzigingen herstellen.
  - `Clean-up` voor opschoning van de code.

**Goede commit voorbeelden:**
```bash
$ git commit -m 'JK - Added header styles'
$ git commit -m 'ES - Changed footer links'
$ git commit -m 'AB - Clean-up unused variables'
```

---

## Pull Request Richtlijnen

- Voeg een duidelijke titel toe die de wijziging beschrijft.
- Beschrijf kort de veranderingen in de pull request.
- Vermeld relevante opmerkingen of aanvullende uitleg.
- Pull requests worden beoordeeld door minimaal één teamlid.
- Laat foto's zien van het resultaat

**Pull request checklist:**
- [ ] Code is getest.
- [ ] Geen ongebruikte bestanden of code.
- [ ] Code volgt de afgesproken conventies.

---

## Code Conventies

### HTML

- **Semantisch:** Gebruik semantische HTML-elementen voor betere toegankelijkheid.
- **Herbruikbare Componenten:** Zorg voor consistente componenten.
- **Indentatie:** Gebruik 1 tab per niveau.
- **Attributen:** Dubbele aanhalingstekens voor attributen.
- **Gebruik HTML-functionaliteiten:** Maak gebruik van ingebouwde functies zoals formulier-validatie.

```html
<!-- ✅ Correct gebruik van semantische tags -->
<section id="about-section">
  <h2>About Us</h2>
  <p>Welcome to our website!</p>
</section>
```

---

### CSS

- **Naamgeving:** Gebruik kebab-case voor klassen en ID's.
- **Nesting:** Gebruik nesting voor een duidelijke structuur.
- **Variabelen:** Gebruik CSS-variabelen (custom properties) voor stijlbeheer.
- **Indentatie:** Gebruik 1 tab voor inspringingen.
- **Breekpunten:** Gebruik container queries voor breedte-gebaseerde aanpassingen.

```css
:root {
  --primary-color: #3498db;
}

.header {
  background-color: var(--primary-color);
  padding: 1rem;
}
```

---

### JavaScript

- **Naamgeving:** Gebruik camelCase voor variabelen en functies.
- **Moderne Syntax:** Gebruik `const` en `let`, vermijd `var`.
- **Commentaar:** Voeg nuttige comments toe.
- **Indentatie:** Gebruik 1 tab per niveau.
- **Strings:** Gebruik enkele aanhalingstekens.

```js
// ✅ Moderne syntax en duidelijke namen
const initializeApp = () => {
  console.log('App initialized');
};

initializeApp();
```

---

## Workflow

- **Commit Early, Push Once a Day:**
  - Commit regelmatig.
  - Push eenmaal per dag naar de `release-candidate` branch.
- **Samenwerken:** Vraag hulp indien nodig.
- **Clean Code:** Zorg voor overzichtelijke code.
- **Engels:** Gebruik Engelse naamgevingen.

---


