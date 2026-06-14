import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  type: 'content', // 🌟 回归最稳定的 content 模式
  schema: z.object({
    title: z.string(),
    sku: z.string().optional().nullable(),
    category: z.string(),
    image: z.string().optional(),
    moq: z.string().optional().nullable(),
  }),
});

export const collections = {
  'products': products,
};