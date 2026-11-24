#!/usr/bin/env python3
"""Generate branded OpenGraph (1200x630) and Reels cover PNGs (1080x1920) from SVGs."""

from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT / "public"
REELS_DIR = ROOT / "assets" / "reels"
BRAND_DIR = ROOT / "assets" / "brand"
CREATIVES_DIR = BRAND_DIR / "creatives"
SVG_TMP = ROOT / ".astro" / "svg-tmp"

FONT_TH = "Noto Sans Thai, Google Sans, sans-serif"
FONT_MONO = "JetBrains Mono, monospace"

NAVY = "#0e2a3a"
NAVY_SOFT = "#173c51"
PAPER = "#f4f6f5"
WHITE = "#ffffff"
GREEN = "#0fa47a"
GREEN_DARK = "#0b7d5e"
AMBER = "#e8a13d"
INK_SOFT = "#40586a"
LINE = "#c6d0d5"


def render_svg(svg_text: str, out_png: Path, width: int, height: int) -> None:
    out_png.parent.mkdir(parents=True, exist_ok=True)
    SVG_TMP.mkdir(parents=True, exist_ok=True)
    svg_path = SVG_TMP / f"{out_png.stem}.svg"
    svg_path.write_text(svg_text, encoding="utf-8")
    subprocess.run(
        [
            "rsvg-convert",
            "-w",
            str(width),
            "-h",
            str(height),
            "-o",
            str(out_png),
            str(svg_path),
        ],
        check=True,
    )


def og_card() -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="{PAPER}"/>
  <rect x="44" y="44" width="1112" height="542" rx="18" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <rect x="44" y="44" width="1112" height="110" rx="18" fill="{NAVY}"/>
  <rect x="44" y="120" width="1112" height="34" fill="{NAVY}"/>

  <!-- Brand -->
  <text x="92" y="114" font-family="{FONT_TH}" font-size="44" font-weight="700" fill="{WHITE}">eSIMไทย</text>
  <circle cx="272" cy="100" r="9" fill="{GREEN}"/>
  <text x="920" y="108" font-family="{FONT_MONO}" font-size="22" font-weight="700" fill="{GREEN}">esim.whytobe.com</text>

  <!-- Headline -->
  <text x="92" y="238" font-family="{FONT_TH}" font-size="52" font-weight="700" fill="{NAVY}">เปรียบเทียบราคา eSIM จริง</text>
  <text x="92" y="302" font-family="{FONT_TH}" font-size="52" font-weight="700" fill="{NAVY}">สำหรับคนไทยเที่ยวต่างประเทศ</text>
  <text x="92" y="362" font-family="{FONT_TH}" font-size="28" fill="{INK_SOFT}">ญี่ปุ่น · เกาหลี · ไต้หวัน · เวียดนาม · สิงคโปร์ · ฮ่องกง</text>

  <!-- Route graphic -->
  <path d="M 850 225 C 920 175, 1010 175, 1085 215" fill="none" stroke="{LINE}" stroke-width="4" stroke-dasharray="6 12" stroke-linecap="round"/>
  <circle cx="850" cy="225" r="8" fill="{NAVY}"/>
  <circle cx="1085" cy="215" r="8" fill="{GREEN}"/>
  <rect x="1106" y="194" width="6" height="10" rx="2" fill="{GREEN}"/>
  <rect x="1116" y="186" width="6" height="18" rx="2" fill="{GREEN}"/>
  <rect x="1126" y="178" width="6" height="26" rx="2" fill="{GREEN}"/>

  <!-- Boarding pass strip -->
  <line x1="72" y1="416" x2="1128" y2="416" stroke="{LINE}" stroke-width="2" stroke-dasharray="10 10"/>
  <rect x="92" y="446" width="320" height="94" rx="12" fill="{PAPER}" stroke="{LINE}" stroke-width="1.5"/>
  <text x="116" y="484" font-family="{FONT_TH}" font-size="21" fill="{INK_SOFT}">แพ็กยอดนิยม 5GB / 7 วัน</text>
  <text x="116" y="522" font-family="{FONT_MONO}" font-size="30" font-weight="700" fill="{GREEN_DARK}">เริ่ม ฿315 – ฿385</text>

  <rect x="436" y="446" width="420" height="94" rx="12" fill="{PAPER}" stroke="{LINE}" stroke-width="1.5"/>
  <text x="460" y="484" font-family="{FONT_TH}" font-size="21" fill="{INK_SOFT}">โค้ดส่วนลด Airalo ครั้งแรก 15%</text>
  <text x="460" y="522" font-family="{FONT_MONO}" font-size="30" font-weight="700" fill="{NAVY}">NEWTOAIRALO15</text>

  <rect x="880" y="446" width="232" height="94" rx="12" fill="{GREEN}"/>
  <text x="996" y="502" text-anchor="middle" font-family="{FONT_TH}" font-size="28" font-weight="700" fill="{WHITE}">เช็กเลย →</text>
</svg>
"""


def reel_base(tag: str, title1: str, title2: str, body_svg: str, footer_cta: str) -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <rect width="1080" height="1920" fill="{NAVY}"/>
  <!-- Top bar -->
  <text x="72" y="138" font-family="{FONT_TH}" font-size="40" font-weight="700" fill="{WHITE}">eSIMไทย</text>
  <circle cx="242" cy="126" r="8" fill="{GREEN}"/>
  <rect x="650" y="96" width="358" height="56" rx="28" fill="{NAVY_SOFT}" stroke="{GREEN}" stroke-width="2"/>
  <text x="829" y="133" text-anchor="middle" font-family="{FONT_MONO}" font-size="24" font-weight="700" fill="{GREEN}">{tag}</text>

  <!-- Title -->
  <text x="72" y="274" font-family="{FONT_TH}" font-size="68" font-weight="700" fill="{WHITE}">{title1}</text>
  <text x="72" y="362" font-family="{FONT_TH}" font-size="68" font-weight="700" fill="{AMBER}">{title2}</text>

  <!-- Main card -->
  <rect x="64" y="430" width="952" height="1140" rx="28" fill="{PAPER}"/>
  {body_svg}

  <!-- Bottom CTA bar -->
  <rect x="64" y="1620" width="952" height="190" rx="24" fill="{GREEN}"/>
  <text x="540" y="1698" text-anchor="middle" font-family="{FONT_TH}" font-size="38" font-weight="700" fill="{WHITE}">{footer_cta}</text>
  <text x="540" y="1760" text-anchor="middle" font-family="{FONT_MONO}" font-size="30" font-weight="700" fill="{NAVY}">esim.whytobe.com · โค้ด NEWTOAIRALO15</text>
</svg>
"""


def reel_01() -> str:
    body = f"""
  <rect x="108" y="486" width="864" height="310" rx="20" fill="{WHITE}" stroke="{GREEN}" stroke-width="4"/>
  <rect x="140" y="518" width="230" height="44" rx="8" fill="{GREEN}"/>
  <text x="255" y="548" text-anchor="middle" font-family="{FONT_TH}" font-size="24" font-weight="700" fill="{WHITE}">ทริป 3–7 วัน คุ้มสุด</text>
  <text x="140" y="618" font-family="{FONT_TH}" font-size="44" font-weight="700" fill="{NAVY}">Airalo eSIM ญี่ปุ่น (5GB / 7 วัน)</text>
  <text x="140" y="688" font-family="{FONT_TH}" font-size="34" fill="{INK_SOFT}">ราคาหน้าร้าน ฿350 → ใช้โค้ดลด 15%</text>
  <text x="140" y="756" font-family="{FONT_MONO}" font-size="46" font-weight="700" fill="{GREEN_DARK}">เหลือ ~฿298 · ไม่ต้องเปลี่ยนซิม</text>

  <rect x="108" y="838" width="864" height="310" rx="20" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <rect x="140" y="870" width="240" height="44" rx="8" fill="{NAVY}"/>
  <text x="260" y="900" text-anchor="middle" font-family="{FONT_TH}" font-size="24" font-weight="700" fill="{WHITE}">ทริป 8–10 วัน เผื่อเหลือ</text>
  <text x="140" y="970" font-family="{FONT_TH}" font-size="42" font-weight="700" fill="{NAVY}">AIS SIM2Fly / True GO Travel</text>
  <text x="140" y="1038" font-family="{FONT_TH}" font-size="34" fill="{INK_SOFT}">ได้ 6–8 GB / 10 วัน · หมดแล้วไหล 128 Kbps</text>
  <text x="140" y="1104" font-family="{FONT_MONO}" font-size="44" font-weight="700" fill="{NAVY}">ราคา ฿399 · ต้องลงทะเบียน eKYC</text>

  <rect x="108" y="1190" width="864" height="330" rx="20" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <text x="140" y="1262" font-family="{FONT_TH}" font-size="38" font-weight="700" fill="{NAVY}">สรุปเลือกยังไงใน 5 วินาที:</text>
  <text x="140" y="1330" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">✓ ไป 3–7 วัน เน้นเร็ว + ถูก → Airalo eSIM</text>
  <text x="140" y="1394" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">✓ ไป 8–10 วัน อยากได้เน็ตสำรอง → ซิมไทย ฿399</text>
  <text x="140" y="1458" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">✓ ทุกแบบควรเก็บซิมไทยรับ SMS OTP ธนาคาร</text>
"""
    return reel_base("JAPAN TRIP", "ไปญี่ปุ่น 7 วัน", "eSIM vs SIM2Fly?", body, "ตารางเทียบราคาเต็มที่ลิงก์หน้าโปรไฟล์")


def reel_02() -> str:
    body = f"""
  <rect x="108" y="486" width="864" height="290" rx="20" fill="{NAVY}"/>
  <text x="540" y="566" text-anchor="middle" font-family="{FONT_TH}" font-size="34" fill="{PAPER}">เปิดแอปโทรศัพท์ แล้วกดรหัสนี้</text>
  <text x="540" y="692" text-anchor="middle" font-family="{FONT_MONO}" font-size="112" font-weight="700" fill="{GREEN}">*#06#</text>

  <rect x="108" y="818" width="864" height="320" rx="20" fill="{WHITE}" stroke="{GREEN}" stroke-width="4"/>
  <text x="144" y="892" font-family="{FONT_TH}" font-size="42" font-weight="700" fill="{GREEN_DARK}">1. มองหาคำว่า "EID"</text>
  <text x="144" y="962" font-family="{FONT_TH}" font-size="34" fill="{INK_SOFT}">ถ้ามีตัวเลข EID ยาว 32 หลักขึ้นหน้าจอ</text>
  <text x="144" y="1024" font-family="{FONT_TH}" font-size="34" fill="{INK_SOFT}">= มือถือมีชิป eSIM พร้อมใช้งาน</text>
  <text x="144" y="1090" font-family="{FONT_TH}" font-size="30" fill="{NAVY}">(และต้องเป็นเครื่องไม่ติดล็อกซิมรายเดือน)</text>

  <rect x="108" y="1180" width="864" height="340" rx="20" fill="{WHITE}" stroke="{AMBER}" stroke-width="4"/>
  <text x="144" y="1256" font-family="{FONT_TH}" font-size="40" font-weight="700" fill="{NAVY}">2. ระวังเครื่องที่ไม่มี eSIM!</text>
  <text x="144" y="1328" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">• iPhone ศูนย์จีนแผ่นดินใหญ่ (China Mainland)</text>
  <text x="144" y="1390" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">• iPhone ฮ่องกง/มาเก๊า รุ่น 2 ซิมกายภาพ</text>
  <text x="144" y="1456" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">• Android รุ่นเก่าหรือบางเครื่องล็อกโซน</text>
"""
    return reel_base("CHECK *#06#", "เช็กมือถือใช้ eSIM", "ได้ไหมใน 10 วินาที!", body, "วิธีตั้งค่ากันเน็ตรั่วซิมไทย ดูที่หน้าโปรไฟล์")


def reel_03() -> str:
    body = f"""
  <rect x="108" y="486" width="864" height="360" rx="20" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <rect x="140" y="520" width="120" height="44" rx="8" fill="{NAVY}"/>
  <text x="200" y="550" text-anchor="middle" font-family="{FONT_MONO}" font-size="24" font-weight="700" fill="{WHITE}">TIP 01</text>
  <text x="140" y="624" font-family="{FONT_TH}" font-size="42" font-weight="700" fill="{NAVY}">Naver Map / KakaoMap</text>
  <text x="140" y="694" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">Google Maps นำทางเดินในเกาหลีไม่ได้</text>
  <text x="140" y="756" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">ต้องใช้คลื่นหลัก 5G เสถียรอย่าง SK Telecom</text>
  <text x="140" y="814" font-family="{FONT_MONO}" font-size="28" font-weight="700" fill="{GREEN_DARK}">Airalo 짱 Jjang วิ่งบน SK Telecom 5G</text>

  <rect x="108" y="886" width="864" height="360" rx="20" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <rect x="140" y="920" width="120" height="44" rx="8" fill="{AMBER}"/>
  <text x="200" y="950" text-anchor="middle" font-family="{FONT_MONO}" font-size="24" font-weight="700" fill="{NAVY}">TIP 02</text>
  <text x="140" y="1024" font-family="{FONT_TH}" font-size="42" font-weight="700" fill="{NAVY}">ไม่มีเบอร์เกาหลี 010</text>
  <text x="140" y="1094" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">eSIM ท่องเที่ยวเกือบทุกเจ้าเป็นเน็ตล้วน</text>
  <text x="140" y="1156" font-family="{FONT_TH}" font-size="32" fill="{INK_SOFT}">จองคิวร้านดังใช้แอป CatchTable Global</text>
  <text x="140" y="1214" font-family="{FONT_MONO}" font-size="28" font-weight="700" fill="{GREEN_DARK}">สมัครด้วยอีเมลแทนเบอร์ 010 ได้เลย</text>

  <rect x="108" y="1286" width="864" height="234" rx="20" fill="{WHITE}" stroke="{GREEN}" stroke-width="4"/>
  <text x="140" y="1364" font-family="{FONT_TH}" font-size="38" font-weight="700" fill="{NAVY}">เทียบ 5 ค่าย eSIM เกาหลี (อัปเดต 2569)</text>
  <text x="140" y="1434" font-family="{FONT_MONO}" font-size="34" font-weight="700" fill="{GREEN_DARK}">เริ่ม ~฿51 · แนะนำ 5GB/7 วัน ฿350</text>
  <text x="140" y="1490" font-family="{FONT_TH}" font-size="28" fill="{INK_SOFT}">Ubigi / Nomad / SimOptions / Holafly เทียบครบ</text>
"""
    return reel_base("KOREA ESIM", "ไปเกาหลีใช้ eSIM", "ต้องรู้ 2 เรื่องนี้!", body, "เทียบราคา eSIM เกาหลี 5 ค่าย ที่หน้าโปรไฟล์")


def reel_04() -> str:
    body = f"""
  <rect x="108" y="486" width="864" height="230" rx="20" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <text x="144" y="562" font-family="{FONT_TH}" font-size="40" font-weight="700" fill="{GREEN_DARK}">1. ติดตั้งผ่าน Wi-Fi ก่อนบิน</text>
  <text x="144" y="628" font-family="{FONT_TH}" font-size="31" fill="{INK_SOFT}">วันใช้งานส่วนใหญ่ยังไม่เดินจนกว่าจะถึงปลายทาง</text>
  <text x="144" y="684" font-family="{FONT_TH}" font-size="31" fill="{INK_SOFT}">ตั้งชื่อสายว่า "Travel eSIM" กับ "Thai"</text>

  <rect x="108" y="746" width="864" height="230" rx="20" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <text x="144" y="822" font-family="{FONT_TH}" font-size="40" font-weight="700" fill="{NAVY}">2. ปิด Data Roaming ซิมไทย</text>
  <text x="144" y="888" font-family="{FONT_TH}" font-size="31" fill="{INK_SOFT}">เปิดสายซิมไทยไว้รับ SMS OTP ธนาคารได้</text>
  <text x="144" y="944" font-family="{FONT_TH}" font-size="31" fill="{INK_SOFT}">แต่ต้องปิด Data Roaming ซิมไทยให้สนิท</text>

  <rect x="108" y="1006" width="864" height="230" rx="20" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <text x="144" y="1082" font-family="{FONT_TH}" font-size="40" font-weight="700" fill="{GREEN_DARK}">3. เปิด Data Roaming เฉพาะ eSIM</text>
  <text x="144" y="1148" font-family="{FONT_TH}" font-size="31" fill="{INK_SOFT}">และตั้งค่า Cellular Data ให้วิ่งผ่านสาย eSIM</text>
  <text x="144" y="1204" font-family="{FONT_TH}" font-size="31" fill="{INK_SOFT}">(ถ้าไม่เปิด Roaming ให้สาย eSIM เน็ตจะไม่วิ่ง)</text>

  <rect x="108" y="1266" width="864" height="254" rx="20" fill="{WHITE}" stroke="{AMBER}" stroke-width="4"/>
  <text x="144" y="1342" font-family="{FONT_TH}" font-size="40" font-weight="700" fill="{NAVY}">4. ปิด Data Switching!</text>
  <text x="144" y="1408" font-family="{FONT_TH}" font-size="31" fill="{INK_SOFT}">ปิด Allow Cellular Data Switching บน iPhone</text>
  <text x="144" y="1464" font-family="{FONT_TH}" font-size="31" fill="{INK_SOFT}">กันเครื่องแอบสลับเน็ตกลับมาคิดเงินซิมไทย</text>
"""
    return reel_base("4-STEP SETUP", "ตั้งค่า eSIM ก่อนบิน", "กันเน็ตรั่ว 100%", body, "คู่มือภาพทีละขั้น + แก้ปัญหาเน็ตไม่ขึ้นที่หน้าเว็บ")


def reel_05() -> str:
    rows = [
        ("สิงคโปร์ (Connect Lah!)", "Singtel 5G / M1", "฿315", GREEN),
        ("เวียดนาม (Xin Chao)", "VNPT 5G", "~฿340", GREEN),
        ("ญี่ปุ่น (Moshi Moshi)", "SoftBank / KDDI 5G", "฿350", NAVY),
        ("เกาหลีใต้ (짱 Jjang)", "SK Telecom 5G", "฿350", NAVY),
        ("ไต้หวัน (Xie Xie)", "Taiwan Mobile 5G", "~฿374", INK_SOFT),
        ("ฮ่องกง (Hkmobile)", "HKT 5G", "฿385", INK_SOFT),
    ]
    cards = []
    y = 470
    for country, net, price, badge_col in rows:
        cards.append(
            f"""
  <rect x="104" y="{y}" width="872" height="156" rx="18" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <text x="140" y="{y + 68}" font-family="{FONT_TH}" font-size="38" font-weight="700" fill="{NAVY}">{country}</text>
  <text x="140" y="{y + 118}" font-family="{FONT_MONO}" font-size="25" fill="{INK_SOFT}">{net} · 5 GB / 7 วัน</text>
  <rect x="736" y="{y + 42}" width="206" height="72" rx="14" fill="{badge_col}"/>
  <text x="839" y="{y + 90}" text-anchor="middle" font-family="{FONT_MONO}" font-size="38" font-weight="700" fill="{WHITE}">{price}</text>"""
        )
        y += 176
    body = "\n".join(cards)
    return reel_base("6 DESTINATIONS", "eSIM 6 ประเทศฮิต", "5GB / 7 วัน กี่บาท?", body, "กดเลือกประเทศที่หน้าเว็บ รู้แพ็กคุ้มใน 10 วิ")


def favicon_svg() -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="{NAVY}"/>
  <!-- Beveled eSIM card -->
  <path d="M 38 24 H 78 L 100 46 V 96 A 10 10 0 0 1 90 106 H 38 A 10 10 0 0 1 28 96 V 34 A 10 10 0 0 1 38 24 Z" fill="#163c52" stroke="#ffffff" stroke-width="5.5" stroke-linejoin="round"/>
  <!-- Gold/Amber chip contact matrix -->
  <rect x="42" y="54" width="44" height="34" rx="6" fill="none" stroke="{AMBER}" stroke-width="4.5"/>
  <line x1="64" y1="54" x2="64" y2="88" stroke="{AMBER}" stroke-width="4"/>
  <line x1="42" y1="71" x2="86" y2="71" stroke="{AMBER}" stroke-width="4"/>
  <!-- Signal Emerald connection core & beacon -->
  <circle cx="93" cy="33" r="11" fill="{GREEN}" stroke="{NAVY}" stroke-width="4"/>
  <path d="M 52 44 Q 64 34 76 44" fill="none" stroke="{GREEN}" stroke-width="4.5" stroke-linecap="round"/>
</svg>
"""


def profile_avatar() -> str:
    # 1024x1024 circular-crop-safe brand avatar (critical elements strictly within center r<=380)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#1a4862"/>
      <stop offset="65%" stop-color="{NAVY}"/>
      <stop offset="100%" stop-color="#091d28"/>
    </radialGradient>
    <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d516d"/>
      <stop offset="100%" stop-color="#103144"/>
    </linearGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{GREEN}"/>
      <stop offset="55%" stop-color="#22d3a0"/>
      <stop offset="100%" stop-color="{AMBER}"/>
    </linearGradient>
  </defs>

  <rect width="1024" height="1024" fill="url(#bgGlow)"/>

  <!-- Subtle subtle flight-grid circles safe inside social circle crop -->
  <circle cx="512" cy="512" r="452" fill="none" stroke="#1f536e" stroke-width="3" stroke-dasharray="10 14"/>
  <circle cx="512" cy="512" r="424" fill="none" stroke="url(#ringGrad)" stroke-width="10"/>

  <!-- Top signal waves emerging above eSIM card -->
  <path d="M 412 246 Q 512 178 612 246" fill="none" stroke="{GREEN}" stroke-width="16" stroke-linecap="round" opacity="0.55"/>
  <path d="M 446 286 Q 512 238 578 286" fill="none" stroke="{GREEN}" stroke-width="16" stroke-linecap="round"/>

  <!-- Iconic beveled eSIM chip card (center-upper safe zone) -->
  <path d="M 406 328 H 572 L 646 402 V 566 A 28 28 0 0 1 618 594 H 406 A 28 28 0 0 1 378 566 V 356 A 28 28 0 0 1 406 328 Z"
        fill="url(#chipGrad)" stroke="{WHITE}" stroke-width="12" stroke-linejoin="round"/>

  <!-- Chip gold/amber circuit pads -->
  <rect x="424" y="408" width="176" height="134" rx="20" fill="#0c2635" stroke="{AMBER}" stroke-width="10"/>
  <line x1="512" y1="408" x2="512" y2="542" stroke="{AMBER}" stroke-width="8"/>
  <line x1="424" y1="475" x2="600" y2="475" stroke="{AMBER}" stroke-width="8"/>
  <circle cx="512" cy="475" r="24" fill="{NAVY}" stroke="{GREEN}" stroke-width="9"/>
  <circle cx="512" cy="475" r="9" fill="{GREEN}"/>

  <!-- Connected signal beacon at beveled corner -->
  <circle cx="628" cy="348" r="26" fill="{GREEN}" stroke="{NAVY}" stroke-width="10"/>

  <!-- Bold brand wordmark strictly inside safe circular mask -->
  <text x="500" y="718" text-anchor="middle" font-family="{FONT_TH}" font-size="112" font-weight="700" fill="{WHITE}">eSIMไทย</text>
  <circle cx="738" cy="698" r="15" fill="{GREEN}"/>

  <!-- Minimal airport-board status bar below wordmark -->
  <rect x="352" y="758" width="320" height="44" rx="22" fill="#12364a" stroke="{GREEN}" stroke-width="3"/>
  <text x="512" y="789" text-anchor="middle" font-family="{FONT_MONO}" font-size="23" font-weight="700" fill="#8eead0">TRAVEL DATA GUIDE</text>
</svg>
"""


def fb_cover() -> str:
    # 1640x924 (@2x of 820x462) keeping all critical content in centered 1280x624 safe zone
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1640" height="924" viewBox="0 0 1640 924">
  <defs>
    <linearGradient id="coverBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{NAVY}"/>
      <stop offset="100%" stop-color="#143b50"/>
    </linearGradient>
  </defs>
  <rect width="1640" height="924" fill="url(#coverBg)"/>

  <!-- Subtle architectural grid outside/inside border -->
  <rect x="180" y="150" width="1280" height="624" rx="28" fill="#103144" stroke="#24536d" stroke-width="2.5"/>

  <!-- Flight route decoration top-right inside safe area -->
  <path d="M 1030 270 C 1140 190, 1265 190, 1375 265" fill="none" stroke="{GREEN}" stroke-width="5" stroke-dasharray="10 14" stroke-linecap="round"/>
  <circle cx="1030" cy="270" r="10" fill="{AMBER}"/>
  <circle cx="1375" cy="265" r="12" fill="{GREEN}"/>
  <rect x="1396" y="236" width="8" height="16" rx="3" fill="{GREEN}"/>
  <rect x="1410" y="224" width="8" height="28" rx="3" fill="{GREEN}"/>
  <rect x="1424" y="212" width="8" height="40" rx="3" fill="{GREEN}"/>

  <!-- Top eyebrow -->
  <rect x="240" y="206" width="460" height="48" rx="24" fill="#17455f" stroke="{GREEN}" stroke-width="2"/>
  <text x="470" y="238" text-anchor="middle" font-family="{FONT_TH}" font-size="24" font-weight="600" fill="#8eead0">คู่มือ eSIM เที่ยวต่างประเทศ · อัปเดต 2569</text>

  <!-- Brand title + tagline -->
  <text x="240" y="346" font-family="{FONT_TH}" font-size="82" font-weight="700" fill="{WHITE}">eSIMไทย</text>
  <circle cx="584" cy="322" r="13" fill="{GREEN}"/>
  <text x="240" y="422" font-family="{FONT_TH}" font-size="42" font-weight="600" fill="{AMBER}">เทียบราคา eSIM จริง ญี่ปุ่น · เกาหลี · ไต้หวัน · จีน · เอเชีย</text>
  <text x="240" y="482" font-family="{FONT_TH}" font-size="30" fill="#cbd8de">รวมตารางเทียบ 5 ค่าย · เช็กมือถือ *#06# · วิธีตั้งค่ากันเน็ตรั่วซิมไทย</text>

  <!-- Bottom boarding pass cards -->
  <line x1="240" y1="538" x2="1400" y2="538" stroke="#24536d" stroke-width="2.5" stroke-dasharray="10 10"/>

  <rect x="240" y="572" width="380" height="136" rx="18" fill="{PAPER}"/>
  <text x="272" y="624" font-family="{FONT_TH}" font-size="24" fill="{INK_SOFT}">แพ็กยอดนิยม 5GB / 7 วัน</text>
  <text x="272" y="676" font-family="{FONT_MONO}" font-size="36" font-weight="700" fill="{GREEN_DARK}">฿315 – ฿385</text>

  <rect x="646" y="572" width="430" height="136" rx="18" fill="{PAPER}"/>
  <text x="678" y="624" font-family="{FONT_TH}" font-size="24" fill="{INK_SOFT}">โค้ดลด Airalo ครั้งแรก 15%</text>
  <text x="678" y="676" font-family="{FONT_MONO}" font-size="36" font-weight="700" fill="{NAVY}">NEWTOAIRALO15</text>

  <rect x="1102" y="572" width="298" height="136" rx="18" fill="{GREEN}"/>
  <text x="1251" y="630" text-anchor="middle" font-family="{FONT_TH}" font-size="30" font-weight="700" fill="{WHITE}">เช็กแพ็กเลย</text>
  <text x="1251" y="676" text-anchor="middle" font-family="{FONT_MONO}" font-size="24" font-weight="700" fill="{NAVY}">esim.whytobe.com</text>
</svg>
"""


def render_svg_overlay(svg_text: str, name: str, width: int, height: int) -> Path:
    SVG_TMP.mkdir(parents=True, exist_ok=True)
    svg_path = SVG_TMP / f"{name}.svg"
    png_path = SVG_TMP / f"{name}.png"
    svg_path.write_text(svg_text, encoding="utf-8")
    subprocess.run(
        [
            "rsvg-convert",
            "-w",
            str(width),
            "-h",
            str(height),
            "-o",
            str(png_path),
            str(svg_path),
        ],
        check=True,
    )
    return png_path


def simpainai_profile() -> None:
    src = CREATIVES_DIR / "travel-duo-avatar-bg.png"
    if not src.exists():
        return
    overlay_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{GREEN}"/>
      <stop offset="60%" stop-color="#22d3a0"/>
      <stop offset="100%" stop-color="{AMBER}"/>
    </linearGradient>
    <mask id="outerCut">
      <rect width="1024" height="1024" fill="white"/>
      <circle cx="512" cy="512" r="466" fill="black"/>
    </mask>
  </defs>
  <!-- Cover white outer corners smoothly with aviation navy so square & circular crops look seamless -->
  <rect width="1024" height="1024" fill="{NAVY}" mask="url(#outerCut)"/>
  <circle cx="512" cy="512" r="468" fill="none" stroke="url(#ring)" stroke-width="14"/>
  <!-- Bottom safe frosted brand pill leaving characters, Mt. Fuji, sakura, and pagoda bright -->
  <rect x="292" y="794" width="440" height="86" rx="43" fill="{NAVY}" fill-opacity="0.92" stroke="{GREEN}" stroke-width="5"/>
  <text x="492" y="852" text-anchor="middle" font-family="{FONT_TH}" font-size="52" font-weight="700" fill="{WHITE}">ซิมไปไหน</text>
  <circle cx="644" cy="838" r="10" fill="{GREEN}"/>
</svg>
"""
    overlay = render_svg_overlay(overlay_svg, "simpainai-profile-overlay", 1024, 1024)
    out = BRAND_DIR / "simpainai-profile.png"
    subprocess.run(
        [
            "magick",
            "-size",
            "1024x1024",
            f"xc:{NAVY}",
            "(",
            str(src),
            "-filter",
            "Lanczos",
            "-resize",
            "948x948",
            ")",
            "-gravity",
            "center",
            "-geometry",
            "+0-12",
            "-composite",
            str(overlay),
            "-gravity",
            "center",
            "-geometry",
            "+0+0",
            "-composite",
            "-depth",
            "8",
            str(out),
        ],
        check=True,
    )


def simpainai_cover() -> None:
    src = CREATIVES_DIR / "travel-cover-panorama.png"
    if not src.exists():
        return
    overlay_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1640" height="924" viewBox="0 0 1640 924">
  <defs>
    <linearGradient id="leftScrim" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{NAVY}" stop-opacity="0.65"/>
      <stop offset="45%" stop-color="{NAVY}" stop-opacity="0.32"/>
      <stop offset="68%" stop-color="{NAVY}" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <rect width="1640" height="924" fill="url(#leftScrim)"/>

  <!-- Compact glass travel card lower-left so snow-capped Mt. Fuji above, Shinkansen below & Duo on right shine cleanly -->
  <rect x="196" y="348" width="710" height="394" rx="26" fill="{NAVY}" fill-opacity="0.86" stroke="#2f6683" stroke-width="2.5"/>

  <rect x="232" y="380" width="468" height="38" rx="19" fill="#17455f" stroke="{GREEN}" stroke-width="2"/>
  <text x="466" y="406" text-anchor="middle" font-family="{FONT_TH}" font-size="20" font-weight="600" fill="#8eead0">เพื่อนสายเที่ยว · ญี่ปุ่น · เกาหลี · จีน · ไต้หวัน</text>

  <text x="232" y="486" font-family="{FONT_TH}" font-size="64" font-weight="700" fill="{WHITE}">ซิมไปไหน</text>
  <circle cx="542" cy="462" r="11" fill="{GREEN}"/>
  <text x="572" y="484" font-family="{FONT_MONO}" font-size="34" font-weight="700" fill="#8eead0">SimPaiNai</text>

  <text x="232" y="542" font-family="{FONT_TH}" font-size="28" font-weight="600" fill="{AMBER}">ออกไปเก็บโมเมนต์ต่างแดนให้สุด... ไม่มีสะดุดกลางทาง!</text>
  <text x="232" y="586" font-family="{FONT_TH}" font-size="23" fill="#dce7eb">ทริคเอาตัวรอดหน้างาน · พิกัดกินเที่ยว · เทียบราคา eSIM จริง</text>

  <line x1="232" y1="618" x2="870" y2="618" stroke="#2f6683" stroke-width="2" stroke-dasharray="8 8"/>

  <rect x="232" y="644" width="276" height="62" rx="15" fill="{GREEN}"/>
  <text x="370" y="684" text-anchor="middle" font-family="{FONT_MONO}" font-size="24" font-weight="700" fill="{WHITE}">esim.whytobe.com</text>

  <rect x="526" y="644" width="344" height="62" rx="15" fill="{PAPER}"/>
  <text x="698" y="684" text-anchor="middle" font-family="{FONT_TH}" font-size="23" font-weight="700" fill="{NAVY}">โค้ดลด 15%: NEWTOAIRALO15</text>
</svg>
"""
    overlay = render_svg_overlay(overlay_svg, "simpainai-cover-overlay", 1640, 924)
    out = BRAND_DIR / "simpainai-cover.png"
    subprocess.run(
        [
            "magick",
            str(src),
            "-filter",
            "Lanczos",
            "-resize",
            "1640x924^",
            "-gravity",
            "center",
            "-extent",
            "1640x924",
            str(overlay),
            "-composite",
            str(out),
        ],
        check=True,
    )


def vertical_invite_poster(src_name: str, out_name: str, eyebrow: str, line1: str, line2: str, cta: str) -> None:
    src = CREATIVES_DIR / src_name
    if not src.exists():
        return
    overlay_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs>
    <linearGradient id="topWash" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="{NAVY}" stop-opacity="0.90"/>
      <stop offset="68%" stop-color="{NAVY}" stop-opacity="0.58"/>
      <stop offset="100%" stop-color="{NAVY}" stop-opacity="0.0"/>
    </linearGradient>
    <linearGradient id="botWash" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="{NAVY}" stop-opacity="0.0"/>
      <stop offset="100%" stop-color="{NAVY}" stop-opacity="0.86"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="1080" height="520" fill="url(#topWash)"/>
  <rect x="0" y="1480" width="1080" height="440" fill="url(#botWash)"/>

  <rect x="76" y="110" width="440" height="50" rx="25" fill="#123a50" fill-opacity="0.9" stroke="{GREEN}" stroke-width="2.5"/>
  <text x="296" y="144" text-anchor="middle" font-family="{FONT_MONO}" font-size="22" font-weight="700" fill="#8eead0">{eyebrow}</text>

  <text x="76" y="246" font-family="{FONT_TH}" font-size="58" font-weight="700" fill="{WHITE}">{line1}</text>
  <text x="76" y="328" font-family="{FONT_TH}" font-size="52" font-weight="700" fill="{AMBER}">{line2}</text>

  <rect x="76" y="1590" width="928" height="114" rx="28" fill="{NAVY}" fill-opacity="0.92" stroke="{GREEN}" stroke-width="4"/>
  <text x="540" y="1644" text-anchor="middle" font-family="{FONT_TH}" font-size="33" font-weight="700" fill="{WHITE}">{cta}</text>
  <text x="540" y="1684" text-anchor="middle" font-family="{FONT_MONO}" font-size="24" font-weight="700" fill="#8eead0">esim.whytobe.com · โค้ดลด 15% NEWTOAIRALO15</text>
</svg>
"""
    overlay = render_svg_overlay(overlay_svg, f"{Path(out_name).stem}-overlay", 1080, 1920)
    out = CREATIVES_DIR / out_name
    subprocess.run(
        [
            "magick",
            str(src),
            "-filter",
            "Lanczos",
            "-resize",
            "1080x1920^",
            "-gravity",
            "center",
            "-extent",
            "1080x1920",
            str(overlay),
            "-composite",
            str(out),
        ],
        check=True,
    )


def render_ico(favicon_path: Path) -> None:
    sizes = [48, 32, 16]
    pngs = []
    SVG_TMP.mkdir(parents=True, exist_ok=True)
    for sz in sizes:
        png_out = SVG_TMP / f"favicon-{sz}.png"
        subprocess.run(
            ["rsvg-convert", "-w", str(sz), "-h", str(sz), "-o", str(png_out), str(favicon_path)],
            check=True,
        )
        pngs.append(str(png_out))
    subprocess.run(["magick", *pngs, str(PUBLIC_DIR / "favicon.ico")], check=True)


def main() -> None:
    favicon_path = PUBLIC_DIR / "favicon.svg"
    favicon_path.write_text(favicon_svg(), encoding="utf-8")
    subprocess.run(
        ["rsvg-convert", "-w", "180", "-h", "180", "-o", str(PUBLIC_DIR / "apple-touch-icon.png"), str(favicon_path)],
        check=True,
    )
    render_ico(favicon_path)
    render_svg(profile_avatar(), BRAND_DIR / "esimthai-profile.png", 1024, 1024)
    render_svg(fb_cover(), BRAND_DIR / "esimthai-cover.png", 1640, 924)
    simpainai_profile()
    simpainai_cover()
    vertical_invite_poster(
        "creative-japan-kyoto-fuji.png",
        "post-japan-invite.png",
        "KYOTO · MT. FUJI · TOKYO",
        "ปลายปีนี้บินญี่ปุ่นกันไหม?",
        "เก็บ 3 ทริคลงนาริตะแบบตัวปลิว!",
        "ซิมไปไหน · เทียบ eSIM ญี่ปุ่น 5 ค่ายจริง",
    )
    vertical_invite_poster(
        "creative-seoul-taipei-night.png",
        "post-seoul-night-invite.png",
        "SEOUL · TAIPEI NIGHT MARKET",
        "เดินกินสตรีทฟู้ดโซล–ไทเปทั้งคืน",
        "ไม่มีหลงทาง เน็ตลื่นไม่สะดุด!",
        "ซิมไปไหน · รวมแอปจำเป็น + เทียบ eSIM",
    )
    render_svg(og_card(), PUBLIC_DIR / "og-default.png", 1200, 630)
    render_svg(reel_01(), REELS_DIR / "reel-01-japan-vs-sim2fly.png", 1080, 1920)
    render_svg(reel_02(), REELS_DIR / "reel-02-check-esim-eid.png", 1080, 1920)
    render_svg(reel_03(), REELS_DIR / "reel-03-korea-naver-010.png", 1080, 1920)
    render_svg(reel_04(), REELS_DIR / "reel-04-preflight-checklist.png", 1080, 1920)
    render_svg(reel_05(), REELS_DIR / "reel-05-6-countries-prices.png", 1080, 1920)
    print("Generated favicon, brand kits, travel creatives, og-default.png, and 5 Reels covers.")


if __name__ == "__main__":
    main()
