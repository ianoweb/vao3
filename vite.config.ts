import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Everything the build needs lives in this one file (no ./scripts folder required).

// Public site URL (HTTPS, trailing slash) from VITE_SITE_URL or Vercel's production domain.
function resolveSiteUrl(env: Record<string, string | undefined>): string | undefined {
  let raw = env.VITE_SITE_URL?.trim();
  if (!raw && env.VERCEL_PROJECT_PRODUCTION_URL) raw = `https://${env.VERCEL_PROJECT_PRODUCTION_URL.trim()}`;
  if (!raw) return undefined;
  const url = new URL(raw);
  if (url.protocol !== 'https:') throw new Error('VITE_SITE_URL must use HTTPS.');
  url.search = '';
  url.hash = '';
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  return url.href;
}

// "vao" or "/vao" -> "/vao/"; empty -> "/".
function resolveBase(value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === '/') return '/';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}

// Adds canonical / Open Graph URLs only when the public site URL is known.
function seoTags(siteUrl: string | undefined): Plugin {
  return {
    name: 'vao-seo-tags',
    transformIndexHtml() {
      if (!siteUrl) return [];
      const image = new URL('og-image.png', siteUrl).href;
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: siteUrl }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: siteUrl }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' },
      ];
    },
  };
}

// After the build: copy index.html to 404.html (GitHub Pages) and, if the site URL is
// known, write absolute URLs into sitemap.xml and robots.txt.
function finalizeBuild(siteUrl: string | undefined): Plugin {
  let outDir = 'dist';
  return {
    name: 'vao-finalize-build',
    apply: 'build',
    configResolved(config) {
      outDir = join(config.root, config.build.outDir);
    },
    closeBundle() {
      const index = join(outDir, 'index.html');
      if (existsSync(index)) copyFileSync(index, join(outDir, '404.html'));
      if (!siteUrl) {
        console.warn('[seo] VITE_SITE_URL is not set; sitemap keeps its relative placeholder.');
        return;
      }
      const escapeXml = (v: string) => v.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeXml(siteUrl)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;
      writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
      const robotsPath = join(outDir, 'robots.txt');
      if (existsSync(robotsPath)) {
        const robots = readFileSync(robotsPath, 'utf8');
        writeFileSync(robotsPath, robots.replace(/^Sitemap:.*$/m, `Sitemap: ${new URL('sitemap.xml', siteUrl).href}`));
      }
      console.info(`[seo] Generated absolute sitemap URLs for ${siteUrl}`);
    },
  };
}

// Windows: nothing to configure. Dev http://localhost:5173, preview http://localhost:4173.
// GitHub Pages project site (https://user.github.io/repo/): the included workflow sets VITE_BASE=/repo/.
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env } as Record<string, string | undefined>;
  const siteUrl = resolveSiteUrl(env);
  return {
    base: resolveBase(env.VITE_BASE),
    plugins: [react(), tailwindcss(), seoTags(siteUrl), finalizeBuild(siteUrl)],
    server: { port: 5173, host: 'localhost', open: true },
    preview: { port: 4173, host: 'localhost' },
    build: { outDir: 'dist', emptyOutDir: true },
  };
});
