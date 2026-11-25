// Run with Node.js and local Chromium, Noto Sans Thai, and Noto Color Emoji.
// Set CHROMIUM to override the Chromium executable.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'assets/carousels/angle-a-japan-price');
const width = 1080;
const height = 1920;

const css = `
  * { box-sizing:border-box }
  body { margin:0; width:1080px; height:1920px; color:#fff;
    background:radial-gradient(ellipse at 6% 18%, #164254 0%, transparent 55%),
      linear-gradient(155deg,#0e2a3a,#081b26 73%);
    font:400 34px/1.45 "Noto Sans Thai","Noto Sans","Noto Color Emoji",sans-serif }
  main { position:absolute; top:150px; left:72px; width:868px }
  header { display:flex; align-items:center; gap:16px; height:90px; font-size:25px;
    font-weight:700; color:#d1fae5; border-bottom:1px solid #ffffff38; padding-bottom:20px }
  header img { width:62px; height:62px; object-fit:cover; border-radius:50%;
    border:2px solid #a1e8cf; background:#d1fae5 }
  header .pill { margin-left:auto }
  .pill { display:inline-block; border:1px solid #ffffff35; border-radius:60px;
    padding:7px 22px; font-weight:700 }
  .eyebrow { margin-top:38px; color:#ffd597; background:#e8a13d19; border-color:#e8a13d70 }
  h1 { font-size:72px; line-height:1.16; margin:38px 0 34px; font-weight:900 }
  .hook h1 { font-size:97px; margin-top:27px }
  .mint { color:#a3f5d4 }
  .stack { display:grid; gap:20px }
  .card { padding:26px 32px; border-radius:29px; border:1px solid #a9d1df42;
    background:#173746 }
  .green { background:linear-gradient(120deg,#104c43,#123c3c); border:2px solid #10b981 }
  .amber { background:#413322; border-color:#e8a13d99 }
  .hero { background:linear-gradient(130deg,#0c604e,#104036); padding:33px 36px }
  .hero strong { font-size:146px; font-weight:900; line-height:1.1; letter-spacing:-4px }
  .hero del { font-size:46px; color:#d1fae5 }
  .hero .prices { display:flex; align-items:center; gap:28px; margin:8px 0 13px }
  .hero .note { border-top:1px solid #ffffff42; padding-top:19px }
  .punch { margin:34px 0 23px; font-size:43px; font-weight:800 }
  .swipe { font-size:30px; color:#d1fae5 }
  .row { display:flex; justify-content:space-between; align-items:center; gap:12px }
  .plan h2 { margin:0; font-size:39px; line-height:1.18 }
  .plan .price { font-size:58px; line-height:1.12; font-weight:900; white-space:nowrap }
  .plan .meta { font-size:28px; color:#d1fae5 }
  .plan .flag { color:#a3f5d4; font-size:24px; font-weight:800; margin-bottom:9px }
  .tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:15px }
  .tag { font-size:22px; border-radius:9px; padding:4px 10px; background:#ffffff13 }
  .foot { font-size:25px; color:#b7cdd5; margin:22px 0 0 }
  .difference { display:grid; grid-template-columns:78px 1fr; gap:20px; padding:28px }
  .number { align-self:start; text-align:center; background:#0fa47a26; color:#a3f5d4;
    border-radius:16px; padding:8px 0; font-size:37px; font-weight:900 }
  h2 { font-size:41px; line-height:1.26; margin:0 0 8px; font-weight:800 }
  .detail { font-size:31px; color:#d1fae5 }
  .decision strong { font-size:45px; font-weight:900 }
  .warning strong { color:#ffd597 }
  .code { font-size:73px; line-height:1.2; font-weight:900; color:#a3f5d4 }
  .domain { font-size:59px; font-weight:900; line-height:1.3; margin:8px 0 }
  .follow h2 { color:#ffd597 }
`;

function card(content, classes = '') {
  return `<section class="card ${classes}">${content}</section>`;
}

function plan({ name, data, price, note = '', tags, winner }) {
  return card(`
    ${winner ? '<div class="flag">คุ้มสุด 3–7 วัน</div>' : ''}
    <div class="row"><div><h2>${name}</h2><div class="meta">${data}</div></div>
    <div style="text-align:right"><div class="price ${winner ? 'mint' : ''}">${price}</div>
    ${note ? `<div class="meta">${note}</div>` : ''}</div></div>
    <div class="tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
  `, winner ? 'plan green' : 'plan');
}

function difference(number, title, detail) {
  return card(`<div class="number">${number}</div><div><h2>${title}</h2>
    <div class="detail">${detail}</div></div>`, 'difference');
}

const thaiSimTags = ['หมดเน็ตไหล 128 Kbps', 'ต้องลงทะเบียนซิม'];
const slides = [
  `<div class="hook">
    <div class="pill eyebrow">ทริปญี่ปุ่น 3–7 วัน · เช็กก่อนจ่าย!</div>
    <h1>บินญี่ปุ่น 5 วัน<br>จ่าย ฿399 ทำไม?</h1>
    ${card(`<h2>Airalo eSIM 5GB / 7 วัน</h2>
      <div class="prices"><del>฿350</del><strong>~฿298</strong></div>
      <div class="note">ลูกค้าใหม่ลด 15% โค้ด <b>NEWTOAIRALO15</b></div>`, 'green hero')}
    <div class="punch">ประหยัดไป ~฿100<br>ได้ราเมงเพิ่มอีก 1 ชาม 🍜</div>
    <div class="pill swipe">เทียบ 3 ค่ายแบบไม่อวย → ปัดขวาเลย</div>
  </div>`,
  `<h1>เทียบราคาจริง<br>ทริปญี่ปุ่น 2026</h1>
  <div class="stack">
    ${plan({ name:'Airalo Moshi Moshi (eSIM)', data:'5 GB / 7 วัน', price:'~฿298',
      note:'ปกติ ฿350', tags:['ไม่ต้อง eKYC','รับ OTP ซิมไทยได้','โค้ด NEWTOAIRALO15'], winner:true })}
    ${plan({ name:'AIS SIM2Fly (Asia)', data:'6 GB / 10 วัน', price:'฿399', tags:thaiSimTags })}
    ${plan({ name:'True GO Travel SIM', data:'8 GB / 10 วัน · 6GB + โบนัส 2GB',
      price:'฿399', tags:thaiSimTags })}
  </div>
  <p class="foot">เช็กเรตราคา พ.ย. 2026 · เรตจริงอาจเปลี่ยนตามช่วงเวลา</p>`,
  `<h1>3 เรื่องที่ไม่ได้บอก<br>หน้ากล่อง</h1>
  <div class="stack">
    ${difference('01','รับ SMS OTP ธนาคารไทยได้ปกติ',
      'ใช้ eSIM ไม่ต้องแงะถาดซิม ซิมไทยยังค้างในเครื่องรับ OTP รูดบัตร/โอนเงินได้')}
    ${difference('02','จบใน 2 นาที ไม่ต้องลงทะเบียน eKYC',
      'ซื้อออนไลน์แล้วสแกน QR ติดตั้งจากไทย ไม่ต้องไปช็อปหรือรอส่ง')}
    ${difference('03','พูดกันแฟร์ ๆ ข้อจำกัด eSIM',
      'Airalo ครบ 5GB เน็ตหยุด (เติมในแอปได้) ต่างจาก SIM2Fly/True ที่ยังไหลช้า 128 Kbps')}
  </div>`,
  `<h1>สรุปใน 5 วิ:<br>ทริปคุณเลือกอันไหน?</h1>
  <div class="stack decision">
    ${card(`<h2>บิน 3–7 วัน เน้นไว + ประหยัด</h2>
      <strong class="mint">Airalo eSIM 5GB (~฿298)</strong><div class="detail">จ่ายน้อยกว่า ~฿100</div>`, 'green')}
    ${card(`<h2>บิน 8–10 วัน เผื่อเน็ตสำรองไม่ตัดขาด</h2>
      <strong>True GO / SIM2Fly (฿399)</strong><div class="detail">คุ้มกว่าต่อวัน</div>`)}
    ${card(`<h2>⚠️ เช็กเครื่อง 10 วิ ก่อนซื้อ eSIM:</h2>
      <div>กด <strong>*#06#</strong> ต้องเห็นเลข <strong>EID</strong></div>
      <div class="detail">ระวัง iPhone ศูนย์จีน/ฮ่องกง 2 ซิม</div>`, 'amber warning')}
  </div>`,
  `<h1>รับส่วนลด 15%<br>+ ตารางเทียบ 7 แพ็ก</h1>
  <div class="stack">
    ${card(`<div class="code">NEWTOAIRALO15</div>
      <div class="detail">ลด 15% สำหรับการสั่งซื้อ Airalo ครั้งแรก</div>`)}
    ${card(`<h2>ดูตารางเทียบ 7 แพ็กเต็ม</h2><div class="detail">(รวม Unlimited &amp; Pocket Wi-Fi)</div>
      <div class="domain">esim.whytobe.com</div>
      <div class="detail">กดลิงก์ในคอมเมนต์ / หน้าโปรไฟล์</div>`, 'green')}
    ${card(`<h2>กดฟอล @simpainai ไว้เลย!</h2>
      <div>พรุ่งนี้แจกวิธีปิด 1 ปุ่มกันบิลโรมมิ่งรั่วหลักพัน ✈️</div>`, 'amber follow')}
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
const temporary = mkdtempSync(join(tmpdir(), 'angle-a-render-'));
try {
  for (const [index, content] of slides.entries()) {
    const source = join(temporary, 'slide.html');
    const destination = join(output, `slide-${String(index + 1).padStart(2, '0')}.png`);
    writeFileSync(source, document(content, index));
    execFileSync(process.env.CHROMIUM || 'chromium', [
      '--headless', '--disable-background-networking', '--no-first-run',
      '--force-device-scale-factor=1', `--user-data-dir=${join(temporary, 'profile')}`,
      `--window-size=${width},${height}`, '--hide-scrollbars', `--screenshot=${destination}`, source,
    ], { stdio: ['ignore', 'ignore', 'pipe'] });
    const png = readFileSync(destination);
    if (png.readUInt32BE(16) !== width || png.readUInt32BE(20) !== height) {
      throw new Error(`Unexpected dimensions for ${destination}`);
    }
    console.log(destination);
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
