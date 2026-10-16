# Letters from Sarajevo — Astro

Static migration of the existing Jekyll website. This first phase includes the
shared layout, all four translated homepages, styles, and homepage assets.
Letters and about links still point to the existing live websites.

## Development

Use Node 22.22 or newer (`nvm use` uses this folder's `.nvmrc`), then run
`npm install`.

```sh
npm run dev -- --background
```

Local homepages are English at `/`, Serbian at `/sr/`, Russian at `/ru/`, and
Brazilian Portuguese at `/pt-br/`. `/en/` redirects to `/`.

Manage the background server with `npm run astro -- dev status`,
`npm run astro -- dev logs`, and `npm run astro -- dev stop`.

## Builds

| Command | Output | Website |
| --- | --- | --- |
| `npm run build` | `dist/international/` | lettersfromsarajevo.com |
| `npm run build:sr` | `dist/serbian/` | pismaizsarajeva.com |
| `npm run preview` | Preview international build | localhost |
| `npm run preview:sr` | Preview Serbian build | localhost |

The international build has English at `/`, Russian at `/ru/`, and Portuguese
at `/pt-br/`; `/sr/` redirects to the Serbian domain. The Serbian build has
Serbian at `/`; `/sr/` redirects to `/`, and the other language prefixes redirect
to the international domain. Production language links work across both domains.
These are static HTML redirects; permanent HTTP redirects can be added at the
hosting layer when deployment is configured.

Deploy each output directory to its corresponding domain. The builds do not
modify source files, and neither build clears the other's output.

## Editing

- `src/i18n/*.json`: translated labels and homepage copy. Every locale uses the
  same keys; `index.ts` defines the language type, domains, and URL helpers.
- `src/layouts/BaseLayout.astro`: shared HTML, metadata, navigation, and footer.
- `src/components/Home.astro`: shared homepage markup.
- `src/pages/[...locale].astro`: static homepages and language aliases.
- `src/styles/`: original global SCSS, compiled by Astro. Sass modules replace
  legacy imports, with native focus rings and dynamic viewport height.
- `public/img/`: homepage images, language flags, and favicons, served at `/img/`.

The language selector uses native HTML details/summary, including without
JavaScript. A small script closes it on Escape, focus leaving, or outside clicks.
Translation strings are rendered as text except the existing trusted license
HTML in `footerCopyright`.

For the next phase, migrate the letter layouts and content, then replace live
letter/about URLs with local routes as those pages become available.
