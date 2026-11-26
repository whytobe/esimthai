#!/usr/bin/env node
/**
 * Reusable Style A — Editorial Magazine Full-Bleed Carousel Renderer (1080x1920)
 *
 * Design system:
 * - Full-bleed travel landmark photography with integrated 3D mascots (no empty dark voids)
 * - Editorial masthead + bold mixed-scale Thai typography (Kanit + Anuphan + JetBrains Mono)
 * - Perforated coupon ticket ONLY on Slide 01 (cover) and Slide 04 (closing CTA) so Slides 02-03 breathe
 * - Strict TikTok Mobile Safe Zone: all critical text/cards/coupons end at y <= 1440px, right >= 114px
 *
 * Current active dataset: Angle C — China 2026 (LINE / Google / Alipay without VPN)
 * Output: assets/carousels/angle-c-china-style-a/slide-01.png .. slide-04.png
 */
import { join } from 'node:path';
import {
  PROJECT_ROOT,
  FONTS_LINK,
  BASE_RESET,
  toDataUri,
  getBrandAvatar,
  renderSlides,
} from './lib/carousel-kit.mjs';

const SHARED_EDITORIAL_CSS = `
  ${BASE_RESET}
  .canvas {
    position: relative;
    width: 1080px;
    height: 1920px;
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
    top: 34px; left: 34px; right: 34px; bottom: 34px;
    border: 1.5px solid rgba(255, 255, 255, 0.16);
    border-radius: 34px;
    pointer-events: none;
  }
  .masthead {
    position: absolute;
    top: 112px;
    left: 58px;
    right: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 14px;
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.22);
  }
  .brand-lockup { display: flex; align-items: center; gap: 14px; }
  .brand-avatar {
    width: 54px; height: 54px; border-radius: 50%;
    border: 2.5px solid #4ef2be; object-fit: cover;
    box-shadow: 0 4px 14px rgba(0,0,0,0.45);
  }
  .brand-text { display: flex; flex-direction: column; gap: 2px; }
  .brand-name {
    font-family: "Kanit", sans-serif; font-size: 25px; font-weight: 700;
    color: #ffffff; letter-spacing: 0.3px; line-height: 1.05;
  }
  .brand-issue {
    font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 700;
    color: #ffd166; letter-spacing: 1.8px; text-transform: uppercase;
  }
  .page-pill {
    font-family: "JetBrains Mono", monospace; font-size: 21px; font-weight: 800;
    color: #e9fff7; background: rgba(14, 42, 58, 0.72);
    backdrop-filter: blur(10px); border: 1.5px solid rgba(78, 242, 190, 0.48);
    padding: 7px 20px; border-radius: 999px;
  }
  .swipe-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    align-self: flex-start;
    background: rgba(11, 34, 48, 0.86);
    backdrop-filter: blur(12px);
    border: 1.8px solid rgba(78, 242, 190, 0.6);
    color: #d8fff0;
    font-family: "Kanit", sans-serif;
    font-size: 24px;
    font-weight: 700;
    padding: 9px 22px;
    border-radius: 999px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  }
  .swipe-badge b { color: #ffd166; }
`;

function renderMasthead(avatar, issue, pageNum) {
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
// SLIDE 01: EDITORIAL COVER (Perforated coupon above mascots, strictly y <= 1440)
// ============================================================================
export function buildStyleACover(cfg) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_EDITORIAL_CSS}
  .bg-photo { object-position: center center; }
  .scrim-top {
    position: absolute; top: 0; left: 0; right: 0; height: 830px;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.88) 0%,
      rgba(10, 29, 44, 0.72) 50%,
      rgba(14, 42, 58, 0.24) 80%,
      rgba(14, 42, 58, 0) 100%
    );
  }
  .scrim-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 340px;
    background: linear-gradient(0deg, rgba(7, 19, 29, 0.62) 0%, rgba(10, 26, 39, 0) 100%);
  }

  .hero-block {
    position: absolute;
    top: 196px;
    left: 58px;
    right: 58px;
  }
  .kicker-row {
    display: flex; align-items: center; gap: 14px; margin-bottom: 14px;
  }
  .kicker-pill {
    display: inline-flex; align-items: center; gap: 9px;
    background: linear-gradient(90deg, #e8a13d, #f5b951);
    color: #0b1f2d; font-family: "Kanit", sans-serif;
    font-size: 25px; font-weight: 800; padding: 7px 22px; border-radius: 999px;
    box-shadow: 0 6px 18px rgba(232, 161, 61, 0.36);
  }
  .kicker-dot { width: 10px; height: 10px; border-radius: 50%; background: #0b1f2d; }
  .kicker-loc {
    font-family: "JetBrains Mono", monospace; font-size: 19px; font-weight: 700;
    color: rgba(255,255,255,0.88); letter-spacing: 1.6px;
  }

  .headline-top {
    font-family: "Kanit", sans-serif; font-size: 72px; font-weight: 800;
    color: #ffffff; line-height: 1.14; letter-spacing: -0.5px;
    text-shadow: 0 4px 18px rgba(6, 17, 26, 0.88), 0 2px 4px rgba(6, 17, 26, 0.95);
  }
  .headline-mega {
    font-family: "Kanit", sans-serif; font-size: 126px; font-weight: 900;
    line-height: 1.06; letter-spacing: -2px; margin-top: 2px;
    color: #ffd166; -webkit-text-stroke: 3px #091d2a; paint-order: stroke fill;
    text-shadow: 0 10px 26px rgba(5, 14, 22, 0.88), 0 4px 0 #091d2a;
  }
  .headline-sub-wrap {
    margin-top: 14px; display: inline-flex; align-items: center;
    background: linear-gradient(95deg, #0fa47a 0%, #10b981 100%);
    color: #ffffff; padding: 11px 26px; border-radius: 16px;
    box-shadow: 0 10px 26px rgba(15, 164, 122, 0.42), 0 0 0 2px rgba(255,255,255,0.22) inset;
  }
  .headline-sub {
    font-family: "Kanit", sans-serif; font-size: 44px; font-weight: 800;
    line-height: 1.1; text-shadow: 0 2px 6px rgba(6, 36, 26, 0.45);
  }
  .app-chips {
    display: flex; flex-wrap: wrap; gap: 11px; margin-top: 16px;
  }
  .app-chip {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(11, 31, 45, 0.78); backdrop-filter: blur(12px);
    border: 1.5px solid rgba(255, 255, 255, 0.25); border-radius: 999px;
    padding: 8px 18px; font-size: 23px; font-weight: 700; color: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  }
  .app-chip .chk {
    width: 22px; height: 22px; border-radius: 50%; background: #10b981;
    color: #06251b; display: inline-flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 900;
  }

  /* Perforated coupon cleanly placed across river reflection (y=868..1026),
     strictly <= 1440px AND completely above Pi Tua & Nong Simpok's heads! */
  .coupon-ticket {
    position: absolute;
    top: 868px;
    left: 56px;
    right: 118px;
    height: 158px;
    background: linear-gradient(125deg, rgba(12, 37, 52, 0.92) 0%, rgba(13, 52, 62, 0.92) 100%);
    backdrop-filter: blur(16px);
    border: 2px solid rgba(255, 209, 102, 0.82);
    border-radius: 24px;
    display: grid;
    grid-template-columns: 1.05fr auto 1fr;
    align-items: center;
    padding: 0 26px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.52), inset 0 1px 0 rgba(255,255,255,0.16);
    -webkit-mask-image:
      radial-gradient(circle 13px at 0% 50%, transparent 98%, #000 100%),
      radial-gradient(circle 13px at 100% 50%, transparent 98%, #000 100%);
    -webkit-mask-composite: destination-in;
    mask-composite: intersect;
  }
  .coupon-left { display: flex; flex-direction: column; gap: 3px; }
  .coupon-tag { font-size: 20px; font-weight: 700; color: #8af3cf; }
  .coupon-price-row { display: flex; align-items: baseline; gap: 11px; }
  .coupon-price {
    font-family: "Kanit", sans-serif; font-size: 54px; font-weight: 900;
    color: #ffffff; line-height: 1;
  }
  .coupon-old {
    font-size: 25px; font-weight: 600; color: rgba(255,255,255,0.55);
    text-decoration: line-through;
  }
  .coupon-sub { font-size: 19px; font-weight: 600; color: #d6ebe5; }
  .coupon-divider {
    width: 2px; height: 104px;
    border-left: 2.5px dashed rgba(255, 209, 102, 0.5); margin: 0 20px;
  }
  .coupon-right { display: flex; flex-direction: column; align-items: flex-start; gap: 5px; }
  .coupon-label { font-size: 19px; font-weight: 700; color: #ffd166; }
  .coupon-code {
    font-family: "JetBrains Mono", monospace; font-size: 29px; font-weight: 800;
    color: #0b1f2d; background: linear-gradient(90deg, #ffd166, #f4b142);
    padding: 6px 15px; border-radius: 11px; letter-spacing: 0.5px;
    box-shadow: 0 4px 12px rgba(232, 161, 61, 0.35);
  }
  .coupon-swipe { font-size: 19px; font-weight: 700; color: #c5f7e6; }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${cfg.bg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>
    <div class="mag-frame"></div>

    ${renderMasthead(cfg.avatar, cfg.issue, '01 / 04')}

    <section class="hero-block" data-safe-check="hero-block">
      <div class="kicker-row">
        <div class="kicker-pill"><span class="kicker-dot"></span>${cfg.kicker}</div>
        <div class="kicker-loc">${cfg.location}</div>
      </div>
      <div class="headline-top">${cfg.headlineTop}</div>
      <div class="headline-mega">${cfg.headlineMega}</div>
      <div class="headline-sub-wrap">
        <div class="headline-sub">${cfg.headlineSub}</div>
      </div>
      <div class="app-chips">
        ${cfg.chips.map((c) => `<div class="app-chip"><span class="chk">✓</span>${c}</div>`).join('')}
      </div>
    </section>

    <div class="coupon-ticket" data-safe-check="cover-coupon">
      <div class="coupon-left">
        <div class="coupon-tag">${cfg.coupon.pack}</div>
        <div class="coupon-price-row">
          <span class="coupon-price">${cfg.coupon.price}</span>
          <span class="coupon-old">${cfg.coupon.oldPrice}</span>
        </div>
        <div class="coupon-sub">${cfg.coupon.sub}</div>
      </div>
      <div class="coupon-divider"></div>
      <div class="coupon-right">
        <div class="coupon-label">${cfg.coupon.label}</div>
        <div class="coupon-code">${cfg.coupon.code}</div>
        <div class="coupon-swipe">${cfg.coupon.swipe}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 02: COMPARE + 3 GOLDEN RULES (No bottom coupon covering mascots!)
// ============================================================================
export function buildStyleACompareRules(cfg) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_EDITORIAL_CSS}
  .bg-photo { object-position: center bottom; }
  .scrim-top {
    position: absolute; top: 0; left: 0; right: 0; height: 1120px;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.90) 0%,
      rgba(10, 27, 40, 0.76) 58%,
      rgba(10, 27, 40, 0.30) 84%,
      rgba(10, 27, 40, 0) 100%
    );
  }
  .scrim-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 260px;
    background: linear-gradient(0deg, rgba(7, 19, 29, 0.55) 0%, rgba(9, 24, 36, 0) 100%);
  }

  .content-col {
    position: absolute;
    top: 196px;
    left: 56px;
    right: 114px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .title-block h1 {
    font-family: "Kanit", sans-serif; font-size: 60px; font-weight: 900;
    line-height: 1.16; color: #ffffff;
    text-shadow: 0 4px 16px rgba(5, 14, 22, 0.85);
  }
  .title-block h1 .gold { color: #ffd166; }
  .title-block h1 .mint { color: #4ef2be; }

  .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .glass-box {
    border-radius: 22px; padding: 18px 20px;
    backdrop-filter: blur(18px); box-shadow: 0 12px 26px rgba(0, 0, 0, 0.35);
  }
  .glass-bad {
    background: rgba(74, 22, 28, 0.84); border: 1.8px solid rgba(255, 114, 114, 0.58);
  }
  .glass-good {
    background: rgba(11, 68, 56, 0.86); border: 1.8px solid rgba(78, 242, 190, 0.68);
  }
  .box-badge {
    font-family: "Kanit", sans-serif; font-size: 24px; font-weight: 800; margin-bottom: 6px;
  }
  .glass-bad .box-badge { color: #ff9c9c; }
  .glass-good .box-badge { color: #6ef7ca; }
  .box-desc { font-size: 22px; font-weight: 600; color: #f4f9f8; line-height: 1.36; }

  .rules-card {
    background: rgba(12, 34, 48, 0.86);
    backdrop-filter: blur(20px);
    border: 1.8px solid rgba(255, 255, 255, 0.22);
    border-radius: 26px; padding: 22px 24px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.42);
    display: flex; flex-direction: column; gap: 14px;
  }
  .rules-head { display: flex; align-items: center; justify-content: space-between; }
  .rules-title {
    font-family: "Kanit", sans-serif; font-size: 29px; font-weight: 800; color: #ffd166;
  }
  .rules-tag {
    font-family: "JetBrains Mono", monospace; font-size: 17px; font-weight: 700;
    color: #4ef2be; background: rgba(15, 164, 122, 0.22);
    padding: 5px 14px; border-radius: 999px;
  }
  .rule-item {
    display: grid; grid-template-columns: 54px 1fr; gap: 15px; align-items: start;
    padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.14);
  }
  .rule-item:first-of-type { border-top: none; padding-top: 2px; }
  .rule-num {
    width: 54px; height: 54px; border-radius: 15px;
    background: linear-gradient(135deg, #0fa47a, #0b7d5e);
    color: #ffffff; font-family: "JetBrains Mono", monospace;
    font-size: 25px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 14px rgba(15, 164, 122, 0.35);
  }
  .rule-num.warn {
    background: linear-gradient(135deg, #e8a13d, #cf8323); color: #0b1f2d;
  }
  .rule-text h3 {
    font-family: "Kanit", sans-serif; font-size: 29px; font-weight: 800;
    color: #ffffff; line-height: 1.15; margin-bottom: 3px;
  }
  .rule-text p { font-size: 22px; font-weight: 500; color: #d3e7ee; line-height: 1.34; }
  .rule-text b { color: #ffd166; font-weight: 700; }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${cfg.bg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>
    <div class="mag-frame"></div>

    ${renderMasthead(cfg.avatar, cfg.issue, '02 / 04')}

    <main class="content-col" data-safe-check="slide2-content">
      <div class="title-block">
        <h1>${cfg.titleHtml}</h1>
      </div>

      <div class="compare-grid">
        <div class="glass-box glass-bad">
          <div class="box-badge">${cfg.compareBad.badge}</div>
          <div class="box-desc">${cfg.compareBad.desc}</div>
        </div>
        <div class="glass-box glass-good">
          <div class="box-badge">${cfg.compareGood.badge}</div>
          <div class="box-desc">${cfg.compareGood.desc}</div>
        </div>
      </div>

      <section class="rules-card">
        <div class="rules-head">
          <div class="rules-title">${cfg.rulesTitle}</div>
          <div class="rules-tag">${cfg.rulesTag}</div>
        </div>
        ${cfg.rules
          .map(
            (r) => `<div class="rule-item">
          <div class="rule-num ${r.warn ? 'warn' : ''}">${r.num}</div>
          <div class="rule-text">
            <h3>${r.heading}</h3>
            <p>${r.bodyHtml}</p>
          </div>
        </div>`
          )
          .join('')}
      </section>

      <div class="swipe-badge">${cfg.swipeHtml}</div>
    </main>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 03: TWO-PHASE 30-SECOND SETUP (No bottom coupon covering mascots!)
// ============================================================================
export function buildStyleASetup(cfg) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_EDITORIAL_CSS}
  .bg-photo { object-position: center bottom; }
  .scrim-top {
    position: absolute; top: 0; left: 0; right: 0; height: 1180px;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.90) 0%,
      rgba(10, 27, 40, 0.78) 62%,
      rgba(10, 27, 40, 0.34) 85%,
      rgba(10, 27, 40, 0) 100%
    );
  }
  .scrim-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 240px;
    background: linear-gradient(0deg, rgba(7, 19, 29, 0.56) 0%, rgba(9, 24, 36, 0) 100%);
  }

  .content-col {
    position: absolute;
    top: 196px;
    left: 56px;
    right: 114px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .title-block h1 {
    font-family: "Kanit", sans-serif; font-size: 58px; font-weight: 900;
    line-height: 1.15; color: #ffffff;
    text-shadow: 0 4px 16px rgba(5, 14, 22, 0.85);
  }
  .title-block h1 .gold { color: #ffd166; }
  .title-block h1 .mint { color: #4ef2be; }

  .phase-card {
    background: rgba(11, 33, 47, 0.86);
    backdrop-filter: blur(20px);
    border: 1.8px solid rgba(255, 255, 255, 0.22);
    border-radius: 24px;
    padding: 20px 24px;
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.42);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .phase-card.emerald { border-color: rgba(78, 242, 190, 0.52); }
  .phase-card.amber { border-color: rgba(255, 209, 102, 0.58); }

  .phase-head {
    display: flex; align-items: center; justify-content: space-between;
  }
  .phase-pill {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: "Kanit", sans-serif; font-size: 24px; font-weight: 800;
    padding: 5px 18px; border-radius: 999px;
  }
  .phase-card.amber .phase-pill { background: #ffd166; color: #0b1f2d; }
  .phase-card.emerald .phase-pill { background: #4ef2be; color: #07261c; }
  .phase-meta {
    font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 700;
    color: #c2dce6;
  }

  .step-row {
    display: grid; grid-template-columns: 46px 1fr; gap: 14px; align-items: start;
    padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.13);
  }
  .step-row:first-of-type { border-top: none; padding-top: 2px; }
  .step-dot {
    width: 46px; height: 46px; border-radius: 13px;
    background: rgba(255, 255, 255, 0.12);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    color: #ffd166; font-family: "JetBrains Mono", monospace;
    font-size: 21px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
  }
  .phase-card.emerald .step-dot { color: #4ef2be; border-color: rgba(78, 242, 190, 0.45); }
  .step-body h3 {
    font-family: "Kanit", sans-serif; font-size: 27px; font-weight: 800;
    color: #ffffff; line-height: 1.15; margin-bottom: 3px;
  }
  .step-body p {
    font-size: 21px; font-weight: 500; color: #d5e8ef; line-height: 1.34;
  }
  .step-body b { color: #ffd166; font-weight: 700; }
  .step-body .em { color: #6ef7ca; font-weight: 700; }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${cfg.bg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>
    <div class="mag-frame"></div>

    ${renderMasthead(cfg.avatar, cfg.issue, '03 / 04')}

    <main class="content-col" data-safe-check="slide3-content">
      <div class="title-block">
        <h1>${cfg.titleHtml}</h1>
      </div>

      ${cfg.phases
        .map(
          (ph) => `<section class="phase-card ${ph.tone}">
        <div class="phase-head">
          <div class="phase-pill">${ph.pill}</div>
          <div class="phase-meta">${ph.meta}</div>
        </div>
        ${ph.steps
          .map(
            (st) => `<div class="step-row">
          <div class="step-dot">${st.num}</div>
          <div class="step-body">
            <h3>${st.heading}</h3>
            <p>${st.bodyHtml}</p>
          </div>
        </div>`
          )
          .join('')}
      </section>`
        )
        .join('')}

      <div class="swipe-badge">${cfg.swipeHtml}</div>
    </main>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 04: PACKAGE SUMMARY + COUPON CTA + NEXT EPISODE TEASER (y <= 1440px!)
// ============================================================================
export function buildStyleAClosingCTA(cfg) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_EDITORIAL_CSS}
  .bg-photo { object-position: center bottom; }
  .scrim-top {
    position: absolute; top: 0; left: 0; right: 0; height: 1460px;
    background: linear-gradient(
      180deg,
      rgba(8, 22, 34, 0.92) 0%,
      rgba(10, 27, 40, 0.84) 68%,
      rgba(10, 27, 40, 0.45) 88%,
      rgba(10, 27, 40, 0) 100%
    );
  }
  .scrim-bottom {
    position: absolute; left: 0; right: 0; bottom: 0; height: 220px;
    background: linear-gradient(0deg, rgba(7, 19, 29, 0.6) 0%, rgba(9, 24, 36, 0) 100%);
  }

  .content-col {
    position: absolute;
    top: 194px;
    left: 56px;
    right: 114px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .title-block h1 {
    font-family: "Kanit", sans-serif; font-size: 58px; font-weight: 900;
    line-height: 1.15; color: #ffffff;
    text-shadow: 0 4px 16px rgba(5, 14, 22, 0.85);
  }
  .title-block h1 .gold { color: #ffd166; }
  .title-block h1 .mint { color: #4ef2be; }

  .tier-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 14px; }
  .tier-card {
    border-radius: 24px; padding: 20px 22px;
    backdrop-filter: blur(18px);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.4);
    display: flex; flex-direction: column; gap: 6px;
  }
  .tier-hero {
    background: linear-gradient(145deg, rgba(12, 68, 56, 0.90), rgba(11, 39, 52, 0.92));
    border: 2px solid rgba(78, 242, 190, 0.72);
  }
  .tier-alt {
    background: rgba(12, 34, 48, 0.88);
    border: 1.8px solid rgba(255, 255, 255, 0.24);
  }
  .tier-tag {
    display: inline-flex; align-self: flex-start;
    font-family: "Kanit", sans-serif; font-size: 19px; font-weight: 800;
    padding: 4px 14px; border-radius: 999px;
  }
  .tier-hero .tier-tag { background: #ffd166; color: #0b1f2d; }
  .tier-alt .tier-tag { background: rgba(255,255,255,0.16); color: #d8eef5; }
  .tier-name {
    font-family: "Kanit", sans-serif; font-size: 27px; font-weight: 800;
    color: #ffffff; line-height: 1.15; margin-top: 2px;
  }
  .tier-price-row { display: flex; align-items: baseline; gap: 10px; }
  .tier-price {
    font-family: "Kanit", sans-serif; font-size: 56px; font-weight: 900;
    color: #4ef2be; line-height: 1.02;
  }
  .tier-alt .tier-price { color: #ffd166; font-size: 50px; }
  .tier-old {
    font-size: 24px; font-weight: 600; color: rgba(255,255,255,0.52);
    text-decoration: line-through;
  }
  .tier-sub { font-size: 20px; font-weight: 600; color: #d4e9f0; line-height: 1.32; }

  .cross-tip {
    background: rgba(45, 36, 16, 0.88);
    border: 1.8px solid rgba(255, 209, 102, 0.62);
    border-radius: 20px;
    padding: 15px 20px;
    display: flex; align-items: center; gap: 14px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  }
  .cross-ico {
    font-size: 28px; flex-shrink: 0;
  }
  .cross-text {
    font-size: 22px; font-weight: 600; color: #fff4d6; line-height: 1.32;
  }
  .cross-text b { color: #ffd166; font-weight: 800; }

  /* Perforated Closing Coupon & Comment CTA */
  .cta-ticket {
    background: linear-gradient(125deg, rgba(12, 37, 52, 0.96) 0%, rgba(12, 58, 58, 0.96) 100%);
    border: 2.2px solid #ffd166;
    border-radius: 26px;
    padding: 20px 26px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
    display: flex; flex-direction: column; gap: 14px;
    -webkit-mask-image:
      radial-gradient(circle 13px at 0% 50%, transparent 98%, #000 100%),
      radial-gradient(circle 13px at 100% 50%, transparent 98%, #000 100%);
    -webkit-mask-composite: destination-in;
    mask-composite: intersect;
  }
  .cta-top-row {
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    padding-bottom: 14px;
    border-bottom: 2px dashed rgba(255, 209, 102, 0.42);
  }
  .cta-code-label { font-size: 20px; font-weight: 700; color: #8af3cf; margin-bottom: 4px; }
  .cta-code-sub { font-size: 19px; font-weight: 600; color: #d8ecf2; }
  .cta-code-pill {
    font-family: "JetBrains Mono", monospace; font-size: 32px; font-weight: 800;
    color: #0b1f2d; background: linear-gradient(90deg, #ffd166, #f4b142);
    padding: 10px 20px; border-radius: 14px; letter-spacing: 0.6px;
    box-shadow: 0 6px 16px rgba(232, 161, 61, 0.35);
    white-space: nowrap;
  }
  .cta-link-row {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }
  .cta-action {
    font-family: "Kanit", sans-serif; font-size: 27px; font-weight: 800;
    color: #ffffff; line-height: 1.2;
  }
  .cta-action .mint { color: #4ef2be; }
  .cta-url {
    font-family: "JetBrains Mono", monospace; font-size: 19px; font-weight: 700;
    color: #ffd166; margin-top: 2px;
  }

  /* Follow for Next Episode Teaser */
  .next-ep {
    background: linear-gradient(95deg, #0fa47a 0%, #0b8463 100%);
    border: 2px solid rgba(255, 255, 255, 0.28);
    border-radius: 22px;
    padding: 15px 22px;
    display: flex; align-items: center; gap: 14px;
    box-shadow: 0 12px 28px rgba(15, 164, 122, 0.38);
  }
  .next-badge {
    background: #0b1f2d; color: #ffd166;
    font-family: "Kanit", sans-serif; font-size: 20px; font-weight: 800;
    padding: 6px 14px; border-radius: 999px; white-space: nowrap;
  }
  .next-text {
    font-family: "Kanit", sans-serif; font-size: 23px; font-weight: 700;
    color: #ffffff; line-height: 1.25;
  }
</style>
</head>
<body>
  <div class="canvas">
    <img class="bg-photo" src="${cfg.bg}" alt="">
    <div class="scrim-top"></div>
    <div class="scrim-bottom"></div>
    <div class="mag-frame"></div>

    ${renderMasthead(cfg.avatar, cfg.issue, '04 / 04')}

    <main class="content-col" data-safe-check="slide4-content">
      <div class="title-block">
        <h1>${cfg.titleHtml}</h1>
      </div>

      <div class="tier-grid">
        <div class="tier-card tier-hero">
          <div class="tier-tag">${cfg.heroTier.tag}</div>
          <div class="tier-name">${cfg.heroTier.name}</div>
          <div class="tier-price-row">
            <span class="tier-price">${cfg.heroTier.price}</span>
            <span class="tier-old">${cfg.heroTier.oldPrice}</span>
          </div>
          <div class="tier-sub">${cfg.heroTier.sub}</div>
        </div>
        <div class="tier-card tier-alt">
          <div class="tier-tag">${cfg.altTier.tag}</div>
          <div class="tier-name">${cfg.altTier.name}</div>
          <div class="tier-price-row">
            <span class="tier-price">${cfg.altTier.price}</span>
          </div>
          <div class="tier-sub">${cfg.altTier.sub}</div>
        </div>
      </div>

      <div class="cross-tip">
        <div class="cross-ico">🌏</div>
        <div class="cross-text">${cfg.crossTipHtml}</div>
      </div>

      <section class="cta-ticket" data-safe-check="closing-coupon">
        <div class="cta-top-row">
          <div>
            <div class="cta-code-label">${cfg.coupon.label}</div>
            <div class="cta-code-sub">${cfg.coupon.sub}</div>
          </div>
          <div class="cta-code-pill">${cfg.coupon.code}</div>
        </div>
        <div class="cta-link-row">
          <div>
            <div class="cta-action">${cfg.cta.actionHtml}</div>
            <div class="cta-url">${cfg.cta.urlText}</div>
          </div>
        </div>
      </section>

      <div class="next-ep" data-safe-check="next-ep-bar">
        <div class="next-badge">${cfg.nextEp.badge}</div>
        <div class="next-text">${cfg.nextEp.text}</div>
      </div>
    </main>
  </div>
</body>
</html>`;
}

// ============================================================================
// ANGLE C — CHINA 2026 (STYLE A FULL 4-SLIDE PACK)
// ============================================================================
async function main() {
  const avatar = getBrandAvatar();
  const protoSrc = join(PROJECT_ROOT, 'assets/carousels/angle-c-prototypes/_src');
  const ownSrc = join(PROJECT_ROOT, 'assets/carousels/angle-c-china-style-a/_src');
  const outDir = join(PROJECT_ROOT, 'assets/carousels/angle-c-china-style-a');

  const jobs = [
    {
      file: 'slide-01.png',
      maxSafeY: 1440,
      html: buildStyleACover({
        avatar,
        bg: toDataUri(join(protoSrc, 'style-a-cover-bg.jpg')),
        issue: 'CHINA EDITION 2026',
        kicker: 'เที่ยวจีน 2026 · เช็กก่อนบิน',
        location: 'SHANGHAI · BEIJING',
        headlineTop: 'เที่ยวจีนยุคนี้',
        headlineMega: 'ไม่ง้อ VPN!',
        headlineSub: 'LINE · Google · Alipay ผ่านฉลุย',
        chips: ['LINE แชท/โทร', 'Google Maps', 'Alipay สแกนจ่าย'],
        coupon: {
          pack: 'Airalo จีน 5GB / 7 วัน',
          price: '~฿431',
          oldPrice: '฿507',
          sub: 'แพ็กเล็กเริ่ม ฿140 (1GB/3 วัน)',
          label: 'โค้ดลูกค้าใหม่ลด 15%',
          code: 'NEWTOAIRALO15',
          swipe: 'ปัดขวาดู 3 กฎรอด →',
        },
      }),
    },
    {
      file: 'slide-02.png',
      maxSafeY: 1440,
      html: buildStyleACompareRules({
        avatar,
        bg: toDataUri(join(protoSrc, 'style-a-slide2-bg.jpg')),
        issue: 'SURVIVAL GUIDE · CHINA',
        titleHtml: 'ทำไม eSIM จีน<br><span class="gold">เล่น LINE ได้</span> <span class="mint">ไม่ง้อ VPN?</span>',
        compareBad: {
          badge: '✕ Wi-Fi รร. / ซิมในจีน',
          desc: 'วิ่งเน็ตในประเทศ ติด Great Firewall แอป LINE · Google ค้างทันที',
        },
        compareGood: {
          badge: '✓ Travel eSIM จีน',
          desc: 'โรมมิ่งออกเกตเวย์ HK / SG ทะลุ LINE · Google · Alipay อัตโนมัติ',
        },
        rulesTitle: '3 กฎเหล็กหน้างาน (พลาดแล้วแก้ยาก!)',
        rulesTag: 'MUST DO',
        rules: [
          {
            num: '01',
            heading: 'ติดตั้ง eSIM ตั้งแต่อยู่ไทย 100%',
            bodyHtml: 'กด <b>*#06#</b> เช็กเลข EID แล้วโหลดผ่าน Wi-Fi บ้าน ห้ามรอทำที่สนามบินจีน',
          },
          {
            num: '02',
            warn: true,
            heading: 'ระวังกับดัก Wi-Fi โรงแรม!',
            bodyHtml: 'ถ้าส่ง LINE ไม่ไป ให้ <b>ปิด Wi-Fi ทันที</b> แล้วสลับกลับมาใช้เน็ต 5G eSIM',
          },
          {
            num: '03',
            heading: 'เปิดซิมไทยค้างไว้รับ OTP Alipay',
            bodyHtml: 'ผูกบัตรไทยให้พร้อม <b>ปิด Data Roaming ซิมไทย</b> รับ SMS ตัดบัตรฟรี',
          },
        ],
        swipeHtml: 'ปัดขวาดูวิธีตั้งค่าใน <b>30 วิ</b> ก่อนบิน →',
      }),
    },
    {
      file: 'slide-03.png',
      maxSafeY: 1440,
      html: buildStyleASetup({
        avatar,
        bg: toDataUri(join(ownSrc, 'style-a-slide3-bg.png')),
        issue: 'PREFLIGHT SETUP · 30 SEC',
        titleHtml: 'ตั้งค่าครบใน <span class="gold">30 วิ</span><br><span class="mint">ก่อนบิน &amp; หลังแลนดิ้ง</span>',
        phases: [
          {
            tone: 'amber',
            pill: '🛫 ตอนอยู่ไทย (ต่อ Wi-Fi บ้าน)',
            meta: 'BEFORE FLIGHT',
            steps: [
              {
                num: '01',
                heading: 'กด *#06# เช็กเลข EID ก่อนซื้อ',
                bodyHtml: 'ต้องมีเลข <b>EID</b> และไม่ติดล็อกซิม (iPhone ศูนย์จีน/HK 2 ซิมกายภาพไม่รองรับ)',
              },
              {
                num: '02',
                heading: 'ติดตั้ง eSIM จากไทยให้จบ 100%',
                bodyHtml: 'โหลดผ่าน Wi-Fi บ้านให้เสร็จ <span class="em">วันใช้งานยังไม่เดิน</span> จนกว่าจะจับคลื่นที่จีน',
              },
            ],
          },
          {
            tone: 'emerald',
            pill: '🛬 ถึงสนามบินจีน (สลับสายใน 30 วิ)',
            meta: 'ON LANDING',
            steps: [
              {
                num: '03',
                heading: 'เปิด Data Roaming เฉพาะสาย eSIM',
                bodyHtml: 'ตั้ง <b>Cellular Data</b> เป็น Travel eSIM จับคลื่น <span class="em">China Unicom 5G</span>',
              },
              {
                num: '04',
                heading: 'ปิด Wi-Fi รร. + ปิด Roaming ซิมไทย',
                bodyHtml: 'ปิด <b>Data Roaming ซิมไทย</b> + ปิด Data Switching กันบิลรั่ว 100%',
              },
            ],
          },
        ],
        swipeHtml: 'ปัดขวาดูสรุปแพ็ก + โค้ดลด <b>15%</b> →',
      }),
    },
    {
      file: 'slide-04.png',
      maxSafeY: 1440,
      html: buildStyleAClosingCTA({
        avatar,
        bg: toDataUri(join(ownSrc, 'style-a-slide4-bg.png')),
        issue: 'PRICE & PROMO · CHINA',
        titleHtml: 'สรุปแพ็ก eSIM จีน<br><span class="gold">คุ้มสุด 2026</span> <span class="mint">ไม่ง้อ VPN</span>',
        heroTier: {
          tag: '★ แพ็กฮิต 5–7 วัน',
          name: 'Airalo Chinacom 5GB / 7 วัน',
          price: '~฿431',
          oldPrice: '฿507',
          sub: 'China Unicom 5G · ลด 15% ลูกค้าใหม่',
        },
        altTier: {
          tag: '⚡ ทริปสั้น / เน็ตเบา',
          name: 'เริ่มต้น 1GB / 3 วัน',
          price: '฿140',
          sub: 'หรือ 3GB / 7 วัน ฿367 เติม Top-up ในแอปได้',
        },
        crossTipHtml:
          '<b>พ่วงฮ่องกง/มาเก๊า?</b> ซิมจีนเดี่ยวไม่ครอบคลุม → เลือก <b>Airalo Asialink</b> ใบเดียวจบ!',
        coupon: {
          label: 'โค้ดลูกค้าใหม่ลด 15% (Airalo)',
          sub: 'เช็กราคาล่าสุดและเทียบทุกค่ายก่อนซื้อ',
          code: 'NEWTOAIRALO15',
        },
        cta: {
          actionHtml: '👇 <span class="mint">กดลิงก์เทียบราคาทุกค่าย</span> ในคอมเมนต์',
          urlText: 'esim.whytobe.com/blog/esim-china/',
        },
        nextEp: {
          badge: '🔔 กดฟอลตอนหน้า',
          text: 'ตั้งค่า eSIM รับ OTP ธนาคารไทย + โทรฟรี Wi-Fi Calling',
        },
      }),
    },
  ];

  await renderSlides({ outDir, jobs, defaultMaxSafeY: 1440 });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
