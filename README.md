# functional-programming en frontend-data

[Link naar project](https://goofy-galileo-4aec17.netlify.app/)

## De Volkskrant

Voor de Volkskrant zullen we het parkeren in Nederland onderzoeken en waardevolle data verzamelen en daar digitaal interactieve visualisaties van te maken die journalisten en onderzoekers kunnen gebruiken als interessante onderwerpen.

## Hoofdvraag

### Wat gebeurt er met de betalingsmethodes, als de verkooppunten stijgen/dalen?

De wereld is continu in verandering. Technologisering zorgt ervoor dat we steeds op makkelijkere manieren kunnen betalen voor diensten. Dit heeft ook gevolgen op de verkooppunten van de parkeergarage. Tegenwoordig is het zelfs mogelijk om je mobiel te scannen op het moment dat je in een garage rijdt. Daalt het aantal verkooppunten in Nederland door technologisering? En zijn er steeds minder plekken waar we contant kunnen betalen?

## Deelvragen

-   Hoeveel verkooppunten zijn er op nu ten opzichte van vijf jaar geleden?

Om antwoord te kunnen geven op de vraag moeten we eerst in kaart brengen wat het aantal verkooppunten is in Nederland op dit moment en of er sprake is van een stijging of een daling.

-   Welke betalingsopties kennen we in Nederland?

Het is belangrijk om te weten welke betalingsopties we op dit moment kennen in Nederland zodat we kunnen kijken naar welke betalingsopties wellicht zijn verdwenen en welke nieuwe betalingsopties we hebben gekregen.

-   Welke verkooppunten hebben deze nieuwe betalingsopties?

Het is interessant om in kaart te brengen welke steden gebruik maken van de nieuwste betalingsopties. Zijn er steden die op dit gebied nog achterlopen op de rest?

-   Welke betalingsopties zijn verminderd ten opzichte van vijf jaar geleden?

Het is interessant om in kaart te brengen welke betalingsopties zijn verminderd of misschien zelfd verdwenen? Wordt het steeds lastiger om contant te betalen voor het parkeren? Of verdwijnt het betalen met creditcard juist?

## Variabelen

Om deze vragen te beantwoorden zal ik de [Open Data Parkeren: VERKOOPPUNT](https://opendata.rdw.nl/d/fk68-nf2y/visualization) en de [Open Data Parkeren: BETAALMETHODE VERKOOPPUNT](https://opendata.rdw.nl/d/j96a-7nhx/visualization) gebruiken.

#### Open Data Parkeren: VERKOOPPUNT

Deze dataset heeft de volgende relevante variabelen

-   StartDateSellingPoint (Datum vanaf wanneer een verkooppunt actief is)
-   EndDateSellingPoint (Datum vanaf wanneer een verkooppunt niet meer actief is)
-   SellingPointDesc (Omschrijving van een verkooppunt)

#### Open Data Parkeren: BETAALMETHODE VERKOOPPUNT

Deze dataset heeft de volgende relevante variabelen

-   PaymentMethod (Betaal methode die gebruikt kan worden voor het betalen van parkeren)
-   StartDatePaymentMethod (Begindatum van een periode waarin de betalingsmogelijkheid geldig is)
-   EndDatePaymentMethod (Einddatum van een periode waarin de betalingsmogelijkheid geldig is)
-   SellingPointNumber (Identificatie van een verkooppunt)

## Verwachtingen

Mijn hypothese is dat er stijging te zien zal zijn in het digitaal parkeren en een daling in het cash betalen.

# Installation

Dependencies

```json
  "devDependencies": {
    "@rollup/plugin-commonjs": "^14.0.0",
    "@rollup/plugin-node-resolve": "^8.0.0",
    "@rollup/plugin-typescript": "^6.0.0",
    "@tsconfig/svelte": "^1.0.0",
    "@types/d3": "^6.1.0",
    "@types/d3-array": "^2.7.0",
    "@types/d3-axis": "^2.0.0",
    "@types/d3-scale": "^3.2.1",
    "@types/d3-selection": "^2.0.0",
    "@types/d3-zoom": "^2.0.0",
    "@types/geojson": "^7946.0.7",
    "@types/topojson": "^3.2.2",
    "@typescript-eslint/eslint-plugin": "^4.8.1",
    "@typescript-eslint/parser": "^4.8.1",
    "eslint": "^7.13.0",
    "eslint-config-airbnb-typescript": "^12.0.0",
    "eslint-config-prettier": "^6.15.0",
    "eslint-plugin-eslint-comments": "^3.2.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-svelte3": "^2.7.3",
    "prettier": "^2.2.0",
    "rollup": "^2.3.4",
    "rollup-plugin-livereload": "^2.0.0",
    "rollup-plugin-svelte": "^6.0.0",
    "rollup-plugin-terser": "^7.0.0",
    "svelte": "^3.0.0",
    "svelte-check": "^1.0.0",
    "svelte-preprocess": "^4.0.0",
    "tslib": "^2.0.0",
    "typescript": "^3.9.3"
  },
  "dependencies": {
    "d3": "^6.2.0",
    "d3-composite-projections": "^1.4.0",
    "sirv-cli": "^1.0.0",
    "svelte-routing": "^1.4.2",
    "topojson": "^3.0.2"
  }
```

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
