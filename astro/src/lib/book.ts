import { getCollection, type CollectionEntry } from "astro:content";
import {
  isLocalLanguage,
  languages,
  siteOrigin,
  type Locale,
  type LocalizedLink,
} from "../i18n";
import { readingOrder, type BookKey } from "./reading-order";

export type BookEntry = CollectionEntry<"letters"> | CollectionEntry<"replies">;
export type LetterData = CollectionEntry<"letters">["data"];
export type ReplyData = CollectionEntry<"replies">["data"];

export async function getBookEntries(): Promise<BookEntry[]> {
  const [letters, replies] = await Promise.all([
    getCollection("letters"),
    getCollection("replies"),
  ]);
  const entries: BookEntry[] = [...letters, ...replies];
  const paths = new Set<string>();

  for (const entry of entries) {
    const path = entryPath(entry);
    if (paths.has(path)) throw new Error(`Duplicate book URL: ${path}`);
    paths.add(path);
  }

  for (const { code } of languages) {
    for (const key of readingOrder) {
      const matches = entries.filter(
        ({ data }) => data.lang === code && data.key === key,
      );
      if (matches.length !== 1)
        throw new Error(
          `Expected one translation for ${code}/${key}, found ${matches.length}`,
        );
    }
  }
  return entries;
}

export function getBookEntry(
  entries: BookEntry[],
  lang: Locale,
  key: BookKey,
): BookEntry {
  const entry = entries.find(
    ({ data }) => data.lang === lang && data.key === key,
  );
  if (!entry) throw new Error(`Missing translation: ${lang}/${key}`);
  return entry;
}

export function entryPath(entry: BookEntry): string {
  return `/${entry.data.lang}/${entry.data.slug}/`;
}

export function canonicalEntryUrl(entry: BookEntry): string {
  return new URL(entryPath(entry), siteOrigin(entry.data.lang)).href;
}

export function entryUrl(entry: BookEntry): string {
  if (isLocalLanguage(entry.data.lang)) {
    return entryPath(entry);
  }

  return canonicalEntryUrl(entry);
}

export function entryAlternates(
  entry: BookEntry,
  entries: BookEntry[],
): LocalizedLink[] {
  return languages.map(({ code }) => {
    const translation = getBookEntry(entries, code, entry.data.key);
    return {
      lang: code,
      href: entryUrl(translation),
      canonical: canonicalEntryUrl(translation),
    };
  });
}

export function readingNeighbours(entry: BookEntry, entries: BookEntry[]) {
  const index = readingOrder.indexOf(entry.data.key);
  const previousKey = readingOrder[index - 1];
  const nextKey = readingOrder[index + 1];
  let previous: string | undefined;
  let next: string | undefined;
  let previousTitle: string | undefined;
  let nextTitle: string | undefined;

  if (previousKey) {
    const previousEntry = getBookEntry(entries, entry.data.lang, previousKey);
    previous = entryUrl(previousEntry);
    previousTitle = previousEntry.data.title;
  }

  if (nextKey) {
    const nextEntry = getBookEntry(entries, entry.data.lang, nextKey);
    next = entryUrl(nextEntry);
    nextTitle = nextEntry.data.title;
  }

  return {
    previous,
    next,
    previousTitle,
    nextTitle,
    position: index + 1,
    total: readingOrder.length,
  };
}
