#!/usr/bin/env node
/**
 * Reusable Style B — Travel Survival Infographic (Boarding Pass) Renderer (1080x1920)
 *
 * Design system & QA guardrails:
 * - Clean light ticket-paper grid (#f2f6f5) + Aviation Navy (#0e2a3a) + Signal Emerald (#0fa47a) + Boarding Amber (#e8a13d)
 * - Perforated Boarding Pass cover + crisp iPhone Dual-SIM UI mockup + die-cut clean mascot stickers
 * - Header banner watermark safely inset (right: 28px) — zero edge clipping
 * - No overclaiming copy ("เช็กแล้ว!" / "สรุปครบ!", never "ทดสอบแล้ว!")
 * - Strict TikTok Mobile Safe Zone: all critical text/CTA/swipe pills end at y <= 1480px
 *
 * Current active dataset: Angle E — eSIM + Thai Bank OTP + Wi-Fi Calling without roaming bills
 * Output: assets/carousels/angle-e-otp-style-b/slide-01.png .. slide-04.png
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

const SHARED_BOARDING_CSS = `
  ${BASE_RESET}
  .canvas {
    position: relative;
    width: 1080px;
    height: 1920px;
    overflow: hidden;
    background:
      radial-gradient(circle at 12% 10%, rgba(15, 164, 122, 0.14) 0%, transparent 40%),
      radial-gradient(circle at 88% 82%, rgba(232, 161, 61, 0.16) 0%, transparent 42%),
      radial-gradient(#c6d6d2 1.4px, transparent 1.4px),
      #f2f6f5;
    background-size: 100% 100%, 100% 100%, 26px 26px, 100% 100%;
    color: #0e2a3a;
  }
  .topbar {
    position: absolute;
    top: 112px;
    left: 50px;
    width: 944px; /* Leaves 86px clean right buffer for TikTok rail */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand-pill {
    display: inline-flex; align-items: center; gap: 13px;
    background: #ffffff; border: 2px solid #d3e1de;
    padding: 7px 20px 7px 9px; border-radius: 999px;
    box-shadow: 0 6px 18px rgba(14, 42, 58, 0.08);
  }
  .brand-pill img {
    width: 44px; height: 44px; border-radius: 50%; object-fit: cover;
    border: 2px solid #0fa47a;
  }
  .brand-pill span {
    font-family: "Kanit", sans-serif; font-size: 24px; font-weight: 800; color: #0e2a3a;
  }
  .slide-badge {
    font-family: "JetBrains Mono", monospace; font-size: 20px; font-weight: 800;
    color: #ffffff; background: #0e2a3a;
    padding: 9px 20px; border-radius: 999px; letter-spacing: 1px;
  }

  .sticker-outline {
    filter:
      drop-shadow(5px 0 0 #ffffff)
      drop-shadow(-5px 0 0 #ffffff)
      drop-shadow(0 5px 0 #ffffff)
      drop-shadow(0 -5px 0 #ffffff)
      drop-shadow(4px 4px 0 #ffffff)
      drop-shadow(-4px -4px 0 #ffffff)
      drop-shadow(4px -4px 0 #ffffff)
      drop-shadow(-4px 4px 0 #ffffff)
      drop-shadow(0 12px 18px rgba(14, 42, 58, 0.22));
  }

  /* Header banner for Slides 02-03 with safely inset watermark (NO right-edge clipping!) */
  .header-banner {
    background: linear-gradient(120deg, #0e2a3a 0%, #153c52 100%);
    border-radius: 28px;
    padding: 24px 30px;
    color: #ffffff;
    box-shadow: 0 16px 34px rgba(14, 42, 58, 0.18);
    position: relative;
    overflow: hidden;
  }
  .header-watermark {
    position: absolute;
    right: 28px;
    top: 18px;
    font-family: "JetBrains Mono", monospace;
    font-size: 46px;
    font-weight: 800;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.08);
    pointer-events: none;
    white-space: nowrap;
  }
  .hb-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(15, 164, 122, 0.25);
    border: 1.5px solid #4ef2be; color: #8bf7d2;
    font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 800;
    padding: 4px 14px; border-radius: 999px; margin-bottom: 10px;
  }
  .header-banner h1 {
    font-family: "Kanit", sans-serif; font-size: 52px; font-weight: 900;
    line-height: 1.18; margin-bottom: 6px;
  }
  .header-banner h1 .gold { color: #ffd166; }
  .header-banner h1 .mint { color: #4ef2be; }
  .header-banner p { font-size: 23px; font-weight: 600; color: #cde3ec; }

  .barcode {
    display: flex; align-items: center; gap: 10px;
    font-family: "JetBrains Mono", monospace; font-size: 17px; font-weight: 700; color: #3a5666;
  }
  .bars {
    height: 20px; width: 104px;
    background: repeating-linear-gradient(
      90deg,
      #0e2a3a 0 3px, transparent 3px 6px,
      #0e2a3a 6px 8px, transparent 8px 12px,
      #0e2a3a 12px 17px, transparent 17px 20px
    );
    opacity: 0.78;
  }
`;

function renderTopbar(avatar, passLabel) {
  return `<header class="topbar" data-safe-check="topbar">
    <div class="brand-pill">
      <img src="${avatar}" alt="">
      <span>ซิมไปไหน · SimPaiNai</span>
    </div>
    <div class="slide-badge">${passLabel}</div>
  </header>`;
}

// ============================================================================
// SLIDE 01: BOARDING PASS COVER + 2-SIM IPHONE MOCKUP + CLEAN STICKERS (y <= 1480)
// ============================================================================
export function buildStyleBCover(cfg) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_BOARDING_CSS}
  .boarding-card {
    position: absolute;
    top: 186px;
    left: 50px;
    width: 944px;
    background: #ffffff;
    border-radius: 32px;
    border: 2.5px solid #d2dfdc;
    box-shadow: 0 22px 50px rgba(14, 42, 58, 0.14);
    overflow: visible;
  }

  .bp-header {
    background: linear-gradient(115deg, #0e2a3a 0%, #163d54 100%);
    border-radius: 29px 29px 0 0;
    padding: 18px 30px;
    display: flex; align-items: center; justify-content: space-between;
    color: #ffffff;
  }
  .route { display: flex; align-items: center; gap: 14px; }
  .airport {
    font-family: "JetBrains Mono", monospace; font-size: 36px; font-weight: 800;
    letter-spacing: 1.5px; line-height: 1;
  }
  .airport small {
    display: block; font-family: "Anuphan", sans-serif;
    font-size: 15px; font-weight: 600; color: #9ed4c4; margin-top: 3px;
  }
  .flight-path { display: flex; align-items: center; gap: 6px; color: #ffd166; font-size: 24px; }
  .flight-dots { width: 46px; height: 3px; border-top: 3px dashed rgba(255, 209, 102, 0.65); }
  .bp-meta { display: flex; gap: 9px; }
  .meta-chip {
    background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.2);
    border-radius: 12px; padding: 6px 14px; text-align: center;
  }
  .meta-chip .k {
    font-family: "JetBrains Mono", monospace; font-size: 12px; color: #a8c7d4; display: block;
  }
  .meta-chip .v {
    font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 800; color: #4ef2be;
  }
  .meta-chip.amber .v { color: #ffd166; }

  .bp-title-zone { padding: 18px 28px 10px; text-align: center; }
  .save-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: #fff4df; border: 2px solid #e8a13d; color: #9e5c09;
    font-family: "Kanit", sans-serif; font-size: 22px; font-weight: 800;
    padding: 5px 20px; border-radius: 999px; margin-bottom: 8px;
  }
  .bp-h1 {
    font-family: "Kanit", sans-serif; font-size: 52px; font-weight: 900;
    color: #0e2a3a; line-height: 1.15;
  }
  .bp-h1 .em {
    display: inline-block; font-size: 62px; color: #0fa47a;
    background: linear-gradient(180deg, transparent 66%, rgba(255, 209, 102, 0.58) 66%);
    padding: 0 8px; line-height: 1.12;
  }
  .bp-sub {
    margin-top: 6px; font-size: 24px; font-weight: 700; color: #365466;
  }

  /* Center Stage: Dual-SIM iPhone Mockup + Clean Mascot Stickers */
  .phone-stage {
    position: relative;
    height: 550px;
    display: flex; justify-content: center; align-items: flex-start;
    padding-top: 6px;
  }
  .iphone {
    width: 492px;
    background: #0d1f2d;
    border-radius: 44px;
    padding: 12px;
    box-shadow: 0 22px 44px rgba(14, 42, 58, 0.28), 0 0 0 4px #2a4859;
    position: relative; z-index: 2;
  }
  .iphone-screen {
    background: linear-gradient(180deg, #f7fbfa 0%, #eaf3f0 100%);
    border-radius: 34px;
    padding: 12px 18px 16px;
  }
  .dynamic-island {
    width: 112px; height: 24px; background: #0a1721;
    border-radius: 999px; margin: 0 auto 10px;
  }
  .ios-status {
    display: flex; align-items: center; justify-content: space-between;
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800;
    color: #0e2a3a; margin-bottom: 10px; padding-bottom: 8px;
    border-bottom: 1.5px solid #d5e4e0;
  }
  .carrier-pill {
    background: #0fa47a; color: #ffffff;
    padding: 3px 10px; border-radius: 999px; font-size: 14px;
  }
  .wificall-pill {
    background: #e6f4ff; color: #0958d9; border: 1px solid #91caff;
    padding: 3px 10px; border-radius: 999px; font-size: 13px;
  }
  .screen-head {
    font-family: "Kanit", sans-serif; font-size: 20px; font-weight: 800;
    color: #0e2a3a; margin-bottom: 10px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .screen-head span {
    font-family: "Anuphan", sans-serif; font-size: 14px; font-weight: 700;
    color: #0b7d5e; background: #d7f7eb; padding: 3px 10px; border-radius: 999px;
  }

  .sim-cards { display: flex; flex-direction: column; gap: 10px; }
  .sim-box {
    background: #ffffff; border: 1.8px solid #d3e3df; border-radius: 18px;
    padding: 11px 14px; box-shadow: 0 4px 10px rgba(14, 42, 58, 0.05);
  }
  .sim-box.esim { border-color: #6cdbb6; background: linear-gradient(135deg, #ffffff 0%, #f1fcf7 100%); }
  .sim-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #e6efec;
  }
  .sim-title {
    display: flex; align-items: center; gap: 8px;
    font-family: "Kanit", sans-serif; font-size: 19px; font-weight: 800; color: #0e2a3a;
  }
  .sim-dot { width: 11px; height: 11px; border-radius: 50%; }
  .dot-navy { background: #1d4ed8; }
  .dot-emerald { background: #0fa47a; }
  .sim-tag {
    font-family: "JetBrains Mono", monospace; font-size: 13px; font-weight: 800;
    padding: 2px 9px; border-radius: 999px;
  }
  .tag-blue { background: #e8f1ff; color: #1d4ed8; }
  .tag-green { background: #d8f8ec; color: #0b7d5e; }

  .toggle-list { display: flex; flex-direction: column; gap: 6px; }
  .toggle-row {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 16px; font-weight: 700; color: #2a4758;
  }
  .toggle-row small { font-weight: 600; color: #647f8f; font-size: 13px; margin-left: 4px; }
  .pill-state {
    font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 800;
    padding: 2px 10px; border-radius: 999px; white-space: nowrap;
  }
  .st-on { background: #0fa47a; color: #ffffff; }
  .st-off { background: #fee2e2; color: #b91c1c; border: 1.5px solid #fca5a5; }

  .st-pitua {
    position: absolute; z-index: 4; left: -12px; bottom: 10px;
    width: 214px; transform: rotate(-4deg);
  }
  .st-simpok {
    position: absolute; z-index: 4; right: -8px; bottom: 12px;
    width: 222px; transform: rotate(4deg);
  }
  .bubble-tip {
    position: absolute; right: 6px; top: 38px; z-index: 5;
    background: #ffd166; color: #0e2a3a; border: 3px solid #ffffff;
    border-radius: 18px 18px 18px 4px; padding: 8px 15px;
    font-family: "Kanit", sans-serif; font-size: 19px; font-weight: 800;
    line-height: 1.22; box-shadow: 0 10px 22px rgba(14, 42, 58, 0.2);
    transform: rotate(3deg);
  }

  .benefit-strip {
    margin: 4px 26px 2px;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
  }
  .benefit-pill {
    background: #f0f8f5; border: 1.5px solid #bfe8d9; border-radius: 14px;
    padding: 8px 10px; text-align: center;
    font-family: "Kanit", sans-serif; font-size: 19px; font-weight: 700; color: #0e2a3a;
  }
  .benefit-pill b { color: #0b7d5e; }

  .stub-divider {
    position: relative; height: 28px; display: flex; align-items: center; padding: 0 26px;
  }
  .stub-divider::before, .stub-divider::after {
    content: ""; position: absolute; top: 50%; width: 34px; height: 34px;
    border-radius: 50%; background: #f2f6f5; border: 2.5px solid #d2dfdc;
    transform: translateY(-50%);
  }
  .stub-divider::before { left: -19px; }
  .stub-divider::after { right: -19px; }
  .stub-line { width: 100%; border-top: 3px dashed #bdd0cb; }

  .stub-body {
    padding: 8px 28px 20px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    background: linear-gradient(180deg, #ffffff 0%, #f6fbf9 100%);
    border-radius: 0 0 30px 30px;
  }
  .stub-left { display: flex; flex-direction: column; gap: 3px; }
  .stub-kicker { font-size: 19px; font-weight: 700; color: #0b7d5e; }
  .stub-main {
    font-family: "Kanit", sans-serif; font-size: 32px; font-weight: 900;
    color: #0e2a3a; line-height: 1.1;
  }
  .stub-note { font-size: 18px; font-weight: 600; color: #456272; }
  .stub-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
  .stub-coupon {
    background: #0e2a3a; color: #ffd166; border: 2px solid #0fa47a;
    border-radius: 14px; padding: 7px 18px; text-align: center;
  }
  .stub-coupon small { display: block; font-size: 15px; font-weight: 700; color: #a4f3d6; }
  .stub-coupon b {
    font-family: "JetBrains Mono", monospace; font-size: 26px; font-weight: 800; letter-spacing: 0.7px;
  }

  /* Bottom CTA swipe pill strictly within y <= 1480px! */
  .bottom-swipe {
    position: absolute;
    top: 1344px;
    left: 50px;
    width: 944px;
    display: flex; justify-content: center;
  }
  .swipe-pill {
    background: linear-gradient(95deg, #0fa47a, #0b8a66);
    color: #ffffff; font-family: "Kanit", sans-serif;
    font-size: 26px; font-weight: 800;
    padding: 13px 34px; border-radius: 999px;
    box-shadow: 0 12px 26px rgba(15, 164, 122, 0.34);
  }
</style>
</head>
<body>
  <div class="canvas">
    ${renderTopbar(cfg.avatar, 'PASS 01 / 04')}

    <article class="boarding-card" data-safe-check="boarding-card">
      <div class="bp-header">
        <div class="route">
          <div class="airport">${cfg.routeFrom.code}<small>${cfg.routeFrom.label}</small></div>
          <div class="flight-path"><span class="flight-dots"></span>✈<span class="flight-dots"></span></div>
          <div class="airport">${cfg.routeTo.code}<small>${cfg.routeTo.label}</small></div>
        </div>
        <div class="bp-meta">
          <div class="meta-chip"><span class="k">${cfg.meta1.k}</span><span class="v">${cfg.meta1.v}</span></div>
          <div class="meta-chip amber"><span class="k">${cfg.meta2.k}</span><span class="v">${cfg.meta2.v}</span></div>
        </div>
      </div>

      <div class="bp-title-zone">
        <div class="save-tag">${cfg.saveTag}</div>
        <h1 class="bp-h1">${cfg.headlineHtml}</h1>
        <div class="bp-sub">${cfg.sub}</div>
      </div>

      <div class="phone-stage">
        <div class="iphone">
          <div class="iphone-screen">
            <div class="dynamic-island"></div>
            <div class="ios-status">
              <span>09:41</span>
              <span class="carrier-pill">● Travel eSIM 5G</span>
              <span class="wificall-pill">Wi-Fi Call ✓</span>
            </div>
            <div class="screen-head">
              ตั้งค่า 2 ซิมคู่กัน (iOS/Android) <span>เช็กแล้ว!</span>
            </div>
            <div class="sim-cards">
              <div class="sim-box">
                <div class="sim-head">
                  <div class="sim-title"><span class="sim-dot dot-navy"></span>ซิมไทย (Thai SIM)</div>
                  <div class="sim-tag tag-blue">OTP + CALL</div>
                </div>
                <div class="toggle-list">
                  <div class="toggle-row">
                    <span>Turn On This Line <small>(รับ SMS OTP)</small></span>
                    <span class="pill-state st-on">ON ✓</span>
                  </div>
                  <div class="toggle-row">
                    <span>Wi-Fi Calling <small>(โทรเรตไทย)</small></span>
                    <span class="pill-state st-on">ON ✓</span>
                  </div>
                  <div class="toggle-row">
                    <span>Data Roaming <small>(กันบิลโรมมิ่ง)</small></span>
                    <span class="pill-state st-off">OFF ✕</span>
                  </div>
                </div>
              </div>

              <div class="sim-box esim">
                <div class="sim-head">
                  <div class="sim-title"><span class="sim-dot dot-emerald"></span>Travel eSIM (Airalo)</div>
                  <div class="sim-tag tag-green">5G DATA</div>
                </div>
                <div class="toggle-list">
                  <div class="toggle-row">
                    <span>Cellular Data <small>(ใช้เน็ตต่างประเทศ)</small></span>
                    <span class="pill-state st-on">Travel eSIM</span>
                  </div>
                  <div class="toggle-row">
                    <span>Data Roaming <small>(เฉพาะสาย eSIM)</small></span>
                    <span class="pill-state st-on">ON ✓</span>
                  </div>
                  <div class="toggle-row">
                    <span>Data Switching <small>(ห้ามสลับซิมเอง!)</small></span>
                    <span class="pill-state st-off">OFF ✕</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img class="st-pitua sticker-outline" src="${cfg.stickerPiTua}" alt="">
        <img class="st-simpok sticker-outline" src="${cfg.stickerSimpok}" alt="">
        <div class="bubble-tip">${cfg.bubbleHtml}</div>
      </div>

      <div class="benefit-strip">
        ${cfg.benefits.map((b) => `<div class="benefit-pill"><b>✓</b> ${b}</div>`).join('')}
      </div>

      <div class="stub-divider"><div class="stub-line"></div></div>

      <div class="stub-body">
        <div class="stub-left">
          <div class="stub-kicker">${cfg.stub.kicker}</div>
          <div class="stub-main">${cfg.stub.main}</div>
          <div class="stub-note">${cfg.stub.note}</div>
        </div>
        <div class="stub-right">
          <div class="stub-coupon">
            <small>${cfg.stub.couponLabel}</small>
            <b>${cfg.stub.code}</b>
          </div>
          <div class="barcode">
            <span class="bars"></span>
            <span>esim.whytobe.com</span>
          </div>
        </div>
      </div>
    </article>

    <div class="bottom-swipe" data-safe-check="bottom-swipe">
      <div class="swipe-pill">${cfg.swipeText}</div>
    </div>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 02 & 03: 3-CARD SURVIVAL CHECKLIST / VISUAL GUIDE (y <= 1480px!)
// ============================================================================
export function buildStyleBCardsSlide(cfg) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_BOARDING_CSS}
  .main-wrap {
    position: absolute;
    top: 188px;
    left: 50px;
    width: 944px;
    display: flex; flex-direction: column; gap: 18px;
  }

  .step-card {
    background: #ffffff;
    border: 2.5px solid #d4e2df;
    border-radius: 26px;
    padding: 20px 24px;
    display: grid;
    grid-template-columns: 102px 1fr;
    gap: 18px;
    align-items: center;
    box-shadow: 0 12px 26px rgba(14, 42, 58, 0.08);
  }
  .step-card.highlight {
    border-color: #e8a13d;
    background: linear-gradient(120deg, #ffffff 0%, #fffaf0 100%);
  }
  .step-card.danger {
    border-color: #ef4444;
    background: linear-gradient(120deg, #ffffff 0%, #fff5f5 100%);
  }

  .step-icon-col { display: flex; flex-direction: column; align-items: center; gap: 7px; }
  .step-num-pill {
    font-family: "JetBrains Mono", monospace; font-size: 15px; font-weight: 800;
    color: #ffffff; background: #0e2a3a; padding: 4px 11px; border-radius: 999px;
    white-space: nowrap;
  }
  .step-card.highlight .step-num-pill { background: #d4821a; }
  .step-card.danger .step-num-pill { background: #dc2626; }
  .icon-box {
    width: 78px; height: 78px; border-radius: 22px;
    display: flex; align-items: center; justify-content: center;
  }
  .icon-emerald { background: #e1f8f0; border: 2px solid #79e0bc; }
  .icon-navy { background: #e6eff4; border: 2px solid #9cb9c9; }
  .icon-amber { background: #fff1d6; border: 2px solid #f0b85a; }
  .icon-red { background: #fee2e2; border: 2px solid #fca5a5; }

  .step-body h2 {
    font-family: "Kanit", sans-serif; font-size: 33px; font-weight: 900;
    color: #0e2a3a; line-height: 1.16; margin-bottom: 5px;
  }
  .step-body p {
    font-size: 23px; font-weight: 600; color: #365263; line-height: 1.34; margin-bottom: 10px;
  }
  .step-body b { color: #0b7d5e; font-weight: 800; }
  .step-body .red { color: #b91c1c; font-weight: 800; }
  .step-chip {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 19px; font-weight: 700; padding: 6px 14px; border-radius: 11px;
  }
  .chip-warn { background: #fdecec; color: #b42318; border: 1.5px solid #f6bcbc; }
  .chip-ok { background: #e3f9f1; color: #0a7254; border: 1.5px solid #98e5cb; }
  .chip-amber { background: #fff3da; color: #9c5906; border: 1.5px solid #f2c472; }

  /* Compact bottom callout + mascot cameo ending well within y <= 1480px */
  .bottom-zone {
    display: grid;
    grid-template-columns: 1fr 186px;
    gap: 16px;
    align-items: center;
    margin-top: 2px;
  }
  .summary-strip {
    background: linear-gradient(125deg, #0e2a3a 0%, #114348 100%);
    border: 2.5px solid #0fa47a;
    border-radius: 24px;
    padding: 20px 24px;
    color: #ffffff;
    box-shadow: 0 16px 32px rgba(14, 42, 58, 0.18);
  }
  .sum-kicker { font-size: 18px; font-weight: 700; color: #8cf7d3; margin-bottom: 5px; }
  .sum-title {
    font-family: "Kanit", sans-serif; font-size: 31px; font-weight: 900;
    color: #ffffff; line-height: 1.18; margin-bottom: 8px;
  }
  .sum-title .gold { color: #ffd166; }
  .sum-sub { font-size: 20px; font-weight: 600; color: #cfe6ed; line-height: 1.32; }

  .mascot-col {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .mascot-bubble {
    background: #ffffff; color: #0e2a3a; border: 2.5px solid #0fa47a;
    border-radius: 16px 16px 16px 4px; padding: 5px 10px;
    font-family: "Kanit", sans-serif; font-size: 16px; font-weight: 800;
    white-space: nowrap; box-shadow: 0 6px 14px rgba(14, 42, 58, 0.14);
  }
  .mascot-img {
    height: 172px; width: auto; max-width: 176px; object-fit: contain;
    display: block; transform: rotate(2deg);
  }
</style>
</head>
<body>
  <div class="canvas">
    ${renderTopbar(cfg.avatar, cfg.passLabel)}

    <main class="main-wrap" data-safe-check="cards-main">
      <section class="header-banner">
        <div class="header-watermark">${cfg.watermark}</div>
        <div class="hb-tag">${cfg.tag}</div>
        <h1>${cfg.titleHtml}</h1>
        <p>${cfg.subtitle}</p>
      </section>

      ${cfg.cards
        .map(
          (c) => `<section class="step-card ${c.cardTone || ''}">
        <div class="step-icon-col">
          <div class="step-num-pill">${c.badge}</div>
          <div class="icon-box ${c.iconTone}">${c.iconSvg}</div>
        </div>
        <div class="step-body">
          <h2>${c.heading}</h2>
          <p>${c.bodyHtml}</p>
          <div class="step-chip ${c.chipTone}">${c.chipText}</div>
        </div>
      </section>`
        )
        .join('')}

      <section class="bottom-zone" data-safe-check="bottom-callout">
        <div class="summary-strip">
          <div class="sum-kicker">${cfg.bottom.kicker}</div>
          <div class="sum-title">${cfg.bottom.titleHtml}</div>
          <div class="sum-sub">${cfg.bottom.sub}</div>
        </div>
        <div class="mascot-col">
          <div class="mascot-bubble">${cfg.bottom.bubble}</div>
          <img class="mascot-img sticker-outline" src="${cfg.bottom.sticker}" alt="">
        </div>
      </section>
    </main>
  </div>
</body>
</html>`;
}

// ============================================================================
// SLIDE 04: CLOSING BOARDING PASS SUMMARY + COUPON + COMMENT CTA (y <= 1480px!)
// ============================================================================
export function buildStyleBClosing(cfg) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
${FONTS_LINK}
<style>
  ${SHARED_BOARDING_CSS}
  .boarding-card {
    position: absolute;
    top: 188px;
    left: 50px;
    width: 944px;
    background: #ffffff;
    border-radius: 32px;
    border: 2.5px solid #d2dfdc;
    box-shadow: 0 22px 50px rgba(14, 42, 58, 0.14);
    overflow: visible;
  }
  .bp-top {
    background: linear-gradient(118deg, #0e2a3a 0%, #164056 100%);
    border-radius: 29px 29px 0 0;
    padding: 24px 32px;
    color: #ffffff;
    position: relative;
    overflow: hidden;
  }
  .bp-top .header-watermark { top: 18px; right: 28px; font-size: 44px; }
  .bp-top h1 {
    font-family: "Kanit", sans-serif; font-size: 54px; font-weight: 900;
    line-height: 1.16; margin-bottom: 6px;
  }
  .bp-top h1 .gold { color: #ffd166; }
  .bp-top p { font-size: 23px; font-weight: 600; color: #cde4ee; }

  .checklist-wrap {
    padding: 26px 30px 18px;
    display: flex; flex-direction: column; gap: 15px;
  }
  .chk-row {
    background: #f5faf8;
    border: 1.8px solid #cde5dd;
    border-radius: 18px;
    padding: 16px 20px;
    display: grid; grid-template-columns: 46px 1fr; gap: 15px; align-items: center;
  }
  .chk-num {
    width: 44px; height: 44px; border-radius: 13px;
    background: #0fa47a; color: #ffffff;
    font-family: "JetBrains Mono", monospace; font-size: 22px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
  }
  .chk-text {
    font-family: "Anuphan", sans-serif; font-size: 23px; font-weight: 700;
    color: #0e2a3a; line-height: 1.3;
  }
  .chk-text b { color: #0b7d5e; font-weight: 800; }

  .stub-divider {
    position: relative; height: 32px; display: flex; align-items: center; padding: 0 28px;
  }
  .stub-divider::before, .stub-divider::after {
    content: ""; position: absolute; top: 50%; width: 36px; height: 36px;
    border-radius: 50%; background: #f2f6f5; border: 2.5px solid #d2dfdc;
    transform: translateY(-50%);
  }
  .stub-divider::before { left: -20px; }
  .stub-divider::after { right: -20px; }
  .stub-line { width: 100%; border-top: 3px dashed #bdd0cb; }

  .coupon-section {
    padding: 12px 30px 24px;
    background: linear-gradient(180deg, #ffffff 0%, #f4fbf8 100%);
    border-radius: 0 0 30px 30px;
    display: grid;
    grid-template-columns: 1fr 228px;
    gap: 18px;
    align-items: center;
  }
  .coupon-box {
    background: linear-gradient(125deg, #0e2a3a 0%, #12424a 100%);
    border: 2.5px solid #0fa47a;
    border-radius: 24px;
    padding: 20px 24px;
    color: #ffffff;
  }
  .cp-kicker { font-size: 19px; font-weight: 700; color: #8cf7d3; margin-bottom: 6px; }
  .cp-price {
    font-family: "Kanit", sans-serif; font-size: 36px; font-weight: 900;
    color: #ffffff; line-height: 1.15; margin-bottom: 10px;
  }
  .cp-price .gold { color: #ffd166; }
  .cp-code-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .cp-code {
    font-family: "JetBrains Mono", monospace; font-size: 29px; font-weight: 800;
    color: #0e2a3a; background: #ffd166; padding: 7px 16px; border-radius: 12px;
  }
  .cp-off { font-size: 20px; font-weight: 700; color: #d8f5ec; }
  .cp-link {
    padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.24);
    font-size: 20px; font-weight: 700; color: #ffd166;
  }
  .cp-link span {
    display: block; font-family: "JetBrains Mono", monospace;
    font-size: 18px; color: #ffffff; margin-top: 3px;
  }

  .duo-stage {
    position: relative;
    height: 224px;
    display: flex; align-items: flex-end; justify-content: center;
  }
  .duo-pitua { height: 214px; width: auto; margin-right: -24px; z-index: 2; transform: rotate(-3deg); }
  .duo-simpok { height: 196px; width: auto; z-index: 3; transform: rotate(3deg); }

  /* Bottom CTA Banner strictly within y <= 1480px! */
  .bottom-cta {
    position: absolute;
    top: 1208px;
    left: 50px;
    width: 944px;
    background: linear-gradient(95deg, #0fa47a 0%, #0b8664 100%);
    border-radius: 24px;
    padding: 20px 28px;
    color: #ffffff;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    box-shadow: 0 14px 30px rgba(15, 164, 122, 0.34);
  }
  .bcta-main {
    font-family: "Kanit", sans-serif; font-size: 28px; font-weight: 800; line-height: 1.2;
  }
  .bcta-sub { font-size: 19px; font-weight: 600; color: #dcfff2; margin-top: 2px; }
  .bcta-pill {
    background: #0e2a3a; color: #ffd166;
    font-family: "Kanit", sans-serif; font-size: 23px; font-weight: 800;
    padding: 10px 22px; border-radius: 999px; white-space: nowrap;
  }
</style>
</head>
<body>
  <div class="canvas">
    ${renderTopbar(cfg.avatar, 'PASS 04 / 04')}

    <article class="boarding-card" data-safe-check="closing-card">
      <div class="bp-top">
        <div class="header-watermark">${cfg.watermark}</div>
        <div class="hb-tag">${cfg.tag}</div>
        <h1>${cfg.titleHtml}</h1>
        <p>${cfg.subtitle}</p>
      </div>

      <div class="checklist-wrap">
        ${cfg.summaryItems
          .map(
            (it, idx) => `<div class="chk-row">
          <div class="chk-num">0${idx + 1}</div>
          <div class="chk-text">${it}</div>
        </div>`
          )
          .join('')}
      </div>

      <div class="stub-divider"><div class="stub-line"></div></div>

      <div class="coupon-section">
        <div class="coupon-box">
          <div class="cp-kicker">${cfg.coupon.kicker}</div>
          <div class="cp-price">${cfg.coupon.priceHtml}</div>
          <div class="cp-code-row">
            <span class="cp-code">${cfg.coupon.code}</span>
            <span class="cp-off">${cfg.coupon.offText}</span>
          </div>
          <div class="cp-link">
            ${cfg.coupon.ctaLabel}
            <span>${cfg.coupon.ctaUrl}</span>
          </div>
        </div>
        <div class="duo-stage">
          <img class="duo-pitua sticker-outline" src="${cfg.stickerPiTua}" alt="">
          <img class="duo-simpok sticker-outline" src="${cfg.stickerSimpok}" alt="">
        </div>
      </div>
    </article>

    <div class="bottom-cta" data-safe-check="bottom-cta">
      <div>
        <div class="bcta-main">${cfg.bottomCta.main}</div>
        <div class="bcta-sub">${cfg.bottomCta.sub}</div>
      </div>
      <div class="bcta-pill">${cfg.bottomCta.pill}</div>
    </div>
  </div>
</body>
</html>`;
}

// SVG icons helper
const ICONS = {
  wifiCall: `<svg width="46" height="46" viewBox="0 0 48 48" fill="none">
    <path d="M12 18c7-6 17-6 24 0" stroke="#0b7d5e" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M17 24c4-3.5 10-3.5 14 0" stroke="#0fa47a" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M17 31c2.5 4.5 6.5 7 11 8l3-3.2c.6-.6 1.5-.7 2.2-.3l3.2 1.8c.9.5 1.2 1.6.7 2.5-1.2 2.2-3.6 3.5-6.2 3.1C21.8 41.5 14.5 34.2 13.1 25.1" stroke="#0b7d5e" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  toggleOff: `<svg width="46" height="46" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="13" width="36" height="22" rx="11" fill="#0e2a3a"/>
    <circle cx="17" cy="24" r="8" fill="#ffffff"/>
    <path d="M29 20l6 8M35 20l-6 8" stroke="#fca5a5" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  shieldBlock: `<svg width="46" height="46" viewBox="0 0 48 48" fill="none">
    <path d="M24 6l14 6v11c0 9.5-6 15.8-14 19-8-3.2-14-9.5-14-19V12l14-6z" fill="#fff" stroke="#c77614" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M18 19l12 12M30 19L18 31" stroke="#dc2626" stroke-width="3.6" stroke-linecap="round"/>
  </svg>`,
  smsOtp: `<svg width="46" height="46" viewBox="0 0 48 48" fill="none">
    <rect x="7" y="9" width="34" height="24" rx="6" fill="#fff" stroke="#0b7d5e" stroke-width="3.4"/>
    <path d="M16 33l-4 7 9-7" fill="#fff" stroke="#0b7d5e" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="17" cy="21" r="2.6" fill="#0fa47a"/>
    <circle cx="24" cy="21" r="2.6" fill="#0fa47a"/>
    <circle cx="31" cy="21" r="2.6" fill="#0fa47a"/>
  </svg>`,
  phoneGreen: `<svg width="46" height="46" viewBox="0 0 48 48" fill="none">
    <rect x="13" y="6" width="22" height="36" rx="5" fill="#fff" stroke="#0e2a3a" stroke-width="3.4"/>
    <path d="M19 20c3-2.5 7-2.5 10 0" stroke="#0fa47a" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="24" cy="25" r="2.6" fill="#0fa47a"/>
    <line x1="20" y1="35" x2="28" y2="35" stroke="#0e2a3a" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  warningCall: `<svg width="46" height="46" viewBox="0 0 48 48" fill="none">
    <path d="M24 7L41 38H7L24 7z" fill="#fff" stroke="#dc2626" stroke-width="3.5" stroke-linejoin="round"/>
    <line x1="24" y1="19" x2="24" y2="28" stroke="#dc2626" stroke-width="3.8" stroke-linecap="round"/>
    <circle cx="24" cy="33.5" r="2.2" fill="#dc2626"/>
  </svg>`,
};

// ============================================================================
// ANGLE E — OTP + WI-FI CALLING WITHOUT ROAMING BILLS (STYLE B FULL 4-SLIDE PACK)
// ============================================================================
async function main() {
  const avatar = getBrandAvatar();
  const stickerDir = join(PROJECT_ROOT, 'assets/brand/stickers');
  const protoSrc = join(PROJECT_ROOT, 'assets/carousels/angle-c-prototypes/_src');
  const outDir = join(PROJECT_ROOT, 'assets/carousels/angle-e-otp-style-b');

  const stickerPiTua = toDataUri(join(stickerDir, 'sticker-pi-tua-clean.png'));
  const stickerSimpok = toDataUri(join(protoSrc, 'sticker-nong-simpok.png'));
  const stickerChip = toDataUri(join(protoSrc, 'sticker-nong-chip.png'));

  const jobs = [
    {
      file: 'slide-01.png',
      maxSafeY: 1480,
      html: buildStyleBCover({
        avatar,
        stickerPiTua,
        stickerSimpok,
        routeFrom: { code: 'BKK', label: 'กรุงเทพฯ' },
        routeTo: { code: 'TYO / PVG', label: 'ญี่ปุ่น · จีน · ทั่วโลก' },
        meta1: { k: 'DUAL SIM', v: '2 ซิมคู่' },
        meta2: { k: 'ROAMING', v: '฿0 รั่ว' },
        saveTag: '★ เช็กลิสต์ก่อนบิน 2026 · เซฟเก็บไว้เลย!',
        headlineHtml: 'ใช้ eSIM แต่ยังรับ<br><span class="em">OTP แอปธนาคารไทยได้!</span>',
        sub: 'สรุปครบ! รับ SMS ฟรี + โทรเหมือนอยู่ไทยด้วย Wi-Fi Calling',
        bubbleHtml: 'เปิดซิมไทยได้<br>แต่ปิด Roaming!',
        benefits: ['รับ SMS OTP ฟรี', 'โทร Wi-Fi Call เรตไทย', 'ไม่โดนบิลเน็ตรั่ว'],
        stub: {
          kicker: 'Airalo eSIM 200+ ประเทศ (ติดตั้งจากไทย 2 นาที)',
          main: 'เริ่มต้น ~฿136 · ไม่ต้องถอดซิมไทย',
          note: 'รองรับทั้ง iPhone และ Android รุ่นมี EID (*#06#)',
          couponLabel: 'โค้ดลูกค้าใหม่ลด 15%',
          code: 'NEWTOAIRALO15',
        },
        swipeText: 'ปัดขวาดู 3 สวิตช์ต้องตั้งค่าก่อนขึ้นเครื่อง →',
      }),
    },
    {
      file: 'slide-02.png',
      maxSafeY: 1480,
      html: buildStyleBCardsSlide({
        avatar,
        passLabel: 'PASS 02 / 04',
        watermark: 'PRE-FLIGHT',
        tag: 'BOARDING CHECKLIST · 3 SWITCHES',
        titleHtml: 'ตั้งค่าซิมไทยก่อนขึ้นเครื่อง<br><span class="gold">เช็ก 3 สวิตช์นี้ กันบิลบาน!</span>',
        subtitle: 'ตั้งให้ครบตั้งแต่ตอนอยู่ไทย ก่อนเปิดโหมดเครื่องบิน',
        cards: [
          {
            badge: 'STEP 01',
            iconTone: 'icon-emerald',
            iconSvg: ICONS.wifiCall,
            heading: 'เปิด Wi-Fi Calling ตั้งแต่อยู่ไทย',
            bodyHtml: 'เข้า <b>Settings → Cellular → ซิมไทย</b> เปิด <b>Wi-Fi Calling = ON</b> (เปิดบริการกับค่ายไทยไว้ล่วงหน้า)',
            chipTone: 'chip-ok',
            chipText: '✓ ต้องเปิดตอนอยู่ไทย เพราะบางค่ายส่ง SMS ยืนยันก่อนบิน',
          },
          {
            badge: 'STEP 02',
            iconTone: 'icon-navy',
            iconSvg: ICONS.toggleOff,
            heading: 'ปิด Data Roaming ของซิมไทย',
            bodyHtml: 'เปิดสายซิมไทย (<b>Turn On This Line = ON</b>) ไว้ได้ แต่ต้อง <b>ปิด Data Roaming = OFF</b> เสมอ',
            chipTone: 'chip-ok',
            chipText: '✓ Android: ปิด Data Roaming ซิมไทย แล้วเปิดเฉพาะสาย eSIM',
          },
          {
            badge: 'STEP 03',
            cardTone: 'highlight',
            iconTone: 'icon-amber',
            iconSvg: ICONS.shieldBlock,
            heading: 'ปิด Allow Cellular Data Switching!',
            bodyHtml: 'ตั้ง <b>Cellular Data = Travel eSIM</b> แล้ว <span class="red">ปิดสวิตช์ Allow Cellular Data Switching</span> ทันที',
            chipTone: 'chip-warn',
            chipText: '⚠️ ถ้าเปิดทิ้งไว้ iPhone จะแอบสลับดึงเน็ตซิมไทยทันทีที่คลื่นตก!',
          },
        ],
        bottom: {
          kicker: 'สรุปสูตรกันเน็ตรั่ว 100%',
          titleHtml: 'เน็ตใช้ <span class="gold">eSIM</span> · ซิมไทย <span class="gold">ปิด Roaming</span>',
          sub: 'ปัดขวาดูวิธีรับ OTP ธนาคาร & โทรกลับไทยฟรีด้วย Wi-Fi Calling →',
          bubble: 'ปิด Data Switching ด้วย!',
          sticker: stickerChip,
        },
      }),
    },
    {
      file: 'slide-03.png',
      maxSafeY: 1480,
      html: buildStyleBCardsSlide({
        avatar,
        passLabel: 'PASS 03 / 04',
        watermark: 'OTP + CALL',
        tag: 'SURVIVAL GUIDE · OTP & WI-FI CALLING',
        titleHtml: 'รับ OTP ธนาคาร & โทรกลับไทย<br><span class="mint">ยังไงไม่โดนค่าโรมมิ่ง?</span>',
        subtitle: 'แยกให้ชัด: อะไรฟรี vs อะไรที่ห้ามเผลอกดตอนอยู่ต่างประเทศ',
        cards: [
          {
            badge: 'FREE OTP',
            iconTone: 'icon-emerald',
            iconSvg: ICONS.smsOtp,
            heading: 'รับ SMS OTP ธนาคาร/บัตรเครดิต = ฟรี!',
            bodyHtml: 'แค่เปิดสายซิมไทยค้างไว้ (ปิด Data Roaming) <b>รับ SMS ขาเข้าฟรีทุกค่าย</b> ตัดบัตร/ผูก Alipay ได้เลย',
            chipTone: 'chip-ok',
            chipText: '✓ รับข้อความขาเข้าฟรี — แต่ห้ามส่ง SMS ออก (มีค่าบริการ ตปท.)',
          },
          {
            badge: 'WI-FI CALL',
            iconTone: 'icon-navy',
            iconSvg: ICONS.phoneGreen,
            heading: 'โทรกลับไทยเหมือนอยู่ไทย (เรตโปรไทย)',
            bodyHtml: 'ต่อ Wi-Fi รร. (หรือ iPhone ใช้เน็ต eSIM) จนมุมจอขึ้น <b>AIS / TRUE / dtac Wi-Fi Call</b> แล้วค่อยโทร',
            chipTone: 'chip-amber',
            chipText: '💡 ทริคชัวร์ 100%: เปิด Airplane Mode + เปิด Wi-Fi ก่อนโทรออก',
          },
          {
            badge: 'ห้ามเผลอ!',
            cardTone: 'danger',
            iconTone: 'icon-red',
            iconSvg: ICONS.warningCall,
            heading: 'ห้ามรับสาย/โทรออก ถ้าไม่ขึ้น Wi-Fi Call!',
            bodyHtml: 'ถ้ามุมจอขึ้นชื่อเครือข่ายต่างประเทศปกติ <span class="red">ห้ามกดรับสายหรือโทรออก</span> จะคิดค่าโทรโรมมิ่งทันที',
            chipTone: 'chip-warn',
            chipText: '⚠️ เห็นเบอร์โทรเข้าตอนไม่ขึ้น Wi-Fi Call → กดตัดสายแล้วโทรผ่าน LINE แทน',
          },
        ],
        bottom: {
          kicker: 'เช็กแถบสัญญาณมุมจอก่อนโทรทุกครั้ง',
          titleHtml: 'ขึ้น <span class="gold">"Wi-Fi Call"</span> = โทรเรตไทย!',
          sub: 'ปัดขวาเซฟเช็กลิสต์สรุป + รับโค้ดลด Airalo 15% →',
          bubble: 'เช็กแล้ว รอดชัวร์!',
          sticker: stickerPiTua,
        },
      }),
    },
    {
      file: 'slide-04.png',
      maxSafeY: 1480,
      html: buildStyleBClosing({
        avatar,
        stickerPiTua,
        stickerSimpok,
        watermark: 'READY TO FLY',
        tag: 'SAVE THIS PASS · BOARDING SUMMARY',
        titleHtml: 'เซฟโพสต์นี้ไว้ก่อนบิน!<br><span class="gold">รับ OTP ชัวร์ ไม่เจอบิลช็อก</span>',
        subtitle: 'ทวน 4 ข้อจบใน 10 วิ ก่อนออกจากสุวรรณภูมิ / ดอนเมือง',
        summaryItems: [
          'กด <b>*#06#</b> เช็กเลข <b>EID</b> แล้วติดตั้ง Airalo eSIM จากไทยให้จบ',
          'เปิด <b>Wi-Fi Calling</b> ของซิมไทยตั้งแต่อยู่ไทยก่อนขึ้นเครื่อง',
          'ลงเครื่องปุ๊บ: เน็ตใช้ <b>Travel eSIM</b> · ซิมไทย <b>ปิด Data Roaming</b>',
          'ปิด <b>Allow Cellular Data Switching</b> + เช็กคำว่า <b>Wi-Fi Call</b> ก่อนโทร',
        ],
        coupon: {
          kicker: 'Airalo eSIM 200+ ประเทศ (ญี่ปุ่น · เกาหลี · จีน · ยุโรป)',
          priceHtml: 'เริ่ม <span class="gold">~฿136</span> · ไม่ต้องถอดซิมไทย',
          code: 'NEWTOAIRALO15',
          offText: 'ลดลูกค้าใหม่ 15%',
          ctaLabel: '👇 คู่มือภาพตั้งค่า iPhone + Android ในคอมเมนต์',
          ctaUrl: 'esim.whytobe.com/blog/how-to-use-airalo/',
        },
        bottomCta: {
          main: '📌 กดเซฟโพสต์นี้ + กดลิงก์คู่มือภาพในคอมเมนต์',
          sub: 'ฟอล ซิมไปไหน · SimPaiNai ไว้เช็กทริคเน็ตเที่ยวทุกทริป!',
          pill: 'SAVE & FOLLOW ★',
        },
      }),
    },
  ];

  await renderSlides({ outDir, jobs, defaultMaxSafeY: 1480 });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
