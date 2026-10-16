# Letters from Sarajevo — Astro

Static migration of the existing Jekyll website. Homepages, five illustrated
letters, five replies, the epilogue, and About pages are available in all four
languages. Each build includes a custom 404 page and Netlify routing rules.

## Development

Use Node 26.7 or newer (`nvm use` uses this folder's `.nvmrc`), then run
`npm install`.

```sh
npm run dev -- --background
```

Local homepages are English at `/`, Serbian at `/sr/`, Russian at `/ru/`, and
Brazilian Portuguese at `/pt-br/`. `/en/` redirects to `/`.
Reading pages retain their localized paths, such as `/en/letter-one/` and
`/sr/prvo-pismo/`. All four languages are available locally. Language switching
on a reading page opens the corresponding translation of that entry.
About pages are `/en/about/`, `/sr/o-knjizi-i-sajtu/`,
`/ru/o-knige-i-sayte/`, and `/pt-br/sobre/`. Their language selector opens the
corresponding About translation. About pages are outside the reading sequence.

Manage the background server with `npm run astro -- dev status`,
`npm run astro -- dev logs`, and `npm run astro -- dev stop`.

## Builds

| Command              | Output                                           | Website                 |
| -------------------- | ------------------------------------------------ | ----------------------- |
| `npm run build`      | `dist/international/`                            | lettersfromsarajevo.com |
| `npm run build:sr`   | `dist/serbian/`                                  | pismaizsarajeva.com     |
| `npm run preview`    | Preview international build                      | localhost               |
| `npm run preview:sr` | Preview Serbian build                            | localhost               |
| `npm run check`      | Validate content and Astro/TypeScript components | —                       |

The international build has English at `/`, Russian at `/ru/`, and Portuguese
at `/pt-br/`; `/sr/` redirects to the Serbian domain. The Serbian build has
Serbian at `/`; `/sr/` redirects to `/`, and the other language prefixes redirect
to the international domain. Reading pages for English, Russian, and Portuguese
are emitted by the international build; Serbian reading pages are emitted by
the Serbian build. Production language links work across both domains.
Astro emits static HTML homepage redirects for previews. The generated
Netlify `_redirects` file makes these permanent HTTP redirects in deployment.

Deploy each output directory to its corresponding domain. The builds do not
modify source files, and neither build clears the other's output.

## Netlify deployment and 404 pages

Configure two Netlify sites connected to this repository, both with base
directory `astro` and Node 22.22 or newer:

| Domain                  | Build command      | Publish directory (relative to base) |
| ----------------------- | ------------------ | ------------------------------------ |
| lettersfromsarajevo.com | `npm run build`    | `dist/international`                 |
| pismaizsarajeva.com     | `npm run build:sr` | `dist/serbian`                       |

Every build writes `_redirects` into its own output directory using the
`astro:build:done` hook in `astro.config.mjs`. Upload the entire output,
including this file. Edit the hook rather than the generated file. No server
adapter or JavaScript is required for error-page localization.

`src/pages/404.astro` renders English for the international build and Serbian
for the Serbian build, both at `/404.html`. `src/pages/[lang]/404.astro` emits
translated error pages at `/{lang}/404/`. Netlify's unforced language-prefix
rules serve these pages for missing URLs with an actual **404** response;
the final rule serves the build's default `/404.html`. Existing pages and
assets take priority over these fallbacks. Home, first-letter, footer, and
language-selector links use the appropriate local paths or production domains.
Error pages have `noindex` metadata.

Astro preview can check the built default error page, but it does not apply
Netlify's `_redirects` rules. Test routing with Netlify CLI's static server:

```sh
netlify dev --dir dist/international --offline --framework '#static' --no-open --port 8888
# In another terminal:
curl -i http://localhost:8888/missing-page
curl -i http://localhost:8888/ru/missing-page
curl -I http://localhost:8888/en/about.html
```

Stop that preview, then repeat with `--dir dist/serbian` to check the Serbian build. Missing URLs must
return 404 with translated content; the legacy About URL must return 301 to
its trailing-slash path. Check these responses again on the deployed domains.
Netlify documents [custom 404 rules and file shadowing](https://docs.netlify.com/manage/routing/redirects/redirect-options/#custom-404-page-handling).

## Legacy URLs and redirects

The audit of Jekyll filenames and front matter found that all 44 reading slugs
and all four About slugs are preserved. Jekyll emitted `.html` pages while its
links used extensionless paths; Astro emits directories with `index.html`.

| Legacy URL                                            | Destination / handling                                                                                |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `/en/about.html`                                      | `/en/about/`                                                                                          |
| `/sr/o-knjizi-i-sajtu.html`                           | `/sr/o-knjizi-i-sajtu/` on the Serbian site                                                           |
| `/ru/o-knige-i-sayte.html`                            | `/ru/o-knige-i-sayte/`                                                                                |
| `/pt-br/sobre.html`                                   | `/pt-br/sobre/`                                                                                       |
| `/{lang}/{reading-slug}.html`                         | Same slug with a trailing slash, for every reading page emitted by that build                         |
| Extensionless About/reading URLs                      | Netlify's directory/Pretty URL handling serves the same page; canonical URLs include a trailing slash |
| International `/en`, `/en/`, `/en/index.html`         | `/`                                                                                                   |
| International `/sr`, `/sr/`, `/sr/index.html`         | `https://pismaizsarajeva.com/`                                                                        |
| Serbian `/sr`, `/sr/`, `/sr/index.html`               | `/`                                                                                                   |
| Serbian English, Russian, Portuguese homepage aliases | Corresponding international homepage                                                                  |
| `/public/img/*`                                       | `/img/:splat` for files retained in `public/img/`                                                     |
| `/404.html`                                           | Preserved on both sites                                                                               |

The `.html`, homepage, and image redirects above are generated as HTTP 301
rules. Homepage rules are forced because Astro also emits files at those
aliases. Error fallbacks are last and unforced. Avoid adding an extensionless
redirect to the same trailing-slash path: Netlify normalizes slashes when
matching rules, which can cause a redirect loop.

Possible additional redirects, if access logs or indexed links show a need:
known reading/About URLs requested on the wrong domain should redirect to
that language's canonical domain. In particular, the legacy Serbian Jekyll
configuration did not exclude `pt-br`, so check for duplicate Portuguese
pages on that domain and redirect any retained URLs to the international site.
`/{lang}/{slug}/index.html` and
`/index.html` can be normalized to their directory URLs. Do not add blanket
language-prefix redirects before the localized 404 rules, since unknown URLs
should still return 404. Old `/public/assets/*` bundles and unused legacy
images are not migrated; retain specific files if external references need them.

## Editing

- `src/i18n/*.json`: translated labels and homepage copy. Every locale uses the
  same keys; `index.ts` defines the language type, domains, and URL helpers.
- `src/layouts/BaseLayout.astro`: shared HTML, metadata, navigation, and footer.
- `src/components/Home.astro`: shared homepage markup.
- `src/pages/[...locale].astro`: static homepages and language aliases.
- `src/pages/[lang]/[slug].astro`: reading and About pages, filtered by build target.
- `src/content/about/{lang}.md`: About prose and image descriptions, copied
  from the legacy Markdown sources. Keep ordinary Markdown for prose and
  Markdown image syntax inside HTML wrappers for styled image groups, plus
  simple HTML for the signature. Relative image paths resolve into `src/assets/`
  and Astro generates their dimensions. `lang`, `slug`, and
  `title` are required; slugs must match `aboutLink` in the locale labels.
  The shared route renders these pages with `BaseLayout` and existing `.About`
  styles; `src/lib/about.ts` validates translations and supplies language links.
- `src/content/letters/{lang}/letter-*.yaml`: illustrated letter content, including
  text, images, alt text, and the language-specific ordering of illustrated words.
  Image paths are relative to each YAML file (for example,
  `../../../assets/letter-01/01.png`). The schema uses Astro's `image()` helper
  to validate files and supply image metadata to the letter components.
- `src/components/letters/`: five shared letter compositions and their small
  illustration helpers. Layout markup is shared across languages.
- `src/content/replies/{lang}/*.md`: reply and epilogue prose. Reply dates belong
  in the `date` front matter field. Dates are display strings, kept as translated.
- `src/layouts/ReplyLayout.astro`: renders the date above the prose, then the
  signature from the locale's `replySignature` translation. Epilogues receive
  neither date nor signature. The Portuguese reply-one footnote is preserved
  in front matter and displayed below the signature, with working return links.
- `src/lib/reading-order.ts`: the single reading sequence, using stable keys
  such as `letter-1`, `reply-1`, and `epilogue`.
- `src/lib/book.ts`: derives previous/next navigation, translated-page links,
  and canonical URLs. Builds reject duplicate routes or missing translations.
- `src/content.config.ts`: Astro's built-in Markdown/YAML collections and their
  validation schemas. No MDX or custom Markdown plugins are used.
- `src/styles/`: original global SCSS, compiled by Astro. Sass modules replace
  legacy imports, with native focus rings and dynamic viewport height.
- `src/assets/`: illustrations, homepage/About images, and flags. Components
  import these files and use `Image` from `astro:assets` with `layout="none"`
  so existing CSS controls their layout. Astro emits optimized assets with
  intrinsic `width` and `height`; global `height: auto` preserves their ratios
  as CSS scales them. About images use Astro's built-in Markdown processing.
- `public/img/`: favicons and social-sharing images, retaining stable `/img/`
  URLs. Rendered image URLs are generated under `/_astro/`.

The language selector follows the [WAI menu button keyboard pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions-active-descendant/),
using focus on native links as in the related navigation menu example.
Enter/Space/Down opens it at the first link; Up opens it at the last. Arrows wrap,
Home/End jump to the first/last link. Enter/Space activates a link. Escape closes and returns to the button;
Tab closes and moves onward, while Shift+Tab closes and returns to the button.
It also closes when focus leaves or the user clicks outside. JavaScript adds the
menu/menuitem roles and removes links from the Tab sequence. Without JavaScript,
all language links remain visible and tabbable.
Translation strings are rendered as text except the existing trusted license
HTML in `footerCopyright`. Illustrated text uses plain strings; multiline YAML
text renders explicit line breaks. The existing Portuguese footnote retains
its trusted italic HTML.

Content filenames provide stable identities (`en/letter-1`, for example).
The `slug` field preserves the localized public URL; changing a title does not
change its URL. Each entry's `key` ties its translations together and places it
in the shared reading sequence, replacing hand-maintained previous/next links.

After editing, run `npm run check`, `npm run build`, and `npm run build:sr`.
Check About translation links, canonical/alternate metadata, footer and epilogue
links, image loading, desktop/mobile layouts, and both builds' 404 responses.
