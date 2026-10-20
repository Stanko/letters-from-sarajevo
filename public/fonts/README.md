# Local fonts

These WOFF2 files come from [Google Fonts](https://fonts.google.com/). Each family includes its upstream SIL Open Font License in `OFL.txt`, also available in the [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl).

| Family          | Styles and weights             | Use                                                 |
| --------------- | ------------------------------ | --------------------------------------------------- |
| Literata        | Normal 350–600; italic 350–400 | Body text, headings, pagination, and language menus |
| Patrick Hand SC | Normal 400                     | Latin handwriting                                   |
| Pangolin        | Normal 400, Cyrillic subset    | Russian handwriting fallback                        |
| Mynerve         | Normal 400                     | Greek handwriting                                   |

`BaseLayout.astro` links each family's stylesheet where needed. The stylesheets preserve `font-display: swap` and Unicode ranges, so browsers request only subsets needed to render text. Literata preserves its variable optical size axis. Vietnamese and extended Cyrillic subsets are omitted because the site does not use them.

Chinese pages load Ma Shan Zheng (handwriting) and Noto Serif SC (body text, weight 400) from Google Fonts to avoid storing their large character sets in the repository. Their stylesheet and preconnect links are included only on Chinese pages.

Merriweather is not included because no styles use it. Pangolin is retained for Cyrillic characters that Patrick Hand SC does not cover. Noto Serif SC uses 400: the former 300 face was never selected by the site's font weights.
