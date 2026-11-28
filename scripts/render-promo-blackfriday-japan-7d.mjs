#!/usr/bin/env node
/**
 * Priority 1 — Black Friday Japan 7-Day Honest Comparison Carousel (1080x1350, 4:5)
 * Style: Style A — Editorial Magazine Full-Bleed
 * Angle: "Black Friday ลด 25% แต่แพ็กเล็กอาจจ่ายน้อยกว่า เช็กยอดสุทธิก่อนกด!"
 * Verified facts (2026-11-28):
 *   - Airalo Black Friday 2026 terms: airalo.com/campaign-terms/Black-Friday-2026
 *     (25% off eligible Unlimited plans with code BLACK25, ends 30 Nov 23:59 UTC = 1 Dec 06:59 ICT,
 *      1x per customer, manual code entry on Offer page, cannot combine with other discounts)
 *   - Airalo Japan public THB prices: airalo.com/japan-esim (7d Unlimited = ฿926.50 -> ~฿695 after 25%)
 *   - Blog guides: src/content/blog/esim-japan-how-many-gb.md & esim-japan-vs-sim-card.md
 * Strict Real-Device iPhone 15 Pro Max Safe Zone:
 *   - ALL critical text/cards/coupons/URLs strictly inside y = 60..1160, x = 54..1026
 *   - Bottom 190px (y = 1160..1350) clean scenery only, ZERO fake buttons, ZERO "100%" overclaims
 * Output: assets/carousels/promo-blackfriday-japan-7d/slide-01.png .. slide-04.png
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

const OUT_DIR = join(PROJECT_ROOT, 'assets/carousels/promo-blackfriday-japan-7d');
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
    inset: 24px;
    border: 1.5px solid rgba(255, 255, 255, 0.14);
    border-radius: 30px;
    pointer-events: none;
  }
  .masthead {
    position: absolute;
    top: 62px;
    left: 56px;
    right: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.22);
  }
  .brand-lockup { display: flex; align-items: center; gap: 12px; }
  .brand-avatar {
    width: 44px; height: 44px; border-radius: 50%; object-fit: cover;
    border: 2.5px solid #4ef2be;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
  }
  .brand-text { display: flex; flex-direction: column; gap: 1px; }
  .brand-name {
    font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 800;
    color: #ffffff; line-height: 1.08;
    text-shadow: 0 2px 8px rgba(0,0,0,0.65);
  }
  .brand-issue {
    font-family: "JetBrains Mono", monospace; font-size: 13px; font-weight: 700;
    color: #ffd166; letter-spacing: 1.4px; text-transform: uppercase;
  }
  .page-pill {
    font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 800;
    color: #e9fff7; background: rgba(14, 42, 58, 0.78);
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(78, 242, 190, 0.5);
    padding: 5px 16px; border-radius: 999px;
  }
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
    color: #e8f8f3;
    text-shadow: 0 2px 10px rgba(4, 14, 22, 0.9);
  }
  .safe-footer .accent { color: #ffd166; }
  .safe-footer .domain {
    font-family: "JetBrains Mono", monospace;
    font-size: 17px; font-weight: 800; color: #8bf7d2;
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
// SLIDE 01: EDITORIAL FULL-BLEED COVER (y = 62..1152)
// ============================================================================
function buildSlide01({ avatar, coverBg }) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_CSS}
  .bg-photo { object-position: center 46%; }
  .scrim-top {
    position: absolute; top: 0; left: 0; right: 0; height: 590px;
    background: linear-gradient(
      180deg,
      rgba(7, 20, 31, 0.94) 0%,
      rgba(9, 27, 42, 0.80) 56%,
      rgba(11, 31, 45, 0.14) 85%,
      rgba(11, 31, 45, 0) 100%
    );
  }
  .scrim-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 390px;
    background: linear-gradient(
      0deg,
      rgba(6, 17, 26, 0.90) 0%,
      rgba(8, 22, 34, 0.56) 52%,
      rgba(10, 26, 39, 0) 100%
    );
  }
  .hero {
    position: absolute;
    top: 136px;
    left: 56px;
    right: 56px;
  }
  .kicker-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .kicker-pill {
    display: inline-flex; align-items: center;
    background: linear-gradient(95deg, #e8a13d, #f5b951);
    color: #0b1f2d; font-family: "Kanit", sans-serif;
    font-size: 21px; font-weight: 900; padding: 5px 18px; border-radius: 999px;
    box-shadow: 0 6px 16px rgba(232, 161, 61, 0.36);
  }
  .kicker-exp {
    font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 800;
    color: #9bf9da; letter-spacing: 0.8px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
  }
  .headline-top {
    font-family: "Kanit", sans-serif; font-size: 56px; font-weight: 900;
    color: #ffffff; line-height: 1.14;
    text-shadow: 0 4px 18px rgba(5, 14, 22, 0.92);
  }
  .headline-mega {
    font-family: "Kanit", sans-serif; font-size: 80px; font-weight: 900;
    line-height: 1.08; letter-spacing: -1px; color: #ffd166;
    -webkit-text-stroke: 2.5px #081a26; paint-order: stroke fill;
    text-shadow: 0 10px 24px rgba(4, 12, 20, 0.92), 0 4px 0 #081a26;
    margin-top: 2px;
  }
  .headline-bar {
    margin-top: 10px; display: inline-flex; align-items: center;
    background: linear-gradient(95deg, #0fa47a 0%, #10b981 100%);
    color: #ffffff; font-family: "Kanit", sans-serif;
    font-size: 32px; font-weight: 800; padding: 9px 22px; border-radius: 15px;
    box-shadow: 0 10px 24px rgba(15, 164, 122, 0.42), 0 0 0 1.5px rgba(255,255,255,0.22) inset;
  }
  .sub-line {
    margin-top: 10px; font-family: "Anuphan", sans-serif;
    font-size: 23px; font-weight: 700; color: #edf8fb;
    text-shadow: 0 2px 12px rgba(4, 14, 22, 0.95);
  }

  .bottom-teaser {
    position: absolute;
    left: 56px;
    right: 56px;
    top: 1010px;
    background: rgba(10, 31, 45, 0.91);
    backdrop-filter: blur(14px);
    border: 1.6px solid rgba(78, 242, 190, 0.55);
    border-radius: 20px;
    padding: 15px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.44);
  }
  .teaser-top {
    display: flex; align-items: center; justify-content: space-between; gap: 14px;
  }
  .teaser-left {
    font-family: "Kanit", sans-serif; font-size: 23px; font-weight: 700; color: #ffffff; line-height: 1.26;
  }
  .teaser-left b { color: #ffd166; }
  .teaser-tag {
    font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 800;
    color: #9bf9da; background: rgba(110, 247, 202, 0.12);
    border: 1.5px solid rgba(110, 247, 202, 0.45);
    padding: 6px 14px; border-radius: 10px; flex-shrink: 0;
  }
  .teaser-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 8px; border-top: 1px dashed rgba(255, 255, 255, 0.22);
    font-family: "Kanit", sans-serif; font-size: 19px; font-weight: 700; color: #ffd166;
  }
  .teaser-foot .dom {
    font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 800; color: #8bf7d2;
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${coverBg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>
    <div class="mag-frame"></div>
    ${mastheadHtml(avatar, 'JAPAN 7-DAY CHECK · BLACK FRIDAY 2569', '1 / 4')}

    <section class="hero" data-safe-check="hero">
      <div class="kicker-row">
        <span class="kicker-pill">BLACK25 ลด 25%</span>
        <span class="kicker-exp">หมดเขต 1 ธ.ค. 06:59 น. (เวลาไทย)</span>
      </div>
      <div class="headline-top">ญี่ปุ่น 7 วัน ลด 25%</div>
      <div class="headline-mega">คุ้มจริงไหม?</div>
      <div class="headline-bar">แพ็กเล็กอาจจ่ายน้อยกว่า เช็กยอดสุทธิก่อนกด!</div>
      <div class="sub-line">เทียบชัด Airalo Unlimited ลด 25% vs แพ็ก 5GB vs Vacay &amp; ซิมค่ายไทย</div>
    </section>

    <section class="bottom-teaser" data-safe-check="teaser">
      <div class="teaser-top">
        <div class="teaser-left">โปร <b>BLACK25</b> ใช้ได้เฉพาะ <b>แพ็ก Unlimited ที่ร่วมรายการ</b><br>ทริปญี่ปุ่น 7 วันเทียบราคาจริงวันต่อวัน</div>
        <div class="teaser-tag">เช็ก 28 พ.ย. 69</div>
      </div>
      <div class="teaser-foot">
        <span>ปัดขวาเช็กกติกา BLACK25 + ยอดจ่ายสุทธิ 4 ตัวเลือก →</span>
        <span class="dom">esim.whytobe.com</span>
      </div>
    </section>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 02: BLACK25 RULES + REAL DATA USAGE IN JAPAN (y = 62..1152)
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
    position: absolute; inset: 0;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.92) 0%,
      rgba(9, 26, 40, 0.85) 55%,
      rgba(7, 19, 29, 0.92) 100%
    );
  }
  .head { position: absolute; top: 132px; left: 56px; right: 56px; }
  .kicker { font-family: "Kanit", sans-serif; font-size: 20px; font-weight: 800; color: #ffd166; margin-bottom: 4px; }
  .title { font-family: "Kanit", sans-serif; font-size: 48px; font-weight: 900; color: #ffffff; line-height: 1.15; }
  .title span { color: #6ef7ca; }

  .rule-card {
    position: absolute;
    top: 294px;
    left: 56px;
    right: 56px;
    background: rgba(255, 255, 255, 0.96);
    border-left: 10px solid #e8a13d;
    border-radius: 22px;
    padding: 22px 26px;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.30);
  }
  .rc-title {
    font-family: "Kanit", sans-serif; font-size: 28px; font-weight: 900; color: #0e2a3a; margin-bottom: 10px;
  }
  .rc-list { display: flex; flex-direction: column; gap: 9px; }
  .rc-item {
    display: flex; align-items: flex-start; gap: 12px;
    font-size: 21px; font-weight: 600; color: #264352; line-height: 1.36;
  }
  .rc-dot {
    width: 26px; height: 26px; border-radius: 8px; background: #0e2a3a; color: #ffd166;
    font-family: "JetBrains Mono", monospace; font-size: 15px; font-weight: 800;
    display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
  }
  .rc-item b { color: #0e2a3a; font-weight: 700; }

  .usage-card {
    position: absolute;
    top: 668px;
    left: 56px;
    right: 56px;
    background: rgba(11, 46, 48, 0.92);
    border: 2px solid rgba(78, 242, 190, 0.65);
    border-radius: 22px;
    padding: 22px 26px;
    color: #ffffff;
  }
  .uc-eyebrow { font-family: "Kanit", sans-serif; font-size: 19px; font-weight: 800; color: #ffd166; margin-bottom: 4px; }
  .uc-title { font-family: "Kanit", sans-serif; font-size: 31px; font-weight: 900; line-height: 1.2; margin-bottom: 12px; }
  .uc-title span { color: #6ef7ca; }
  .uc-grid { display: flex; gap: 14px; }
  .uc-box {
    flex: 1; background: rgba(7, 22, 31, 0.72);
    border: 1.5px solid rgba(255, 255, 255, 0.16);
    border-radius: 16px; padding: 14px 16px;
  }
  .uc-b-tag { font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 800; color: #ffd166; margin-bottom: 4px; }
  .uc-b-val { font-family: "Kanit", sans-serif; font-size: 28px; font-weight: 900; color: #6ef7ca; line-height: 1.15; }
  .uc-b-desc { font-size: 18px; font-weight: 500; color: #dff2f7; line-height: 1.35; margin-top: 4px; }
  .uc-note {
    margin-top: 12px; font-size: 18px; font-weight: 600; color: #bfece0;
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${contentBg}" alt="">
    <div class="dark-scrim"></div>
    <div class="mag-frame"></div>
    ${mastheadHtml(avatar, 'TERMS & REAL DATA · อ่านก่อนรีบกดลด 25%', '2 / 4')}

    <section class="head" data-safe-check="head">
      <div class="kicker">กติกาจริงจากหน้าเงื่อนไข Airalo Black Friday 2026</div>
      <h1 class="title">4 กติกา <span>BLACK25</span> + เน็ตที่ใช้จริง<br>ในทริปญี่ปุ่น 5–7 วัน</h1>
    </section>

    <section class="rule-card" data-safe-check="rules">
      <div class="rc-title">เงื่อนไขโปร BLACK25 ที่ต้องรู้ก่อนจ่าย</div>
      <div class="rc-list">
        <div class="rc-item"><span class="rc-dot">1</span><span><b>เฉพาะแพ็ก Unlimited ที่ร่วมรายการบนหน้าโปร</b> เท่านั้น (แพ็กโควตา GB ปกติไม่ร่วม)</span></div>
        <div class="rc-item"><span class="rc-dot">2</span><span>ต้องกรอกโค้ด <b>BLACK25</b> เองตอนชำระเงิน (ไม่ลดอัตโนมัติ) หมดเขต <b>1 ธ.ค. 06:59 น.</b></span></div>
        <div class="rc-item"><span class="rc-dot">3</span><span>ใช้ได้ทั้งลูกค้าใหม่-เก่า <b>จำกัด 1 ครั้ง/คน</b> และ <b>ใช้ซ้อนโค้ดหรือส่วนลดอื่นไม่ได้</b></span></div>
        <div class="rc-item"><span class="rc-dot">4</span><span>แพ็ก Unlimited มี <b>Fair Usage Policy (FUP)</b> ลดสปีดเมื่อใช้หนักต่อวัน (เช็กหน้าแพ็กก่อนจ่าย)</span></div>
      </div>
    </section>

    <section class="usage-card" data-safe-check="usage">
      <div class="uc-eyebrow">เช็กนิสัยใช้เน็ตก่อนเลือกแพ็ก</div>
      <div class="uc-title">ทริปญี่ปุ่น 5–7 วัน <span>คนส่วนใหญ่ใช้เน็ตจริงเท่าไร?</span></div>
      <div class="uc-grid">
        <div class="uc-box">
          <div class="uc-b-tag">สายเที่ยวทั่วไป (ใช้ Wi-Fi รร. กลางคืน)</div>
          <div class="uc-b-val">~3–5 GB / ทริป</div>
          <div class="uc-b-desc">Google Maps · รถไฟ · แชต LINE · ค้นรีวิวร้าน (~0.5–0.8 GB/วัน)</div>
        </div>
        <div class="uc-box">
          <div class="uc-b-tag">สายอัปคลิป / แชร์ Hotspot 2 เครื่อง</div>
          <div class="uc-b-val">10 GB+ / ทริป</div>
          <div class="uc-b-desc">อัป Reels/TikTok นอกสถานที่ หรือแชร์เน็ต (~1.2–2.0 GB/วัน)</div>
        </div>
      </div>
      <div class="uc-note">ทิป: ปิดสำรองรูป iCloud/Google Photos บนเน็ตมือถือ + เปิด Low Data Mode ช่วยเซฟเน็ตได้เยอะ</div>
    </section>

    <footer class="safe-footer" data-safe-check="footer">
      <span class="accent">ปัดขวาเทียบยอดสุทธิญี่ปุ่น 7 วัน (ราคาตรวจจริง 28 พ.ย. 69) →</span>
      <span class="domain">2 / 4</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 03: REAL NET PRICE COMPARISON FOR JAPAN 7 DAYS (y = 62..1152)
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
    position: absolute; inset: 0;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.92) 0%,
      rgba(10, 28, 42, 0.86) 55%,
      rgba(7, 19, 29, 0.93) 100%
    );
  }
  .head { position: absolute; top: 130px; left: 56px; right: 56px; }
  .kicker { font-family: "Kanit", sans-serif; font-size: 20px; font-weight: 800; color: #ffd166; margin-bottom: 4px; }
  .title { font-family: "Kanit", sans-serif; font-size: 46px; font-weight: 900; color: #ffffff; line-height: 1.14; }
  .title span { color: #6ef7ca; }

  .table-list {
    position: absolute;
    top: 244px;
    left: 56px;
    right: 56px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .plan-row {
    background: rgba(255, 255, 255, 0.96);
    border-radius: 20px;
    padding: 19px 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.28);
    border-left: 10px solid #0fa47a;
  }
  .plan-row.bf { border-left-color: #e8a13d; background: #fffdf6; }
  .plan-row.amber { border-left-color: #d97706; }
  .plan-row.navy { border-left-color: #2c6e8f; }
  .plan-left { flex: 1; }
  .plan-name-row { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; margin-bottom: 4px; }
  .plan-name { font-family: "Kanit", sans-serif; font-size: 27px; font-weight: 900; color: #0e2a3a; line-height: 1.15; }
  .plan-pill { font-family: "Kanit", sans-serif; font-size: 15px; font-weight: 800; padding: 3px 11px; border-radius: 999px; }
  .p-gold  { background: #fff0c7; color: #8c4b00; }
  .p-green { background: #dff8ef; color: #0b7a5b; }
  .p-amber { background: #ffedd5; color: #9a3412; }
  .p-blue  { background: #e3eff7; color: #195370; }
  .plan-detail { font-size: 19px; font-weight: 600; color: #2f4b5a; line-height: 1.38; }
  .plan-detail b { color: #0e2a3a; font-weight: 700; }
  .plan-detail code {
    font-family: "JetBrains Mono", monospace; background: #0e2a3a; color: #ffd166;
    font-size: 15px; font-weight: 800; padding: 2px 7px; border-radius: 6px;
  }

  .plan-right {
    text-align: right; flex-shrink: 0; min-width: 222px;
    border-left: 1.5px dashed rgba(14, 42, 58, 0.16); padding-left: 16px;
  }
  .price-main { font-family: "Kanit", sans-serif; font-size: 38px; font-weight: 900; color: #0b7a5b; line-height: 1.05; }
  .price-main.bf-txt { color: #a85500; }
  .price-main.navy-txt { color: #0e2a3a; }
  .price-sub { font-family: "Kanit", sans-serif; font-size: 16px; font-weight: 700; color: #4b6675; margin-top: 3px; line-height: 1.24; }
  .price-sub s { color: #8ea3ae; margin-right: 4px; }

  .footnote {
    position: absolute;
    top: 974px;
    left: 56px;
    right: 56px;
    background: rgba(14, 42, 58, 0.90);
    border: 1.5px solid rgba(255, 209, 102, 0.45);
    border-radius: 18px;
    padding: 16px 22px;
    font-size: 19px; font-weight: 600; color: #e9f5f9; line-height: 1.4;
  }
  .footnote b { color: #ffd166; }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${contentBg}" alt="">
    <div class="dark-scrim"></div>
    <div class="mag-frame"></div>
    ${mastheadHtml(avatar, 'NET PRICE CHECK · ตรวจจริง 28 พ.ย. 2569', '3 / 4')}

    <section class="head" data-safe-check="head">
      <div class="kicker">เทียบยอดจ่ายสุทธิจริงสำหรับทริปญี่ปุ่น 7 วัน</div>
      <h1 class="title">ลด 25% <span>vs แพ็กโควตา &amp; ซิมไทย</span></h1>
    </section>

    <section class="table-list" data-safe-check="table">
      <div class="plan-row bf">
        <div class="plan-left">
          <div class="plan-name-row">
            <span class="plan-name">Airalo Unlimited (7 วัน)</span>
            <span class="plan-pill p-gold">โปร BLACK25</span>
          </div>
          <div class="plan-detail">ราคาหน้าเว็บ ฿926.50 · โค้ด <code>BLACK25</code> ลด 25% (ถึง 1 ธ.ค. 06:59)<br>มี FUP ลดสปีดเมื่อใช้หนัก/วัน · เช็กสิทธิ์ร่วมโปรหน้าเช็กเอาต์</div>
        </div>
        <div class="plan-right">
          <div class="price-main bf-txt">~฿695</div>
          <div class="price-sub"><s>฿926.50</s> คำนวณหัก 25%<br>เหมาะสายใช้หนักมาก</div>
        </div>
      </div>

      <div class="plan-row">
        <div class="plan-left">
          <div class="plan-name-row">
            <span class="plan-name">Airalo 5GB (7 วัน)</span>
            <span class="plan-pill p-green">ประหยัดกว่าเกือบ ฿400</span>
          </div>
          <div class="plan-detail">ราคาปกติ ฿350 · ลูกค้าใหม่ใส่ <code>NEWTOAIRALO15</code> ลด 15%<br>ถ้าใช้เยอะหน่อย <b>10GB/7 วัน ฿594.50</b> (ลด 15% ~฿505) ยังถูกกว่า!</div>
        </div>
        <div class="plan-right">
          <div class="price-main">~฿298</div>
          <div class="price-sub"><s>฿350</s> 5GB / 7 วัน<br>ลด 15% ครั้งแรก</div>
        </div>
      </div>

      <div class="plan-row amber">
        <div class="plan-left">
          <div class="plan-name-row">
            <span class="plan-name">Vacay eSIM ญี่ปุ่น</span>
            <span class="plan-pill p-amber">จ่าย PromptPay ได้</span>
          </div>
          <div class="plan-detail">แบรนด์ไทย เลือกวันเป๊ะ 1–30 วัน (เหมา GB เริ่ม ฿69 · รายวันเริ่ม ฿19)<br>ใส่โค้ด <code>THAF-TIWE</code> · ไม่ต้องใช้บัตรเครดิต</div>
        </div>
        <div class="plan-right">
          <div class="price-main bf-txt">เริ่ม ฿69</div>
          <div class="price-sub">ราคาตามวัน &amp; GB<br>Unlimited เริ่ม ฿169</div>
        </div>
      </div>

      <div class="plan-row navy">
        <div class="plan-left">
          <div class="plan-name-row">
            <span class="plan-name">AIS SIM2Fly / True GO</span>
            <span class="plan-pill p-blue">ค่ายไทย · 10 วัน</span>
          </div>
          <div class="plan-detail">AIS 6GB หรือ True 8GB* (6+2GB) · ครบโควตาไหลต่อ <b>128 Kbps</b><br>คุ้มมากถ้าอยู่ 8–10 วัน · ต้องลงทะเบียนซิม (eKYC) ก่อนใช้</div>
        </div>
        <div class="plan-right">
          <div class="price-main navy-txt">฿399</div>
          <div class="price-sub">6–8GB / 10 วัน<br>True 16GB/10 วัน ฿549</div>
        </div>
      </div>
    </section>

    <section class="footnote" data-safe-check="footnote">
      <b>สรุปตัวเลข:</b> ถ้าใช้จริงไม่เกิน 5–10GB แพ็กโควตา (<b>~฿298–฿505</b>) หรือซิมค่ายไทย (<b>฿399</b>) จ่ายน้อยกว่า Unlimited ลด 25% (<b>~฿695</b>) อย่างชัดเจนครับ
    </section>

    <footer class="safe-footer" data-safe-check="footer">
      <span class="accent">ปัดขวาดูสรุปว่าใครควรจัด BLACK25 vs ใครควรเลือกแพ็กเล็ก →</span>
      <span class="domain">3 / 4</span>
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 04: WHO SHOULD PICK WHAT + TRANSPARENT CTA (y = 62..1152)
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
    position: absolute; inset: 0;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.92) 0%,
      rgba(9, 27, 42, 0.85) 56%,
      rgba(6, 17, 26, 0.94) 100%
    );
  }
  .head { position: absolute; top: 132px; left: 56px; right: 56px; }
  .kicker { font-family: "Kanit", sans-serif; font-size: 20px; font-weight: 800; color: #6ef7ca; margin-bottom: 4px; }
  .title { font-family: "Kanit", sans-serif; font-size: 46px; font-weight: 900; color: #ffffff; line-height: 1.15; }
  .title span { color: #ffd166; }

  .picks-card {
    position: absolute;
    top: 252px;
    left: 56px;
    right: 56px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 24px;
    padding: 22px 26px;
    display: flex; flex-direction: column; gap: 16px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.30);
  }
  .pick-item {
    display: flex; align-items: flex-start; gap: 16px;
    padding-bottom: 14px; border-bottom: 1.5px dashed rgba(14, 42, 58, 0.14);
  }
  .pick-item:last-child { padding-bottom: 0; border-bottom: none; }
  .pick-num {
    min-width: 118px; padding: 8px 10px; border-radius: 12px; text-align: center;
    font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 900; flex-shrink: 0; margin-top: 2px;
  }
  .pn-green { background: #0fa47a; color: #ffffff; }
  .pn-amber { background: #e8a13d; color: #0e2a3a; }
  .pn-navy  { background: #0e2a3a; color: #ffd166; }
  .pick-h { font-family: "Kanit", sans-serif; font-size: 25px; font-weight: 800; color: #0e2a3a; line-height: 1.24; margin-bottom: 2px; }
  .pick-p { font-size: 19px; font-weight: 500; color: #324f5e; line-height: 1.38; }
  .pick-p b { color: #0e2a3a; font-weight: 700; }

  .coupon-ticket {
    position: absolute;
    top: 702px;
    left: 56px;
    right: 56px;
    background: linear-gradient(135deg, #0d3347 0%, #12445c 100%);
    border: 2px solid rgba(78, 242, 190, 0.65);
    border-radius: 24px;
    padding: 20px 24px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.40);
  }
  .ticket-header {
    display: flex; flex-direction: column; gap: 2px;
    padding-bottom: 11px; padding-right: 190px;
    border-bottom: 2px dashed rgba(255, 255, 255, 0.26);
    margin-bottom: 13px;
  }
  .ticket-title { font-family: "Kanit", sans-serif; font-size: 25px; font-weight: 800; color: #ffd166; line-height: 1.2; }
  .ticket-sub { font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 700; color: #9bf9da; }
  .code-grid { display: flex; gap: 14px; padding-right: 184px; }
  .code-box {
    flex: 1; background: rgba(7, 23, 33, 0.72);
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    border-radius: 15px; padding: 12px 14px;
  }
  .code-brand { font-family: "Kanit", sans-serif; font-size: 18px; font-weight: 800; color: #ffffff; margin-bottom: 2px; }
  .code-value { font-family: "JetBrains Mono", monospace; font-size: 21px; font-weight: 800; color: #ffd166; }
  .code-note { font-size: 15px; font-weight: 600; color: #a9e8d4; margin-top: 3px; line-height: 1.28; }

  .mascots-right {
    position: absolute; right: 60px; top: 734px; width: 192px; height: 208px; pointer-events: none;
  }
  .m-pi { position: absolute; right: 0; bottom: 0; width: 156px; filter: drop-shadow(0 10px 16px rgba(0,0,0,0.42)); }
  .m-simpok { position: absolute; left: -10px; bottom: 0; width: 94px; filter: drop-shadow(0 8px 14px rgba(0,0,0,0.42)); }

  .plain-cta {
    position: absolute;
    top: 1020px;
    left: 56px;
    right: 56px;
    display: flex; flex-direction: column; gap: 5px;
  }
  .cta-main { font-family: "Kanit", sans-serif; font-size: 24px; font-weight: 800; color: #ffffff; }
  .cta-main span { color: #6ef7ca; }
  .cta-url { font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 800; color: #ffd166; }
  .cta-meta { font-size: 16px; font-weight: 500; color: rgba(232, 248, 243, 0.80); }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${contentBg}" alt="">
    <div class="dark-scrim"></div>
    <div class="mag-frame"></div>
    ${mastheadHtml(avatar, 'DECISION GUIDE · เลือกให้ตรงนิสัยใช้เน็ต', '4 / 4')}

    <section class="head" data-safe-check="head">
      <div class="kicker">ไม่ต้องตามกระแสลด % ถ้าแพ็กเล็กจ่ายสุทธิน้อยกว่า</div>
      <h1 class="title">สรุป 3 สไตล์ <span>เลือกแพ็กญี่ปุ่นให้คุ้มสุด</span></h1>
    </section>

    <section class="picks-card" data-safe-check="picks">
      <div class="pick-item">
        <div class="pick-num pn-green">สายเที่ยวปกติ<br>5–7 วัน</div>
        <div>
          <div class="pick-h">แพ็ก 5GB หรือ PromptPay ถูกกว่าเยอะ</div>
          <div class="pick-p">เน้นแผนที่-แชต-Wi-Fi รร. เลือก <b>Airalo 5GB (~฿298)</b> หรือ <b>Vacay</b> จ่าย PromptPay (ประหยัดกว่า Unlimited เกือบ ฿400)</div>
        </div>
      </div>

      <div class="pick-item">
        <div class="pick-num pn-amber">สายอัปคลิปหนัก<br>/ แชร์ 2 คน</div>
        <div>
          <div class="pick-h">เทียบ 10GB (~฿505) กับ BLACK25 (~฿695)</div>
          <div class="pick-p">ถ้าไม่อยากนับ GB เลยค่อยจัด <b>BLACK25</b> ก่อน 1 ธ.ค. 06:59 น. (เช็ก FUP และสิทธิ์แชร์ Hotspot ในหน้าแพ็กก่อนจ่าย)</div>
        </div>
      </div>

      <div class="pick-item">
        <div class="pick-num pn-navy">ทริปยาว<br>8–10 วัน</div>
        <div>
          <div class="pick-h">ค่ายไทย ฿399 ยังได้เปรียบเรื่องจำนวนวัน</div>
          <div class="pick-p"><b>True GO (8GB/10 วัน)</b> หรือ <b>AIS SIM2Fly (6GB/10 วัน)</b> ครบโควตาไหลต่อ 128 Kbps ไม่ตัดขาด</div>
        </div>
      </div>
    </section>

    <section class="coupon-ticket" data-safe-check="coupon">
      <div class="ticket-header">
        <div class="ticket-title">โค้ดส่วนลดสำหรับทริปญี่ปุ่น (เลือกใช้ตามแพ็ก)</div>
        <div class="ticket-sub">SIMPAINAI · เช็กราคาล่าสุดหน้าแพ็กก่อนชำระเงิน</div>
      </div>
      <div class="code-grid">
        <div class="code-box">
          <div class="code-brand">Airalo (แพ็ก 5GB/10GB)</div>
          <div class="code-value">NEWTOAIRALO15</div>
          <div class="code-note">ลด 15% ครั้งแรก (Unlimited ใช้ BLACK25)</div>
        </div>
        <div class="code-box">
          <div class="code-brand">Vacay (จ่าย PromptPay)</div>
          <div class="code-value">THAF-TIWE</div>
          <div class="code-note">แบรนด์ไทย เลือกวันเป๊ะ 1–30 วัน</div>
        </div>
      </div>
    </section>

    <div class="mascots-right">
      <img class="m-pi" src="${piTua}" alt="">
      <img class="m-simpok" src="${simPok}" alt="">
    </div>

    <section class="plain-cta" data-safe-check="cta">
      <div class="cta-main">อ่านตารางคำนวณ GB + 5 วิธีกันเน็ตหมดไวที่ <span>ลิงก์ในคอมเมนต์</span></div>
      <div class="cta-url">esim.whytobe.com/blog/esim-japan-how-many-gb/</div>
      <div class="cta-meta">เซฟเก็บไว้เช็กก่อนจ่าย · กดฟอล @simpainai · บทความมีลิงก์ affiliate ที่ทีมอาจได้รับค่าคอม</div>
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
        `[promo-blackfriday-japan-7d] ${job.file} | bounds y=${audit.minTop}..${audit.maxBottom}, x=${audit.minLeft}..${audit.maxRight} | ${safeOk ? 'PASS (y=60..1160)' : 'FAIL'}`
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
