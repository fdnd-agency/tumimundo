# Handover Documentatie

## Introductie

Dit document heeft als doel de volgende groep in te leiden in het project en hen te voorzien van de nodige informatie voor een soepele voortzetting van het werk.

## Huidige Status

Het project is momenteel in de **ontwikkelingsfase**. De meeste basisfunctionaliteiten zijn geïmplementeerd en getest, maar er zijn nog enkele openstaande taken en verbeteringen die aandacht nodig hebben.

## Belangrijkste Features die Werken

- **Inlog Systeem**: Het inlogsysteem werkt door met **test@test.com** in te loggen met als wachtwoord: **Test**. De loginfunctie controleert of de ingevoerde e-mail en wachtwoord overeenkomen met een bestaande gebruiker in de `users` array. Als de gegevens correct zijn, wordt de gebruiker doorgestuurd naar de profielselectiepagina, anders verschijnt er een foutmelding.

- **Popup**: De pop-up toont een dynamisch bericht (standaard "Goodmorning, Shall we start with a story?") en biedt de gebruiker de optie om de pop-up te sluiten of verder te gaan naar de lespagina. De titel en het bericht kunnen via de `title` en `message` props worden aangepast.

- **Liked Playlist**: Deze code beheert de "like" functie voor een afspeellijst, waarbij een gebruiker een afspeellijst kan liken of unliken. Bij het klikken op de hartknop wordt een verzoek gestuurd naar de server om de like toe te voegen of te verwijderen, afhankelijk van de huidige status, en wordt de weergave van het hart-icoon bijgewerkt.

- **Search (Languages)**: Deze Svelte-component filtert client-side de data op basis van de zoekterm en verzendt de gefilterde resultaten naar de bovenliggende component. Het formulier biedt een server-side fallback voor zoekopdrachten, met responsieve stijlen voor kleine schermen.

- **Carousel**: De carousel zorgt voor horizontaal scrollen door een lijst van verhalen, met knoppen "Vorige" en "Volgende" om te navigeren. De functie `scrollCarousel()` past de scrollpositie aan op basis van de breedte van de lijst.

- **Menu**: De menu code is een navigatiebalk in de footer van de website, met verschillende links die kunnen worden geactiveerd. De actieve link wordt gemarkeerd met een blauwe kleur en een onderstreping. Het `currentPage`-prop wordt gebruikt om de actieve pagina te bepalen en een specifieke styling toe te passen op het bijbehorende item in de navigatie. Het bevat iconen en tekst voor de secties "Home", "Testing", "Lessons", "Statistics" en "Profile".

## Aandachtspunten of Uitdagingen

- **Responsiviteit**: Er zijn enkele kleine problemen met de responsiviteit van een paar paginas die aandacht vereisen.

## Aanbevolen Eerste Stappen voor het Volgende Team

- **Stap 1**: Test en verfijn de **responsiviteit** van de carousel op grotere schermen om een betere gebruikerservaring te garanderen.

We raden aan om regelmatig te communiceren met het vorige team voor verdere verduidelijkingen en om eventuele misverstanden te vermijden.
