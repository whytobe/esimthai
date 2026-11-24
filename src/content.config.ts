import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Airalo Impact affiliate tracking link (see docs/affiliate-links.md)
    affiliate: z
      .object({
        link: z.string(),
        code: z.string().optional(),
      })
      .optional(),
    // Recommended package shown in the "boarding pass" CTA stub
    recommend: z
      .object({
        name: z.string(),
        data: z.string(),
        days: z.string(),
        price: z.string(),
      })
      .optional(),
  }),
});

export const collections = { blog };
