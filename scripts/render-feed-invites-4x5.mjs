#!/usr/bin/env node
/**
 * Feed 4:5 (1080x1350) Travel Invite Renderer — Post D & Post E
 *
 * Upgraded from 9:16 originals to prevent FB Feed center-cropping and iPhone fullscreen overlay clipping.
 * Strict Safe Zone (Verified iPhone 15 Pro Max, 2026-11-27):
 *   - Canvas: 1080x1350 (4:5)
 *   - ALL critical text, badges, prices, codes & URLs strictly inside y = 60..1160, x = 54..1026
 *   - Bottom 190px (y = 1160..1350) free of critical text for FB/TikTok fullscreen chrome
 *   - Zero fake clickable buttons
 *
 * Outputs in /data/OpenBot/Shared/esimthai/assets/brand/creatives/:
 *   1. post-preflight-lantern-invite-4x5.png (Post D)
 *   2. post-japan-ramen-invite-4x5.png (Post E)
 */
import { createRequire } from 'node:module';
import { join } from 'node:path';
import {
  PROJECT_ROOT,
  DEFAULT_PLAYWRIGHT_PATH,
  FONTS_LINK,
  toDataUri,
  getBrandAvatar,
} from './lib/carousel-kit.mjs';

const require = createRequire(import.meta.url);
const CREATIVES_DIR = join(PROJECT_ROOT, 'assets/brand/creatives');

const BASE_CSS = `
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
  .scrim-top {
    position: absolute; top: 0; left: 0; right: 0; height: 470px;
    background: linear-gradient(
      180deg,
      rgba(7, 20, 31, 0.90) 0%,
      rgba(9, 27, 42, 0.72) 55%,
      rgba(10, 29, 44, 0.14) 84%,
      rgba(10, 29, 44, 0) 100%
    );
  }
  .scrim-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 390px;
    background: linear-gradient(
      0deg,
      rgba(7, 19, 29, 0.88) 0%,
      rgba(9, 25, 38, 0.56) 54%,
      rgba(10, 29, 44, 0) 100%
    );
  }
  .top-zone {
    position: absolute;
    top: 62px;
    left: 56px;
    right: 56px;
  }
  .brand-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .brand-lockup { display: inline-flex; align-items: center; gap: 12px; }
  .brand-lockup img {
    width: 44px; height: 44px; border-radius: 50%; object-fit: cover;
    border: 2px solid #4ef2be;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
  }
  .brand-lockup span {
    font-family: "Kanit", sans-serif; font-size: 23px; font-weight: 800; color: #ffffff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.75);
  }
  .kicker-pill {
    font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 800;
    color: #9bf9da; background: rgba(14, 42, 58, 0.78);
    border: 1.5px solid rgba(78, 242, 190, 0.55);
    padding: 6px 16px; border-radius: 999px; letter-spacing: 1.4px;
  }
  .headline-1 {
    font-family: "Kanit", sans-serif; font-size: 62px; font-weight: 900;
    color: #ffffff; line-height: 1.14;
    text-shadow: 0 5px 18px rgba(4, 14, 22, 0.92);
  }
  .headline-2 {
    font-family: "Kanit", sans-serif; font-size: 64px; font-weight: 900;
    color: #ffd166; line-height: 1.15;
    -webkit-text-stroke: 2px #081a26; paint-order: stroke fill;
    text-shadow: 0 7px 20px rgba(4, 14, 22, 0.92), 0 3px 0 #081a26;
    margin-top: 2px;
  }
  .sub-note {
    margin-top: 10px;
    font-family: "Anuphan", sans-serif; font-size: 24px; font-weight: 700;
    color: #edf7fa; line-height: 1.32;
    text-shadow: 0 2px 10px rgba(4, 14, 22, 0.95);
  }

  /* Bottom info plate ends strictly at y <= 1160 so bottom 190px stays clear on iPhone fullscreen */
  .info-plate {
    position: absolute;
    left: 56px;
    right: 56px;
    top: 1006px;
    background: rgba(10, 32, 46, 0.90);
    backdrop-filter: blur(14px);
    border: 1.8px solid rgba(78, 242, 190, 0.62);
    border-radius: 22px;
    padding: 20px 26px;
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.45);
  }
  .plate-title {
    font-family: "Kanit", sans-serif; font-size: 28px; font-weight: 800; color: #ffffff; line-height: 1.24;
  }
  .plate-title b { color: #ffd166; }
  .plate-sub {
    margin-top: 6px;
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    font-size: 20px; font-weight: 600; color: #d6edf4;
  }
  .plate-sub .code {
    font-family: "JetBrains Mono", monospace; font-weight: 800; color: #ffd166;
  }
  .plate-sub .dom {
    font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 800; color: #8bf7d2;
  }
`;

function buildPostD({ avatar, bg }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${BASE_CSS}
  .bg-photo { object-position: center 72%; }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${bg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>

    <section class="top-zone" data-safe-check="top-zone">
      <div class="brand-row">
        <div class="brand-lockup">
          <img src="${avatar}" alt="">
          <span>ซิมไปไหน · SimPaiNai</span>
        </div>
        <div class="kicker-pill">PRE-FLIGHT CHECKLIST</div>
      </div>
      <div class="headline-1">บินนอกไม่ให้เจอบิลโรมมิ่ง</div>
      <div class="headline-2">ปิด 1 ปุ่มนี้ก่อนเครื่องลง!</div>
      <div class="sub-note">ปิด Data Roaming ของซิมไทย + ปิด Allow Data Switching แต่ยังเปิดสายไทยรับ SMS OTP ได้</div>
    </section>

    <section class="info-plate" data-safe-check="info-plate">
      <div class="plate-title">ซิมไปไหน · คู่มือกันเน็ตรั่ว + เช็ก <b>*#06#</b> ก่อนบิน</div>
      <div class="plate-sub">
        <span>โค้ดลูกค้าใหม่ Airalo ลด 15%: <span class="code">NEWTOAIRALO15</span></span>
        <span class="dom">esim.whytobe.com</span>
      </div>
    </section>
  </div>
</body>
</html>`;
}

function buildPostE({ avatar, bg }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${BASE_CSS}
  .bg-photo { object-position: center 62%; }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${bg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>

    <section class="top-zone" data-safe-check="top-zone">
      <div class="brand-row">
        <div class="brand-lockup">
          <img src="${avatar}" alt="">
          <span>ซิมไปไหน · SimPaiNai</span>
        </div>
        <div class="kicker-pill">JAPAN BUDGET HACK</div>
      </div>
      <div class="headline-1">บินญี่ปุ่น 5–7 วัน เซฟค่าซิม</div>
      <div class="headline-2">เหลือเงินกินราเมงเพิ่มอีกชาม!</div>
      <div class="sub-note">Airalo 5GB/7 วัน ~฿298 ครั้งแรก (ลด 15% จาก ฿350) · หรือ Vacay จ่าย PromptPay ได้</div>
    </section>

    <section class="info-plate" data-safe-check="info-plate">
      <div class="plate-title">เทียบราคา eSIM ญี่ปุ่น vs ซิมค่ายไทย <b>฿399</b></div>
      <div class="plate-sub">
        <span>โค้ด Airalo: <span class="code">NEWTOAIRALO15</span> · Vacay: <span class="code">THAF-TIWE</span></span>
        <span class="dom">esim.whytobe.com</span>
      </div>
    </section>
  </div>
</body>
</html>`;
}

async function main() {
  const avatar = getBrandAvatar();
  const jobs = [
    {
      file: 'post-preflight-lantern-invite-4x5.png',
      html: buildPostD({
        avatar,
        bg: toDataUri(join(CREATIVES_DIR, 'creative-preflight-lanterns.png')),
      }),
    },
    {
      file: 'post-japan-ramen-invite-4x5.png',
      html: buildPostE({
        avatar,
        bg: toDataUri(join(CREATIVES_DIR, 'creative-japan-ramen-fuji.png')),
      }),
    },
  ];

  const { chromium } = require(DEFAULT_PLAYWRIGHT_PATH);
  const browser = await chromium.launch({ headless: true });
  let failed = false;
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
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
          };
        });
        const maxBottom = checked.reduce((a, c) => Math.max(a, c.bottom), 0);
        const minTop = checked.reduce((a, c) => Math.min(a, c.top), 9999);
        const minLeft = checked.reduce((a, c) => Math.min(a, c.left), 9999);
        const maxRight = checked.reduce((a, c) => Math.max(a, c.right), 0);
        return { checked, maxBottom, minTop, minLeft, maxRight };
      });

      const dest = join(CREATIVES_DIR, job.file);
      await page.screenshot({ path: dest, type: 'png', fullPage: false });
      const safeOk =
        audit.minTop >= 60 &&
        audit.maxBottom <= 1160 &&
        audit.minLeft >= 54 &&
        audit.maxRight <= 1026;
      if (!safeOk) failed = true;
      console.log(
        `[feed-invites-4x5] ${job.file} | bounds y=${audit.minTop}..${audit.maxBottom}, x=${audit.minLeft}..${audit.maxRight} | ${safeOk ? 'PASS (y=60..1160)' : 'FAIL'}`
      );
      for (const c of audit.checked) {
        console.log(`   - ${c.name}: y=${c.top}..${c.bottom} x=${c.left}..${c.right}`);
      }
    }
  } finally {
    await browser.close();
  }
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
