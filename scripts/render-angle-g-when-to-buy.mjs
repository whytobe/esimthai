#!/usr/bin/env node
/**
 * Angle G — "บินเดือนหน้า ซื้อ eSIM วันนี้ได้ไหม? เช็ก 2 วันก่อนจ่าย"
 * Style: Style B — Boarding Pass + Timeline (ซื้อ → ติดตั้ง → ลงเครื่อง)
 * Format: 4:5 (1080x1350) — Strict Real-Device iPhone 15 Pro Max Safe Zone
 *   - ALL critical text, cards, timelines, coupons & URLs inside y = 60..1160, x = 54..1026
 *   - Bottom 190px (y = 1160..1350) reserved clean for FB/TikTok fullscreen chrome
 *   - Zero fake buttons, zero "100%" overclaims, verified Airalo & Vacay policies (2026-11-28)
 * Output: assets/carousels/angle-g-when-to-buy-esim/slide-01.png .. slide-04.png
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
const OUT_DIR = join(PROJECT_ROOT, 'assets/carousels/angle-g-when-to-buy-esim');

const SHARED_CSS = `
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
    background:
      radial-gradient(circle at 12% 10%, rgba(15, 164, 122, 0.14) 0%, transparent 42%),
      radial-gradient(circle at 88% 82%, rgba(232, 161, 61, 0.16) 0%, transparent 44%),
      radial-gradient(#c6d6d2 1.4px, transparent 1.4px),
      #f2f6f5;
    background-size: 100% 100%, 100% 100%, 26px 26px, 100% 100%;
    color: #0e2a3a;
  }
  .topbar {
    position: absolute;
    top: 62px;
    left: 56px;
    right: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand-pill {
    display: inline-flex; align-items: center; gap: 11px;
    background: #ffffff; border: 2px solid #d3e1de;
    padding: 6px 18px 6px 8px; border-radius: 999px;
    box-shadow: 0 6px 16px rgba(14, 42, 58, 0.08);
  }
  .brand-pill img {
    width: 40px; height: 40px; border-radius: 50%; object-fit: cover;
    border: 2px solid #0fa47a;
  }
  .brand-pill span {
    font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 800; color: #0e2a3a;
  }
  .slide-badge {
    font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 800;
    color: #ffffff; background: #0e2a3a;
    padding: 8px 18px; border-radius: 999px; letter-spacing: 1px;
  }
  .sticker-outline {
    filter:
      drop-shadow(4px 0 0 #ffffff)
      drop-shadow(-4px 0 0 #ffffff)
      drop-shadow(0 4px 0 #ffffff)
      drop-shadow(0 -4px 0 #ffffff)
      drop-shadow(0 10px 16px rgba(14, 42, 58, 0.22));
  }
  .header-banner {
    position: absolute;
    top: 128px;
    left: 56px;
    right: 56px;
    background: linear-gradient(120deg, #0e2a3a 0%, #153c52 100%);
    border-radius: 24px;
    padding: 20px 26px;
    color: #ffffff;
    box-shadow: 0 14px 30px rgba(14, 42, 58, 0.16);
    overflow: hidden;
  }
  .header-watermark {
    position: absolute; right: 26px; top: 14px;
    font-family: "JetBrains Mono", monospace; font-size: 38px; font-weight: 800;
    letter-spacing: 2px; color: rgba(255, 255, 255, 0.08); pointer-events: none;
  }
  .hb-tag {
    display: inline-flex; align-items: center;
    background: rgba(15, 164, 122, 0.25); border: 1.5px solid #4ef2be; color: #8bf7d2;
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800;
    padding: 3px 13px; border-radius: 999px; margin-bottom: 8px;
  }
  .header-banner h1 {
    font-family: "Kanit", sans-serif; font-size: 42px; font-weight: 900; line-height: 1.15; margin-bottom: 4px;
  }
  .header-banner h1 .gold { color: #ffd166; }
  .header-banner h1 .mint { color: #4ef2be; }
  .header-banner p { font-size: 20px; font-weight: 600; color: #cde3ec; }
  .safe-footer {
    position: absolute;
    left: 56px;
    right: 56px;
    top: 1122px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "Kanit", sans-serif;
    font-size: 21px;
    font-weight: 700;
    color: #0b7a5b;
  }
  .safe-footer .dom {
    font-family: "JetBrains Mono", monospace; font-size: 17px; font-weight: 800; color: #4d6876;
  }
`;

function topbarHtml(avatar, label) {
  return `<header class="topbar" data-safe-check="topbar">
    <div class="brand-pill">
      <img src="${avatar}" alt="">
      <span>ซิมไปไหน · SimPaiNai</span>
    </div>
    <div class="slide-badge">${label}</div>
  </header>`;
}

// ============================================================================
// SLIDE 01: BOARDING PASS COVER + VISUAL TIMELINE (ซื้อ → ติดตั้ง → ลงเครื่อง)
// ============================================================================
function buildSlide01({ avatar, piTua, simPok }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .boarding-card {
    position: absolute;
    top: 130px;
    left: 56px;
    right: 56px;
    background: #ffffff;
    border-radius: 28px;
    box-shadow: 0 18px 44px rgba(14, 42, 58, 0.14);
    border: 2px solid #d5e2df;
    overflow: hidden;
  }
  .bp-head {
    background: linear-gradient(115deg, #0e2a3a 0%, #163d52 100%);
    padding: 16px 26px;
    display: flex; align-items: center; justify-content: space-between;
    color: #ffffff;
  }
  .bp-route { display: flex; align-items: center; gap: 14px; }
  .bp-code { font-family: "JetBrains Mono", monospace; font-size: 28px; font-weight: 800; line-height: 1; }
  .bp-city { font-size: 14px; color: #9ec0ce; margin-top: 3px; }
  .bp-plane { font-family: "JetBrains Mono", monospace; font-size: 17px; color: #ffd166; letter-spacing: 2px; }
  .bp-badges { display: flex; gap: 8px; }
  .bp-mini {
    background: rgba(255, 255, 255, 0.10); border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 10px; padding: 5px 12px; text-align: center;
  }
  .bp-mini .k { font-family: "JetBrains Mono", monospace; font-size: 11px; color: #9fd5c4; }
  .bp-mini .v { font-family: "Kanit", sans-serif; font-size: 17px; font-weight: 800; color: #ffd166; }

  .bp-body { padding: 20px 26px 18px; position: relative; }
  .bp-title-wrap { text-align: center; margin-bottom: 18px; }
  .kicker-chip {
    display: inline-block; background: #fff6e0; border: 1.5px solid #e8a13d; color: #8c5200;
    font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 800;
    padding: 3px 16px; border-radius: 999px; margin-bottom: 10px;
  }
  .bp-title {
    font-family: "Kanit", sans-serif; font-size: 46px; font-weight: 900; color: #0e2a3a; line-height: 1.14;
  }
  .bp-title .hl {
    color: #0fa47a;
    background: linear-gradient(180deg, transparent 62%, rgba(255, 209, 102, 0.6) 62%);
    padding: 0 8px;
  }
  .bp-sub {
    font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 700; color: #365261; margin-top: 6px;
  }

  /* 3-node Boarding Timeline */
  .timeline-box {
    background: #f5faf8;
    border: 2px solid #d5e5e1;
    border-radius: 22px;
    padding: 20px 18px 18px;
    margin-bottom: 16px;
  }
  .tl-eyebrow {
    text-align: center;
    font-family: "JetBrains Mono", monospace;
    font-size: 14px; font-weight: 800; color: #0b7a5b;
    letter-spacing: 1.4px; margin-bottom: 14px;
  }
  .tl-row {
    display: flex; align-items: stretch; justify-content: space-between; gap: 10px;
  }
  .tl-node {
    flex: 1;
    background: #ffffff;
    border: 1.8px solid #d5e2df;
    border-radius: 16px;
    padding: 14px 12px;
    text-align: center;
    box-shadow: 0 6px 14px rgba(14, 42, 58, 0.05);
  }
  .tl-node.n-amber { border-color: #e8a13d; background: #fffdf6; }
  .tl-node.n-green { border-color: #0fa47a; background: #f3fcf9; }
  .tl-step {
    display: inline-flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; border-radius: 10px;
    font-family: "JetBrains Mono", monospace; font-size: 17px; font-weight: 800;
    margin-bottom: 8px;
  }
  .st-navy { background: #0e2a3a; color: #ffd166; }
  .st-amber { background: #e8a13d; color: #0e2a3a; }
  .st-green { background: #0fa47a; color: #ffffff; }
  .tl-title {
    font-family: "Kanit", sans-serif; font-size: 24px; font-weight: 900; color: #0e2a3a; line-height: 1.15;
  }
  .tl-en {
    font-family: "JetBrains Mono", monospace; font-size: 12px; font-weight: 700; color: #567382; margin: 3px 0 6px;
  }
  .tl-desc {
    font-size: 16px; font-weight: 600; color: #2b4757; line-height: 1.35;
  }
  .tl-arrow {
    display: flex; align-items: center; justify-content: center;
    font-family: "Kanit", sans-serif; font-size: 28px; font-weight: 900; color: #0fa47a;
    flex-shrink: 0;
  }

  .bp-tear {
    border-top: 2px dashed #c8d9d4;
    padding: 16px 26px 18px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    background: #fbfdfc;
  }
  .tear-left {
    flex: 1;
    font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 800; color: #0e2a3a; line-height: 1.3;
  }
  .tear-left b { color: #0fa47a; }
  .tear-left small {
    display: block; font-family: "Anuphan", sans-serif; font-size: 17px; font-weight: 600; color: #4a6675; margin-top: 3px;
  }
  .tear-duo {
    display: flex; align-items: flex-end; gap: 4px; flex-shrink: 0;
  }
  .tear-pi { width: 124px; }
  .tear-cat { width: 102px; }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 01 / 04')}

    <section class="boarding-card" data-safe-check="boarding-card">
      <div class="bp-head">
        <div class="bp-route">
          <div><div class="bp-code">BUY</div><div class="bp-city">ซื้อล่วงหน้า</div></div>
          <div class="bp-plane">--- ✈ ---</div>
          <div><div class="bp-code">FLY</div><div class="bp-city">บินเดือนหน้า</div></div>
        </div>
        <div class="bp-badges">
          <div class="bp-mini"><div class="k">CHECK</div><div class="v">2 วันสำคัญ</div></div>
          <div class="bp-mini"><div class="k">TIMELINE</div><div class="v">3 ขั้นตอน</div></div>
        </div>
      </div>

      <div class="bp-body">
        <div class="bp-title-wrap">
          <div class="kicker-chip">★ คำถามยอดฮิตก่อนบิน · เซฟเก็บไว้เช็กก่อนจ่าย!</div>
          <div class="bp-title">บินเดือนหน้า ซื้อ eSIM วันนี้ได้ไหม?<br><span class="hl">เช็ก 2 วันนี้ก่อนจ่าย!</span></div>
          <div class="bp-sub">แยกให้ชัดระหว่าง “วันหมดอายุ QR” กับ “วันที่แพ็กเริ่มนับวันใช้งาน”</div>
        </div>

        <div class="timeline-box">
          <div class="tl-eyebrow">TIMELINE · ซื้อ → ติดตั้ง → ลงเครื่อง</div>
          <div class="tl-row">
            <div class="tl-node">
              <div class="tl-step st-navy">01</div>
              <div class="tl-title">วันซื้อ</div>
              <div class="tl-en">ACTIVATION WINDOW</div>
              <div class="tl-desc">เช็กว่าเก็บ QR ไว้ได้กี่วันก่อนหมดอายุ (เช่น Vacay ภายใน 30 วัน)</div>
            </div>
            <div class="tl-arrow">→</div>
            <div class="tl-node n-amber">
              <div class="tl-step st-amber">02</div>
              <div class="tl-title">วันติดตั้ง</div>
              <div class="tl-en">SCAN / INSTALL</div>
              <div class="tl-desc">ระวัง! บางแพ็กเริ่มนับวันใช้งานทันทีตั้งแต่วินาทีที่สแกน QR</div>
            </div>
            <div class="tl-arrow">→</div>
            <div class="tl-node n-green">
              <div class="tl-step st-green">03</div>
              <div class="tl-title">วันลงเครื่อง</div>
              <div class="tl-en">USAGE DAY START</div>
              <div class="tl-desc">แพ็กส่วนใหญ่เริ่มนับวันแรกเมื่อจับสัญญาณเครือข่ายปลายทาง</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bp-tear">
        <div class="tear-left">
          คำตอบสั้น ๆ: <b>ซื้อล่วงหน้าได้</b> แต่ห้ามรีบซื้อก่อนเกินกำหนดอายุ QR และห้ามรีบสแกนถ้าแพ็กนับตอนติดตั้ง
          <small>สูตรเซฟสุดสำหรับมือใหม่: ซื้อก่อนบิน 1–3 วัน ปลอดภัยทั้งอายุ QR และโปรโมชั่น</small>
        </div>
        <div class="tear-duo">
          <img class="tear-pi sticker-outline" src="${piTua}" alt="">
          <img class="tear-cat sticker-outline" src="${simPok}" alt="">
        </div>
      </div>
    </section>

    <footer class="safe-footer" data-safe-check="footer">
      <span>ปัดขวาดูความต่างของ 2 วันที่คนจำสลับกันบ่อย →</span>
      <span class="dom">esim.whytobe.com</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 02: ACTIVATION WINDOW vs USAGE DAY START (y = 62..1152)
// ============================================================================
function buildSlide02({ avatar, nongChip }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .cards {
    position: absolute;
    top: 344px;
    left: 56px;
    right: 56px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .date-card {
    background: #ffffff;
    border: 2px solid #d5e2df;
    border-left: 10px solid #0e2a3a;
    border-radius: 22px;
    padding: 22px 26px;
    box-shadow: 0 12px 26px rgba(14, 42, 58, 0.08);
  }
  .date-card.green { border-left-color: #0fa47a; }
  .dc-head {
    display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px;
  }
  .dc-title {
    font-family: "Kanit", sans-serif; font-size: 30px; font-weight: 900; color: #0e2a3a; line-height: 1.2;
  }
  .dc-pill {
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800;
    padding: 4px 12px; border-radius: 999px; flex-shrink: 0;
  }
  .p-navy { background: #e3edf3; color: #0e2a3a; }
  .p-green { background: #dff8ef; color: #0b7a5b; }
  .dc-desc { font-size: 21px; font-weight: 600; color: #2f4b5a; line-height: 1.42; }
  .dc-desc b { color: #0e2a3a; font-weight: 700; }
  .dc-note {
    margin-top: 10px; background: #fff6e0; border: 1.5px solid #e8a13d;
    border-radius: 12px; padding: 9px 14px;
    font-size: 18px; font-weight: 700; color: #8a4c00; line-height: 1.35;
  }
  .dc-note.mint {
    background: #edfbf5; border-color: #66d9b1; color: #09694e;
  }

  .summary-bar {
    position: absolute;
    top: 924px;
    left: 56px;
    width: 742px;
    background: linear-gradient(120deg, #0e2a3a 0%, #144356 100%);
    color: #ffffff;
    border-radius: 22px;
    padding: 20px 26px;
    box-shadow: 0 14px 28px rgba(14, 42, 58, 0.20);
  }
  .sum-k { font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 800; color: #8bf7d2; margin-bottom: 3px; }
  .sum-v { font-family: "Kanit", sans-serif; font-size: 27px; font-weight: 900; line-height: 1.28; }
  .sum-v span { color: #ffd166; }

  .chip-pos {
    position: absolute; right: 56px; top: 896px; width: 174px; pointer-events: none;
  }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 02 / 04')}

    <section class="header-banner" data-safe-check="header">
      <div class="header-watermark">2 DATES</div>
      <div class="hb-tag">CHECK BEFORE PAYING · อย่าจำสลับกัน</div>
      <h1>เช็ก 2 วันนี้ก่อนจ่าย<br><span class="gold">อายุเก็บ QR</span> vs <span class="mint">วันเริ่มนับแพ็ก</span></h1>
      <p>คนส่วนใหญ่ซื้อพลาดเพราะนึกว่าวันเริ่มนับกับวันหมดอายุ QR คือวันเดียวกัน</p>
    </section>

    <section class="cards" data-safe-check="cards">
      <div class="date-card">
        <div class="dc-head">
          <div class="dc-title">1. กำหนดอายุการติดตั้งหลังซื้อ</div>
          <span class="dc-pill p-navy">ACTIVATION WINDOW</span>
        </div>
        <div class="dc-desc">คือระยะเวลาที่ <b>เก็บ QR Code ไว้ก่อนเปิดใช้งานจริงได้กี่วัน</b> นับจากวันที่ชำระเงิน หากเกินกำหนดจะไม่สามารถเปิดใช้ eSIM ได้</div>
        <div class="dc-note">ตัวอย่างจริง (Vacay): สั่งซื้อล่วงหน้าเก็บ QR ไว้เปิดใช้งานที่ปลายทางได้ <b>ภายใน 30 วัน</b> (เช่น บินอีก 45 วัน อย่าเพิ่งรีบซื้อวันนี้!)</div>
      </div>

      <div class="date-card green">
        <div class="dc-head">
          <div class="dc-title">2. วันที่แพ็กเริ่มนับวันใช้งาน</div>
          <span class="dc-pill p-green">USAGE DAY START</span>
        </div>
        <div class="dc-desc">คือจุดที่นาฬิกา <b>5 วัน / 7 วัน / 10 วัน เริ่มเดินจริง</b> โดยแพ็กจะสิ้นสุดเมื่อครบจำนวนวัน หรือใช้โควตา GB หมดก่อน</div>
        <div class="dc-note mint">จุดสำคัญ: บางแพ็กเริ่มนับเมื่อจับสัญญาณปลายทาง แต่บางแพ็กเริ่มนับ <b>ทันทีตอนสแกนติดตั้ง</b> — ต้องอ่านหน้าแพ็กก่อนสแกนเสมอ</div>
      </div>
    </section>

    <section class="summary-bar" data-safe-check="summary">
      <div class="sum-k">จำง่ายใน 1 ประโยค</div>
      <div class="sum-v">ซื้อเร็วเกินไป <span>เสี่ยง QR หมดอายุ</span><br>สแกนเร็วเกินไป <span>เสี่ยงวันใช้งานเดินก่อนบิน</span></div>
    </section>

    <img class="chip-pos sticker-outline" src="${nongChip}" alt="">

    <footer class="safe-footer" data-safe-check="footer">
      <span>ปัดขวาดูเทียบเงื่อนไขแพ็ก 2 แบบ (อ้างอิง Airalo &amp; Vacay จริง) →</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 03: 2 PACKAGE TYPES — REAL AIRALO & VACAY POLICIES (y = 62..1152)
// ============================================================================
function buildSlide03({ avatar, piTua }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .cards {
    position: absolute;
    top: 344px;
    left: 56px;
    right: 56px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .policy-card {
    background: #ffffff;
    border: 2px solid #d5e2df;
    border-radius: 22px;
    padding: 20px 24px;
    box-shadow: 0 10px 24px rgba(14, 42, 58, 0.08);
  }
  .policy-card.green { border-color: #0fa47a; background: #f8fefc; }
  .policy-card.amber { border-color: #e8a13d; background: #fffdf7; }
  .pc-badge {
    display: inline-block; font-family: "Kanit", sans-serif; font-size: 17px; font-weight: 800;
    padding: 3px 14px; border-radius: 999px; margin-bottom: 8px;
  }
  .b-green { background: #0fa47a; color: #ffffff; }
  .b-amber { background: #e8a13d; color: #0e2a3a; }
  .pc-title {
    font-family: "Kanit", sans-serif; font-size: 28px; font-weight: 900; color: #0e2a3a; line-height: 1.2; margin-bottom: 6px;
  }
  .pc-list {
    display: flex; flex-direction: column; gap: 6px;
    font-size: 20px; font-weight: 600; color: #2f4b5a; line-height: 1.38;
  }
  .pc-list b { color: #0e2a3a; font-weight: 700; }
  .pc-do {
    margin-top: 9px; font-size: 18px; font-weight: 700; padding: 6px 13px; border-radius: 10px; display: inline-block;
  }
  .do-green { background: #dff8ef; color: #0a6e52; }
  .do-amber { background: #fff0d1; color: #8c4d00; }

  .safe-tip {
    position: absolute;
    top: 912px;
    left: 56px;
    width: 742px;
    background: linear-gradient(120deg, #0e2a3a 0%, #144356 100%);
    color: #ffffff;
    border-radius: 22px;
    padding: 20px 26px;
    box-shadow: 0 14px 28px rgba(14, 42, 58, 0.20);
  }
  .st-k { font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 800; color: #ffd166; margin-bottom: 3px; }
  .st-v { font-family: "Kanit", sans-serif; font-size: 26px; font-weight: 800; line-height: 1.32; }
  .st-v span { color: #6ef7ca; }

  .pi-pos {
    position: absolute; right: 56px; top: 856px; width: 172px; pointer-events: none;
  }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 03 / 04')}

    <section class="header-banner" data-safe-check="header">
      <div class="header-watermark">POLICY</div>
      <div class="hb-tag">AIRALO &amp; VACAY · เช็กจากหน้าเงื่อนไขจริง</div>
      <h1>แยกแพ็ก 2 ประเภท<br><span class="mint">เริ่มนับวันตอนไหน?</span></h1>
      <p>ก่อนกดซื้อและก่อนสแกน QR ให้เปิดดู Activation Policy / วิธีนับวันทุกครั้ง</p>
    </section>

    <section class="cards" data-safe-check="cards">
      <div class="policy-card green">
        <span class="pc-badge b-green">แบบที่ 1 · พบบ่อยสุด</span>
        <div class="pc-title">เริ่มนับเมื่อจับสัญญาณเครือข่ายปลายทาง</div>
        <div class="pc-list">
          <div>• <b>Airalo:</b> แพ็กส่วนใหญ่และแอปเวอร์ชันใหม่ เริ่มนับเมื่อต่อเครือข่ายที่รองรับ</div>
          <div>• <b>Vacay:</b> แพ็กส่วนใหญ่ (โลโก้ Vacay) สแกนติดตั้งก่อนบินได้ เริ่มนับเมื่อถึงปลายทาง</div>
        </div>
        <div class="pc-do do-green">✓ ติดตั้งล่วงหน้าจาก Wi-Fi บ้านในไทยได้ แล้วปิดสายไว้ก่อนจนกว่าเครื่องจะลง</div>
      </div>

      <div class="policy-card amber">
        <span class="pc-badge b-amber">แบบที่ 2 · ต้องระวัง!</span>
        <div class="pc-title">เริ่มนับทันทีตอนติดตั้ง (หรือหลังชำระเงิน)</div>
        <div class="pc-list">
          <div>• <b>Airalo บางแพ็ก:</b> เช็กเมนู <b>Package Details → Activation Policy</b> ก่อนติดตั้ง</div>
          <div>• <b>Vacay บางเครือข่าย:</b> เช่นบางแพ็กญี่ปุ่น KDDI / 3HK นับตอนสแกน · Viettel นับหลังจ่าย</div>
        </div>
        <div class="pc-do do-amber">! ห้ามรีบสแกนล่วงหน้าหลายสัปดาห์ ให้ซื้อ/สแกนใกล้วันเดินทางตามที่หน้าแพ็กระบุ</div>
      </div>
    </section>

    <section class="safe-tip" data-safe-check="safe-tip">
      <div class="st-k">ทริคเซฟสุด ใช้ได้แทบทุกทริป</div>
      <div class="st-v">ซื้อก่อนบิน <span>1–3 วัน</span> → ติดตั้งบน Wi-Fi บ้านในไทย<br>แล้วค่อยเปิดใช้สายเน็ต eSIM ตอนเครื่องแลนดิ้ง</div>
    </section>

    <img class="pi-pos sticker-outline" src="${piTua}" alt="">

    <footer class="safe-footer" data-safe-check="footer">
      <span>ปัดขวาดูเช็กลิสต์ก่อนจ่าย + สรุปโค้ดส่วนลด 2 ค่ายหลัก →</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 04: TIMELINE CHECKLIST + 2 PARTNERS + TRANSPARENT CTA (y = 62..1152)
// ============================================================================
function buildSlide04({ avatar, piTua, simPok }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .summary-card {
    position: absolute;
    top: 130px;
    left: 56px;
    right: 56px;
    background: #ffffff;
    border: 2px solid #d5e2df;
    border-radius: 28px;
    box-shadow: 0 18px 42px rgba(14, 42, 58, 0.12);
    overflow: hidden;
  }
  .sc-head {
    background: linear-gradient(120deg, #0e2a3a 0%, #153c52 100%);
    padding: 20px 26px;
    color: #ffffff;
    position: relative;
  }
  .sc-wm {
    position: absolute; right: 26px; top: 14px;
    font-family: "JetBrains Mono", monospace; font-size: 34px; font-weight: 800;
    color: rgba(255, 255, 255, 0.08);
  }
  .sc-tag {
    display: inline-block; background: rgba(15, 164, 122, 0.25);
    border: 1.5px solid #4ef2be; color: #8bf7d2;
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800;
    padding: 3px 13px; border-radius: 999px; margin-bottom: 8px;
  }
  .sc-head h1 { font-family: "Kanit", sans-serif; font-size: 40px; font-weight: 900; line-height: 1.15; }
  .sc-head h1 span { color: #ffd166; }
  .sc-head p { font-size: 19px; font-weight: 600; color: #cce3ec; margin-top: 4px; }

  .sc-list { padding: 18px 24px; display: flex; flex-direction: column; gap: 12px; }
  .sc-item {
    display: flex; align-items: flex-start; gap: 14px;
    background: #f6faf9; border: 1.5px solid #dce8e5; border-radius: 15px; padding: 13px 16px;
  }
  .sc-num {
    width: 40px; height: 40px; border-radius: 11px; background: #0fa47a; color: #ffffff;
    font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
  }
  .sc-it-h { font-family: "Kanit", sans-serif; font-size: 23px; font-weight: 800; color: #0e2a3a; line-height: 1.22; }
  .sc-it-h b { color: #0b7a5b; }
  .sc-it-p { font-size: 18px; font-weight: 600; color: #365261; line-height: 1.35; margin-top: 2px; }

  .sc-tear {
    border-top: 2px dashed #c8d9d4;
    padding: 18px 24px 20px;
    position: relative;
    background: #fbfdfc;
  }
  .partner-panel {
    width: 684px;
    background: linear-gradient(125deg, #0e2a3a 0%, #164457 100%);
    border-radius: 20px;
    padding: 18px 20px;
    color: #ffffff;
  }
  .pp-title {
    font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 800; color: #ffd166; margin-bottom: 10px;
  }
  .pp-grid { display: flex; gap: 12px; }
  .pp-box {
    flex: 1; background: rgba(6, 20, 29, 0.65);
    border: 1.5px solid rgba(139, 247, 210, 0.34);
    border-radius: 14px; padding: 11px 14px;
  }
  .pp-name { font-family: "Kanit", sans-serif; font-size: 20px; font-weight: 800; color: #ffffff; }
  .pp-code {
    font-family: "JetBrains Mono", monospace; font-size: 21px; font-weight: 800; color: #ffd166; margin: 3px 0;
  }
  .pp-note { font-size: 15px; font-weight: 600; color: #b5eada; line-height: 1.3; }
  .pp-url {
    margin-top: 12px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.22);
    font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 800; color: #8bf7d2;
  }
  .pp-disc {
    font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.74); margin-top: 3px;
  }
  .duo-right {
    position: absolute; right: 16px; bottom: 14px; width: 208px; height: 212px; pointer-events: none;
  }
  .duo-pi { position: absolute; left: 0; bottom: 0; width: 134px; }
  .duo-cat { position: absolute; right: 0; bottom: 0; width: 112px; }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 04 / 04')}

    <section class="summary-card" data-safe-check="summary-card">
      <div class="sc-head">
        <div class="sc-wm">TIMELINE</div>
        <div class="sc-tag">SAVE BEFORE YOU BUY · สรุปไทม์ไลน์พร้อมใช้</div>
        <h1>เซฟไว้เช็กก่อนจ่าย!<br><span>3 ขั้นตอนซื้อ eSIM ไม่ให้วันหล่น</span></h1>
        <p>ทำตามลำดับนี้ จบครบก่อนบินโดยไม่เสียวันใช้งานฟรี</p>
      </div>

      <div class="sc-list">
        <div class="sc-item">
          <span class="sc-num">01</span>
          <div>
            <div class="sc-it-h"><b>ก่อนบิน 1–3 วัน:</b> กด *#06# เช็กเลข EID + เช็ก 2 วันก่อนจ่าย</div>
            <div class="sc-it-p">ดูอายุเก็บ QR (Activation Window) และเงื่อนไขเริ่มนับวันในหน้าแพ็กก่อนชำระเงิน</div>
          </div>
        </div>
        <div class="sc-item">
          <span class="sc-num">02</span>
          <div>
            <div class="sc-it-h"><b>คืนก่อนบิน (Wi-Fi บ้าน):</b> ติดตั้ง eSIM ล่วงหน้าสำหรับแบบที่ 1</div>
            <div class="sc-it-p">ถ้าเป็นแพ็กที่เริ่มนับตอนสแกน ให้เก็บ QR ไว้สแกนวันเดินทางตามเงื่อนไขแพ็ก</div>
          </div>
        </div>
        <div class="sc-item">
          <span class="sc-num">03</span>
          <div>
            <div class="sc-it-h"><b>เมื่อเครื่องลง:</b> เปิดสาย Travel eSIM + ปิด Data Roaming ซิมไทย</div>
            <div class="sc-it-p">ปิด Allow Cellular Data Switching เพื่อกันเน็ตรั่ว และยังเปิดซิมไทยรับ SMS OTP ได้</div>
          </div>
        </div>
      </div>

      <div class="sc-tear">
        <div class="partner-panel">
          <div class="pp-title">เทียบแพ็กตามวันทริป + โค้ดส่วนลด 2 ค่ายหลัก</div>
          <div class="pp-grid">
            <div class="pp-box">
              <div class="pp-name">Airalo (200+ ประเทศ)</div>
              <div class="pp-code">NEWTOAIRALO15</div>
              <div class="pp-note">ลูกค้าใหม่ลด 15% · ติดตั้งไวในแอป</div>
            </div>
            <div class="pp-box">
              <div class="pp-name">Vacay (แบรนด์ไทย)</div>
              <div class="pp-code">THAF-TIWE</div>
              <div class="pp-note">จ่าย PromptPay ได้ · เลือกวันตรงตั๋ว</div>
            </div>
          </div>
          <div class="pp-url">ตารางเทียบ 5 เจ้าหลัก: esim.whytobe.com/blog/where-to-buy-esim/</div>
          <div class="pp-disc">หมายเหตุ: บทความและโค้ดมีลิงก์ affiliate ที่ทีมอาจได้รับค่าคอม · เช็กราคาหน้าแพ็กก่อนจ่าย</div>
        </div>
        <div class="duo-right">
          <img class="duo-pi sticker-outline" src="${piTua}" alt="">
          <img class="duo-cat sticker-outline" src="${simPok}" alt="">
        </div>
      </div>
    </section>

    <footer class="safe-footer" data-safe-check="footer">
      <span>เซฟเก็บไว้เช็กก่อนบิน · ดูตารางเทียบเต็มที่ลิงก์ในคอมเมนต์ (มีลิงก์ affiliate)</span>
      <span class="dom">4 / 4</span>
    </footer>
  </div>
</body>
</html>`;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const assets = {
    avatar: getBrandAvatar(),
    piTua: toDataUri(join(PROJECT_ROOT, 'assets/brand/stickers/sticker-pi-tua-clean.png')),
    simPok: toDataUri(join(PROJECT_ROOT, 'assets/brand/stickers/sticker-nong-simpok.png')),
    nongChip: toDataUri(join(PROJECT_ROOT, 'assets/brand/stickers/sticker-nong-chip.png')),
  };

  const jobs = [
    { file: 'slide-01.png', html: buildSlide01(assets) },
    { file: 'slide-02.png', html: buildSlide02(assets) },
    { file: 'slide-03.png', html: buildSlide03(assets) },
    { file: 'slide-04.png', html: buildSlide04(assets) },
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

      const dest = join(OUT_DIR, job.file);
      await page.screenshot({ path: dest, type: 'png', fullPage: false });
      const safeOk =
        audit.minTop >= 60 &&
        audit.maxBottom <= 1160 &&
        audit.minLeft >= 54 &&
        audit.maxRight <= 1026;
      if (!safeOk) failed = true;
      console.log(
        `[angle-g-when-to-buy-esim] ${job.file} | bounds y=${audit.minTop}..${audit.maxBottom}, x=${audit.minLeft}..${audit.maxRight} | ${safeOk ? 'PASS (y=60..1160)' : 'FAIL'}`
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
