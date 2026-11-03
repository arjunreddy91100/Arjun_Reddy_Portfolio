import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    // Minutes. Leave out to have it calculated from the word count.
    readTime: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    // Optional short text shown on the card's thumbnail block, e.g. "SSIS → Data Factory".
    thumb: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.string(),
    category: z.string(),
    summary: z.string(),
    stats: z.string().optional(),
    tech: z.array(z.string()).default([]),
    repo: z.url().optional(),
    demo: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    draft: z.boolean().default(false),
    // Used only when this project is the featured story on the homepage.
    headline: z.string().optional(),
    pitch: z.string().optional(),
    terminal: z
      .object({
        context: z.string().optional(),
        question: z.string(),
        code: z.string().optional(),
        answer: z.string(),
        check: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { writing, projects };
