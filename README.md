# TuMi Mundo

Een innovatieve aanpak om taalontwikkeling bij kinderen te ondersteunen door middel van wetenschappelijke en technologische vooruitgang. Dit project richt zich op het verbeteren van moedertaal- en andere taalvaardigheden bij jonge kinderen door middel van een webapplicatie of mobiele website.

![Project Logo](https://github.com/fdnd-agency/tumi-mundo/assets/61702002/6c04d95e-f4ea-480d-9e86-cbf9148e8e15)

## Inhoudsopgave

1. [Introductie](#introductie)
2. [Kenmerken](#kenmerken)
3. [Screenshots](#screenshots)
4. [Live Link](#live-link)
5. [Teamleden](#teamleden)
6. [Technische stack](#technische-stack)
7. [Tools](#tools)
8. [Installatiehandleiding](#installatiehandleiding)
9. [Belangrijke scripts](#belangrijke-scripts)
10. [Huisstijl](#huisstijl)
11. [Bijdragen](#bijdragen)
12. [Versies](#versies)
13. [Hints voor volgende teams](#hints-voor-volgende-teams)
14. [Gebruikte Bronnen](#gebruikte-bronnen)
15. [Badges](#badges)
16. [Link naar Projectboard](#link-naar-projectboard)
17. [Licentie](#licentie)

## Introductie

Door de wetenschappelijke en technologische vooruitgang is er steeds meer inzicht in het proces van taalontwikkeling bij kinderen. Deze inzichten, gecombineerd met technologische mogelijkheden, bieden een grote toegevoegde waarde in het ondersteunen van ouders en kinderen bij hun taalontwikkeling. Dit project richt zich specifiek op:

- Het benutten van de voordelen van tweetalige opvoeding, zoals:
  - Verhoogde complexiteit van de taalstructuur.
  - Verbeterde hersenflexibiliteit, met voordelen voor de geestelijke gezondheid.
  - Verbeterde sociale vaardigheden en inlevingsvermogen.

Bovendien worden deze inzichten nog niet op grote schaal toegepast als ontwikkelings- of leermethode voor baby’s en zeer jonge kinderen.

## Kenmerken

- Ondersteunt ouders en kinderen bij taalontwikkeling.
- Focus op tweetaligheid vanaf jonge leeftijd.
- Taalverhalen en aandachtstestjes.
- Data-analysemogelijkheden voor onderzoekers.
- Gebruiksvriendelijke interface.

## Screenshots

![image](https://github.com/user-attachments/assets/6061a488-ad97-45c5-b6ab-b1bd8104b7d5)


## Live Link

[Bekijk de applicatie live](https://tumimundo.agency.fdnd.nl/)

## Teamleden
 ### Actief
- Lemuel Magsino - Frontend Developer [github](https://github.com/lemuelmgsn)
- Marjam Lodien - Backend Developer [github](https://github.com/marjamlodien)
- Roumaisa El Filali - Backend Developer [github](https://github.com/roumaisaHVA))
- Mamush Hepark - UX/UI Designer [github](https://github.com/Mamush123454321)

### Inactief
- Jesse Kramer - Frontend Developer [github](https://github.com/Jesse-Kramer)

## Technische stack

- **Framework:** SvelteKit  
- **Headless CMS:** Directus  
- **Package manager:** NPM  
- **Bundler:** Vite  
- **Programmeertalen:** HTML, CSS, JavaScript  

## Tools

- [svgomg](https://svgomg.net)  
- [Web Developer Extension](https://chrispederick.com/work/web-developer/)  
- [Polypane](https://polypane.app)  
- [Figma](https://figma.com) *(voor ontwerp en UI-uitwerking)*


## Installatiehandleiding

Volg deze stappen om de applicatie lokaal te installeren:

```bash
# Clone de repository
git clone https://github.com/Jesse-Kramer/tumi-mundo.git

# Installeer afhankelijkheden
npm install

# Start de applicatie
npm start
```

## Belangrijke scripts

- `npm run dev` - Start de applicatie in ontwikkelmodus.
- `npm run build` - Bouwt de applicatie voor productie.
- `npm run preview` - Start een lokale preview van de productie-build.

## Huisstijl

De huisstijlrichtlijnen zijn beschikbaar in het Figma-bestand:

Oud: [Huisstijl in Figma](https://www.figma.com/file/RDlD4etdXBvcOW9AAqueBz/TuMiMundo_FDND_Prototype?type=design&node-id=0%3A1&mode=design&t=3z8nbpTxTLvGHUIm-1)

Nieuw (gemaakt door @Mamush123454321) : [Redesign Huisstijl](https://www.figma.com/design/IvOZLsH7kHegNh19OEtsSS/Mamush-Tumi-Mundo?node-id=0-1&t=1RRQ9lwK8olUps9P-1)

 # Bijdragen  
  
 Contributies aan dit project zijn welkom! Volg deze stappen om bij te dragen:  
  
 1. Fork de repository.  
 2. Maak een nieuwe branch (`git checkout -b feat/onderdeel-naam`).  
 3. Commit je wijzigingen met een [conventional commit](https://www.conventionalcommits.org/) bericht. Gebruik het volgende formaat:  
  
    `<type>[optional scope]: <korte beschrijving> [optional gitmoji] #issue-nummer`  
  
    **Voorbeelden:**  
    - `feat: voeg live transcript toe  #42`  
    - `fix: corrigeer verkeerde tijdcode in transcript  #45`  
    - `refactor: onnodige css regels verwijderd  #12`  
    - `chore: update dependencies #50`  
  
    **Let op:** het refereren van een issue is verplicht (`#issue-nummer`).  
  
 4. Commit regelmatig   
 5. Push naar je branch (`git push origin feat/onderdeel-naam`).  
 6. Maak een Pull Request en beschrijf duidelijk wat er is veranderd en waarom.  
  
 > We hanteren Semantic Versioning en gebruiken Conventional Commits om versies automatisch te kunnen genereren en overzicht te houden in wijzigingen.


## Versies

We werken op dit project met de onderstaande versies:

```json
  "devDependencies": {
    "@fast-check/vitest": "^0.2.0",
    "@playwright/test": "^1.51.1",
    "@sveltejs/adapter-auto": "3.2.*",
    "@sveltejs/adapter-netlify": "^5.0.2",
    "@sveltejs/kit": "^2.21.2",
    "@sveltejs/vite-plugin-svelte": "3.0.*",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/svelte": "^5.2.7",
    "@types/node": "^22.13.16",
    "fast-check": "^4.0.1",
    "jsdom": "^26.0.0",
    "playwright": "^1.51.1",
    "svelte": "4.2.*",
    "vite": "5.0.*",
    "vitest": "^3.1.1"
  },
  "type": "module",
  "dependencies": {
    "@directus/sdk": "17.0.*",
    "bcryptjs": "^3.0.2",
    "form-data": "^4.0.2",
    "undici": "^7.7.0"
  }
```


## Hints voor volgende teams

- Zorg voor duidelijke documentatie bij nieuwe functies.
- Test nieuwe features grondig op verschillende apparaten.
- 

## Gebruikte Bronnen

- [Figma](https://www.figma.com/)
- [Svelte docs](https://svelte.dev/)
- [Svelte view transitions](https://svelte.dev/blog/view-transitions)
- [Github/Briannededeugd](https://github.com/briannededeugd/tumimundo/)
- [Vercel](https://vercel.com/)
- [Chatgpt](https://chat.openai.com)
- [Netlify](https://www.netlify.com/)

## Badges

![Node.js](https://img.shields.io/badge/Node.js-v16-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Svelte](https://img.shields.io/badge/Svelte-v4-orange)


## Link naar Projectboard

[Bekijk het projectboard](https://github.com/orgs/fdnd-agency/projects/53)

## Licentie

Dit project is gelicenseerd onder de MIT-licentie. Zie het bestand [LICENSE](LICENSE) voor meer informatie.



[Design](https://www.figma.com/file/RDlD4etdXBvcOW9AAqueBz/TuMiMundo_FDND_Prototype?type=design&node-id=0%3A1&mode=design&t=3z8nbpTxTLvGHUIm-1) 

