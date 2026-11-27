#!/usr/bin/env node
/**
 * Style B — Travel Survival Infographic (Boarding Pass) Renderer (1080x1350, 4:5)
 *
 * Upgraded to Permanent Feed 4:5 Standard (Verified iPhone 15 Pro Max, 2026-11-27):
 * - Canvas: 1080x1350 (4:5) so FB/IG Feed NEVER crops top/bottom and TikTok Photo Mode fits cleanly
 * - Strict Safe Zone: ALL critical text, cards, mockups, coupons & URLs inside y = 60..1160, x = 54..1026
 * - Bottom 190px (y = 1160..1350) reserved free of critical text for mobile fullscreen overlays
 * - Zero fake clickable buttons, zero "100%" / "ทดสอบแล้ว!" overclaims
 *
 * Dataset: Angle E — eSIM + Thai SIM SMS OTP + Wi-Fi Calling without roaming shock
 * Output: assets/carousels/angle-e-otp-style-b/slide-01.png .. slide-04.png
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
const OUT_DIR = join(PROJECT_ROOT, 'assets/carousels/angle-e-otp-style-b');

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
    font-family: "JetBrains Mono", monospace; font-size: 40px; font-weight: 800;
    letter-spacing: 2px; color: rgba(255, 255, 255, 0.08); pointer-events: none;
  }
  .hb-tag {
    display: inline-flex; align-items: center;
    background: rgba(15, 164, 122, 0.25); border: 1.5px solid #4ef2be; color: #8bf7d2;
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800;
    padding: 3px 13px; border-radius: 999px; margin-bottom: 8px;
  }
  .header-banner h1 {
    font-family: "Kanit", sans-serif; font-size: 44px; font-weight: 900; line-height: 1.15; margin-bottom: 4px;
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
// SLIDE 01: BOARDING PASS COVER + 2-SIM IPHONE MOCKUP (y = 62..1152)
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
  .bp-code { font-family: "JetBrains Mono", monospace; font-size: 32px; font-weight: 800; line-height: 1; }
  .bp-city { font-size: 14px; color: #9ec0ce; margin-top: 2px; }
  .bp-plane { font-family: "JetBrains Mono", monospace; font-size: 18px; color: #ffd166; letter-spacing: 2px; }
  .bp-badges { display: flex; gap: 8px; }
  .bp-mini {
    background: rgba(255, 255, 255, 0.10); border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 10px; padding: 5px 11px; text-align: center;
  }
  .bp-mini .k { font-family: "JetBrains Mono", monospace; font-size: 11px; color: #9fd5c4; }
  .bp-mini .v { font-family: "Kanit", sans-serif; font-size: 17px; font-weight: 800; color: #ffd166; }

  .bp-body { padding: 18px 24px 16px; position: relative; }
  .kicker-chip {
    display: inline-block; background: #fff6e0; border: 1.5px solid #e8a13d; color: #8c5200;
    font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 800;
    padding: 3px 16px; border-radius: 999px; margin-bottom: 8px;
  }
  .bp-title-wrap { text-align: center; margin-bottom: 14px; }
  .bp-title {
    font-family: "Kanit", sans-serif; font-size: 40px; font-weight: 900; color: #0e2a3a; line-height: 1.15;
  }
  .bp-title .hl {
    color: #0fa47a;
    background: linear-gradient(180deg, transparent 62%, rgba(255, 209, 102, 0.55) 62%);
    padding: 0 6px;
  }
  .bp-sub {
    font-family: "Kanit", sans-serif; font-size: 21px; font-weight: 700; color: #365261; margin-top: 5px;
  }

  .phone-stage {
    position: relative; display: flex; justify-content: center; margin: 26px 0 14px;
  }
  .phone-mockup {
    width: 472px; background: #0e2a3a; border-radius: 34px; padding: 11px;
    box-shadow: 0 18px 34px rgba(14, 42, 58, 0.22);
  }
  .phone-screen {
    background: #f5f9f8; border-radius: 25px; padding: 14px 16px;
  }
  .ph-status {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;
    font-family: "JetBrains Mono", monospace; font-size: 13px; font-weight: 800; color: #0e2a3a;
  }
  .ph-pill-green {
    background: #0fa47a; color: #ffffff; padding: 3px 10px; border-radius: 999px; font-size: 12px;
  }
  .ph-pill-blue {
    background: #e1f0fa; color: #145b87; padding: 3px 9px; border-radius: 999px; font-size: 12px;
  }
  .ph-sec {
    background: #ffffff; border: 1.5px solid #dce8e5; border-radius: 14px; padding: 10px 13px; margin-bottom: 8px;
  }
  .ph-sec:last-child { margin-bottom: 0; }
  .ph-sec-h {
    display: flex; align-items: center; justify-content: space-between;
    font-family: "Kanit", sans-serif; font-size: 17px; font-weight: 800; color: #0e2a3a; margin-bottom: 6px;
  }
  .ph-sec-tag {
    font-family: "JetBrains Mono", monospace; font-size: 11px; font-weight: 800;
    background: #eef6f4; color: #0b7a5b; padding: 2px 8px; border-radius: 6px;
  }
  .ph-row {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 15px; font-weight: 600; color: #264251; padding: 3px 0;
  }
  .sw-on {
    background: #0fa47a; color: #ffffff; font-family: "JetBrains Mono", monospace;
    font-size: 12px; font-weight: 800; padding: 2px 9px; border-radius: 999px;
  }
  .sw-off {
    background: #ffe5e5; color: #b91c1c; font-family: "JetBrains Mono", monospace;
    font-size: 12px; font-weight: 800; padding: 2px 9px; border-radius: 999px;
  }

  .st-pi {
    position: absolute; left: 2px; bottom: -2px; width: 176px; pointer-events: none;
  }
  .st-simpok {
    position: absolute; right: 4px; bottom: -2px; width: 166px; pointer-events: none;
  }
  .sticky-tag {
    position: absolute; right: 8px; top: 8px;
    background: #ffd166; color: #0e2a3a; font-family: "Kanit", sans-serif;
    font-size: 17px; font-weight: 800; padding: 6px 12px; border-radius: 12px;
    transform: rotate(3deg); box-shadow: 0 6px 14px rgba(14, 42, 58, 0.14);
    line-height: 1.2; text-align: center;
  }

  .bp-tear {
    border-top: 2px dashed #c8d9d4;
    padding: 14px 26px 16px;
    display: flex; align-items: center; justify-content: space-between; gap: 14px;
    background: #fbfdfc;
  }
  .tear-left { font-family: "Kanit", sans-serif; font-size: 20px; font-weight: 700; color: #0e2a3a; line-height: 1.3; }
  .tear-left b { color: #0fa47a; }
  .tear-left small { display: block; font-family: "Anuphan", sans-serif; font-size: 15px; font-weight: 600; color: #4c6876; }
  .tear-code {
    background: #0e2a3a; color: #ffd166; border-radius: 14px; padding: 8px 16px; text-align: center; flex-shrink: 0;
  }
  .tear-code .lbl { font-family: "Anuphan", sans-serif; font-size: 13px; color: #a7e8d3; }
  .tear-code .val { font-family: "JetBrains Mono", monospace; font-size: 21px; font-weight: 800; }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 01 / 04')}

    <section class="boarding-card" data-safe-check="boarding-card">
      <div class="bp-head">
        <div class="bp-route">
          <div><div class="bp-code">BKK</div><div class="bp-city">กรุงเทพฯ</div></div>
          <div class="bp-plane">--- ✈ ---</div>
          <div><div class="bp-code">TYO / PVG</div><div class="bp-city">ญี่ปุ่น · จีน · ทั่วโลก</div></div>
        </div>
        <div class="bp-badges">
          <div class="bp-mini"><div class="k">DUAL SIM</div><div class="v">2 ซิมคู่</div></div>
          <div class="bp-mini"><div class="k">ROAMING</div><div class="v">ปิดเน็ตซิมไทย</div></div>
        </div>
      </div>

      <div class="bp-body">
        <div class="bp-title-wrap">
          <div class="kicker-chip">★ เช็กลิสต์ก่อนบิน 2569 · เซฟเก็บไว้เลย!</div>
          <div class="bp-title">ใช้ eSIM แต่ยังเปิดซิมไทย<br><span class="hl">รับ SMS OTP ธนาคารได้!</span></div>
          <div class="bp-sub">สรุปครบ! รับ SMS ขาเข้า + โทรเรตไทยผ่าน Wi-Fi Calling ไม่โดนบิลเน็ตรั่ว</div>
        </div>

        <div class="phone-stage">
          <img class="st-pi sticker-outline" src="${piTua}" alt="">
          <div class="phone-mockup">
            <div class="phone-screen">
              <div class="ph-status">
                <span>09:41</span>
                <span class="ph-pill-green">● Travel eSIM 5G</span>
                <span class="ph-pill-blue">Wi-Fi Call ✓</span>
              </div>
              <div class="ph-sec">
                <div class="ph-sec-h"><span>● ซิมไทย (Thai SIM)</span><span class="ph-sec-tag">OTP + CALL</span></div>
                <div class="ph-row"><span>Turn On This Line (รับ SMS)</span><span class="sw-on">ON ✓</span></div>
                <div class="ph-row"><span>Wi-Fi Calling (โทรเรตไทย)</span><span class="sw-on">ON ✓</span></div>
                <div class="ph-row"><span>Data Roaming ของซิมไทย</span><span class="sw-off">OFF ×</span></div>
              </div>
              <div class="ph-sec">
                <div class="ph-sec-h"><span>● Travel eSIM (Airalo)</span><span class="ph-sec-tag">5G DATA</span></div>
                <div class="ph-row"><span>Cellular Data (สายเน็ตหลัก)</span><span class="sw-on">Travel eSIM</span></div>
                <div class="ph-row"><span>Data Roaming (เฉพาะ eSIM)</span><span class="sw-on">ON ✓</span></div>
                <div class="ph-row"><span>Allow Data Switching</span><span class="sw-off">OFF ×</span></div>
              </div>
            </div>
          </div>
          <div class="sticky-tag">เปิดซิมไทยได้<br>แต่ปิด Data Roaming!</div>
          <img class="st-simpok sticker-outline" src="${simPok}" alt="">
        </div>
      </div>

      <div class="bp-tear">
        <div class="tear-left">
          Airalo eSIM 200+ ประเทศ · <b>ลด 15% ครั้งแรก</b>
          <small>เงื่อนไข: เครื่องรองรับ 2 ซิมพร้อมกัน + กด *#06# เช็กเลข EID</small>
        </div>
        <div class="tear-code">
          <div class="lbl">โค้ดลูกค้าใหม่ Airalo</div>
          <div class="val">NEWTOAIRALO15</div>
        </div>
      </div>
    </section>

    <footer class="safe-footer" data-safe-check="footer">
      <span>ปัดขวาดู 3 สวิตช์ที่ต้องตั้งค่าก่อนขึ้นเครื่อง →</span>
      <span class="dom">esim.whytobe.com</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 02: 3 SWITCHES BEFORE BOARDING (y = 62..1152, ZERO "100%")
// ============================================================================
function buildSlide02({ avatar, nongChip }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .steps {
    position: absolute;
    top: 354px;
    left: 56px;
    right: 56px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .step-card {
    background: #ffffff;
    border: 2px solid #d5e2df;
    border-radius: 22px;
    padding: 17px 22px;
    display: flex; align-items: flex-start; gap: 18px;
    box-shadow: 0 10px 24px rgba(14, 42, 58, 0.07);
  }
  .step-card.warn { border-color: #e8a13d; background: #fffdf7; }
  .step-num {
    width: 56px; height: 56px; border-radius: 15px;
    background: #0e2a3a; color: #ffd166;
    font-family: "JetBrains Mono", monospace; font-size: 24px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .step-num.amber { background: #e8a13d; color: #0e2a3a; }
  .step-title {
    font-family: "Kanit", sans-serif; font-size: 28px; font-weight: 900; color: #0e2a3a; line-height: 1.2; margin-bottom: 4px;
  }
  .step-desc { font-size: 20px; font-weight: 600; color: #314e5d; line-height: 1.38; }
  .step-desc b { color: #0e2a3a; }
  .step-desc .red { color: #b91c1c; font-weight: 700; }
  .step-note {
    display: inline-block; margin-top: 7px; font-size: 17px; font-weight: 700;
    background: #eaf8f3; color: #0b7a5b; padding: 3px 12px; border-radius: 8px;
  }
  .step-note.warn-note { background: #fff0d6; color: #9a4b00; }

  .summary-bar {
    position: absolute;
    top: 938px;
    left: 56px;
    width: 740px;
    background: linear-gradient(120deg, #0e2a3a 0%, #144356 100%);
    color: #ffffff;
    border-radius: 22px;
    padding: 20px 26px;
    box-shadow: 0 14px 28px rgba(14, 42, 58, 0.20);
  }
  .sum-k { font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 800; color: #8bf7d2; margin-bottom: 2px; }
  .sum-v { font-family: "Kanit", sans-serif; font-size: 30px; font-weight: 900; line-height: 1.2; }
  .sum-v span { color: #ffd166; }
  .sum-sub { font-size: 18px; font-weight: 600; color: #d5ebf2; margin-top: 4px; }

  .chip-pos {
    position: absolute; right: 56px; top: 906px; width: 176px; pointer-events: none;
  }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 02 / 04')}

    <section class="header-banner" data-safe-check="header">
      <div class="header-watermark">PRE-FLIGHT</div>
      <div class="hb-tag">BOARDING CHECKLIST · 3 SWITCHES</div>
      <h1>ตั้งค่าซิมไทยก่อนขึ้นเครื่อง<br><span class="gold">เช็ก 3 สวิตช์นี้ กันบิลบาน!</span></h1>
      <p>ตั้งให้ครบตั้งแต่อยู่ไทย ก่อนเปิดโหมดเครื่องบิน</p>
    </section>

    <section class="steps" data-safe-check="steps">
      <div class="step-card">
        <div class="step-num">01</div>
        <div>
          <div class="step-title">เปิด Wi-Fi Calling ตั้งแต่อยู่ไทย</div>
          <div class="step-desc">เข้า <b>Settings → Cellular → ซิมไทย</b> เปิด <b>Wi-Fi Calling = ON</b> (เช็กเปิดบริการกับค่ายไทยไว้ล่วงหน้า)</div>
          <div class="step-note">✓ ควรเปิดตอนอยู่ไทย เพราะบางค่ายส่ง SMS ยืนยันก่อนบิน</div>
        </div>
      </div>

      <div class="step-card">
        <div class="step-num">02</div>
        <div>
          <div class="step-title">ปิด Data Roaming ของซิมไทย</div>
          <div class="step-desc">เปิดสายซิมไทยจับสัญญาณรับ SMS ไว้ได้ แต่ต้อง <b>ปิด Data Roaming ของซิมไทย = OFF</b> เสมอ</div>
          <div class="step-note">✓ Android: ปิด Data Roaming ซิมไทย แล้วเปิดเฉพาะสาย eSIM</div>
        </div>
      </div>

      <div class="step-card warn">
        <div class="step-num amber">03</div>
        <div>
          <div class="step-title">ปิด Allow Cellular Data Switching!</div>
          <div class="step-desc">ตั้ง <b>Cellular Data = Travel eSIM</b> แล้ว <span class="red">ปิดสวิตช์ Allow Cellular Data Switching</span> ทันที</div>
          <div class="step-note warn-note">! ถ้าเปิดทิ้งไว้ iPhone อาจสลับดึงเน็ตจากซิมไทยตอนสัญญาณอ่อน</div>
        </div>
      </div>
    </section>

    <section class="summary-bar" data-safe-check="summary">
      <div class="sum-k">สูตรกันเน็ตรั่วก่อนแลนดิ้ง</div>
      <div class="sum-v">เน็ตใช้ eSIM · ซิมไทย <span>ปิด Data Roaming</span></div>
      <div class="sum-sub">ซิมไทยยังจับสัญญาณรับ SMS OTP ได้เมื่อเครื่องรองรับ 2 ซิมพร้อมกัน</div>
    </section>

    <img class="chip-pos sticker-outline" src="${nongChip}" alt="">

    <footer class="safe-footer" data-safe-check="footer">
      <span>ปัดขวาดูวิธีรับ OTP ธนาคาร &amp; โทรกลับไทยเรตไทยผ่าน Wi-Fi Calling →</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 03: OTP & WI-FI CALLING RULES (y = 62..1152, ZERO "100%")
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
    top: 354px;
    left: 56px;
    right: 56px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .rule-card {
    background: #ffffff;
    border: 2px solid #d5e2df;
    border-radius: 22px;
    padding: 17px 22px;
    display: flex; align-items: flex-start; gap: 18px;
    box-shadow: 0 10px 24px rgba(14, 42, 58, 0.07);
  }
  .rule-card.danger { border-color: #ef4444; background: #fff7f7; }
  .tag-box {
    min-width: 96px; padding: 10px 8px; border-radius: 14px; text-align: center;
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800; flex-shrink: 0;
  }
  .tb-navy { background: #0e2a3a; color: #6ef7ca; }
  .tb-green { background: #0fa47a; color: #ffffff; }
  .tb-red { background: #dc2626; color: #ffffff; }
  .r-title {
    font-family: "Kanit", sans-serif; font-size: 27px; font-weight: 900; color: #0e2a3a; line-height: 1.2; margin-bottom: 4px;
  }
  .r-desc { font-size: 20px; font-weight: 600; color: #314e5d; line-height: 1.38; }
  .r-desc b { color: #0e2a3a; }
  .r-desc .red { color: #b91c1c; font-weight: 700; }
  .r-note {
    display: inline-block; margin-top: 7px; font-size: 17px; font-weight: 700;
    background: #eaf8f3; color: #0b7a5b; padding: 3px 12px; border-radius: 8px;
  }
  .r-note.amber { background: #fff2d6; color: #8c4f00; }
  .r-note.red { background: #ffe4e4; color: #a81c1c; }

  .callout {
    position: absolute;
    top: 944px;
    left: 56px;
    width: 740px;
    background: linear-gradient(120deg, #0e2a3a 0%, #144356 100%);
    color: #ffffff;
    border-radius: 22px;
    padding: 20px 26px;
    box-shadow: 0 14px 28px rgba(14, 42, 58, 0.20);
  }
  .co-k { font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 800; color: #8bf7d2; }
  .co-v { font-family: "Kanit", sans-serif; font-size: 30px; font-weight: 900; color: #ffd166; line-height: 1.2; }
  .co-s { font-size: 18px; font-weight: 600; color: #d8edf4; margin-top: 3px; }

  .pi-pos {
    position: absolute; right: 56px; top: 874px; width: 174px; pointer-events: none;
  }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 03 / 04')}

    <section class="header-banner" data-safe-check="header">
      <div class="header-watermark">OTP + CALL</div>
      <div class="hb-tag">SURVIVAL GUIDE · OTP &amp; WI-FI CALLING</div>
      <h1>รับ OTP ธนาคาร &amp; โทรกลับไทย<br><span class="mint">ยังไงไม่โดนค่าโรมมิ่ง?</span></h1>
      <p>แยกให้ชัด: อะไรรับได้ vs อะไรที่ห้ามเผลอกดตอนอยู่ต่างประเทศ</p>
    </section>

    <section class="cards" data-safe-check="cards">
      <div class="rule-card">
        <div class="tag-box tb-navy">SMS OTP</div>
        <div>
          <div class="r-title">เปิดซิมไทยไว้รับ SMS OTP ธนาคาร/บัตรเครดิต</div>
          <div class="r-desc">เปิดสายซิมไทยจับสัญญาณและ <b>ปิด Data Roaming ของซิมไทย</b> โดยทั่วไปรับ SMS ขาเข้าฟรี (เช็กเงื่อนไขกับค่ายก่อนบิน)</div>
          <div class="r-note">✓ รับ SMS ขาเข้าได้ — แต่ห้ามส่ง SMS ออก (มีค่าบริการ ตปท.)</div>
        </div>
      </div>

      <div class="rule-card">
        <div class="tag-box tb-green">WI-FI CALL</div>
        <div>
          <div class="r-title">โทรกลับไทยเรตโปรไทยผ่าน Wi-Fi Calling</div>
          <div class="r-desc">ต่อ Wi-Fi รร. (หรือ iPhone ใช้เน็ต eSIM) จนมุมจอขึ้นคำว่า <b>AIS / TRUE / dtac Wi-Fi Call</b> แล้วค่อยโทร</div>
          <div class="r-note amber">ทิปปลอดภัย: เปิด Airplane Mode + เปิด Wi-Fi ก่อนโทรออก</div>
        </div>
      </div>

      <div class="rule-card danger">
        <div class="tag-box tb-red">ห้ามเผลอ!</div>
        <div>
          <div class="r-title">ห้ามรับสาย/โทรออก ถ้าไม่ขึ้น Wi-Fi Call</div>
          <div class="r-desc">ถ้ามุมจอขึ้นชื่อเครือข่ายต่างประเทศปกติ <span class="red">ห้ามกดรับสายหรือโทรออก</span> จะคิดค่าโทรโรมมิ่งทันที</div>
          <div class="r-note red">! เห็นสายเข้าตอนไม่ขึ้น Wi-Fi Call → กดตัดสายแล้วโทรผ่าน LINE แทน</div>
        </div>
      </div>
    </section>

    <section class="callout" data-safe-check="callout">
      <div class="co-k">เช็กแถบสัญญาณมุมจอก่อนโทรทุกครั้ง</div>
      <div class="co-v">ขึ้น “Wi-Fi Call” = โทรเรตไทย!</div>
      <div class="co-s">ไม่ขึ้นคำนี้ = อย่ากดรับสายหรือโทรออกผ่านเครือข่ายปกติ</div>
    </section>

    <img class="pi-pos sticker-outline" src="${piTua}" alt="">

    <footer class="safe-footer" data-safe-check="footer">
      <span>ปัดขวาเซฟเช็กลิสต์สรุป + โค้ดส่วนลด eSIM →</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 04: BOARDING SUMMARY + COUPON + PLAIN CTA (y = 62..1152, ZERO FAKE BUTTON)
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
    font-family: "JetBrains Mono", monospace; font-size: 36px; font-weight: 800;
    color: rgba(255, 255, 255, 0.08);
  }
  .sc-tag {
    display: inline-block; background: rgba(15, 164, 122, 0.25);
    border: 1.5px solid #4ef2be; color: #8bf7d2;
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800;
    padding: 3px 13px; border-radius: 999px; margin-bottom: 8px;
  }
  .sc-head h1 { font-family: "Kanit", sans-serif; font-size: 42px; font-weight: 900; line-height: 1.14; }
  .sc-head h1 span { color: #ffd166; }
  .sc-head p { font-size: 19px; font-weight: 600; color: #cce3ec; margin-top: 4px; }

  .sc-list { padding: 18px 24px; display: flex; flex-direction: column; gap: 12px; }
  .sc-item {
    display: flex; align-items: center; gap: 14px;
    background: #f6faf9; border: 1.5px solid #dce8e5; border-radius: 14px; padding: 12px 16px;
    font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 700; color: #0e2a3a;
  }
  .sc-num {
    width: 38px; height: 38px; border-radius: 10px; background: #0fa47a; color: #ffffff;
    font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .sc-item b { color: #0b7a5b; }

  .sc-tear {
    border-top: 2px dashed #c8d9d4;
    padding: 18px 24px 20px;
    position: relative;
    background: #fbfdfc;
  }
  .coupon-box {
    width: 660px;
    background: linear-gradient(125deg, #0e2a3a 0%, #164457 100%);
    border-radius: 20px;
    padding: 18px 22px;
    color: #ffffff;
  }
  .cb-top { font-size: 17px; font-weight: 600; color: #a9e8d4; margin-bottom: 3px; }
  .cb-title { font-family: "Kanit", sans-serif; font-size: 30px; font-weight: 900; line-height: 1.18; }
  .cb-title span { color: #ffd166; }
  .cb-code-row { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
  .cb-code {
    background: #ffd166; color: #0e2a3a; font-family: "JetBrains Mono", monospace;
    font-size: 24px; font-weight: 800; padding: 5px 16px; border-radius: 10px;
  }
  .cb-note { font-family: "Kanit", sans-serif; font-size: 19px; font-weight: 700; color: #e2f5f9; }
  .cb-url {
    margin-top: 10px; padding-top: 9px; border-top: 1px dashed rgba(255,255,255,0.22);
    font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 700; color: #8bf7d2;
  }
  .duo-right {
    position: absolute; right: 20px; bottom: 14px; width: 222px; height: 215px; pointer-events: none;
  }
  .duo-pi { position: absolute; left: 0; bottom: 0; width: 142px; }
  .duo-cat { position: absolute; right: 0; bottom: 0; width: 124px; }
</style>
</head>
<body>
  <div class="canvas">
    ${topbarHtml(avatar, 'PASS 04 / 04')}

    <section class="summary-card" data-safe-check="summary-card">
      <div class="sc-head">
        <div class="sc-wm">READY TO FLY</div>
        <div class="sc-tag">SAVE THIS PASS · BOARDING SUMMARY</div>
        <h1>เซฟโพสต์นี้ไว้ก่อนบิน!<br><span>เปิดซิมไทยรับ OTP ไม่เจอบิลช็อก</span></h1>
        <p>ทวน 4 ข้อจบใน 10 วิ ก่อนออกจากสุวรรณภูมิ / ดอนเมือง</p>
      </div>

      <div class="sc-list">
        <div class="sc-item"><span class="sc-num">01</span><span>กด <b>*#06#</b> เช็กเลข EID แล้วติดตั้ง eSIM จากไทยให้จบ</span></div>
        <div class="sc-item"><span class="sc-num">02</span><span>เปิด <b>Wi-Fi Calling</b> ของซิมไทยตั้งแต่อยู่ไทยก่อนขึ้นเครื่อง</span></div>
        <div class="sc-item"><span class="sc-num">03</span><span>ลงเครื่องปุ๊บ: เน็ตใช้ <b>Travel eSIM</b> · ซิมไทย <b>ปิด Data Roaming</b></span></div>
        <div class="sc-item"><span class="sc-num">04</span><span>ปิด <b>Allow Cellular Data Switching</b> + เช็กคำว่า <b>Wi-Fi Call</b> ก่อนโทร</span></div>
      </div>

      <div class="sc-tear">
        <div class="coupon-box">
          <div class="cb-top">Airalo eSIM 200+ ประเทศ · หรือ Vacay จ่าย PromptPay (THAF-TIWE)</div>
          <div class="cb-title">ลดครั้งแรก 15% · <span>ไม่ต้องถอดซิมไทย</span></div>
          <div class="cb-code-row">
            <span class="cb-code">NEWTOAIRALO15</span>
            <span class="cb-note">โค้ดลูกค้าใหม่ Airalo</span>
          </div>
          <div class="cb-url">คู่มือภาพ iPhone/Android: esim.whytobe.com/blog/esim-dual-sim-otp/</div>
        </div>
        <div class="duo-right">
          <img class="duo-pi sticker-outline" src="${piTua}" alt="">
          <img class="duo-cat sticker-outline" src="${simPok}" alt="">
        </div>
      </div>
    </section>

    <footer class="safe-footer" data-safe-check="footer">
      <span>เซฟโพสต์นี้ไว้ก่อนบิน · กดลิงก์คู่มือภาพเต็มในคอมเมนต์ (มีลิงก์ affiliate)</span>
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
        `[angle-e-otp-style-b] ${job.file} | bounds y=${audit.minTop}..${audit.maxBottom}, x=${audit.minLeft}..${audit.maxRight} | ${safeOk ? 'PASS (y=60..1160)' : 'FAIL'}`
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
