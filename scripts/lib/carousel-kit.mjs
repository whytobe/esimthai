/**
 * SimPaiNai Reusable Carousel Rendering Kit (1080x1920 PNG)
 * Brand Tokens:
 *   - Aviation Navy:  #0e2a3a
 *   - Signal Emerald: #0fa47a (highlight #4ef2be)
 *   - Boarding Amber: #e8a13d (highlight #ffd166)
 *   - Ticket Paper:   #f4f6f5
 *
 * Safe Zones (TikTok / Reels mobile UI):
 *   - Top header starts >= 112px
 *   - Right rail reserved >= 96px..120px in lower-mid interactive zone
 *   - Bottom critical content / CTA / Coupon ends:
 *       Style A: y <= 1440px
 *       Style B: y <= 1480px
 */
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

export const PROJECT_ROOT = fileURLToPath(new URL('../../', import.meta.url));

export const DEFAULT_PLAYWRIGHT_PATH =
  process.env.PLAYWRIGHT_PATH ||
  '/data/OpenBot/Agents/agent-f41c352d-c127-480c-a26a-4c85b5a903f1/render-kit/node_modules/playwright';

export const FONTS_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=JetBrains+Mono:wght@600;700;800&family=Kanit:ital,wght@0,600;0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">`;

export const BASE_RESET = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1080px;
    height: 1920px;
    overflow: hidden;
    font-family: "Anuphan", "Kanit", sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }
`;

export function toDataUri(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing asset file: ${filePath}`);
  }
  const ext = extname(filePath).toLowerCase();
  const mime =
    ext === '.jpg' || ext === '.jpeg'
      ? 'image/jpeg'
      : ext === '.webp'
        ? 'image/webp'
        : 'image/png';
  const buf = readFileSync(filePath);
  return `data:${mime};base64,${buf.toString('base64')}`;
}

export function getBrandAvatar() {
  return toDataUri(join(PROJECT_ROOT, 'assets/brand/simpainai-profile.png'));
}

/**
 * Render an array of `{ file, html, maxSafeY? }` slide jobs into `outDir`.
 * Also measures bounding boxes of elements marked with `[data-safe-check]`
 * so we programmatically verify safe-zone Y bounds during every render.
 */
export async function renderSlides({ outDir, jobs, defaultMaxSafeY = 1480 }) {
  mkdirSync(outDir, { recursive: true });
  const { chromium } = require(DEFAULT_PLAYWRIGHT_PATH);
  const browser = await chromium.launch({ headless: true });

  const reports = [];
  try {
    const context = await browser.newContext({
      viewport: { width: 1080, height: 1920 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const job of jobs) {
      await page.setContent(job.html, { waitUntil: 'networkidle' });
      const audit = await page.evaluate(async () => {
        await document.fonts.ready;
        const loadedFonts = [...document.fonts]
          .filter((f) => f.status === 'loaded')
          .map((f) => `${f.family}:${f.weight}`);

        const checked = [...document.querySelectorAll('[data-safe-check]')].map((el) => {
          const r = el.getBoundingClientRect();
          return {
            name: el.getAttribute('data-safe-check'),
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
          };
        });

        const maxBottom = checked.reduce((acc, item) => Math.max(acc, item.bottom), 0);
        return {
          fonts: [...new Set(loadedFonts)],
          checked,
          maxBottom,
        };
      });

      const limitY = job.maxSafeY ?? defaultMaxSafeY;
      const dest = join(outDir, job.file);
      await page.screenshot({ path: dest, type: 'png', fullPage: false });

      const status = audit.maxBottom <= limitY ? 'PASS' : `OVER(+${audit.maxBottom - limitY}px)`;
      console.log(
        `Rendered ${job.file} | maxSafeY=${audit.maxBottom}px (limit ${limitY}px: ${status}) | fonts=${audit.fonts.length}`
      );
      for (const c of audit.checked) {
        console.log(`   - ${c.name}: y=${c.top}..${c.bottom} x=${c.left}..${c.right}`);
      }
      reports.push({ file: dest, maxBottom: audit.maxBottom, limitY, status, checked: audit.checked });
    }
  } finally {
    await browser.close();
  }
  return reports;
}
