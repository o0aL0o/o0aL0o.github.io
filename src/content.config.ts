import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    year: z.number(),
    role: z.string(),
    team: z.enum(['individual', 'group']).default('group'),
    status: z.enum(['shipped', 'in-progress', 'wip']).default('shipped'),
    cover: z.string(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        })
      )
      .default([]),
  }),
});

const digital = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/digital' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    medium: z.string(),
    cover: z.string(),
    wip: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const ai = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/ai' }),
  schema: z.object({
    title: z.string(),
    year: z.number().default(2025),
    model: z.string(),
    steps: z.number().optional(),
    cfg: z.number().optional(),
    webui: z.string().default('ComfyUI'),
    type: z.enum(['image', 'video']),
    cover: z.string(),
    extra: z.string().optional(),
    note: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { projects, digital, ai };
