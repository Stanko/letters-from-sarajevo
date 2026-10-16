import en from './en.json';
import sr from './sr.json';
import ru from './ru.json';
import ptBr from './pt-br.json';

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'pt-br', label: 'Português do Brasil' },
  { code: 'sr', label: 'Srpski' },
] as const;

export type Locale = (typeof languages)[number]['code'];
export type Translation = typeof en;

export const translations: Record<Locale, Translation> = { en, sr, ru, 'pt-br': ptBr };
export const isSerbianSite = import.meta.env.SITE_TARGET === 'serbian';

export function siteOrigin(lang: Locale): string {
  return lang === 'sr' ? 'https://pismaizsarajeva.com' : 'https://lettersfromsarajevo.com';
}

export function canonicalHomeUrl(lang: Locale): string {
  return new URL(lang === 'en' || lang === 'sr' ? '/' : `/${lang}/`, siteOrigin(lang)).href;
}

export function homeUrl(lang: Locale): string {
  if (import.meta.env.DEV) return lang === 'en' ? '/' : `/${lang}/`;
  // Keep navigation on this site relative; crossing domains needs an absolute URL.
  if (isSerbianSite) return lang === 'sr' ? '/' : canonicalHomeUrl(lang);
  return lang === 'sr' ? canonicalHomeUrl(lang) : lang === 'en' ? '/' : `/${lang}/`;
}

// Letters and about pages still live on the original websites during this phase.
export function livePageUrl(lang: Locale, path: string): string {
  return new URL(path, siteOrigin(lang)).href;
}
