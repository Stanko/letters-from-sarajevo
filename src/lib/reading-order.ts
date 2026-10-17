export const readingOrder = [
  "letter-1",
  "reply-1",
  "letter-2",
  "reply-2",
  "letter-3",
  "reply-3",
  "letter-4",
  "reply-4",
  "letter-5",
  "reply-5",
  "epilogue",
] as const;

export type BookKey = (typeof readingOrder)[number];
