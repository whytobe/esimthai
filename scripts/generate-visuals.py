#!/usr/bin/env python3
"""Generate branded OpenGraph (1200x630) and Reels cover PNGs (1080x1920) from SVGs."""

from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT / "public"
REELS_DIR = ROOT / "assets" / "reels"
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


def main() -> None:
    render_svg(og_card(), PUBLIC_DIR / "og-default.png", 1200, 630)
    render_svg(reel_01(), REELS_DIR / "reel-01-japan-vs-sim2fly.png", 1080, 1920)
    render_svg(reel_02(), REELS_DIR / "reel-02-check-esim-eid.png", 1080, 1920)
    render_svg(reel_03(), REELS_DIR / "reel-03-korea-naver-010.png", 1080, 1920)
    render_svg(reel_04(), REELS_DIR / "reel-04-preflight-checklist.png", 1080, 1920)
    render_svg(reel_05(), REELS_DIR / "reel-05-6-countries-prices.png", 1080, 1920)
    print("Generated og-default.png and 5 Reels cover PNGs.")


if __name__ == "__main__":
    main()
