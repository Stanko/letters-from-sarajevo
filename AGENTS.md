## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Translations

- Serbian is the original language and the source of truth for all translations.
- Use `src/content/letters/sr/`, `src/content/replies/sr/`, `src/content/about/sr.md`, and `src/i18n/sr.json` to verify meaning, dates, names, and illustration placement.
- When another translation conflicts with the Serbian original, follow Serbian. Other translations may help with implementation, but are not authoritative sources.

## Code Style

- Keep changes small, local, and focused. Ask before refactoring.
- Prefer explicit code over abstractions and helper layers.
- Follow existing naming, structure, and conventions.
- Preserve behavior, sequencing, identity, and lifecycle.
- Separate logical blocks with blank lines.
- Prefer if-else. Use ternaries only for simple assignments; never nest them.
- Ask when requirements leave design or interaction choices open.
- Preserve unrelated changes; avoid formatting churn.
- Keep comments and explanations brief and direct.

# Code formatting

- Use the repository's Prettier configuration.
- Do not introduce alternative formatting conventions.
- Run `npm run format` after modifying code.
- Ensure `npm run format:check` passes before finishing.
