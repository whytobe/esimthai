#!/usr/bin/env node
/**
 * Priority 1 — Breaking News Carousel Renderer (1080x1350, 4:5)
 * Topic: "WhatsApp จะขาย eSIM ในแอป บินเร็ว ๆ นี้ต้องรอไหม?"
 * Style: Bright Editorial News Card + Travel Survival Checklist
 * Output: assets/carousels/news-whatsapp-esim/slide-01.png .. slide-04.png
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

const OUT_DIR = join(PROJECT_ROOT, 'assets/carousels/news-whatsapp-esim');
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
    background: #eef4f3;
  }
  .bg-photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .bright-wash {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(244, 248, 247, 0.90) 0%,
      rgba(244, 248, 247, 0.78) 48%,
      rgba(235, 245, 242, 0.88) 100%
    );
  }
  .frame-border {
    position: absolute;
    inset: 22px;
    border: 2px solid rgba(14, 42, 58, 0.10);
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
    border-bottom: 2px solid rgba(14, 42, 58, 0.12);
  }
  .brand-lockup { display: flex; align-items: center; gap: 12px; }
  .brand-avatar {
    width: 48px; height: 48px; border-radius: 50%; object-fit: cover;
    border: 2.5px solid #0fa47a;
    box-shadow: 0 4px 12px rgba(14, 42, 58, 0.18);
  }
  .brand-text { display: flex; flex-direction: column; gap: 1px; }
  .brand-name {
    font-family: "Kanit", sans-serif; font-size: 23px; font-weight: 800;
    color: #0e2a3a; line-height: 1.1;
  }
  .brand-tag {
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800;
    color: #0fa47a; letter-spacing: 1.4px;
  }
  .page-pill {
    font-family: "JetBrains Mono", monospace; font-size: 19px; font-weight: 800;
    color: #0e2a3a; background: #ffffff;
    border: 2px solid rgba(14, 42, 58, 0.14);
    padding: 6px 18px; border-radius: 999px;
    box-shadow: 0 4px 12px rgba(14, 42, 58, 0.06);
  }
  .footer-plain {
    position: absolute;
    left: 54px;
    right: 54px;
    bottom: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "Kanit", sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #0e2a3a;
  }
  .footer-plain .hint {
    color: #0b7a5b;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .footer-plain .domain {
    font-family: "JetBrains Mono", monospace;
    font-size: 18px;
    font-weight: 800;
    color: #516b78;
  }
`;

function mastheadHtml(avatar, tag, pageNum) {
  return `<header class="masthead" data-safe-check="masthead">
    <div class="brand-lockup">
      <img class="brand-avatar" src="${avatar}" alt="">
      <div class="brand-text">
        <div class="brand-name">ซิมไปไหน · SimPaiNai</div>
        <div class="brand-tag">${tag}</div>
      </div>
    </div>
    <div class="page-pill">${pageNum}</div>
  </header>`;
}

// ============================================================================
// SLIDE 01: BREAKING NEWS COVER
// ============================================================================
function buildSlide01({ avatar, bg, piTua, simPok }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .bg-photo { object-position: center 35%; }
  .bright-wash {
    background: linear-gradient(
      180deg,
      rgba(244, 248, 247, 0.94) 0%,
      rgba(242, 248, 246, 0.78) 44%,
      rgba(14, 42, 58, 0.12) 72%,
      rgba(244, 248, 247, 0.94) 93%,
      rgba(244, 248, 247, 0.98) 100%
    );
  }
  .hero {
    position: absolute;
    top: 132px;
    left: 54px;
    right: 54px;
  }
  .news-kicker {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #0e2a3a;
    color: #ffffff;
    font-family: "Kanit", sans-serif;
    font-size: 22px;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: 999px;
    margin-bottom: 18px;
    box-shadow: 0 8px 20px rgba(14, 42, 58, 0.18);
  }
  .live-dot {
    width: 11px; height: 11px; border-radius: 50%;
    background: #4ef2be;
    box-shadow: 0 0 0 4px rgba(78, 242, 190, 0.28);
  }
  .news-date {
    color: #ffd166;
    font-family: "JetBrains Mono", monospace;
    font-size: 18px;
    font-weight: 800;
    margin-left: 4px;
  }
  .title-line1 {
    font-family: "Kanit", sans-serif;
    font-size: 80px;
    font-weight: 900;
    color: #0e2a3a;
    line-height: 1.08;
    letter-spacing: -1.2px;
  }
  .title-line1 .wa-green {
    color: #0fa47a;
  }
  .title-line2 {
    font-family: "Kanit", sans-serif;
    font-size: 66px;
    font-weight: 900;
    color: #0e2a3a;
    line-height: 1.15;
    margin-top: 2px;
  }
  .hook-pill {
    display: inline-block;
    margin-top: 16px;
    background: linear-gradient(95deg, #e8a13d 0%, #f5b951 100%);
    color: #0e2a3a;
    font-family: "Kanit", sans-serif;
    font-size: 46px;
    font-weight: 900;
    line-height: 1.2;
    padding: 10px 26px;
    border-radius: 18px;
    box-shadow: 0 10px 24px rgba(232, 161, 61, 0.34);
  }

  .news-card {
    position: absolute;
    top: 520px;
    left: 54px;
    right: 54px;
    background: rgba(255, 255, 255, 0.96);
    border: 2px solid rgba(14, 42, 58, 0.12);
    border-left: 10px solid #0fa47a;
    border-radius: 26px;
    padding: 28px 30px;
    box-shadow: 0 18px 40px rgba(14, 42, 58, 0.14);
  }
  .card-top-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
  }
  .icon-box {
    width: 58px; height: 58px; border-radius: 16px;
    background: linear-gradient(135deg, #0fa47a, #17c492);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 6px 16px rgba(15, 164, 122, 0.28);
  }
  .card-label {
    font-family: "Kanit", sans-serif;
    font-size: 27px;
    font-weight: 800;
    color: #0e2a3a;
    line-height: 1.2;
  }
  .card-sublabel {
    font-size: 19px;
    font-weight: 600;
    color: #4f6b78;
    margin-top: 2px;
  }
  .fact-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 14px;
  }
  .fact-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 24px;
    font-weight: 600;
    color: #163445;
    line-height: 1.38;
  }
  .fact-dot {
    width: 28px; height: 28px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-family: "Kanit", sans-serif; font-size: 16px; font-weight: 900;
    flex-shrink: 0; margin-top: 3px;
  }
  .fact-dot.green { background: #dff8ef; color: #0b7a5b; }
  .fact-dot.amber { background: #fff0d1; color: #9c5b00; }

  .verdict-bar {
    position: absolute;
    top: 890px;
    left: 54px;
    width: 650px;
    background: #0e2a3a;
    color: #ffffff;
    border-radius: 22px;
    padding: 22px 26px;
    box-shadow: 0 14px 30px rgba(14, 42, 58, 0.24);
  }
  .verdict-eyebrow {
    font-family: "Kanit", sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #ffd166;
    margin-bottom: 4px;
  }
  .verdict-text {
    font-family: "Kanit", sans-serif;
    font-size: 29px;
    font-weight: 800;
    line-height: 1.3;
    color: #ffffff;
  }
  .verdict-text span { color: #6ef7ca; }

  .mascot-cluster {
    position: absolute;
    right: 44px;
    bottom: 98px;
    width: 330px;
    height: 310px;
    pointer-events: none;
  }
  .mascot-pi {
    position: absolute;
    right: 6px;
    bottom: 0;
    width: 245px;
    filter: drop-shadow(0 14px 20px rgba(14, 42, 58, 0.28));
  }
  .mascot-simpok {
    position: absolute;
    left: 0;
    bottom: 8px;
    width: 145px;
    filter: drop-shadow(0 12px 16px rgba(14, 42, 58, 0.26));
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${bg}" alt="">
    <div class="bright-wash"></div>
    <div class="frame-border"></div>
    ${mastheadHtml(avatar, 'TRAVEL TECH UPDATE · 27 พ.ย. 2569', '1 / 4')}

    <section class="hero" data-safe-check="hero">
      <div class="news-kicker">
        <span class="live-dot"></span>
        <span>อัปเดตข่าวเดินทาง</span>
        <span class="news-date">26 พ.ย. 2569</span>
      </div>
      <div class="title-line1"><span class="wa-green">WhatsApp</span> จะขาย</div>
      <div class="title-line2">eSIM ในแอปแล้ว!</div>
      <div class="hook-pill">บินเร็ว ๆ นี้ต้องรอไหม?</div>
    </section>

    <section class="news-card" data-safe-check="news-card">
      <div class="card-top-row">
        <div class="icon-box">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="3"/>
            <path d="M9 7h6M9 11h6M9 15h3"/>
            <circle cx="16" cy="16" r="2" fill="#ffd166" stroke="none"/>
          </svg>
        </div>
        <div>
          <div class="card-label">สรุปประกาศอย่างเป็นทางการ</div>
          <div class="card-sublabel">อ้างอิงบล็อก WhatsApp ภาษาไทย · 26 พ.ย. 2569</div>
        </div>
      </div>
      <div class="fact-list">
        <div class="fact-item">
          <span class="fact-dot green">✓</span>
          <span>WhatsApp ประกาศทยอยเปิดซื้อแพ็กเน็ต eSIM เที่ยวในแอป <b>เริ่มบางประเทศก่อน</b></span>
        </div>
        <div class="fact-item">
          <span class="fact-dot amber">!</span>
          <span><b>ยังไม่ระบุวันเปิดใช้ในไทย</b> และยังไม่ประกาศราคาแพ็กเกจอย่างเป็นทางการ</span>
        </div>
      </div>
    </section>

    <section class="verdict-bar" data-safe-check="verdict">
      <div class="verdict-eyebrow">สรุปไวสำหรับคนมีตั๋วบินใกล้ ๆ นี้</div>
      <div class="verdict-text"><span>ไม่ต้องรอครับ</span> — เตรียมแพ็กที่ซื้อได้ตอนนี้และเช็ก 4 จุดก่อนบินให้พร้อมดีกว่า</div>
    </section>

    <div class="mascot-cluster" data-safe-check="mascots">
      <img class="mascot-pi" src="${piTua}" alt="">
      <img class="mascot-simpok" src="${simPok}" alt="">
    </div>

    <footer class="footer-plain" data-safe-check="footer">
      <span class="hint">ปัดขวาดู 3 ข้อจริง + เช็กลิสต์ก่อนบิน →</span>
      <span class="domain">esim.whytobe.com</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 02: 3 FACTS FROM THE ANNOUNCEMENT
// ============================================================================
function buildSlide02({ avatar, bg, nongChip }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .bg-photo { object-position: center 65%; }
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
    color: #0fa47a;
    margin-bottom: 6px;
  }
  .title {
    font-family: "Kanit", sans-serif;
    font-size: 56px;
    font-weight: 900;
    color: #0e2a3a;
    line-height: 1.16;
  }
  .title span { color: #0fa47a; }

  .cards {
    position: absolute;
    top: 326px;
    left: 54px;
    right: 54px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .fact-card {
    background: rgba(255, 255, 255, 0.96);
    border: 2px solid rgba(14, 42, 58, 0.10);
    border-radius: 24px;
    padding: 26px 28px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    box-shadow: 0 12px 28px rgba(14, 42, 58, 0.08);
  }
  .num-badge {
    width: 56px; height: 56px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-family: "JetBrains Mono", monospace;
    font-size: 28px; font-weight: 800; color: #ffffff;
    flex-shrink: 0; margin-top: 2px;
  }
  .n1 { background: #0e2a3a; }
  .n2 { background: #e8a13d; color: #0e2a3a; }
  .n3 { background: #0fa47a; }
  .fact-title {
    font-family: "Kanit", sans-serif;
    font-size: 31px;
    font-weight: 800;
    color: #0e2a3a;
    line-height: 1.24;
    margin-bottom: 6px;
  }
  .fact-desc {
    font-size: 23px;
    font-weight: 500;
    color: #314d5c;
    line-height: 1.42;
  }
  .fact-desc b { color: #0e2a3a; font-weight: 700; }

  .takeaway {
    position: absolute;
    top: 942px;
    left: 54px;
    right: 54px;
    background: linear-gradient(135deg, #0e2a3a 0%, #163f54 100%);
    border-radius: 26px;
    padding: 26px 210px 26px 30px;
    color: #ffffff;
    box-shadow: 0 16px 34px rgba(14, 42, 58, 0.22);
  }
  .takeaway-tag {
    font-family: "Kanit", sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #ffd166;
    margin-bottom: 6px;
  }
  .takeaway-body {
    font-family: "Kanit", sans-serif;
    font-size: 29px;
    font-weight: 700;
    line-height: 1.35;
  }
  .takeaway-body span { color: #6ef7ca; }
  .chip-sticker {
    position: absolute;
    right: 26px;
    bottom: 8px;
    width: 170px;
    filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.28));
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${bg}" alt="">
    <div class="bright-wash"></div>
    <div class="frame-border"></div>
    ${mastheadHtml(avatar, 'FACT CHECK · 3 ข้อต้องรู้ก่อนเข้าใจผิด', '2 / 4')}

    <section class="head" data-safe-check="head">
      <div class="kicker">แยกให้ชัดระหว่าง “ข่าว” กับ “แผนบินจริง”</div>
      <h1 class="title">3 ข้อจริงจากประกาศ<br><span>WhatsApp eSIM</span></h1>
    </section>

    <section class="cards" data-safe-check="cards">
      <div class="fact-card">
        <div class="num-badge n1">01</div>
        <div>
          <div class="fact-title">ทยอยเปิดทีละประเทศ ไม่ได้มาพร้อมกัน</div>
          <div class="fact-desc">WhatsApp ประกาศเมื่อ <b>26 พ.ย. 2569</b> ว่าจะทยอยเปิดเมนูซื้อ eSIM เดินทางในแอปเฉพาะบางประเทศก่อน จึงยังเห็นไม่ครบทุกบัญชี</div>
        </div>
      </div>

      <div class="fact-card">
        <div class="num-badge n2">02</div>
        <div>
          <div class="fact-title">ยังไม่ระบุวันเปิดในไทย และยังไม่บอกราคา</div>
          <div class="fact-desc">ประกาศยังไม่ยืนยันวันเปิดสำหรับผู้ใช้ในไทย รวมถึงราคาแพ็กเกจ โควตา GB และเครือข่ายปลายทางที่รองรับ</div>
        </div>
      </div>

      <div class="fact-card">
        <div class="num-badge n3">03</div>
        <div>
          <div class="fact-title">มือถือยังต้องรองรับ eSIM เหมือนเดิม</div>
          <div class="fact-desc">ต่อให้เมนูเปิดในแอปแล้ว เครื่องก็ยังต้องมีเลข <b>EID</b> และไม่ติดล็อกซิม จึงจะติดตั้งและใช้งาน eSIM ได้</div>
        </div>
      </div>
    </section>

    <section class="takeaway" data-safe-check="takeaway">
      <div class="takeaway-tag">คำแนะนำตรงไปตรงมา</div>
      <div class="takeaway-body">ถ้าบินเร็ว ๆ นี้ <span>ไม่ต้องรอเมนูใน WhatsApp</span><br>เตรียมแพ็กที่เช็กราคาและพื้นที่ได้จริงก่อนดีกว่าครับ</div>
      <img class="chip-sticker" src="${nongChip}" alt="">
    </section>

    <footer class="footer-plain" data-safe-check="footer">
      <span class="hint">ปัดขวาดูเช็กลิสต์ 4 ข้อก่อนบิน (ใช้ได้กับทุกเจ้า) →</span>
      <span class="domain">2 / 4</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 03: PRE-FLIGHT 4-POINT CHECKLIST
// ============================================================================
function buildSlide03({ avatar, bg, piTua }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .bg-photo { object-position: center 20%; }
  .head {
    position: absolute;
    top: 126px;
    left: 54px;
    right: 54px;
  }
  .kicker {
    display: inline-block;
    background: #dff8ef;
    color: #0b7a5b;
    font-family: "Kanit", sans-serif;
    font-size: 21px;
    font-weight: 800;
    padding: 5px 16px;
    border-radius: 999px;
    margin-bottom: 10px;
  }
  .title {
    font-family: "Kanit", sans-serif;
    font-size: 52px;
    font-weight: 900;
    color: #0e2a3a;
    line-height: 1.16;
  }
  .title span { color: #0fa47a; }

  .checklist-board {
    position: absolute;
    top: 326px;
    left: 54px;
    right: 54px;
    background: rgba(255, 255, 255, 0.97);
    border: 2px solid rgba(14, 42, 58, 0.12);
    border-radius: 28px;
    padding: 28px 30px;
    box-shadow: 0 18px 40px rgba(14, 42, 58, 0.10);
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  .check-row {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    padding-bottom: 18px;
    border-bottom: 1.5px dashed rgba(14, 42, 58, 0.14);
  }
  .check-row:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
  .check-box {
    width: 48px; height: 48px; border-radius: 14px;
    background: linear-gradient(135deg, #0fa47a, #15b88a);
    color: #ffffff;
    font-family: "Kanit", sans-serif;
    font-size: 28px; font-weight: 900;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 2px;
  }
  .check-title {
    font-family: "Kanit", sans-serif;
    font-size: 29px;
    font-weight: 800;
    color: #0e2a3a;
    line-height: 1.24;
    margin-bottom: 4px;
  }
  .check-title code {
    font-family: "JetBrains Mono", monospace;
    background: #eef6f4;
    color: #0b7a5b;
    padding: 1px 10px;
    border-radius: 8px;
    font-size: 25px;
  }
  .check-desc {
    font-size: 22px;
    font-weight: 500;
    color: #365261;
    line-height: 1.4;
  }
  .check-desc b { color: #0e2a3a; font-weight: 700; }

  .tip-strip {
    position: absolute;
    top: 1056px;
    left: 54px;
    width: 720px;
    background: #fff6e0;
    border: 2px solid #e8a13d;
    border-radius: 20px;
    padding: 20px 24px;
  }
  .tip-strip strong {
    font-family: "Kanit", sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #8a4d00;
    display: block;
    margin-bottom: 2px;
  }
  .tip-strip span {
    font-size: 21px;
    font-weight: 600;
    color: #4f3a1a;
    line-height: 1.35;
  }

  .pi-corner {
    position: absolute;
    right: 48px;
    bottom: 84px;
    width: 196px;
    filter: drop-shadow(0 12px 18px rgba(14, 42, 58, 0.24));
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${bg}" alt="">
    <div class="bright-wash"></div>
    <div class="frame-border"></div>
    ${mastheadHtml(avatar, 'PRE-FLIGHT CHECKLIST · เซฟไว้เช็กก่อนบิน', '3 / 4')}

    <section class="head" data-safe-check="head">
      <div class="kicker">ใช้ได้ไม่ว่าจะเลือก eSIM เจ้าไหนหรือโรมมิ่ง</div>
      <h1 class="title">เช็กลิสต์ <span>4 ข้อก่อนบิน</span><br>กันพลาดเรื่องเน็ตตั้งแต่อยู่ไทย</h1>
    </section>

    <section class="checklist-board" data-safe-check="checklist">
      <div class="check-row">
        <div class="check-box">1</div>
        <div>
          <div class="check-title">กด <code>*#06#</code> เช็กเลข EID บนเครื่องจริง</div>
          <div class="check-desc">ยืนยันว่ารองรับ eSIM และไม่ติดล็อกเครือข่าย (iPhone ศูนย์จีน/ฮ่องกงรุ่น 2 ซิมกายภาพหลายรุ่นไม่รองรับ)</div>
        </div>
      </div>

      <div class="check-row">
        <div class="check-box">2</div>
        <div>
          <div class="check-title">อ่านวันเริ่มนับแพ็ก &amp; เงื่อนไขแชร์ Hotspot</div>
          <div class="check-desc">แยกให้ชัดว่าแพ็ก <b>เริ่มนับตอนติดตั้ง</b> หรือ <b>เริ่มนับเมื่อจับสัญญาณปลายทาง</b><br>และเช็กว่าลดสปีดหรือตัดเน็ตเมื่อครบโควตา</div>
        </div>
      </div>

      <div class="check-row">
        <div class="check-box">3</div>
        <div>
          <div class="check-title">เช็กรายชื่อประเทศปลายทางให้ครบทุกเมือง</div>
          <div class="check-desc">เช่น ถ้ามีแวะต่อเครื่องหรือข้ามฝั่ง (จีน–ฮ่องกง–มาเก๊า) ต้องดูรายชื่อพื้นที่รองรับในหน้าแพ็กก่อนจ่าย</div>
        </div>
      </div>

      <div class="check-row">
        <div class="check-box">4</div>
        <div>
          <div class="check-title">ตั้งค่า Dual-SIM ให้ซิมไทยรับ SMS OTP ได้</div>
          <div class="check-desc">ใช้สายเที่ยวเป็นเน็ต เปิดซิมไทยจับสัญญาณรับ SMS แต่ <b>ปิด Data Roaming ของซิมไทย</b> + ปิดสลับสายเน็ตอัตโนมัติ</div>
        </div>
      </div>
    </section>

    <section class="tip-strip" data-safe-check="tip">
      <strong>ทิปกันเน็ตค้างหน้าสนามบิน</strong>
      <span>ติดตั้ง eSIM ผ่าน Wi-Fi บ้านก่อนบินให้เสร็จ<br>พร้อมดาวน์โหลดแผนที่ออฟไลน์เผื่อไว้ 1 ชั้น</span>
    </section>

    <img class="pi-corner" src="${piTua}" alt="" data-safe-check="mascot">

    <footer class="footer-plain" data-safe-check="footer">
      <span class="hint">ปัดขวาดูวิธีเลือกทางที่เหมาะกับทริปคุณ →</span>
      <span class="domain">3 / 4</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 04: PRACTICAL OPTIONS + SOFT CLOSING (NO HARD SELL, NO FAKE BUTTON)
// ============================================================================
function buildSlide04({ avatar, bg, simPok }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .bg-photo { object-position: center 45%; }
  .head {
    position: absolute;
    top: 126px;
    left: 54px;
    right: 54px;
  }
  .kicker {
    font-family: "Kanit", sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #0fa47a;
    margin-bottom: 6px;
  }
  .title {
    font-family: "Kanit", sans-serif;
    font-size: 52px;
    font-weight: 900;
    color: #0e2a3a;
    line-height: 1.16;
  }
  .title span { color: #0fa47a; }

  .options {
    position: absolute;
    top: 322px;
    left: 54px;
    right: 54px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  .opt-card {
    background: rgba(255, 255, 255, 0.96);
    border: 2px solid rgba(14, 42, 58, 0.11);
    border-radius: 24px;
    padding: 26px 28px;
    box-shadow: 0 10px 26px rgba(14, 42, 58, 0.08);
  }
  .opt-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }
  .opt-trip {
    font-family: "Kanit", sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #0e2a3a;
  }
  .opt-tag {
    font-family: "Kanit", sans-serif;
    font-size: 19px;
    font-weight: 800;
    padding: 5px 15px;
    border-radius: 999px;
    flex-shrink: 0;
  }
  .tag-green { background: #dff8ef; color: #0b7a5b; }
  .tag-amber { background: #fff0d1; color: #8c5200; }
  .tag-navy  { background: #e3edf3; color: #0e2a3a; }
  .opt-desc {
    font-size: 22px;
    font-weight: 500;
    color: #34505f;
    line-height: 1.42;
  }
  .opt-desc b { color: #0e2a3a; font-weight: 700; }

  .closing-card {
    position: absolute;
    top: 868px;
    left: 54px;
    right: 54px;
    background: #0e2a3a;
    border-radius: 28px;
    padding: 28px 215px 28px 32px;
    color: #ffffff;
    box-shadow: 0 18px 36px rgba(14, 42, 58, 0.24);
  }
  .closing-save {
    font-family: "Kanit", sans-serif;
    font-size: 32px;
    font-weight: 900;
    color: #ffd166;
    line-height: 1.24;
    margin-bottom: 10px;
  }
  .closing-text {
    font-size: 22px;
    font-weight: 500;
    color: #e4f2f7;
    line-height: 1.45;
  }
  .closing-text b { color: #6ef7ca; font-weight: 700; }
  .closing-url {
    margin-top: 12px;
    font-family: "JetBrains Mono", monospace;
    font-size: 20px;
    font-weight: 800;
    color: #8bf7d2;
  }
  .closing-note {
    margin-top: 6px;
    font-size: 17px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.72);
  }
  .simpok-sticker {
    position: absolute;
    right: 26px;
    bottom: 14px;
    width: 172px;
    filter: drop-shadow(0 12px 18px rgba(0, 0, 0, 0.34));
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${bg}" alt="">
    <div class="bright-wash"></div>
    <div class="frame-border"></div>
    ${mastheadHtml(avatar, 'SUMMARY · ตัวเลือกที่ใช้ได้จริงตอนนี้', '4 / 4')}

    <section class="head" data-safe-check="head">
      <div class="kicker">ถ้ามีไฟลต์เร็ว ๆ นี้ และยังไม่มีเมนูใน WhatsApp</div>
      <h1 class="title">เลือกทางที่ตรงทริป<br><span>จบได้ตอนนี้</span> แบบไม่ต้องลุ้น</h1>
    </section>

    <section class="options" data-safe-check="options">
      <div class="opt-card">
        <div class="opt-head">
          <div class="opt-trip">ทริปสั้น 3–7 วัน · ติดตั้งในแอปไว</div>
          <span class="opt-tag tag-green">แอป eSIM สากล</span>
        </div>
        <div class="opt-desc">เทียบ <b>Airalo / Ubigi / Nomad</b> ตามประเทศและจำนวน GB ที่ใช้จริง (เช็กโควตาแชร์ Hotspot ก่อนจ่าย)</div>
      </div>

      <div class="opt-card">
        <div class="opt-head">
          <div class="opt-trip">ไม่มีบัตรเครดิต · อยากจ่าย PromptPay</div>
          <span class="opt-tag tag-amber">จ่ายพร้อมเพย์</span>
        </div>
        <div class="opt-desc">ดูแพลตฟอร์มแบรนด์ไทยอย่าง <b>Vacay</b> ที่รองรับ PromptPay และเลือกจำนวนวันตรงกับตั๋วบินได้</div>
      </div>

      <div class="opt-card">
        <div class="opt-head">
          <div class="opt-trip">ทริป 8–10 วัน · อยากได้เน็ตสำรองไหลช้า</div>
          <span class="opt-tag tag-navy">ค่ายมือถือไทย</span>
        </div>
        <div class="opt-desc"><b>AIS SIM2Fly / True GO</b> หรือโรมมิ่งค่ายเดิม ตั้งค่าน้อยและยังไหลต่อหลังครบโควตาความเร็วเต็ม</div>
      </div>
    </section>

    <section class="closing-card" data-safe-check="closing">
      <div class="closing-save">เซฟโพสต์นี้ไว้เช็กก่อนบินได้เลย!</div>
      <div class="closing-text">ถ้าอยากดูตารางเทียบ 5 เจ้าหลักแบบไม่อวย (ราคา · Hotspot · เติมเงิน) <b>อ่านต่อได้ที่ลิงก์ในคอมเมนต์</b></div>
      <div class="closing-url">esim.whytobe.com/blog/where-to-buy-esim/</div>
      <div class="closing-note">หมายเหตุ: บทความมีลิงก์ affiliate ที่ทีมอาจได้รับค่าคอม · ถ้ารอข่าว WhatsApp เปิดไทย กดฟอลไว้เดี๋ยวอัปเดตให้ครับ</div>
      <img class="simpok-sticker" src="${simPok}" alt="">
    </section>

    <footer class="footer-plain" data-safe-check="footer">
      <span class="hint">ติดตาม @simpainai อัปเดตข่าวซิมเที่ยวแบบตรงไปตรงมา</span>
      <span class="domain">4 / 4</span>
    </footer>
  </div>
</body>
</html>`;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const assets = {
    avatar: getBrandAvatar(),
    bg: toDataUri(join(SRC_DIR, 'airport-bg.png')),
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
        `[news-whatsapp-esim] ${job.file} | bounds y=${audit.minTop}..${audit.maxBottom}, x=${audit.minLeft}..${audit.maxRight} | ${safeOk ? 'PASS' : 'CHECK'}`
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
