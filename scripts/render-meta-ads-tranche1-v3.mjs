#!/usr/bin/env node
/**
 * Meta Ads Tranche-1 v3 Final Polish Renderer — Feed 4:5 ONLY (1080x1350)
 *
 * Output directory: /data/OpenBot/Shared/esimthai/assets/ads/tranche1-meta-v3/
 *   1. china-feed-4x5.png (1080x1350)
 *   2. japan-feed-4x5.png (1080x1350)
 *
 * v3 Polish Applied per simpainai-reviewer Round-2 feedback:
 *   - China Feed 4:5:
 *       * Balanced headline scale ("ไม่ง้อ VPN" reduced from 98px -> 82px)
 *       * Prominent subline directly tied to supported packs:
 *         "ใช้ LINE / Google Maps ผ่าน eSIM จีนแพ็กที่รองรับ"
 *       * Larger, clear mobile-legible Line 3: "ติดตั้งก่อนบิน · สลับจาก Wi-Fi ท้องถิ่น"
 *       * Clean single Airalo card + plain editorial footer (zero fake clickable button)
 *   - Japan Feed 4:5:
 *       * Generous top headline line-height & margin so Thai tone marks on "ครั้งแรก" never crowd "Airalo"
 *       * Zero price/code duplication: top headline owns full price + Airalo + code NEWTOAIRALO15,
 *         while bottom white card focuses cleanly on Thai SIM SMS + full dual-SIM condition
 *       * Exact complete wording: "ปิด Data Roaming ของซิมไทย" in mobile-legible size
 *       * Clean plain editorial footer (zero fake clickable button)
 */
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  PROJECT_ROOT,
  DEFAULT_PLAYWRIGHT_PATH,
  FONTS_LINK,
  toDataUri,
  getBrandAvatar,
} from './lib/carousel-kit.mjs';

const require = createRequire(import.meta.url);

function baseCss() {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 1080px;
      height: 1350px;
      overflow: hidden;
      font-family: "Anuphan", "Kanit", sans-serif;
      -webkit-font-smoothing: antialiased;
      text-rendering: geometricPrecision;
    }
    .canvas {
      position: relative;
      width: 1080px;
      height: 1350px;
      overflow: hidden;
      background: #0b1f2d;
    }
    .bg-photo {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;
}

// ============================================================================
// 1. CHINA FEED 4:5 v3 (1080x1350)
// ============================================================================
function buildChinaFeed4x5V3({ avatar, bg }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${baseCss()}
  .bg-photo { object-position: center 42%; }
  .scrim-top {
    position: absolute; top: 0; left: 0; right: 0; height: 530px;
    background: linear-gradient(
      180deg,
      rgba(7, 20, 31, 0.92) 0%,
      rgba(9, 27, 42, 0.76) 58%,
      rgba(10, 29, 44, 0.18) 86%,
      rgba(10, 29, 44, 0) 100%
    );
  }
  .scrim-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 420px;
    background: linear-gradient(
      0deg,
      rgba(7, 18, 28, 0.96) 0%,
      rgba(8, 22, 34, 0.82) 52%,
      rgba(9, 25, 38, 0.20) 82%,
      rgba(9, 25, 38, 0) 100%
    );
  }

  .top-zone {
    position: absolute; top: 46px; left: 56px; right: 56px;
  }
  .brand-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }
  .brand-lockup { display: inline-flex; align-items: center; gap: 12px; }
  .brand-lockup img {
    width: 44px; height: 44px; border-radius: 50%; object-fit: cover;
    border: 2px solid #4ef2be;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
  .brand-lockup span {
    font-family: "Kanit", sans-serif; font-size: 24px; font-weight: 700; color: #ffffff;
    text-shadow: 0 2px 8px rgba(0,0,0,0.7);
  }
  .edition-label {
    font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 800;
    color: #ffd166; letter-spacing: 1.6px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.8);
  }

  /* Balanced headline scale so "ไม่ง้อ VPN" pairs harmoniously with the supported-pack subline */
  .headline-top {
    font-family: "Kanit", sans-serif; font-size: 56px; font-weight: 800;
    color: #ffffff; line-height: 1.18;
    text-shadow: 0 4px 16px rgba(5, 14, 22, 0.9);
  }
  .headline-mega {
    font-family: "Kanit", sans-serif; font-size: 82px; font-weight: 900;
    line-height: 1.12; letter-spacing: -1px; color: #ffd166;
    -webkit-text-stroke: 2.5px #081a26; paint-order: stroke fill;
    text-shadow: 0 8px 20px rgba(4, 12, 20, 0.9), 0 4px 0 #081a26;
    margin-top: 2px;
  }
  .sub-hook {
    margin-top: 14px;
    font-family: "Kanit", sans-serif; font-size: 36px; font-weight: 800;
    color: #6ef7ca; line-height: 1.24;
    text-shadow: 0 3px 14px rgba(4, 15, 22, 0.95);
  }
  .sub-note {
    margin-top: 8px;
    font-family: "Anuphan", sans-serif; font-size: 25px; font-weight: 700;
    color: #edf7fa; line-height: 1.3;
    text-shadow: 0 2px 10px rgba(4, 15, 22, 0.95);
  }

  /* Single primary Airalo offer card + plain editorial footer (ZERO fake button) */
  .bottom-zone {
    position: absolute; left: 56px; right: 56px; bottom: 44px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .primary-offer {
    background: rgba(10, 32, 46, 0.93);
    backdrop-filter: blur(18px);
    border: 1.8px solid rgba(78, 242, 190, 0.65);
    border-radius: 22px;
    padding: 20px 26px;
    display: flex; align-items: center; justify-content: space-between; gap: 18px;
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.48);
  }
  .offer-left { display: flex; flex-direction: column; gap: 4px; }
  .offer-brand {
    font-family: "Kanit", sans-serif; font-size: 24px; font-weight: 800; color: #8bf7d2;
  }
  .offer-cond { font-size: 20px; font-weight: 600; color: #dcecf2; }
  .offer-cond b { color: #ffd166; font-family: "JetBrains Mono", monospace; font-weight: 800; }

  .offer-right { text-align: right; flex-shrink: 0; }
  .offer-price-row { display: flex; align-items: baseline; justify-content: flex-end; gap: 10px; }
  .offer-price {
    font-family: "Kanit", sans-serif; font-size: 54px; font-weight: 900;
    color: #ffd166; line-height: 1;
  }
  .offer-old {
    font-size: 24px; font-weight: 600; color: rgba(255,255,255,0.52);
    text-decoration: line-through;
  }
  .offer-first {
    font-family: "Kanit", sans-serif; font-size: 19px; font-weight: 700;
    color: #8bf7d2; margin-top: 2px;
  }

  .plain-footer {
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.22);
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    font-size: 22px; font-weight: 600; color: #eef7fa;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
  }
  .plain-footer .domain {
    font-family: "JetBrains Mono", monospace; font-size: 20px; font-weight: 700;
    color: #ffd166; white-space: nowrap;
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${bg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>

    <header class="top-zone" data-safe-check="top-zone">
      <div class="brand-row">
        <div class="brand-lockup">
          <img src="${avatar}" alt="">
          <span>ซิมไปไหน · SimPaiNai</span>
        </div>
        <div class="edition-label">CHINA eSIM 2026</div>
      </div>
      <div class="headline-top">เที่ยวจีน 2026</div>
      <div class="headline-mega">ไม่ง้อ VPN</div>
      <div class="sub-hook">ใช้ LINE / Google Maps ผ่าน eSIM จีนแพ็กที่รองรับ</div>
      <div class="sub-note">ติดตั้งก่อนบิน · สลับจาก Wi-Fi ท้องถิ่น</div>
    </header>

    <section class="bottom-zone" data-safe-check="bottom-zone">
      <div class="primary-offer">
        <div class="offer-left">
          <div class="offer-brand">Airalo Chinacom · 5GB / 7 วัน</div>
          <div class="offer-cond">ลด 15% ลูกค้าใหม่ · โค้ด <b>NEWTOAIRALO15</b></div>
        </div>
        <div class="offer-right">
          <div class="offer-price-row">
            <span class="offer-price">~฿431</span>
            <span class="offer-old">฿507</span>
          </div>
          <div class="offer-first">ราคาสั่งซื้อครั้งแรก</div>
        </div>
      </div>

      <div class="plain-footer" data-safe-check="plain-footer">
        <span>ดูราคา Airalo และทางเลือกจ่ายพร้อมเพย์ (Vacay)</span>
        <span class="domain">esim.whytobe.com</span>
      </div>
    </section>
  </div>
</body>
</html>`;
}

// ============================================================================
// 2. JAPAN FEED 4:5 v3 (1080x1350)
// ============================================================================
function buildJapanFeed4x5V3({ avatar, bg }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${baseCss()}
  .bg-photo { object-position: center 44%; }
  .scrim-top {
    position: absolute; top: 0; left: 0; right: 0; height: 480px;
    background: linear-gradient(
      180deg,
      rgba(10, 32, 48, 0.84) 0%,
      rgba(12, 38, 56, 0.60) 56%,
      rgba(14, 42, 58, 0.12) 86%,
      rgba(14, 42, 58, 0) 100%
    );
  }
  .scrim-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 370px;
    background: linear-gradient(
      0deg,
      rgba(9, 27, 40, 0.94) 0%,
      rgba(11, 33, 48, 0.62) 52%,
      rgba(11, 33, 48, 0) 100%
    );
  }

  .top-zone {
    position: absolute; top: 44px; left: 56px; right: 56px;
  }
  .brand-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .brand-lockup { display: inline-flex; align-items: center; gap: 11px; }
  .brand-lockup img {
    width: 42px; height: 42px; border-radius: 50%; object-fit: cover;
    border: 2px solid #4ef2be;
    box-shadow: 0 4px 12px rgba(0,0,0,0.35);
  }
  .brand-lockup span {
    font-family: "Kanit", sans-serif; font-size: 24px; font-weight: 700; color: #ffffff;
    text-shadow: 0 2px 8px rgba(0,0,0,0.65);
  }
  .route-label {
    font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 800;
    color: #ffd166; letter-spacing: 1.4px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.7);
  }

  /* Generous line-height & spacing so Thai diacritics on "ครั้งแรก" never crowd "Airalo" */
  .headline-top {
    font-family: "Kanit", sans-serif; font-size: 54px; font-weight: 800;
    color: #ffffff; line-height: 1.24;
    text-shadow: 0 4px 16px rgba(6, 20, 32, 0.88);
  }
  .headline-mega {
    font-family: "Kanit", sans-serif; font-size: 80px; font-weight: 900;
    line-height: 1.22; letter-spacing: -1px; color: #ffd166;
    -webkit-text-stroke: 3px #0a202f; paint-order: stroke fill;
    text-shadow: 0 8px 20px rgba(6, 18, 28, 0.84), 0 4px 0 #0a202f;
    margin-top: 16px;
  }
  .headline-cond {
    margin-top: 10px;
    font-family: "Kanit", sans-serif; font-size: 28px; font-weight: 700;
    color: #ffffff; line-height: 1.28;
    text-shadow: 0 3px 10px rgba(6, 20, 32, 0.92);
  }
  .headline-cond b {
    color: #8bf7d2;
    font-family: "JetBrains Mono", monospace;
    font-weight: 800;
  }

  /* Bottom white card dedicated ONLY to Thai SIM SMS + full dual-SIM condition (NO duplicate price/code!) */
  .bottom-zone {
    position: absolute; left: 56px; right: 56px; bottom: 44px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .sms-card {
    background: rgba(255, 255, 255, 0.96);
    border: 2.5px solid #0fa47a;
    border-radius: 22px;
    padding: 20px 26px;
    box-shadow: 0 16px 32px rgba(8, 24, 36, 0.34);
    display: flex; flex-direction: column; gap: 7px;
  }
  .sms-title {
    font-family: "Kanit", sans-serif; font-size: 30px; font-weight: 900;
    color: #0e2a3a; line-height: 1.2;
  }
  .sms-title .chk { color: #0b8a66; margin-right: 6px; }
  .sms-cond {
    font-family: "Anuphan", sans-serif; font-size: 22px; font-weight: 700;
    color: #254354; line-height: 1.36;
  }
  .sms-cond b { color: #0b7d5e; font-weight: 800; }

  .plain-footer {
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.22);
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    font-size: 22px; font-weight: 600; color: #ffffff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
  }
  .plain-footer .domain {
    font-family: "JetBrains Mono", monospace; font-size: 20px; font-weight: 700;
    color: #ffd166; white-space: nowrap;
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${bg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>

    <header class="top-zone" data-safe-check="top-zone">
      <div class="brand-row">
        <div class="brand-lockup">
          <img src="${avatar}" alt="">
          <span>ซิมไปไหน · SimPaiNai</span>
        </div>
        <div class="route-label">JAPAN eSIM 2026</div>
      </div>
      <div class="headline-top">ญี่ปุ่น 7 วัน · Airalo 5GB</div>
      <div class="headline-mega">~฿298 ครั้งแรก</div>
      <div class="headline-cond">ปกติ ฿350 · ลด 15% ลูกค้าใหม่ โค้ด <b>NEWTOAIRALO15</b></div>
    </header>

    <section class="bottom-zone" data-safe-check="bottom-zone">
      <div class="sms-card">
        <div class="sms-title"><span class="chk">✓</span>เปิดซิมไทยไว้รับ SMS ได้ ไม่ต้องถอดซิม</div>
        <div class="sms-cond">เงื่อนไข: เครื่องรองรับ 2 ซิมพร้อมกัน · ซิมไทยเปิดโรมมิ่งจับสัญญาณ<br>และ <b>ปิด Data Roaming ของซิมไทย</b></div>
      </div>

      <div class="plain-footer" data-safe-check="plain-footer">
        <span>ดูราคา Airalo และทางเลือกจ่ายพร้อมเพย์ (Vacay)</span>
        <span class="domain">esim.whytobe.com</span>
      </div>
    </section>
  </div>
</body>
</html>`;
}

async function main() {
  const avatar = getBrandAvatar();
  const v1Src = join(PROJECT_ROOT, 'assets/ads/tranche1-meta-v1/_src');
  const outDir = join(PROJECT_ROOT, 'assets/ads/tranche1-meta-v3');
  mkdirSync(outDir, { recursive: true });

  const jobs = [
    {
      file: 'china-feed-4x5.png',
      html: buildChinaFeed4x5V3({
        avatar,
        bg: toDataUri(join(v1Src, 'china-feed-4x5-bg.png')),
      }),
    },
    {
      file: 'japan-feed-4x5.png',
      html: buildJapanFeed4x5V3({
        avatar,
        bg: toDataUri(join(v1Src, 'japan-feed-4x5-bg.png')),
      }),
    },
  ];

  const { chromium } = require(DEFAULT_PLAYWRIGHT_PATH);
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1080, height: 1350 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const job of jobs) {
      await page.setContent(job.html, { waitUntil: 'networkidle' });
      const audit = await page.evaluate(async () => {
        await document.fonts.ready;
        const checked = [...document.querySelectorAll('[data-safe-check]')].map((el) => {
          const r = el.getBoundingClientRect();
          return {
            name: el.getAttribute('data-safe-check'),
            left: Math.round(r.left),
            right: Math.round(r.right),
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
          };
        });
        return checked;
      });

      const dest = join(outDir, job.file);
      await page.screenshot({ path: dest, type: 'png', fullPage: false });
      console.log(`Rendered ${job.file} (1080x1350)`);
      for (const c of audit) {
        console.log(`   - ${c.name}: x=${c.left}..${c.right}, y=${c.top}..${c.bottom}`);
      }
    }
    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
