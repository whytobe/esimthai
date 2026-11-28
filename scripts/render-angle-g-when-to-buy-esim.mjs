#!/usr/bin/env node
/**
 * Priority 2 — Angle G: "บินเดือนหน้า ซื้อ eSIM วันนี้ได้ไหม? เช็ก 2 วันก่อนจ่าย!"
 * Style: Style B — Boarding Pass + Timeline (ซื้อล่วงหน้า → ติดตั้งจากไทย → ลงเครื่องเริ่มนับวัน)
 * Source of truth: src/content/blog/esim-when-to-buy-day-count.md (published 2026-11-28)
 * Format: 4:5 (1080x1350) — Strict Real-Device iPhone 15 Pro Max Safe Zone
 *   - ALL critical text, cards, 4-provider table, coupons & URLs inside y = 60..1160, x = 54..1026
 *   - Bottom 190px (y = 1160..1350) clean background only, ZERO fake buttons, ZERO "100%" overclaims
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
    padding: 18px 26px;
    color: #ffffff;
    box-shadow: 0 14px 30px rgba(14, 42, 58, 0.16);
    overflow: hidden;
  }
  .header-watermark {
    position: absolute; right: 26px; top: 14px;
    font-family: "JetBrains Mono", monospace; font-size: 36px; font-weight: 800;
    letter-spacing: 2px; color: rgba(255, 255, 255, 0.08); pointer-events: none;
  }
  .hb-tag {
    display: inline-flex; align-items: center;
    background: rgba(15, 164, 122, 0.25); border: 1.5px solid #4ef2be; color: #8bf7d2;
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800;
    padding: 3px 13px; border-radius: 999px; margin-bottom: 7px;
  }
  .header-banner h1 {
    font-family: "Kanit", sans-serif; font-size: 40px; font-weight: 900; line-height: 1.15; margin-bottom: 4px;
  }
  .header-banner h1 .gold { color: #ffd166; }
  .header-banner h1 .mint { color: #4ef2be; }
  .header-banner p { font-size: 19px; font-weight: 600; color: #cde3ec; }
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
// SLIDE 01: BOARDING PASS COVER + TIMELINE (ซื้อล่วงหน้า → ติดตั้งจากไทย → ลงเครื่องเริ่มนับวัน)
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

  .bp-body { padding: 20px 26px 18px; }
  .bp-title-wrap { text-align: center; margin-bottom: 18px; }
  .kicker-chip {
    display: inline-block; background: #fff6e0; border: 1.5px solid #e8a13d; color: #8c5200;
    font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 800;
    padding: 3px 16px; border-radius: 999px; margin-bottom: 10px;
  }
  .bp-title { font-family: "Kanit", sans-serif; font-size: 46px; font-weight: 900; color: #0e2a3a; line-height: 1.14; }
  .bp-title .hl {
    color: #0fa47a;
    background: linear-gradient(180deg, transparent 62%, rgba(255, 209, 102, 0.6) 62%);
    padding: 0 8px;
  }
  .bp-sub { font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 700; color: #365261; margin-top: 6px; }

  .timeline-box {
    background: #f5faf8; border: 2px solid #d5e5e1; border-radius: 22px;
    padding: 18px 16px; margin-bottom: 14px;
  }
  .tl-eyebrow {
    text-align: center; font-family: "JetBrains Mono", monospace;
    font-size: 14px; font-weight: 800; color: #0b7a5b; letter-spacing: 1.2px; margin-bottom: 12px;
  }
  .tl-row { display: flex; align-items: stretch; justify-content: space-between; gap: 10px; }
  .tl-node {
    flex: 1; background: #ffffff; border: 1.8px solid #d5e2df; border-radius: 16px;
    padding: 14px 11px; text-align: center; box-shadow: 0 6px 14px rgba(14, 42, 58, 0.05);
  }
  .tl-node.n-amber { border-color: #e8a13d; background: #fffdf6; }
  .tl-node.n-green { border-color: #0fa47a; background: #f3fcf9; }
  .tl-step {
    display: inline-flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; border-radius: 10px;
    font-family: "JetBrains Mono", monospace; font-size: 17px; font-weight: 800; margin-bottom: 7px;
  }
  .st-navy { background: #0e2a3a; color: #ffd166; }
  .st-amber { background: #e8a13d; color: #0e2a3a; }
  .st-green { background: #0fa47a; color: #ffffff; }
  .tl-title { font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 900; color: #0e2a3a; line-height: 1.15; }
  .tl-en { font-family: "JetBrains Mono", monospace; font-size: 11px; font-weight: 700; color: #567382; margin: 3px 0 6px; }
  .tl-desc { font-size: 16px; font-weight: 600; color: #2b4757; line-height: 1.35; }
  .tl-arrow {
    display: flex; align-items: center; justify-content: center;
    font-family: "Kanit", sans-serif; font-size: 26px; font-weight: 900; color: #0fa47a; flex-shrink: 0;
  }

  .bp-tear {
    border-top: 2px dashed #c8d9d4; padding: 16px 26px 18px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    background: #fbfdfc;
  }
  .tear-left { flex: 1; font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 800; color: #0e2a3a; line-height: 1.3; }
  .tear-left b { color: #0fa47a; }
  .tear-left small { display: block; font-family: "Anuphan", sans-serif; font-size: 17px; font-weight: 600; color: #4a6675; margin-top: 3px; }
  .tear-duo { display: flex; align-items: flex-end; gap: 4px; flex-shrink: 0; }
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
          <div class="bp-mini"><div class="k">CHECK</div><div class="v">2 เงื่อนไข</div></div>
          <div class="bp-mini"><div class="k">COMPARE</div><div class="v">4 ค่ายจริง</div></div>
        </div>
      </div>

      <div class="bp-body">
        <div class="bp-title-wrap">
          <div class="kicker-chip">★ คำถามยอดฮิตก่อนบิน · เซฟไว้เช็กก่อนจ่าย!</div>
          <div class="bp-title">บินเดือนหน้า ซื้อ eSIM วันนี้ได้ไหม?<br><span class="hl">เช็ก 2 วันก่อนจ่าย!</span></div>
          <div class="bp-sub">แยกให้ชัดระหว่าง “วันหมดอายุสิทธิ์ติดตั้ง” กับ “วันเริ่มนับแพ็ก”</div>
        </div>

        <div class="timeline-box">
          <div class="tl-eyebrow">TIMELINE · ซื้อล่วงหน้า → ติดตั้งจากไทย → ลงเครื่องเริ่มนับวัน</div>
          <div class="tl-row">
            <div class="tl-node">
              <div class="tl-step st-navy">01</div>
              <div class="tl-title">ซื้อล่วงหน้า</div>
              <div class="tl-en">VALIDITY TO INSTALL</div>
              <div class="tl-desc">เช็กอายุเก็บ QR ก่อนจ่าย<br>(Vacay 30 วัน · SIM2Fly 60 วัน)</div>
            </div>
            <div class="tl-arrow">→</div>
            <div class="tl-node n-amber">
              <div class="tl-step st-amber">02</div>
              <div class="tl-title">ติดตั้งจากไทย</div>
              <div class="tl-en">INSTALL ON WI-FI</div>
              <div class="tl-desc">เช็กว่านับตอนสแกนหรือ<br>ตอนถึงปลายทาง แล้วปิดสายรอ</div>
            </div>
            <div class="tl-arrow">→</div>
            <div class="tl-node n-green">
              <div class="tl-step st-green">03</div>
              <div class="tl-title">ลงเครื่องเริ่มนับ</div>
              <div class="tl-en">ACTIVATION TRIGGER</div>
              <div class="tl-desc">แพ็กส่วนใหญ่เริ่มนับวันแรก<br>เมื่อจับสัญญาณปลายทาง</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bp-tear">
        <div class="tear-left">
          คำตอบสั้น ๆ: <b>ซื้อล่วงหน้าได้</b> แต่ต้องเช็ก 2 เงื่อนไขนี้ก่อนจ่าย
          <small>สูตรเซฟสุดทุกค่าย: ซื้อก่อนบิน 1–3 วัน ปลอดภัยทั้งอายุ QR และมีเวลาแก้ปัญหา</small>
        </div>
        <div class="tear-duo">
          <img class="tear-pi sticker-outline" src="${piTua}" alt="">
          <img class="tear-cat sticker-outline" src="${simPok}" alt="">
        </div>
      </div>
    </section>

    <footer class="safe-footer" data-safe-check="footer">
      <span>ปัดขวาแยก 2 เงื่อนไขที่คนสับสนบ่อย + ตาราง 4 ค่ายจริง →</span>
      <span class="dom">esim.whytobe.com</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 02: VALIDITY TO INSTALL vs ACTIVATION TRIGGER (y = 62..1152)
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
    top: 334px;
    left: 56px;
    right: 56px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .date-card {
    background: #ffffff;
    border: 2px solid #d5e2df;
    border-left: 10px solid #0e2a3a;
    border-radius: 22px;
    padding: 20px 24px;
    box-shadow: 0 12px 26px rgba(14, 42, 58, 0.08);
  }
  .date-card.green { border-left-color: #0fa47a; }
  .dc-head {
    display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 7px;
  }
  .dc-title { font-family: "Kanit", sans-serif; font-size: 28px; font-weight: 900; color: #0e2a3a; line-height: 1.2; }
  .dc-pill {
    font-family: "JetBrains Mono", monospace; font-size: 13px; font-weight: 800;
    padding: 4px 12px; border-radius: 999px; flex-shrink: 0;
  }
  .p-navy { background: #e3edf3; color: #0e2a3a; }
  .p-green { background: #dff8ef; color: #0b7a5b; }
  .dc-desc { font-size: 20px; font-weight: 600; color: #2f4b5a; line-height: 1.4; }
  .dc-desc b { color: #0e2a3a; font-weight: 700; }
  .dc-note {
    margin-top: 9px; background: #fff6e0; border: 1.5px solid #e8a13d;
    border-radius: 12px; padding: 8px 14px;
    font-size: 18px; font-weight: 700; color: #8a4c00; line-height: 1.35;
  }
  .dc-note.mint { background: #edfbf5; border-color: #66d9b1; color: #09694e; }

  .summary-bar {
    position: absolute;
    top: 924px;
    left: 56px;
    width: 742px;
    background: linear-gradient(120deg, #0e2a3a 0%, #144356 100%);
    color: #ffffff;
    border-radius: 22px;
    padding: 18px 24px;
    box-shadow: 0 14px 28px rgba(14, 42, 58, 0.20);
  }
  .sum-k { font-family: "Kanit", sans-serif; font-size: 17px; font-weight: 800; color: #8bf7d2; margin-bottom: 3px; }
  .sum-v { font-family: "Kanit", sans-serif; font-size: 25px; font-weight: 900; line-height: 1.28; }
  .sum-v span { color: #ffd166; }

  .chip-pos { position: absolute; right: 56px; top: 896px; width: 172px; pointer-events: none; }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 02 / 04')}

    <section class="header-banner" data-safe-check="header">
      <div class="header-watermark">2 RULES</div>
      <div class="hb-tag">CHECK BEFORE PAYING · อย่าจำสลับกัน</div>
      <h1>แยก 2 เงื่อนไขที่คนสับสนบ่อย<br><span class="gold">อายุสิทธิ์ติดตั้ง</span> vs <span class="mint">จุดเริ่มนับแพ็ก</span></h1>
      <p>พลาด 2 จุดนี้ทีไร = QR หมดอายุก่อนบิน หรือวันใช้งานเดินฟรีก่อนขึ้นเครื่อง</p>
    </section>

    <section class="cards" data-safe-check="cards">
      <div class="date-card">
        <div class="dc-head">
          <div class="dc-title">1. วันหมดอายุสิทธิ์ติดตั้งหลังซื้อ</div>
          <span class="dc-pill p-navy">VALIDITY TO INSTALL</span>
        </div>
        <div class="dc-desc">คือระยะเวลาที่ <b>เก็บ QR Code ไว้ก่อนเปิดใช้งานจริงได้กี่วัน</b> ซื้อเร็วเกินไป (เช่น ล่วงหน้า 2 เดือน) อาจทำให้ QR หมดอายุก่อนถึงวันบิน</div>
        <div class="dc-note">ตัวอย่าง: Vacay เก็บ QR เปิดใช้ได้ทั่วไปภายใน <b>30 วัน</b> · AIS SIM2Fly หลังเปิดซิมต้องใช้ ตปท. ภายใน <b>60 วัน</b></div>
      </div>

      <div class="date-card green">
        <div class="dc-head">
          <div class="dc-title">2. จุดเริ่มนับวันแพ็ก (Activation Trigger)</div>
          <span class="dc-pill p-green">ACTIVATION TRIGGER</span>
        </div>
        <div class="dc-desc">• <b>แบบที่ 1 (พบบ่อยสุด):</b> เริ่มนับเมื่อเครื่องต่อเสาเครือข่ายประเทศปลายทาง<br>• <b>แบบที่ 2 (ต้องระวัง):</b> เริ่มนับ <b>ทันทีตอนสแกนติดตั้ง</b> หรือหลังชำระเงิน</div>
        <div class="dc-note mint">ระวังแพ็กภูมิภาค (เช่น Asia) ที่รวมไทย: หลังติดตั้งเสร็จให้ <b>ปิดสาย Travel eSIM</b> ไว้ก่อนจนกว่าจะลงเครื่อง</div>
      </div>
    </section>

    <section class="summary-bar" data-safe-check="summary">
      <div class="sum-k">ระวังเพิ่มเรื่องรอบวัน (24 ชม. vs ตัดเที่ยงคืน)</div>
      <div class="sum-v">เช็กเวลาลงเครื่องให้ตรงรอบวัน<br><span>ลง 23:30 น. กับแพ็กตัดเที่ยงคืน → รอพ้น 00:00 น. ค่อยเปิดสาย!</span></div>
    </section>

    <img class="chip-pos sticker-outline" src="${nongChip}" alt="">

    <footer class="safe-footer" data-safe-check="footer">
      <span>ปัดขวาดูตารางเทียบกติกานับวัน 4 ค่ายจริง (Airalo · Vacay · AIS · True) →</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 03: 4-PROVIDER DAY-COUNT COMPARISON TABLE (y = 62..1152)
// ============================================================================
function buildSlide03({ avatar }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .table-wrap {
    position: absolute;
    top: 326px;
    left: 56px;
    right: 56px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .prov-card {
    background: #ffffff;
    border: 2px solid #d5e2df;
    border-left: 10px solid #0fa47a;
    border-radius: 20px;
    padding: 15px 20px;
    box-shadow: 0 8px 20px rgba(14, 42, 58, 0.07);
  }
  .prov-card.amber { border-left-color: #e8a13d; }
  .prov-card.blue  { border-left-color: #1d6b94; }
  .prov-card.navy  { border-left-color: #0e2a3a; }
  .pc-top {
    display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 6px;
  }
  .pc-name { font-family: "Kanit", sans-serif; font-size: 25px; font-weight: 900; color: #0e2a3a; }
  .pc-tag {
    font-family: "Kanit", sans-serif; font-size: 15px; font-weight: 800;
    padding: 3px 12px; border-radius: 999px;
  }
  .t-green { background: #dff8ef; color: #0b7a5b; }
  .t-amber { background: #fff0d1; color: #8c4d00; }
  .t-blue  { background: #e3f0f8; color: #145374; }
  .t-navy  { background: #e5edf2; color: #0e2a3a; }
  .pc-grid { display: flex; gap: 14px; }
  .pc-col { flex: 1; font-size: 17px; font-weight: 600; color: #2d4958; line-height: 1.35; }
  .pc-col b { color: #0e2a3a; font-weight: 700; }
  .pc-lbl {
    font-family: "JetBrains Mono", monospace; font-size: 12px; font-weight: 800;
    color: #5d7988; margin-bottom: 2px;
  }

  .foot-note {
    position: absolute;
    top: 1018px;
    left: 56px;
    right: 56px;
    background: #0e2a3a;
    color: #e6f4f8;
    border-radius: 16px;
    padding: 14px 20px;
    font-size: 18px; font-weight: 600; line-height: 1.36;
  }
  .foot-note b { color: #ffd166; }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 03 / 04')}

    <section class="header-banner" data-safe-check="header">
      <div class="header-watermark">4 PROVIDERS</div>
      <div class="hb-tag">DAY-COUNT RULES · อัปเดต 28 พ.ย. 2569</div>
      <h1>ตารางเทียบกติกานับวัน <span class="mint">4 ค่ายจริง</span></h1>
      <p>อ้างอิงจากหน้าช่วยเหลือและเงื่อนไขผู้ให้บริการ (เช็กหน้าแพ็กย่อยอีกครั้งก่อนจ่าย)</p>
    </section>

    <section class="table-wrap" data-safe-check="table">
      <div class="prov-card">
        <div class="pc-top">
          <div class="pc-name">1. Airalo (eSIM สากล)</div>
          <span class="pc-tag t-green">เช็ก Activation Policy ในแอป</span>
        </div>
        <div class="pc-grid">
          <div class="pc-col"><div class="pc-lbl">อายุสิทธิ์ติดตั้ง</div>ไม่เริ่มนับตอนซื้อ (เช็กแต่ละแพ็กก่อนติดตั้ง)</div>
          <div class="pc-col"><div class="pc-lbl">จุดเริ่มนับ &amp; การหมดอายุ</div>ส่วนใหญ่นับเมื่อต่อเสาปลายทาง (บางแพ็กนับตอนติดตั้ง) · จบเมื่อครบวันหรือเน็ตหมดก่อน</div>
        </div>
      </div>

      <div class="prov-card amber">
        <div class="pc-top">
          <div class="pc-name">2. Vacay eSIM (จ่าย PromptPay)</div>
          <span class="pc-tag t-amber">เก็บ QR ทั่วไป 30 วัน</span>
        </div>
        <div class="pc-grid">
          <div class="pc-col"><div class="pc-lbl">อายุสิทธิ์ติดตั้ง</div>โดยทั่วไปเก็บ QR ไว้เปิดใช้ได้ <b>ภายใน 30 วัน</b> (บางแพ็ก 30–60 วัน)</div>
          <div class="pc-col"><div class="pc-lbl">จุดเริ่มนับ &amp; รอบวัน</div>ส่วนใหญ่นับเมื่อถึงปลายทาง <b>ครบ 24 ชม.</b> (ยกเว้นบางเครือข่ายท้องถิ่น เช่น KDDI/3HK/Viettel)</div>
        </div>
      </div>

      <div class="prov-card blue">
        <div class="pc-top">
          <div class="pc-name">3. AIS SIM2Fly / eSIM2Fly</div>
          <span class="pc-tag t-blue">ใช้ ตปท. ใน 60 วัน</span>
        </div>
        <div class="pc-grid">
          <div class="pc-col"><div class="pc-lbl">อายุสิทธิ์ติดตั้ง</div>ลงทะเบียนก่อนวันหมดอายุหน้าซอง · เปิดซิมแล้วต้องใช้ ตปท. ใน <b>60 วัน</b></div>
          <div class="pc-col"><div class="pc-lbl">จุดเริ่มนับ &amp; รอบวัน</div>นับเมื่อต่อเน็ตเครือข่ายพันธมิตร ตปท. ครั้งแรก · นับครบ <b>24 ชม.</b> ตาม SMS (ต้อง eKYC)</div>
        </div>
      </div>

      <div class="prov-card navy">
        <div class="pc-top">
          <div class="pc-name">4. True GO Travel SIM</div>
          <span class="pc-tag t-navy">นับครบ 24 ชม. เวลาไทย</span>
        </div>
        <div class="pc-grid">
          <div class="pc-col"><div class="pc-lbl">อายุสิทธิ์ติดตั้ง</div>ลงทะเบียนและเปิดใช้ซิมก่อนวันหมดอายุหลังปกซิม</div>
          <div class="pc-col"><div class="pc-lbl">จุดเริ่มนับ &amp; รอบวัน</div>นับเมื่อเปิดเน็ตโรมมิ่ง ตปท. ครั้งแรก · นับครบ <b>24 ชม.</b> ตาม SMS ยืนยัน (ต้องลงทะเบียนซิม)</div>
        </div>
      </div>
    </section>

    <section class="foot-note" data-safe-check="footnote">
      <b>สรุปง่ายสุด:</b> ซื้อล่วงหน้า <b>1–3 วันก่อนบิน</b> ปลอดภัยทั้ง 4 ค่าย ไม่ต้องลุ้น QR หมดอายุและยังมีเวลาติดต่อซัพพอร์ตถ้าติดปัญหา
    </section>

    <footer class="safe-footer" data-safe-check="footer">
      <span>ปัดขวาเซฟเช็กลิสต์ 3 จุดก่อนซื้อ + โค้ดส่วนลด →</span>
      <span class="dom">3 / 4</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 04: 3 PRE-BUY CHECKLISTS + COUPONS + NEW ARTICLE URL (y = 62..1152)
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
  .sc-num.warn { background: #dc2626; }
  .sc-it-h { font-family: "Kanit", sans-serif; font-size: 23px; font-weight: 800; color: #0e2a3a; line-height: 1.22; }
  .sc-it-h b { color: #0b7a5b; }
  .sc-it-h .red { color: #b91c1c; }
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
  .pp-title { font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 800; color: #ffd166; margin-bottom: 10px; }
  .pp-grid { display: flex; gap: 12px; }
  .pp-box {
    flex: 1; background: rgba(6, 20, 29, 0.65);
    border: 1.5px solid rgba(139, 247, 210, 0.34);
    border-radius: 14px; padding: 11px 14px;
  }
  .pp-name { font-family: "Kanit", sans-serif; font-size: 20px; font-weight: 800; color: #ffffff; }
  .pp-code { font-family: "JetBrains Mono", monospace; font-size: 21px; font-weight: 800; color: #ffd166; margin: 3px 0; }
  .pp-note { font-size: 15px; font-weight: 600; color: #b5eada; line-height: 1.3; }
  .pp-url {
    margin-top: 12px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.22);
    font-family: "JetBrains Mono", monospace; font-size: 15.5px; font-weight: 800; color: #8bf7d2;
  }
  .pp-disc { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.76); margin-top: 3px; }
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
        <div class="sc-wm">CHECKLIST</div>
        <div class="sc-tag">SAVE BEFORE BUYING · เช็กลิสต์ 3 จุดก่อนกดซื้อล่วงหน้า</div>
        <h1>เซฟไว้เช็กก่อนจ่าย!<br><span>3 จุดกันพลาด ไม่ให้เสียวันฟรี</span></h1>
        <p>ทำตามนี้ก่อนบิน 1–3 วัน ปลอดภัยทั้งอายุ QR และวันใช้งาน</p>
      </div>

      <div class="sc-list">
        <div class="sc-item">
          <span class="sc-num">01</span>
          <div>
            <div class="sc-it-h">กด <b>*#06#</b> เช็กเลข <b>EID</b> บนเครื่องจริงก่อนจ่าย</div>
            <div class="sc-it-p">ยืนยันว่ามือถือรองรับ eSIM และไม่ติดล็อกเครือข่าย พร้อมเช็กอายุ QR และ Activation Policy</div>
          </div>
        </div>
        <div class="sc-item">
          <span class="sc-num warn">02</span>
          <div>
            <div class="sc-it-h"><span class="red">อย่าเพิ่งลบ eSIM</span> ถ้าขึ้น No Service ตอนอยู่ไทย!</div>
            <div class="sc-it-p">เป็นเรื่องปกติเพราะยังไม่ถึงประเทศปลายทาง — QR ส่วนใหญ่สแกนซ้ำไม่ได้ ถ้าเผลอลบต้องซื้อใหม่</div>
          </div>
        </div>
        <div class="sc-item">
          <span class="sc-num">03</span>
          <div>
            <div class="sc-it-h"><b>ติดตั้งก่อนบิน 1 วัน</b> บน Wi-Fi บ้าน แล้วปิดสายรอไว้</div>
            <div class="sc-it-p">สำหรับแพ็กที่นับเมื่อถึงปลายทาง (ส่วนแพ็กที่นับตอนสแกน เก็บ QR ไว้สแกนวันบิน) · ลงเครื่องค่อยเปิดใช้</div>
          </div>
        </div>
      </div>

      <div class="sc-tear">
        <div class="partner-panel">
          <div class="pp-title">คู่มือกติกานับวันเต็ม + โค้ดส่วนลด 2 ค่ายหลัก</div>
          <div class="pp-grid">
            <div class="pp-box">
              <div class="pp-name">Airalo (200+ ประเทศ)</div>
              <div class="pp-code">NEWTOAIRALO15</div>
              <div class="pp-note">ลูกค้าใหม่ลด 15% · แอปติดตั้งไว</div>
            </div>
            <div class="pp-box">
              <div class="pp-name">Vacay (แบรนด์ไทย)</div>
              <div class="pp-code">THAF-TIWE</div>
              <div class="pp-note">จ่าย PromptPay ได้ · เก็บ QR ใน 30 วัน</div>
            </div>
          </div>
          <div class="pp-url">esim.whytobe.com/blog/esim-when-to-buy-day-count/</div>
          <div class="pp-disc">หมายเหตุ: บทความและโค้ดมีลิงก์ affiliate ที่ทีมอาจได้รับค่าคอม · เช็กเงื่อนไขหน้าแพ็กก่อนจ่าย</div>
        </div>
        <div class="duo-right">
          <img class="duo-pi sticker-outline" src="${piTua}" alt="">
          <img class="duo-cat sticker-outline" src="${simPok}" alt="">
        </div>
      </div>
    </section>

    <footer class="safe-footer" data-safe-check="footer">
      <span>เซฟเก็บไว้ก่อนบิน · อ่านตารางกติกานับวันเต็มที่ลิงก์ในคอมเมนต์ (มีลิงก์ affiliate)</span>
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
