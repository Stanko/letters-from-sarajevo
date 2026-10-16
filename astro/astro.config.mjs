// @ts-check
import { env } from 'node:process';
import { defineConfig } from 'astro/config';

const target = env.SITE_TARGET ?? 'international';
if (!['international', 'serbian'].includes(target)) {
  throw new Error(`Unknown SITE_TARGET: ${target}`);
}

export default defineConfig({
  site: target === 'serbian' ? 'https://pismaizsarajeva.com' : 'https://lettersfromsarajevo.com',
  output: 'static',
  outDir: `./dist/${target}`,
  trailingSlash: 'always',
});
