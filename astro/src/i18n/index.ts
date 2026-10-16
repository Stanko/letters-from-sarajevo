import en from "./en.json";
import sr from "./sr.json";
import ru from "./ru.json";
import ptBr from "./pt-br.json";

export const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "pt-br", label: "Português do Brasil" },
  { code: "sr", label: "Srpski" },
] as const;

export type Locale = (typeof languages)[number]["code"];
export type Translation = typeof en;
export interface LocalizedLink {
  lang: Locale;
  href: string;
  canonical: string;
}

export const translations: Record<Locale, Translation> = {
  en,
  sr,
  ru,
  "pt-br": ptBr,
};
export const isSerbianSite = import.meta.env.SITE_TARGET === "serbian";

export function isLocalLanguage(lang: Locale): boolean {
  return import.meta.env.DEV || (isSerbianSite ? lang === "sr" : lang !== "sr");
}

export function siteOrigin(lang: Locale): string {
  return lang === "sr"
    ? "https://pismaizsarajeva.com"
    : "https://lettersfromsarajevo.com";
}

export function canonicalHomeUrl(lang: Locale): string {
  return new URL(
    lang === "en" || lang === "sr" ? "/" : `/${lang}/`,
    siteOrigin(lang),
  ).href;
}

export function homeUrl(lang: Locale): string {
  if (import.meta.env.DEV) {
    return lang === "en" ? "/" : `/${lang}/`;
  }
  // Keep navigation on this site relative; crossing domains needs an absolute URL.
  if (isSerbianSite) {
    return lang === "sr" ? "/" : canonicalHomeUrl(lang);
  }

  if (lang === "sr") {
    return canonicalHomeUrl(lang);
  }

  if (lang === "en") {
    return "/";
  }

  return `/${lang}/`;
}

export function aboutPath(lang: Locale): string {
  return `${translations[lang].aboutLink}/`;
}

export function canonicalAboutUrl(lang: Locale): string {
  return new URL(aboutPath(lang), siteOrigin(lang)).href;
}

export function aboutUrl(lang: Locale): string {
  if (isLocalLanguage(lang)) return aboutPath(lang);
  return canonicalAboutUrl(lang);
}
