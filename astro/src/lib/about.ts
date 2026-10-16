import { getCollection } from "astro:content";
import { aboutPath, aboutUrl, canonicalAboutUrl, languages } from "../i18n";

export async function getAboutPages() {
  const pages = await getCollection("about");
  for (const { code } of languages) {
    const matches = pages.filter(({ data }) => data.lang === code);
    if (matches.length !== 1)
      throw new Error(`Expected one About page for ${code}`);
    if (`/${code}/${matches[0].data.slug}/` !== aboutPath(code)) {
      throw new Error(`About URL does not match translated link for ${code}`);
    }
  }
  return pages;
}

export function aboutAlternates() {
  return languages.map(({ code }) => ({
    lang: code,
    href: aboutUrl(code),
    canonical: canonicalAboutUrl(code),
  }));
}
