import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const metadata = {
  lang: z.enum(["en", "sr", "ru", "pt-br", "el", "hu", "zh"]),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
};
const letters = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "./src/content/letters",
    generateId: ({ entry }) => entry.replace(/\.yaml$/, ""),
  }),
  schema: ({ image: assetImage }) => {
    const image = z.object({
      image: assetImage(),
      alt: z.string(),
      decorative: z.boolean().optional(),
    });
    const block = image.extend({
      text: z.string(),
      textBottom: z.string().optional(),
      warningInscription: z.string().optional(),
      treeInscription: z.string().optional(),
    });
    const sentence = z.array(
      z.union([
        z.string(),
        image.extend({
          modifier: z.enum(["window", "lg", "xl", "xwide"]).optional(),
        }),
      ]),
    );
    const stamp = image.extend({
      modifiers: z
        .array(z.enum(["tall", "square", "landscape", "bottom"]))
        .optional(),
    });
    const stampSentence = z.array(z.union([z.string(), stamp]));
    const question = z.object({
      text: z.string(),
      image: stamp,
      narrow: z.boolean(),
      imageWrapped: z.boolean(),
      suffix: z.string().optional(),
      bottomText: z.string().optional(),
    });

    return z.discriminatedUnion("template", [
      z.object({
        ...metadata,
        key: z.literal("letter-1"),
        template: z.literal("letter-one"),
        header: z.string(),
        blockOne: block,
        blockTwo: block,
        blockThree: block,
        blockFour: block,
      }),
      z.object({
        ...metadata,
        key: z.literal("letter-2"),
        template: z.literal("letter-two"),
        date: z.string(),
        header: sentence,
        sentenceOne: sentence,
        sentenceTwo: sentence,
        sentenceThree: sentence,
        sentenceFour: sentence,
        sentenceFive: sentence,
      }),
      z.object({
        ...metadata,
        key: z.literal("letter-3"),
        template: z.literal("letter-three"),
        date: z.string(),
        header: stampSentence,
        phoneSentence: stampSentence,
        questions: z.array(question).length(2),
        activityText: z.string(),
        activityOptions: stampSentence,
        games: z.array(question).length(2),
        signoff: z.string(),
        dreamImages: z.array(stamp).length(2),
      }),
      z.object({
        ...metadata,
        key: z.literal("letter-4"),
        template: z.literal("letter-four"),
        date: z.string(),
        header: z.string(),
        sentenceOne: sentence,
        sentenceTwo: sentence,
        sentenceThree: sentence,
        sentenceFour: sentence,
        sentenceLeft: block,
        sentenceRight: block,
        blockOne: block,
        blockTwo: block,
        blockThree: block,
        blockFour: block,
      }),
      z.object({
        ...metadata,
        key: z.literal("letter-5"),
        template: z.literal("letter-five"),
        date: z.string(),
        header: z.string(),
        intro: z.string(),
        newsImage: image,
        paragraphs: z
          .array(z.object({ text: z.string(), caption: z.string() }))
          .length(2),
        stoveImage: image,
        signoff: z.string(),
      }),
    ]);
  },
});

const replies = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/replies",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.discriminatedUnion("kind", [
    z.object({
      ...metadata,
      key: z.enum(["reply-1", "reply-2", "reply-3", "reply-4", "reply-5"]),
      kind: z.literal("reply"),
      date: z.string().min(1),
      footnote: z.object({ label: z.string(), content: z.string() }).optional(),
    }),
    z.object({
      ...metadata,
      key: z.literal("epilogue"),
      kind: z.literal("epilogue"),
    }),
  ]),
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/about" }),
  schema: z.object(metadata),
});

export const collections = { letters, replies, about };
