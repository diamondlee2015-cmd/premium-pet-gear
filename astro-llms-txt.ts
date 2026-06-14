// astro-llms-txt.ts
import type { AstroIntegration } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface LlmsTxtOptions {
  title: string;
  description: string;
  collections: string[]; 
}

export default function llmsTxtIntegration(options: LlmsTxtOptions): AstroIntegration {
  return {
    name: 'astro-llms-txt-generator',
    hooks: {
      // ✨ 修正：解构时同时兼容新版 pages 和旧版 routes
      'astro:build:done': async ({ dir, pages, routes }) => {
        const outputDir = fileURLToPath(dir);
        const outputPath = path.join(outputDir, 'llms.txt');

        console.log('\x1b[36m%s\x1b[0m', '🤖 [llms.txt] GEO 引擎开始自动生成...');

        let content = `# ${options.title}\n\n`;
        content += `> ${options.description}\n\n`;
        content += `## 核心文档与资源 (Core Knowledge Base)\n\n`;

        // ✨ 修正：新版 Astro 优先读取 pages 数组，如果没有则降级读取 routes
        const allPages = pages || routes || [];

        // 筛选路由
        const relevantRoutes = allPages.filter((route: any) => {
          if (!route) return false;
          
          // 适配不同版本的数据结构（新版通常直接包含 path 或 route）
          const currentRoute = route.route || route.path || '';
          const currentComponent = route.component || '';

          if (currentRoute === '/404') return false;

          return options.collections.some(collection => 
            currentRoute.startsWith(`/${collection}`) || 
            currentComponent.includes(`src/content/${collection}`)
          );
        });

        if (relevantRoutes.length === 0) {
          content += `*(暂无可用核心文档)*\n`;
        } else {
          for (const route of relevantRoutes) {
            const currentRoute = route.route || route.path || '';
            let cleanPath = currentRoute === '/' ? '/' : currentRoute;
            let pageName = '未命名页面';

            if (route.component) {
              try {
                const componentPath = path.isAbsolute(route.component) 
                  ? route.component 
                  : path.join(process.cwd(), route.component);
                
                const fileContent = await fs.readFile(componentPath, 'utf-8');
                const titleMatch = fileContent.match(/title:\s*['"](.+?)['"]/);
                
                if (titleMatch && titleMatch[1]) {
                  pageName = titleMatch[1];
                } else {
                  pageName = cleanPath.split('/').pop()?.replace(/[-_]/g, ' ') || '未命名页面';
                }
              } catch (e) {
                pageName = cleanPath.split('/').pop()?.replace(/[-_]/g, ' ') || '未命名页面';
              }
            } else {
              pageName = cleanPath.split('/').pop()?.replace(/[-_]/g, ' ') || '未命名页面';
            }

            content += `- [${pageName}](${cleanPath})\n`;
          }
        }

        try {
          await fs.writeFile(outputPath, content, 'utf-8');
          console.log('\x1b[32m%s\x1b[0m', `✨ [llms.txt] 成功部署至全站根目录: ${outputPath}`);
        } catch (error) {
          console.error('\x1b[31m%s\x1b[0m', '❌ [llms.txt] 写入失败:', error);
        }
      },
    },
  };
}