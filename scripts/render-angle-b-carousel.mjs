// Run with Node.js and local Chromium, Noto Sans Thai, and Noto Color Emoji.
// Set CHROMIUM to override the Chromium executable.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'assets/carousels/angle-b-roaming-trap');
const width = 1080;
const height = 1920;

const css = `
  * { box-sizing:border-box }
  body { margin:0; width:1080px; height:1920px; color:#fff;
    background:radial-gradient(ellipse at 6% 18%, #164254 0%, transparent 55%),
      linear-gradient(155deg,#0e2a3a,#081b26 73%);
    font:400 33px/1.45 "Noto Sans Thai","Noto Sans","Noto Color Emoji",sans-serif }
  main { position:absolute; top:150px; left:72px; width:868px }
  header { display:flex; align-items:center; gap:16px; height:90px; font-size:25px;
    font-weight:700; color:#d1fae5; border-bottom:1px solid #ffffff38; padding-bottom:20px }
  header img { width:62px; height:62px; object-fit:cover; border-radius:50%;
    border:2px solid #a1e8cf; background:#d1fae5 }
  header .pill { margin-left:auto }
  .pill { display:inline-block; border:1px solid #ffffff35; border-radius:60px;
    padding:7px 22px; font-weight:700 }
  .eyebrow { margin-top:34px; color:#ffd597; background:#e8a13d22; border-color:#f59e0b80; font-size:29px }
  h1 { font-size:68px; line-height:1.24; margin:34px 0 30px; font-weight:900 }
  .hook h1 { font-size:90px; line-height:1.15; margin:26px 0 32px }
  .mint { color:#a3f5d4 }
  .amber-text { color:#ffd597 }
  .red-text { color:#fca5a5 }
  .stack { display:grid; gap:20px }
  .card { padding:26px 32px; border-radius:29px; border:1px solid #a9d1df42;
    background:#173746 }
  .green { background:linear-gradient(120deg,#104c43,#123c3c); border:2px solid #10b981 }
  .amber { background:#413322; border:1.5px solid #e8a13d99 }
  .alert-card { background:linear-gradient(135deg,#4c1822,#2a141c);
    border:2px solid #f87171; box-shadow:0 14px 36px rgba(239,68,68,0.22);
    padding:28px 32px }
  .ios-notif-top { display:flex; align-items:center; justify-content:space-between;
    font-size:24px; color:#fecaca; font-weight:700; margin-bottom:16px; letter-spacing:0.3px }
  .ios-badge { display:inline-flex; align-items:center; gap:10px }
  .ios-app-icon { width:34px; height:34px; border-radius:9px; background:#ef4444;
    display:inline-flex; align-items:center; justify-content:center;
    font-size:20px; font-weight:900; color:#fff }
  .alert-title { font-size:44px; line-height:1.25; font-weight:900; color:#fff; margin:0 0 18px }
  .alert-divider { border-top:1px solid #f8717155; padding-top:18px;
    font-size:33px; line-height:1.4; color:#ffe4c4; font-weight:700 }
  .alert-divider strong { color:#ffd597; font-weight:900 }
  .punch { margin:34px 0 26px; font-size:43px; line-height:1.32; font-weight:800 }
  .swipe { font-size:30px; color:#d1fae5; background:#10b9811c; border-color:#10b98166 }

  /* Slide 2: iPhone Dialer + Device Info mockup */
  .phone-mock { background:#111c24; border:1.5px solid #94b8c84d; padding:26px 30px }
  .mock-bar { display:flex; align-items:center; justify-content:space-between;
    font-size:23px; font-weight:700; color:#9ec0cf; padding-bottom:16px;
    border-bottom:1px solid #ffffff1c; margin-bottom:22px }
  .dial-row { display:flex; align-items:center; gap:20px; margin-bottom:24px }
  .dial-badge { background:#0c2b38; border:2px solid #38bdf877; border-radius:20px;
    padding:14px 28px; font-size:52px; font-weight:900; letter-spacing:2px;
    color:#fff; white-space:nowrap }
  .dial-arrow { font-size:40px; font-weight:900; color:#a3f5d4 }
  .dial-label { font-size:34px; line-height:1.3; font-weight:800; color:#e2f3fa }
  .dial-label span { display:block; font-size:26px; font-weight:600; color:#9ec0cf; margin-top:4px }
  .eid-box { background:linear-gradient(120deg,#0f4f44,#103b38);
    border:2.5px solid #10b981; border-radius:22px; padding:22px 26px;
    box-shadow:0 0 24px rgba(16,185,129,0.18) }
  .eid-code { font-size:38px; font-weight:900; letter-spacing:0.6px; color:#fff;
    font-family:"Noto Sans","Noto Sans Thai",sans-serif }
  .eid-status { display:inline-block; margin-top:10px; background:#10b9812e;
    border:1px solid #10b98199; color:#a3f5d4; border-radius:999px;
    padding:5px 18px; font-size:27px; font-weight:800 }
  .imei-ghost { display:flex; justify-content:space-between; font-size:24px;
    color:#7c99a8; margin-top:16px; padding-top:14px; border-top:1px solid #ffffff14 }

  /* Slide 3: iOS Settings mockup */
  .ios-settings { background:#12171e; border:1.5px solid #94b8c845; padding:24px 26px 28px }
  .ios-crumb { font-size:24px; font-weight:700; color:#94a3b8; margin-bottom:18px;
    display:flex; align-items:center; gap:10px }
  .ios-crumb span { color:#e2e8f0 }
  .ios-group { background:#1c1c1e; border-radius:22px; border:1px solid #ffffff1a;
    padding:8px 0 }
  .ios-row { display:flex; align-items:center; justify-content:space-between;
    padding:20px 26px; font-size:34px; font-weight:700 }
  .ios-row-check { color:#10b981; font-size:40px; font-weight:900; line-height:1 }
  .ios-row-sub { font-size:23px; font-weight:500; color:#9ca3af; margin-top:2px }
  .ios-divider { height:1px; background:#ffffff18; margin:0 24px }
  .ios-danger-wrap { margin:14px 12px 8px; padding:22px 22px 20px; border-radius:20px;
    background:linear-gradient(125deg,#431922,#2b151c);
    border:2.5px solid #f87171; box-shadow:0 0 30px rgba(248,113,113,0.3) }
  .callout-pill { display:inline-block; background:#ef4444; color:#fff;
    font-size:25px; font-weight:900; padding:4px 18px; border-radius:999px;
    margin-bottom:14px; letter-spacing:0.2px }
  .toggle-row { display:flex; align-items:center; justify-content:space-between; gap:20px }
  .toggle-label { font-size:33px; line-height:1.25; font-weight:800; color:#fff }
  .toggle-label small { display:block; font-size:24px; font-weight:600; color:#ffd597; margin-top:4px }
  .ios-toggle-col { display:flex; flex-direction:column; align-items:center; gap:8px; flex-shrink:0 }
  .ios-toggle-off { width:100px; height:58px; border-radius:999px;
    background:#39393d; border:2px solid #6b6b70; padding:4px;
    display:flex; align-items:center; justify-content:flex-start }
  .ios-toggle-knob { width:46px; height:46px; border-radius:50%; background:#fff;
    box-shadow:0 3px 8px rgba(0,0,0,0.45) }
  .off-tag { font-size:22px; font-weight:900; color:#fca5a5; letter-spacing:1px }

  /* Slide 4: Checklist */
  h2 { font-size:38px; line-height:1.28; margin:0 0 10px; font-weight:800 }
  .detail { font-size:30px; line-height:1.45; color:#d1fae5 }
  .check-list { display:grid; gap:18px; margin-top:18px }
  .check-item { display:grid; grid-template-columns:56px 1fr; gap:18px; align-items:start;
    background:#0b2f2c88; border:1px solid #10b98144; border-radius:20px; padding:18px 22px }
  .step-num { width:52px; height:52px; border-radius:15px; background:#10b9812e;
    color:#a3f5d4; font-size:32px; font-weight:900; display:flex;
    align-items:center; justify-content:center }
  .check-title { font-size:33px; line-height:1.3; font-weight:800; color:#fff }
  .check-setting { display:inline-block; margin-top:8px; padding:4px 14px;
    border-radius:10px; font-size:24px; font-weight:800 }
  .set-on { background:#10b9812b; border:1px solid #10b98188; color:#a3f5d4 }
  .set-off { background:#ef44442b; border:1px solid #f8717188; color:#fecaca }
  .check-sub { font-size:27px; color:#d1fae5; margin-top:8px }

  /* Slide 5: Save + CTA */
  .code { font-size:70px; line-height:1.18; font-weight:900; color:#a3f5d4; letter-spacing:1px }
  .domain { font-size:56px; font-weight:900; line-height:1.28; margin:8px 0; color:#fff }
  .follow h2 { color:#ffd597 }
  .warning h2 { color:#ffd597; margin-bottom:10px }
`;

function card(content, classes = '') {
  return `<section class="card ${classes}">${content}</section>`;
}

const slides = [
  // Slide 1 — Hook
  `<div class="hook">
    <div class="pill eyebrow">เตือนคนใช้ eSIM · เช็กก่อนขึ้นเครื่อง!</div>
    <h1>ซื้อ eSIM แล้ว<br>โดนบิลโรมมิ่ง?!</h1>
    ${card(`
      <div class="ios-notif-top">
        <span class="ios-badge"><span class="ios-app-icon">!</span> Cellular Alert</span>
        <span>ตอนนี้</span>
      </div>
      <div class="alert-title">⚠️ ซิมหลักเริ่มใช้ดาต้าโรมมิ่ง</div>
      <div class="alert-divider">สาเหตุหลัก: <strong>ลืมปิด 1 ปุ่มลับใน iPhone</strong></div>
    `, 'alert-card')}
    <div class="punch">เปิด eSIM แล้ว<br>แต่เน็ตซิมไทยแอบดูดเองได้!</div>
    <div class="pill swipe">วิธีเช็ก + ปิดจบใน 30 วิ → ปัดขวาเลย</div>
  </div>`,

  // Slide 2 — Step 1: Check Phone Before Buying
  `<h1>ขั้นที่ 1: เช็กเครื่อง<br>ก่อนซื้อ eSIM ทุกครั้ง</h1>
  <div class="stack">
    ${card(`
      <div class="mock-bar">
        <span>Phone · Device Info</span>
        <span>เช็กฟรีใน 10 วิ</span>
      </div>
      <div class="dial-row">
        <div class="dial-badge">*#06#</div>
        <div class="dial-arrow">→</div>
        <div class="dial-label">ต้องเห็นเลข EID<span>(ตัวเลข 32 หลัก)</span></div>
      </div>
      <div class="eid-box">
        <div class="eid-code">EID 89049032...</div>
        <div class="eid-status">✅ พร้อมใช้ eSIM</div>
      </div>
      <div class="imei-ghost">
        <span>IMEI · Digital SIM</span>
        <span>iOS &amp; Android ใช้โค้ดเดียวกัน</span>
      </div>
    `, 'phone-mock')}
    ${card(`
      <h2>⚠️ เครื่องที่อาจใช้ไม่ได้:</h2>
      <div class="detail" style="color:#ffe8c8">iPhone ศูนย์จีนแผ่นดินใหญ่ / ฮ่องกง-มาเก๊ารุ่น 2 ซิมการ์ด และเครื่องติดล็อกซิมรายเดือน</div>
    `, 'amber warning')}
  </div>`,

  // Slide 3 — Step 2: The Money Shot (iPhone Settings Toggle)
  `<h1>ขั้นที่ 2: ปิด 1 ปุ่มนี้<br>กันเน็ตซิมไทยรั่ว 100%</h1>
  <div class="stack">
    ${card(`
      <div class="ios-crumb">Settings › Cellular › <span>Cellular Data</span></div>
      <div class="ios-group">
        <div class="ios-row">
          <div>
            <div>Travel eSIM</div>
            <div class="ios-row-sub">ใช้เน็ตต่างประเทศจากซิมนี้</div>
          </div>
          <div class="ios-row-check">✓</div>
        </div>
        <div class="ios-divider"></div>
        <div class="ios-danger-wrap">
          <div class="callout-pill">ปิดปุ่มนี้ด้วย!</div>
          <div class="toggle-row">
            <div class="toggle-label">
              Allow Cellular Data Switching
              <small>ต้องปิดเป็นสีเทา (OFF)</small>
            </div>
            <div class="ios-toggle-col">
              <div class="ios-toggle-off"><div class="ios-toggle-knob"></div></div>
              <div class="off-tag">OFF</div>
            </div>
          </div>
        </div>
      </div>
    `, 'ios-settings')}
    ${card(`
      <h2 class="amber-text">ทำไมต้องปิด?</h2>
      <div class="detail">ถ้าเปิดไว้ พอสัญญาณ eSIM อ่อน (เช่น ใต้ดิน/ลิฟต์) เครื่องจะสลับไปดูดเน็ตโรมมิ่งซิมไทยทันที</div>
    `)}
  </div>`,

  // Slide 4 — Step 3: Keep Thai SIM for Bank OTP Safely
  `<h1>ยังรับ SMS OTP<br>ธนาคารไทยได้ไหม?</h1>
  <div class="stack">
    ${card(`
      <h2 class="mint">ตั้งค่าซิมไทย (Primary) แบบนี้:</h2>
      <div class="check-list">
        <div class="check-item">
          <div class="step-num">1</div>
          <div>
            <div class="check-title">เปิดสายซิมไทยไว้ได้</div>
            <span class="check-setting set-on">Turn On This Line: ON</span>
            <div class="check-sub">รับ SMS OTP รูดบัตร/โอนเงินฟรี!</div>
          </div>
        </div>
        <div class="check-item">
          <div class="step-num">2</div>
          <div>
            <div class="check-title">ปิด Data Roaming ซิมไทย</div>
            <span class="check-setting set-off">Data Roaming: OFF</span>
          </div>
        </div>
        <div class="check-item">
          <div class="step-num">3</div>
          <div>
            <div class="check-title">เปิด Data Roaming เฉพาะ eSIM</div>
            <span class="check-setting set-on">Travel eSIM › Data Roaming: ON</span>
          </div>
        </div>
      </div>
    `, 'green')}
    ${card(`
      <div class="detail" style="color:#e2f3fa"><strong class="mint">Android</strong> ก็หลักการเดียวกัน: ตั้ง Mobile Data = eSIM และปิด Auto Data Switching</div>
    `)}
  </div>`,

  // Slide 5 — Save + CTA + Code + Follow Hook
  `<h1 style="font-size:64px">เซฟโพสต์นี้ไว้ก่อนบิน!<br>+ รับส่วนลด Airalo 15%</h1>
  <div class="stack">
    ${card(`
      <div class="code">NEWTOAIRALO15</div>
      <div class="detail">ลด 15% สำหรับการสั่งซื้อ Airalo ครั้งแรก</div>
    `)}
    ${card(`
      <h2>คู่มือภาพเต็ม 4 ขั้นตอน (iOS &amp; Android)</h2>
      <div class="domain">esim.whytobe.com</div>
      <div class="detail">กดลิงก์ตรงบทความในคอมเมนต์ / หน้าโปรไฟล์</div>
    `, 'green')}
    ${card(`
      <h2>กดฟอล @simpainai ไว้เลย!</h2>
      <div style="font-size:31px;color:#ffe8c8">พรุ่งนี้พาเอาตัวรอดเที่ยวจีน 2026<br>ใช้ LINE / Alipay ไม่ต้องง้อ VPN 🇨🇳</div>
    `, 'amber follow')}
  </div>`,
];

function document(content, index) {
  const character = index % 2 === 0 ? 'nong-simpok' : 'pi-tua';
  const mascot = readFileSync(join(root, `assets/brand/characters/${character}-base.png`));
  return `<!doctype html><html lang="th"><meta charset="utf-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:">
    <style>${css}</style><main><header>
      <img alt="" src="data:image/png;base64,${mascot.toString('base64')}">
      <span>ซิมไปไหน · SimPaiNai</span><span class="pill">${index + 1} / ${slides.length}</span>
    </header>${content}</main></html>`;
}

mkdirSync(output, { recursive: true });
const tempRoot = tmpdir().length > 40 ? '/tmp' : tmpdir();
const temporary = mkdtempSync(join(tempRoot, 'angle-b-render-'));
try {
  for (const [index, content] of slides.entries()) {
    const source = join(temporary, 'slide.html');
    const destination = join(output, `slide-${String(index + 1).padStart(2, '0')}.png`);
    writeFileSync(source, document(content, index));
    execFileSync(process.env.CHROMIUM || 'chromium', [
      '--headless', '--disable-background-networking', '--no-first-run',
      '--force-device-scale-factor=1', `--user-data-dir=${join(temporary, 'profile')}`,
      `--window-size=${width},${height}`, '--hide-scrollbars', `--screenshot=${destination}`, source,
    ], { stdio: ['ignore', 'ignore', 'pipe'], env: { ...process.env, TMPDIR: tempRoot } });
    const png = readFileSync(destination);
    if (png.readUInt32BE(16) !== width || png.readUInt32BE(20) !== height) {
      throw new Error(`Unexpected dimensions for ${destination}`);
    }
    console.log(destination);
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
