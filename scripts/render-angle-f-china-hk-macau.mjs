#!/usr/bin/env node
/**
 * Priority 2 — High-Intent Commercial Carousel Renderer (1080x1350, 4:5)
 * Style: Style A — Editorial Magazine Full-Bleed
 * Topic: "จีนต่อฮ่องกง? เช็ก 2 พื้นที่ก่อนกดซื้อซิม" (China + Hong Kong + Macau)
 * Source of truth: src/content/blog/esim-china-hong-kong-macau.md (verified 2026-11-27)
 * Output: assets/carousels/angle-f-china-hk-macau/slide-01.png .. slide-04.png
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

const OUT_DIR = join(PROJECT_ROOT, 'assets/carousels/angle-f-china-hk-macau');
const SRC_DIR = join(OUT_DIR, '_src');

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
    background: #0b1f2d;
  }
  .bg-photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .mag-frame {
    position: absolute;
    inset: 22px;
    border: 1.5px solid rgba(255, 255, 255, 0.16);
    border-radius: 30px;
    pointer-events: none;
  }
  .masthead {
    position: absolute;
    top: 46px;
    left: 54px;
    right: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 14px;
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.22);
  }
  .brand-lockup { display: flex; align-items: center; gap: 12px; }
  .brand-avatar {
    width: 48px; height: 48px; border-radius: 50%; object-fit: cover;
    border: 2.5px solid #4ef2be;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
  }
  .brand-text { display: flex; flex-direction: column; gap: 1px; }
  .brand-name {
    font-family: "Kanit", sans-serif; font-size: 23px; font-weight: 800;
    color: #ffffff; line-height: 1.08;
    text-shadow: 0 2px 8px rgba(0,0,0,0.65);
  }
  .brand-issue {
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 700;
    color: #ffd166; letter-spacing: 1.5px; text-transform: uppercase;
  }
  .page-pill {
    font-family: "JetBrains Mono", monospace; font-size: 19px; font-weight: 800;
    color: #e9fff7; background: rgba(14, 42, 58, 0.78);
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(78, 242, 190, 0.5);
    padding: 6px 18px; border-radius: 999px;
  }
  .footer-plain {
    position: absolute;
    left: 54px;
    right: 54px;
    bottom: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "Kanit", sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #e8f8f3;
    text-shadow: 0 2px 10px rgba(4, 14, 22, 0.9);
  }
  .footer-plain .accent { color: #ffd166; }
  .footer-plain .domain {
    font-family: "JetBrains Mono", monospace;
    font-size: 18px;
    font-weight: 800;
    color: #8bf7d2;
  }
`;

function mastheadHtml(avatar, issue, pageNum) {
  return `<header class="masthead" data-safe-check="masthead">
    <div class="brand-lockup">
      <img class="brand-avatar" src="${avatar}" alt="">
      <div class="brand-text">
        <div class="brand-name">ซิมไปไหน · SimPaiNai</div>
        <div class="brand-issue">${issue}</div>
      </div>
    </div>
    <div class="page-pill">${pageNum}</div>
  </header>`;
}

// ============================================================================
// SLIDE 01: EDITORIAL FULL-BLEED COVER (Hong Kong + China + Macau + Duo)
// ============================================================================
function buildSlide01({ avatar, coverBg }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .bg-photo { object-position: center 52%; }
  .scrim-top {
    position: absolute; top: 0; left: 0; right: 0; height: 610px;
    background: linear-gradient(
      180deg,
      rgba(7, 20, 31, 0.92) 0%,
      rgba(9, 27, 42, 0.78) 54%,
      rgba(11, 31, 45, 0.16) 84%,
      rgba(11, 31, 45, 0) 100%
    );
  }
  .scrim-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 290px;
    background: linear-gradient(
      0deg,
      rgba(6, 17, 26, 0.94) 0%,
      rgba(8, 22, 34, 0.62) 55%,
      rgba(10, 26, 39, 0) 100%
    );
  }
  .hero {
    position: absolute;
    top: 128px;
    left: 54px;
    right: 54px;
  }
  .kicker-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
  }
  .kicker-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(95deg, #e8a13d, #f5b951);
    color: #0b1f2d;
    font-family: "Kanit", sans-serif;
    font-size: 23px;
    font-weight: 800;
    padding: 6px 20px;
    border-radius: 999px;
    box-shadow: 0 6px 18px rgba(232, 161, 61, 0.36);
  }
  .kicker-route {
    font-family: "JetBrains Mono", monospace;
    font-size: 18px;
    font-weight: 800;
    color: #9bf9da;
    letter-spacing: 1.4px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  }
  .headline-top {
    font-family: "Kanit", sans-serif;
    font-size: 64px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.12;
    text-shadow: 0 4px 18px rgba(5, 14, 22, 0.92);
  }
  .headline-mega {
    font-family: "Kanit", sans-serif;
    font-size: 98px;
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -1.2px;
    color: #ffd166;
    -webkit-text-stroke: 3px #081a26;
    paint-order: stroke fill;
    text-shadow: 0 10px 24px rgba(4, 12, 20, 0.92), 0 4px 0 #081a26;
    margin-top: 2px;
  }
  .headline-bar {
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    background: linear-gradient(95deg, #0fa47a 0%, #10b981 100%);
    color: #ffffff;
    font-family: "Kanit", sans-serif;
    font-size: 36px;
    font-weight: 800;
    padding: 10px 24px;
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(15, 164, 122, 0.42), 0 0 0 1.5px rgba(255,255,255,0.22) inset;
  }
  .sub-line {
    margin-top: 12px;
    font-family: "Anuphan", sans-serif;
    font-size: 25px;
    font-weight: 700;
    color: #edf8fb;
    text-shadow: 0 2px 12px rgba(4, 14, 22, 0.95);
  }

  .bottom-teaser {
    position: absolute;
    left: 54px;
    right: 54px;
    bottom: 102px;
    background: rgba(10, 31, 45, 0.88);
    backdrop-filter: blur(14px);
    border: 1.6px solid rgba(78, 242, 190, 0.55);
    border-radius: 20px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.44);
  }
  .teaser-left {
    font-family: "Kanit", sans-serif;
    font-size: 25px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.28;
  }
  .teaser-left b { color: #ffd166; }
  .teaser-tag {
    font-family: "JetBrains Mono", monospace;
    font-size: 18px;
    font-weight: 800;
    color: #9bf9da;
    background: rgba(110, 247, 202, 0.12);
    border: 1.5px solid rgba(110, 247, 202, 0.45);
    padding: 8px 16px;
    border-radius: 12px;
    flex-shrink: 0;
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${coverBg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>
    <div class="mag-frame"></div>
    ${mastheadHtml(avatar, 'GREATER BAY GUIDE · 2569', '1 / 4')}

    <section class="hero" data-safe-check="hero">
      <div class="kicker-row">
        <span class="kicker-pill">จีน · ฮ่องกง · มาเก๊า</span>
        <span class="kicker-route">HKG ⇄ SZX · CAN · MFM</span>
      </div>
      <div class="headline-top">จีนต่อฮ่องกง?</div>
      <div class="headline-mega">เช็ก 2 พื้นที่</div>
      <div class="headline-bar">ก่อนกดซื้อซิม กันเน็ตดับตอนข้ามด่าน</div>
      <div class="sub-line">กวางโจว · เซินเจิ้น · ฮ่องกง · มาเก๊า แยกโครงข่ายกันคนละระบบ!</div>
    </section>

    <section class="bottom-teaser" data-safe-check="teaser">
      <div class="teaser-left">เทียบจริง <b>Airalo · Vacay · SIM2Fly · True GO</b><br>ใบเดียวจบ ไม่ต้องสลับซิม</div>
      <div class="teaser-tag">อัปเดต 27 พ.ย. 69</div>
    </section>

    <footer class="footer-plain" data-safe-check="footer">
      <span class="accent">ปัดขวาดูจุดพลาด + เทียบราคา 4 ตัวเลือกจริง →</span>
      <span class="domain">esim.whytobe.com</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 02: WHY SINGLE-COUNTRY SIM DROPS AT THE BORDER
// ============================================================================
function buildSlide02({ avatar, contentBg }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .bg-photo { object-position: center 40%; }
  .dark-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.90) 0%,
      rgba(9, 26, 40, 0.82) 55%,
      rgba(7, 19, 29, 0.94) 100%
    );
  }
  .head {
    position: absolute;
    top: 128px;
    left: 54px;
    right: 54px;
  }
  .kicker {
    font-family: "Kanit", sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #ffd166;
    margin-bottom: 6px;
  }
  .title {
    font-family: "Kanit", sans-serif;
    font-size: 54px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
    text-shadow: 0 4px 16px rgba(0, 0, 0, 0.65);
  }
  .title span { color: #6ef7ca; }

  .route-strip {
    position: absolute;
    top: 320px;
    left: 54px;
    right: 54px;
    background: rgba(14, 42, 58, 0.90);
    border: 1.8px solid rgba(78, 242, 190, 0.45);
    border-radius: 22px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .route-node {
    flex: 1;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 14px 12px;
    text-align: center;
  }
  .node-code {
    font-family: "JetBrains Mono", monospace;
    font-size: 16px;
    font-weight: 800;
    color: #ffd166;
    margin-bottom: 4px;
  }
  .node-name {
    font-family: "Kanit", sans-serif;
    font-size: 25px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
  }
  .node-sub {
    font-size: 16px;
    font-weight: 600;
    color: #b7d7e3;
    margin-top: 2px;
  }
  .route-arrow {
    font-family: "Kanit", sans-serif;
    font-size: 30px;
    font-weight: 900;
    color: #6ef7ca;
    flex-shrink: 0;
  }

  .compare-stack {
    position: absolute;
    top: 496px;
    left: 54px;
    right: 54px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .warn-card {
    background: rgba(45, 19, 25, 0.90);
    border: 2px solid rgba(255, 114, 114, 0.65);
    border-radius: 24px;
    padding: 24px 28px;
  }
  .ok-card {
    background: rgba(11, 47, 46, 0.92);
    border: 2px solid rgba(78, 242, 190, 0.68);
    border-radius: 24px;
    padding: 24px 28px;
  }
  .card-badge {
    display: inline-block;
    font-family: "Kanit", sans-serif;
    font-size: 20px;
    font-weight: 800;
    padding: 4px 15px;
    border-radius: 999px;
    margin-bottom: 10px;
  }
  .badge-red { background: #ff6b6b; color: #1f080a; }
  .badge-green { background: #4ef2be; color: #07221b; }
  .card-h {
    font-family: "Kanit", sans-serif;
    font-size: 30px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.25;
    margin-bottom: 8px;
  }
  .card-p {
    font-size: 22px;
    font-weight: 500;
    color: #e6f2f5;
    line-height: 1.44;
  }
  .card-p b { color: #ffd166; font-weight: 700; }

  .rule-box {
    position: absolute;
    top: 1054px;
    left: 54px;
    right: 54px;
    background: rgba(255, 255, 255, 0.96);
    border-left: 10px solid #e8a13d;
    border-radius: 20px;
    padding: 20px 24px;
    color: #0e2a3a;
  }
  .rule-box strong {
    font-family: "Kanit", sans-serif;
    font-size: 23px;
    font-weight: 800;
    color: #0e2a3a;
    display: block;
    margin-bottom: 3px;
  }
  .rule-box span {
    font-size: 20px;
    font-weight: 600;
    color: #304b59;
    line-height: 1.38;
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${contentBg}" alt="">
    <div class="dark-scrim"></div>
    <div class="mag-frame"></div>
    ${mastheadHtml(avatar, 'BORDER NETWORK TRAP · ทำไมเน็ตหลุด', '2 / 4')}

    <section class="head" data-safe-check="head">
      <div class="kicker">พลาดกันบ่อยสุดในทริปกวางโจว–เซินเจิ้น–ฮ่องกง</div>
      <h1 class="title">ซื้อซิมประเทศเดียว<br><span>ข้ามด่านปุ๊บ สัญญาณดับทันที</span></h1>
    </section>

    <section class="route-strip" data-safe-check="route">
      <div class="route-node">
        <div class="node-code">CN MAINLAND</div>
        <div class="node-name">กวางโจว / เซินเจิ้น</div>
        <div class="node-sub">โครงข่ายจีนแผ่นดินใหญ่</div>
      </div>
      <div class="route-arrow">⇄</div>
      <div class="route-node">
        <div class="node-code">HK SAR</div>
        <div class="node-name">ฮ่องกง</div>
        <div class="node-sub">แยกโครงข่ายเฉพาะ</div>
      </div>
      <div class="route-arrow">⇄</div>
      <div class="route-node">
        <div class="node-code">MO SAR</div>
        <div class="node-name">มาเก๊า</div>
        <div class="node-sub">แยกโครงข่ายเฉพาะ</div>
      </div>
    </section>

    <section class="compare-stack" data-safe-check="compare">
      <div class="warn-card">
        <span class="card-badge badge-red">× พลาดที่เจอบ่อย</span>
        <div class="card-h">ซื้อเฉพาะ eSIM จีน หรือเฉพาะ eSIM ฮ่องกง</div>
        <div class="card-p">• ซื้อเฉพาะฮ่องกง → นั่งรถไฟ West Kowloon เข้าเซินเจิ้น <b>เน็ตตัดทันที</b><br>• ซื้อเฉพาะจีน → ลงสนามบิน HKG ยังไม่มีเน็ตเปิดแผนที่<br>• ซื้อแยก 2 ใบ (HK 3GB ฿297.50 + จีน 3GB ฿367) = <b>฿664.50</b> แพงกว่าแถมต้องสลับสายเอง</div>
      </div>

      <div class="ok-card">
        <span class="card-badge badge-green">✓ ทางออกที่จบกว่า</span>
        <div class="card-h">เลือกแพ็ก 3 พื้นที่ (China + HK + Macau) ในใบเดียว</div>
        <div class="card-p">กดดูแท็บ <b>Supported Countries / พื้นที่รองรับ</b> ให้ครบทั้ง China (Mainland), Hong Kong และ Macau เครื่องจะสลับเสาอัตโนมัติตอนผ่านด่าน ไม่ต้องตั้งค่าใหม่</div>
      </div>
    </section>

    <section class="rule-box" data-safe-check="rule">
      <strong>เรื่อง LINE &amp; Google Maps ในฝั่งจีน</strong>
      <span>ใช้งานได้ไม่ต้องลง VPN แยก <b>เฉพาะแพ็กโรมมิ่งที่รองรับ</b><br>และห้ามต่อ Wi-Fi โรงแรมฝั่งจีน (Wi-Fi ท้องถิ่นติดบล็อก)</span>
    </section>

    <footer class="footer-plain" data-safe-check="footer">
      <span class="accent">ปัดขวาดูตารางเทียบราคาจริง 4 ตัวเลือก (อัปเดต 27 พ.ย. 69) →</span>
      <span class="domain">2 / 4</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 03: REAL 4-OPTION COMPARISON TABLE (VERIFIED 2026-11-27)
// ============================================================================
function buildSlide03({ avatar, contentBg }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .bg-photo { object-position: center 75%; }
  .dark-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.92) 0%,
      rgba(10, 28, 42, 0.86) 55%,
      rgba(7, 19, 29, 0.95) 100%
    );
  }
  .head {
    position: absolute;
    top: 124px;
    left: 54px;
    right: 54px;
  }
  .kicker {
    font-family: "Kanit", sans-serif;
    font-size: 21px;
    font-weight: 800;
    color: #ffd166;
    margin-bottom: 4px;
  }
  .title {
    font-family: "Kanit", sans-serif;
    font-size: 50px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
  }
  .title span { color: #6ef7ca; }

  .table-list {
    position: absolute;
    top: 264px;
    left: 54px;
    right: 54px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .plan-row {
    background: rgba(255, 255, 255, 0.96);
    border-radius: 22px;
    padding: 26px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
    border-left: 10px solid #0fa47a;
  }
  .plan-row.amber { border-left-color: #e8a13d; }
  .plan-row.navy { border-left-color: #2c6e8f; }
  .plan-left { flex: 1; }
  .plan-name-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 5px;
  }
  .plan-name {
    font-family: "Kanit", sans-serif;
    font-size: 29px;
    font-weight: 900;
    color: #0e2a3a;
    line-height: 1.15;
  }
  .plan-pill {
    font-family: "Kanit", sans-serif;
    font-size: 16px;
    font-weight: 800;
    padding: 3px 12px;
    border-radius: 999px;
  }
  .p-green { background: #dff8ef; color: #0b7a5b; }
  .p-amber { background: #fff0d1; color: #8c5200; }
  .p-blue  { background: #e3eff7; color: #195370; }
  .plan-detail {
    font-size: 20px;
    font-weight: 600;
    color: #2f4b5a;
    line-height: 1.38;
  }
  .plan-detail b { color: #0e2a3a; font-weight: 700; }
  .plan-detail code {
    font-family: "JetBrains Mono", monospace;
    background: #0e2a3a;
    color: #ffd166;
    font-size: 17px;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 6px;
  }

  .plan-right {
    text-align: right;
    flex-shrink: 0;
    min-width: 225px;
    border-left: 1.5px dashed rgba(14, 42, 58, 0.16);
    padding-left: 18px;
  }
  .price-main {
    font-family: "Kanit", sans-serif;
    font-size: 40px;
    font-weight: 900;
    color: #0b7a5b;
    line-height: 1.05;
  }
  .price-main.amber-txt { color: #b56500; }
  .price-main.navy-txt { color: #0e2a3a; }
  .price-sub {
    font-family: "Kanit", sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #4b6675;
    margin-top: 3px;
    line-height: 1.25;
  }
  .price-sub s { color: #8ea3ae; margin-right: 4px; }

  .footnote {
    position: absolute;
    top: 1096px;
    left: 54px;
    right: 54px;
    background: rgba(14, 42, 58, 0.88);
    border: 1.5px solid rgba(255, 209, 102, 0.45);
    border-radius: 18px;
    padding: 18px 24px;
    font-size: 20px;
    font-weight: 600;
    color: #e9f5f9;
    line-height: 1.4;
  }
  .footnote b { color: #ffd166; }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${contentBg}" alt="">
    <div class="dark-scrim"></div>
    <div class="mag-frame"></div>
    ${mastheadHtml(avatar, 'PRICE COMPARISON · ตรวจ 27 พ.ย. 2569', '3 / 4')}

    <section class="head" data-safe-check="head">
      <div class="kicker">ครอบคลุมครบ 3 พื้นที่ (จีน + ฮ่องกง + มาเก๊า) ในใบเดียว</div>
      <h1 class="title">เทียบราคา <span>4 ตัวเลือกข้ามแดน</span></h1>
    </section>

    <section class="table-list" data-safe-check="table">
      <div class="plan-row">
        <div class="plan-left">
          <div class="plan-name-row">
            <span class="plan-name">Airalo Asialink</span>
            <span class="plan-pill p-green">18 พื้นที่เอเชีย</span>
          </div>
          <div class="plan-detail">3GB/7 วัน ฿332.50 · 5GB/7 วัน ฿489.50<br>โค้ดลูกค้าใหม่ <code>NEWTOAIRALO15</code> ลด 15% · บัตร/Apple Pay</div>
        </div>
        <div class="plan-right">
          <div class="price-main">~฿416</div>
          <div class="price-sub"><s>฿489.50</s> 5GB/7 วัน<br>ลด 15% ครั้งแรก</div>
        </div>
      </div>

      <div class="plan-row amber">
        <div class="plan-left">
          <div class="plan-name-row">
            <span class="plan-name">Vacay (CN–HK–MO)</span>
            <span class="plan-pill p-amber">จ่าย PromptPay ได้</span>
          </div>
          <div class="plan-detail">แบรนด์ไทย เลือกวันเป๊ะ 1–30 วัน (รายวันเริ่ม ฿19/วัน)<br>ใส่โค้ด <code>THAF-TIWE</code> · เช็กเงื่อนไข FUP หน้าแพ็ก</div>
        </div>
        <div class="plan-right">
          <div class="price-main amber-txt">เริ่ม ฿89</div>
          <div class="price-sub">ราคาตามวัน &amp; GB<br>ไม่ต้องใช้บัตรเครดิต</div>
        </div>
      </div>

      <div class="plan-row navy">
        <div class="plan-left">
          <div class="plan-name-row">
            <span class="plan-name">AIS SIM2Fly / eSIM2Fly</span>
            <span class="plan-pill p-blue">ค่ายไทย · 10 วัน</span>
          </div>
          <div class="plan-detail">โรมมิ่งโซนเอเชีย ครบโควตาไหลต่อ <b>128 Kbps</b> ไม่ตัดขาด<br>ต้องลงทะเบียนยืนยันตัวตน (eKYC) ก่อนใช้งาน</div>
        </div>
        <div class="plan-right">
          <div class="price-main navy-txt">฿399</div>
          <div class="price-sub">6GB / 10 วัน<br>(เติมซิมเดิม ฿349)</div>
        </div>
      </div>

      <div class="plan-row navy">
        <div class="plan-left">
          <div class="plan-name-row">
            <span class="plan-name">True GO Travel SIM</span>
            <span class="plan-pill p-blue">คุ้ม 8–10 วัน</span>
          </div>
          <div class="plan-detail">6GB + โบนัส 2GB (ตามรอบโปร) · ไหลต่อ <b>128 Kbps</b><br>หรือแพ็กใหญ่ 16GB/10 วัน ฿549 · ต้องลงทะเบียนซิม</div>
        </div>
        <div class="plan-right">
          <div class="price-main navy-txt">฿399</div>
          <div class="price-sub">8GB / 10 วัน<br>(6GB + โบนัส 2GB)</div>
        </div>
      </div>
    </section>

    <section class="footnote" data-safe-check="footnote">
      <b>เทียบให้เห็นชัด:</b> ซื้อ eSIM แยก 2 ใบ (HK 3GB + จีน 3GB) รวม <b>฿664.50</b><br>กรุณาเช็กราคาและรายชื่อพื้นที่รองรับล่าสุดหน้าแพ็กก่อนชำระเงินทุกครั้ง
    </section>

    <footer class="footer-plain" data-safe-check="footer">
      <span class="accent">ปัดขวาดู 3 เช็กก่อนข้ามด่าน + สรุปโค้ดส่วนลด →</span>
      <span class="domain">3 / 4</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 04: 3 BORDER CHECKS + PERFORATED COUPON TICKET + PLAIN FOOTER
// ============================================================================
function buildSlide04({ avatar, contentBg, piTua, simPok }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .bg-photo { object-position: center 20%; }
  .dark-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.92) 0%,
      rgba(9, 27, 42, 0.85) 56%,
      rgba(6, 17, 26, 0.96) 100%
    );
  }
  .head {
    position: absolute;
    top: 124px;
    left: 54px;
    right: 54px;
  }
  .kicker {
    font-family: "Kanit", sans-serif;
    font-size: 21px;
    font-weight: 800;
    color: #6ef7ca;
    margin-bottom: 4px;
  }
  .title {
    font-family: "Kanit", sans-serif;
    font-size: 50px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
  }
  .title span { color: #ffd166; }

  .steps-card {
    position: absolute;
    top: 266px;
    left: 54px;
    right: 54px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 26px;
    padding: 30px 30px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.30);
  }
  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding-bottom: 20px;
    border-bottom: 1.5px dashed rgba(14, 42, 58, 0.14);
  }
  .step-item:last-child { padding-bottom: 0; border-bottom: none; }
  .step-num {
    width: 44px; height: 44px; border-radius: 13px;
    background: #0e2a3a; color: #ffd166;
    font-family: "JetBrains Mono", monospace; font-size: 24px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 2px;
  }
  .step-h {
    font-family: "Kanit", sans-serif;
    font-size: 27px;
    font-weight: 800;
    color: #0e2a3a;
    line-height: 1.24;
    margin-bottom: 3px;
  }
  .step-p {
    font-size: 21px;
    font-weight: 500;
    color: #324f5e;
    line-height: 1.38;
  }
  .step-p b { color: #0e2a3a; font-weight: 700; }

  /* Perforated coupon ticket ONLY on Slide 04 */
  .coupon-ticket {
    position: absolute;
    top: 760px;
    left: 54px;
    right: 54px;
    background: linear-gradient(135deg, #0d3347 0%, #12445c 100%);
    border: 2px solid rgba(78, 242, 190, 0.65);
    border-radius: 26px;
    padding: 24px 26px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.40);
  }
  .ticket-header {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding-bottom: 14px;
    padding-right: 190px;
    border-bottom: 2px dashed rgba(255, 255, 255, 0.26);
    margin-bottom: 16px;
  }
  .ticket-title {
    font-family: "Kanit", sans-serif;
    font-size: 27px;
    font-weight: 800;
    color: #ffd166;
    line-height: 1.2;
  }
  .ticket-sub {
    font-family: "JetBrains Mono", monospace;
    font-size: 15px;
    font-weight: 700;
    color: #9bf9da;
    letter-spacing: 1px;
  }
  .code-grid {
    display: flex;
    gap: 16px;
    padding-right: 184px;
  }
  .code-box {
    flex: 1;
    background: rgba(7, 23, 33, 0.72);
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    border-radius: 16px;
    padding: 14px 16px;
  }
  .code-brand {
    font-family: "Kanit", sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 4px;
  }
  .code-value {
    font-family: "JetBrains Mono", monospace;
    font-size: 24px;
    font-weight: 800;
    color: #ffd166;
    letter-spacing: 0.4px;
  }
  .code-note {
    font-size: 17px;
    font-weight: 600;
    color: #a9e8d4;
    margin-top: 3px;
  }

  .mascots-right {
    position: absolute;
    right: 60px;
    top: 804px;
    width: 196px;
    height: 214px;
    pointer-events: none;
  }
  .m-pi {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 162px;
    filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.42));
  }
  .m-simpok {
    position: absolute;
    left: -10px;
    bottom: 0;
    width: 98px;
    filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.42));
  }

  .plain-cta {
    position: absolute;
    top: 1094px;
    left: 54px;
    right: 54px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .cta-main {
    font-family: "Kanit", sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
  }
  .cta-main span { color: #6ef7ca; }
  .cta-url {
    font-family: "JetBrains Mono", monospace;
    font-size: 19px;
    font-weight: 800;
    color: #ffd166;
  }
  .cta-meta {
    font-size: 17px;
    font-weight: 500;
    color: rgba(232, 248, 243, 0.78);
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${contentBg}" alt="">
    <div class="dark-scrim"></div>
    <div class="mag-frame"></div>
    ${mastheadHtml(avatar, 'READY TO CROSS · จบครบในใบเดียว', '4 / 4')}

    <section class="head" data-safe-check="head">
      <div class="kicker">เซฟเก็บไว้เช็กก่อนขึ้นเครื่องไปกวางโจว–เซินเจิ้น–ฮ่องกง–มาเก๊า</div>
      <h1 class="title">เช็ก <span>3 จุดนี้</span> ข้ามด่านไม่สะดุด</h1>
    </section>

    <section class="steps-card" data-safe-check="steps">
      <div class="step-item">
        <div class="step-num">1</div>
        <div>
          <div class="step-h">กด *#06# เช็กเลข EID + ติดตั้งจากไทย</div>
          <div class="step-p">ห้ามรอสแกน QR ในฝั่งจีนเพราะอาจติดบล็อก · iPhone เครื่องศูนย์จีน/ฮ่องกงบางรุ่นไม่รองรับ eSIM</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-num">2</div>
        <div>
          <div class="step-h">ผูก Alipay / WeChat Pay + ตั้งรับ SMS OTP จากไทย</div>
          <div class="step-p">เตรียมแอปจ่ายเงินก่อนบิน และเปิดซิมไทยจับสัญญาณรับ OTP โดย <b>ปิด Data Roaming ของซิมไทย</b></div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-num">3</div>
        <div>
          <div class="step-h">ข้ามด่านแล้วสัญญาณค้าง? เปิด–ปิด Airplane Mode 1 ครั้ง</div>
          <div class="step-p">เครื่องจะสลับจับเสาฝั่งใหม่ทันที · เช็ก eKYC ฝั่งฮ่องกง (ถ้าแพ็กระบุ) และ <b>งดต่อ Wi-Fi รร. ในจีน</b></div>
        </div>
      </div>
    </section>

    <section class="coupon-ticket" data-safe-check="coupon">
      <div class="ticket-header">
        <div class="ticket-title">สรุปโค้ดส่วนลดสำหรับทริป 3 พื้นที่</div>
        <div class="ticket-sub">SIMPAINAI COUPON</div>
      </div>
      <div class="code-grid">
        <div class="code-box">
          <div class="code-brand">Airalo Asialink</div>
          <div class="code-value">NEWTOAIRALO15</div>
          <div class="code-note">ลด 15% ครั้งแรก · 5GB/7 วัน ~฿416</div>
        </div>
        <div class="code-box">
          <div class="code-brand">Vacay (CN–HK–MO)</div>
          <div class="code-value">THAF-TIWE</div>
          <div class="code-note">แบรนด์ไทย จ่าย PromptPay · เริ่ม ฿89</div>
        </div>
      </div>
    </section>

    <div class="mascots-right" data-safe-check="mascots">
      <img class="m-pi" src="${piTua}" alt="">
      <img class="m-simpok" src="${simPok}" alt="">
    </div>

    <section class="plain-cta" data-safe-check="cta">
      <div class="cta-main">ดูตารางเทียบเต็ม + วิธีตั้งค่าที่ <span>ลิงก์ในคอมเมนต์</span></div>
      <div class="cta-url">esim.whytobe.com/blog/esim-china-hong-kong-macau/</div>
      <div class="cta-meta">เซฟเก็บไว้ก่อนบิน · กดฟอล @simpainai · ลิงก์บทความมีลิงก์ affiliate ที่ทีมอาจได้รับค่าคอม</div>
    </section>
  </div>
</body>
</html>`;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const assets = {
    avatar: getBrandAvatar(),
    coverBg: toDataUri(join(SRC_DIR, 'cover-bg.png')),
    contentBg: toDataUri(join(SRC_DIR, 'content-bg.png')),
    piTua: toDataUri(join(PROJECT_ROOT, 'assets/brand/stickers/sticker-pi-tua-clean.png')),
    simPok: toDataUri(join(PROJECT_ROOT, 'assets/brand/stickers/sticker-nong-simpok.png')),
  };

  const jobs = [
    { file: 'slide-01.png', html: buildSlide01(assets) },
    { file: 'slide-02.png', html: buildSlide02(assets) },
    { file: 'slide-03.png', html: buildSlide03(assets) },
    { file: 'slide-04.png', html: buildSlide04(assets) },
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
        audit.minTop >= 40 &&
        audit.maxBottom <= 1315 &&
        audit.minLeft >= 40 &&
        audit.maxRight <= 1040;
      console.log(
        `[angle-f-china-hk-macau] ${job.file} | bounds y=${audit.minTop}..${audit.maxBottom}, x=${audit.minLeft}..${audit.maxRight} | ${safeOk ? 'PASS' : 'CHECK'}`
      );
      for (const c of audit.checked) {
        console.log(`   - ${c.name}: y=${c.top}..${c.bottom} x=${c.left}..${c.right}`);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
