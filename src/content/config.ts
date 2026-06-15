import { defineCollection, z } from 'astro:content';

// 1. 🌟 保留你原本稳定的产品集合配置
const products = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    sku: z.string().optional().nullable(),
    category: z.string(),
    image: z.string().optional(),
    moq: z.string().optional().nullable(),
  }),
});

// 2. 📝 新增并解锁你的博客集合配置（完美对齐你的 src/content/blog 目录）
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date().optional().or(z.string().transform((val) => new Date(val))), // 🧠 智能兼容字符串日期或标准日期格式
    description: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// 3. 🚀 统一导出所有核心集合
export const collections = {
  'products': products,
  'blog': blog, // 👈 这一行切断了编译报错的根源，正式给博客放行
};