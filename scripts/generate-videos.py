#!/usr/bin/env python3
"""Render 5 multi-slide 1080x1920 vertical Reels/TikTok MP4 videos from clean Thai SVG frames."""

from pathlib import Path
import subprocess
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
REELS_DIR = ROOT / "assets" / "reels"
TMP_DIR = ROOT / ".astro" / "video-tmp"

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


def slide_svg(tag: str, step: int, total: int, title1: str, title2: str, body_svg: str, cta: str) -> str:
    dots = []
    start_x = 468
    for i in range(1, total + 1):
        col = GREEN if i == step else "#335568"
        w = 42 if i == step else 18
        dots.append(f'<rect x="{start_x}" y="1852" width="{w}" height="10" rx="5" fill="{col}"/>')
        start_x += w + 12
    progress_svg = "\n  ".join(dots)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <rect width="1080" height="1920" fill="{NAVY}"/>
  <text x="72" y="138" font-family="{FONT_TH}" font-size="40" font-weight="700" fill="{WHITE}">eSIMไทย</text>
  <circle cx="242" cy="126" r="8" fill="{GREEN}"/>
  <rect x="650" y="96" width="358" height="56" rx="28" fill="{NAVY_SOFT}" stroke="{GREEN}" stroke-width="2"/>
  <text x="829" y="133" text-anchor="middle" font-family="{FONT_MONO}" font-size="24" font-weight="700" fill="{GREEN}">{escape(tag)} · {step}/{total}</text>

  <text x="72" y="290" font-family="{FONT_TH}" font-size="66" font-weight="700" fill="{WHITE}">{escape(title1)}</text>
  <text x="72" y="378" font-family="{FONT_TH}" font-size="66" font-weight="700" fill="{AMBER}">{escape(title2)}</text>

  <rect x="64" y="454" width="952" height="1080" rx="28" fill="{PAPER}"/>
  {body_svg}

  <rect x="64" y="1600" width="952" height="190" rx="24" fill="{GREEN}"/>
  <text x="540" y="1678" text-anchor="middle" font-family="{FONT_TH}" font-size="36" font-weight="700" fill="{WHITE}">{escape(cta)}</text>
  <text x="540" y="1740" text-anchor="middle" font-family="{FONT_MONO}" font-size="28" font-weight="700" fill="{NAVY}">esim.whytobe.com · โค้ด NEWTOAIRALO15</text>
  {progress_svg}
</svg>
"""


def card_block(x: int, y: int, w: int, h: int, badge: str, badge_bg: str, badge_fg: str, heading: str, lines: list[str], highlight: str = "", border: str = LINE) -> str:
    bw = 2 if border == LINE else 5
    lines_svg = []
    ly = y + 206
    for ln in lines:
        lines_svg.append(f'<text x="{x + 36}" y="{ly}" font-family="{FONT_TH}" font-size="34" fill="{INK_SOFT}">{escape(ln)}</text>')
        ly += 60
    hl_svg = ""
    if highlight:
        hl_svg = f'<text x="{x + 36}" y="{y + h - 46}" font-family="{FONT_MONO}" font-size="38" font-weight="700" fill="{GREEN_DARK}">{escape(highlight)}</text>'
    return f"""
  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="22" fill="{WHITE}" stroke="{border}" stroke-width="{bw}"/>
  <rect x="{x + 36}" y="{y + 34}" width="260" height="46" rx="10" fill="{badge_bg}"/>
  <text x="{x + 166}" y="{y + 66}" text-anchor="middle" font-family="{FONT_MONO}" font-size="23" font-weight="700" fill="{badge_fg}">{escape(badge)}</text>
  <text x="{x + 36}" y="{y + 142}" font-family="{FONT_TH}" font-size="44" font-weight="700" fill="{NAVY}">{escape(heading)}</text>
  {''.join(lines_svg)}
  {hl_svg}"""


REELS = {
    "reel-01-japan-vs-sim2fly": [
        (4.5, "JAPAN TRIP", "ไปญี่ปุ่น 7 วัน", "eSIM หรือ SIM2Fly?",
         card_block(108, 520, 864, 940, "30-SEC VERDICT", NAVY, WHITE, "คำตอบสั้น ๆ ก่อนกดซื้อ", [
             "• ทริป 3–7 วัน เน้นถูก + ไม่เปลี่ยนซิม",
             "  → Airalo eSIM คุ้มที่สุด",
             "• ทริป 8–10 วัน อยากได้เน็ตสำรองไม่ตัด",
             "  → AIS SIM2Fly / True GO Travel ฿399",
             "• สำคัญ: ทั้งคู่ควรเก็บซิมไทยรับ OTP",
         ], "ดูตัวเลขเทียบกันชัด ๆ →", GREEN),
         "สรุปชัดใน 30 วินาที"),
        (7.5, "JAPAN TRIP", "ทริป 3–7 วัน", "Airalo eSIM คุ้มสุด",
         card_block(108, 520, 864, 940, "AIRALO MOSHI MOSHI", GREEN, WHITE, "5 GB / 7 วัน · SoftBank 5G", [
             "• ราคาหน้าร้านไทย ฿350",
             "• ไม่ต้องลงทะเบียนซิม eKYC ที่ช็อป",
             "• สแกน QR ติดตั้งเสร็จตั้งแต่อยู่ไทย",
             "• เปิดซิมไทยรับ SMS OTP ธนาคารได้",
             "• ลูกค้าใหม่ใส่โค้ด NEWTOAIRALO15 ลด 15%",
         ], "ลดแล้วเหลือ ~฿298 (ประหยัดกว่า ~฿100)", GREEN),
         "ประหยัดกว่า + ไม่ต้องเปลี่ยนซิม"),
        (9.0, "JAPAN TRIP", "ทริป 8–10 วัน", "SIM2Fly / True ฿399",
         card_block(108, 520, 864, 940, "THAI TRAVEL SIM", AMBER, NAVY, "AIS 6GB / True 8GB · 10 วัน", [
             "• ราคา ฿399 เท่ากันทั้งสองค่าย",
             "• ใช้ครบโควตายังไหลต่อที่ 128 Kbps",
             "• เหมาะกับการอยู่ญี่ปุ่นเกิน 7 วัน",
             "• ข้อสังเกต: ต้องลงทะเบียนซิมก่อนบิน",
             "• แบบซิมจริงต้องถอดสลับซิมในเครื่อง",
         ], "สรุป: 3–7 วัน Airalo · 8–10 วัน ซิมไทย", NAVY),
         "เลือกตามจำนวนวันบินจริง"),
        (7.0, "JAPAN TRIP", "ตารางเทียบ 7 แพ็ก", "รวมโค้ดลด 15%",
         card_block(108, 520, 864, 940, "FULL TABLE", GREEN, WHITE, "esim.whytobe.com", [
             "✓ เทียบ Airalo vs SIM2Fly vs True GO",
             "✓ รวม Pocket Wi-Fi หารหลายคน",
             "✓ เช็กรุ่นมือถือรองรับ eSIM ใน 10 วิ",
             "✓ คัดลอกโค้ด NEWTOAIRALO15 ได้ใน 1 คลิก",
         ], "กดลิงก์หน้าโปรไฟล์ได้เลย", GREEN),
         "อ่านตารางเทียบเต็มที่ลิงก์หน้าโปรไฟล์"),
    ],
    "reel-02-check-esim-eid": [
        (4.5, "CHECK *#06#", "อย่าเพิ่งซื้อ eSIM", "ถ้ายังไม่เช็กสิ่งนี้!",
         f"""
  <rect x="108" y="540" width="864" height="360" rx="22" fill="{NAVY}"/>
  <text x="540" y="634" text-anchor="middle" font-family="{FONT_TH}" font-size="36" fill="{PAPER}">เปิดแอปโทรศัพท์ แล้วกดรหัสนี้</text>
  <text x="540" y="790" text-anchor="middle" font-family="{FONT_MONO}" font-size="136" font-weight="700" fill="{GREEN}">*#06#</text>
  <rect x="108" y="950" width="864" height="490" rx="22" fill="{WHITE}" stroke="{LINE}" stroke-width="2"/>
  <text x="540" y="1080" text-anchor="middle" font-family="{FONT_TH}" font-size="44" font-weight="700" fill="{NAVY}">ใช้เวลา 10 วินาที</text>
  <text x="540" y="1170" text-anchor="middle" font-family="{FONT_TH}" font-size="34" fill="{INK_SOFT}">กันพลาดซื้อแพ็กแล้วติดตั้งลงเครื่องไม่ได้</text>
  <text x="540" y="1250" text-anchor="middle" font-family="{FONT_TH}" font-size="34" fill="{INK_SOFT}">เช็กได้ทั้ง iPhone และ Android ทุกรุ่น</text>""",
         "กด *#06# เช็กเครื่องใน 10 วินาที"),
        (7.5, "CHECK *#06#", "ขั้นที่ 1", "มองหาเลข \"EID\"",
         card_block(108, 520, 864, 940, "STEP 01 · EID", GREEN, WHITE, "ต้องมีตัวเลข EID ยาว 32 หลัก", [
             "• ถ้าเห็นแถบ EID บนหน้าจอ *#06#",
             "  = เครื่องมีชิป eSIM พร้อมใช้งาน",
             "• เช็กเพิ่ม: Settings → Cellular",
             "  ต้องเห็นปุ่ม Add eSIM (เพิ่ม eSIM)",
             "• เครื่องต้องไม่ติดล็อกซิมรายเดือนค่าย",
         ], "มี EID + ไม่ติดล็อก = ใช้ได้ 100%", GREEN),
         "มีเลข EID = มีชิป eSIM ในเครื่อง"),
        (8.5, "CHECK *#06#", "ขั้นที่ 2", "ระวังเครื่องที่ไม่มี eSIM!",
         card_block(108, 520, 864, 940, "WARNING", AMBER, NAVY, "iPhone กลุ่มนี้มักใช้ eSIM ไม่ได้", [
             "• iPhone ศูนย์จีนแผ่นดินใหญ่",
             "  (China Mainland) ใช้ได้เฉพาะ 2 ซิมการ์ด",
             "• iPhone เครื่องฮ่องกง / มาเก๊า",
             "  รุ่น 2 ซิมกายภาพ (Dual Physical SIM)",
             "• Android รุ่นประหยัดหรือเครื่องล็อกโซน",
         ], "ถ้าไม่มี EID ให้ใช้ซิมการ์ดจริงแทน", AMBER),
         "เช็กก่อนจ่ายเงินจะได้ไม่เสียฟรี"),
        (6.5, "CHECK *#06#", "เช็กครบทุกรุ่น", "พร้อมวิธีตั้งค่า",
         card_block(108, 520, 864, 940, "FULL GUIDE", GREEN, WHITE, "esim.whytobe.com", [
             "✓ รายชื่อรุ่น iPhone / Samsung / Pixel",
             "✓ วิธีตั้งค่ากันเน็ตรั่วซิมไทย 100%",
             "✓ วิธีเลือกแพ็กญี่ปุ่น เกาหลี ไต้หวัน จีน",
             "✓ โค้ดลดครั้งแรก 15%: NEWTOAIRALO15",
         ], "ดูคู่มือเต็มที่ลิงก์หน้าโปรไฟล์", GREEN),
         "กดเซฟไว้ดู + อ่านต่อที่หน้าโปรไฟล์"),
    ],
    "reel-03-korea-naver-010": [
        (4.5, "KOREA ESIM", "ไปเกาหลีใช้ eSIM", "รู้ 2 เรื่องนี้ก่อนซื้อ!",
         card_block(108, 520, 864, 940, "SEOUL & BUSAN", NAVY, WHITE, "ทริคสำคัญก่อนเลือกซิมเกาหลี", [
             "1. Google Maps ในเกาหลีนำทางเดินไม่ได้",
             "   → ต้องเลือกคลื่นเสถียรเปิด Naver Map",
             "2. eSIM ส่วนใหญ่ไม่มีเบอร์เกาหลี 010",
             "   → จองคิวร้านดังยังไงไม่ให้ติด SMS?",
         ], "สรุปทางแก้ให้ครบในคลิปนี้ →", GREEN),
         "พลาด 2 ข้อนี้ เที่ยวเกาหลีสะดุดแน่"),
        (7.5, "KOREA ESIM", "เรื่องที่ 1", "Naver Map + 5G",
         card_block(108, 520, 864, 940, "TIP 01 · NAVIGATION", GREEN, WHITE, "ต้องใช้ Naver Map / KakaoMap", [
             "• Google Maps ใช้ดูรถไฟใต้ดิน/เดินเท้าไม่ครบ",
             "• คุณจะต้องเปิด Naver Map แทบตลอดวัน",
             "• แนะนำเลือก eSIM ที่วิ่งบนคลื่นหลัก",
             "  อย่าง SK Telecom 5G หรือ KT",
             "• Airalo 짱 Jjang ใช้คลื่น SK Telecom 5G",
         ], "5 GB / 7 วัน ฿350 · ลด 15% ~฿298", GREEN),
         "เน็ตเสถียร = เดินในโซลไม่หลง"),
        (8.5, "KOREA ESIM", "เรื่องที่ 2", "ไม่มีเบอร์ 010 ทำไง?",
         card_block(108, 520, 864, 940, "TIP 02 · QUEUE APPS", AMBER, NAVY, "eSIM ท่องเที่ยวเกือบทุกเจ้าเป็นเน็ตล้วน", [
             "• ไม่มีเบอร์เกาหลี 010 รับ SMS คิวร้าน",
             "• ทางแก้: โหลดแอป CatchTable Global",
             "  (สมัครรับแจ้งเตือนผ่านอีเมลแทนเบอร์)",
             "• ถ้าจำเป็นต้องโทร/รับ SMS เกาหลีจริง ๆ",
             "  ให้เลือกซิมแบบมีเบอร์ที่สนามบินอินชอน",
         ], "เตรียม CatchTable Global ไว้ก่อนบิน!", AMBER),
         "CatchTable Global ช่วยได้เยอะมาก"),
        (6.5, "KOREA ESIM", "เทียบ 5 ค่ายเกาหลี", "เริ่ม ~฿51 ถึง ฿350",
         card_block(108, 520, 864, 940, "5 PROVIDERS", GREEN, WHITE, "esim.whytobe.com", [
             "• SimOptions เริ่ม ~฿51 (1GB/3 วัน)",
             "• Airalo 짱 Jjang ฿350 (5GB/7 วัน)",
             "• Ubigi 10GB / 7 วัน ~฿408",
             "• Nomad / Holafly Unlimited เทียบครบ",
         ], "ดูตารางเทียบเกาหลีที่หน้าโปรไฟล์", GREEN),
         "เทียบราคา eSIM เกาหลี 5 ค่าย ที่หน้าโปรไฟล์"),
    ],
    "reel-04-preflight-checklist": [
        (4.5, "4-STEP SETUP", "ตั้งค่า eSIM ก่อนบิน", "กันเน็ตรั่ว 100%!",
         card_block(108, 520, 864, 940, "NO ROAMING BILL", NAVY, WHITE, "รับ OTP ธนาคารไทยได้ แต่ไม่เสียค่าเน็ต", [
             "1. ติดตั้ง eSIM ผ่าน Wi-Fi ก่อนบิน",
             "2. ปิด Data Roaming ซิมไทยให้สนิท",
             "3. เปิด Data Roaming เฉพาะสาย eSIM",
             "4. ปิด Cellular Data Switching",
         ], "มาดูทีละขั้นแบบชัวร์ 100% →", GREEN),
         "กดเซฟเก็บไว้เช็กตอนเครื่องลงจอด"),
        (7.5, "4-STEP SETUP", "ขั้นที่ 1 & 2", "ติดตั้ง + ปิดเน็ตไทย",
         card_block(108, 520, 864, 940, "STEP 1 & 2", GREEN, WHITE, "ทำก่อนบิน + ตอนเครื่องแตะพื้น", [
             "1. ติดตั้ง eSIM จากบ้าน (Wi-Fi แรง ๆ)",
             "   วันใช้งานยังไม่เดินจนกว่าถึงปลายทาง",
             "2. ตั้งชื่อสายว่า 'Thai' และ 'Travel eSIM'",
             "3. แตะสาย Thai → ปิด Data Roaming",
             "   (เปิดสายซิมไทยไว้รับ SMS OTP ได้)",
         ], "ปิด Data Roaming ซิมไทย = กันบิลช็อก", GREEN),
         "รับ OTP บัตรเครดิตไทยได้ตามปกติ"),
        (8.5, "4-STEP SETUP", "ขั้นที่ 3 & 4", "สลับเน็ต + ปิด Switching",
         card_block(108, 520, 864, 940, "STEP 3 & 4", AMBER, NAVY, "สำคัญมาก: อย่าลืมปิด Data Switching", [
             "3. แตะสาย Travel eSIM:",
             "   • เปิด Turn On This Line + Data Roaming",
             "   • ตั้ง Cellular Data ไปที่ Travel eSIM",
             "4. ปิด Allow Cellular Data Switching",
             "   กัน iPhone แอบสลับมาใช้เน็ตซิมไทยเอง!",
         ], "ไม่ขึ้นสัญญาณ? เปิด-ปิด Airplane Mode", AMBER),
         "4 ขั้นตอนนี้ใช้ได้ทุกประเทศ"),
        (6.5, "4-STEP SETUP", "คู่มือภาพทีละขั้น", "iPhone + Android",
         card_block(108, 520, 864, 940, "STEP-BY-STEP", GREEN, WHITE, "esim.whytobe.com", [
             "✓ 3 วิธีติดตั้ง Airalo (Direct / QR / Manual)",
             "✓ วิธีแก้ปัญหาลงเครื่องแล้วเน็ตไม่ขึ้น",
             "✓ วิธีตั้งชื่อ APN และเลือกเครือข่ายเอง",
             "✓ โค้ดลดครั้งแรก 15%: NEWTOAIRALO15",
         ], "อ่านคู่มือเต็มที่ลิงก์หน้าโปรไฟล์", GREEN),
         "ดูวิธีแก้เน็ตไม่ขึ้นที่ลิงก์หน้าโปรไฟล์"),
    ],
    "reel-05-6-countries-prices": [
        (4.5, "6 DESTINATIONS", "eSIM 6 ประเทศฮิต", "5GB / 7 วัน กี่บาท?",
         card_block(108, 520, 864, 940, "UPDATED NOV 2026", NAVY, WHITE, "อัปเดตราคาจริงหน้าร้านไทย Airalo", [
             "• สิงคโปร์ · เวียดนาม · ญี่ปุ่น",
             "• เกาหลีใต้ · ไต้หวัน · ฮ่องกง",
             "• พร้อมเทียบ 5 ค่ายดัง & โค้ดลด 15%",
             "• สำหรับลูกค้าใหม่ (NEWTOAIRALO15)",
         ], "ไล่ดูราคาแต่ละประเทศเลย →", GREEN),
         "รวม 6 ปลายทางยอดนิยมคนไทยปลายปี"),
        (7.5, "6 DESTINATIONS", "เอเชียใกล้ไทย", "SG ฿315 · VN ~฿340",
         card_block(108, 520, 864, 940, "SINGAPORE & VIETNAM", GREEN, WHITE, "5 GB / 7 วัน · คลื่นใหญ่ 5G", [
             "• สิงคโปร์ (Connect Lah!): ฿315",
             "  จับ Singtel 5G / M1 · ลด 15% เหลือ ~฿268",
             "• เวียดนาม (Xin Chao): ~฿340",
             "  จับ VNPT 5G · ลด 15% เหลือ ~฿289",
             "• เที่ยวข้ามด่าน SG+MY ใช้ Asialink ได้",
         ], "เริ่มต้นแค่ ฿140 (1GB/3 วัน)", GREEN),
         "ไม่ต้องไปต่อราคาซิมหน้าสนามบิน"),
        (8.5, "6 DESTINATIONS", "เอเชียตะวันออก", "JP/KR ฿350 · TW/HK",
         card_block(108, 520, 864, 940, "JP · KR · TW · HK", NAVY, WHITE, "5 GB / 7 วัน · คลื่นหลัก 5G", [
             "• ญี่ปุ่น (Moshi Moshi / SoftBank): ฿350",
             "• เกาหลีใต้ (짱 Jjang / SKT): ฿350",
             "• ไต้หวัน (Xie Xie / Taiwan Mobile): ~฿374",
             "• ฮ่องกง (Hkmobile / HKT): ฿384.50",
             "• จีน (ไม่ต้อง VPN เล่น LINE ได้): ฿507",
         ], "ลดครั้งแรก 15% ด้วย NEWTOAIRALO15", GREEN),
         "มีครบทั้งญี่ปุ่น เกาหลี ไต้หวัน ฮ่องกง จีน"),
        (6.5, "6 DESTINATIONS", "เช็กแพ็กใน 10 วิ", "เลือกประเทศที่หน้าเว็บ",
         card_block(108, 520, 864, 940, "TRIP PICKER", GREEN, WHITE, "esim.whytobe.com", [
             "✓ กดเลือกประเทศ + ปริมาณเน็ตที่ใช้",
             "✓ ดูราคาปกติเทียบราคาลด 15% ทันที",
             "✓ เทียบ 5 ค่าย (Airalo/Ubigi/Nomad/Holafly)",
             "✓ คัดลอกโค้ด NEWTOAIRALO15 ใน 1 คลิก",
         ], "คลิกลิงก์หน้าโปรไฟล์ได้เลย", GREEN),
         "เช็กแพ็กทริปตัวเองใน 10 วิที่หน้าโปรไฟล์"),
    ],
}


def build_video(name: str, slides: list[tuple]) -> Path:
    work = TMP_DIR / name
    work.mkdir(parents=True, exist_ok=True)
    png_paths = []
    durations = []
    total = len(slides)

    for idx, (dur, tag, t1, t2, body, cta) in enumerate(slides, start=1):
        svg_file = work / f"slide-{idx}.svg"
        png_file = work / f"slide-{idx}.png"
        svg_file.write_text(slide_svg(tag, idx, total, t1, t2, body, cta), encoding="utf-8")
        subprocess.run(
            ["rsvg-convert", "-w", "1080", "-h", "1920", "-o", str(png_file), str(svg_file)],
            check=True,
        )
        png_paths.append(png_file)
        durations.append(dur)

    fade = 0.4
    cmd = ["ffmpeg", "-y"]
    for p, d in zip(png_paths, durations):
        cmd.extend(["-loop", "1", "-t", str(d), "-i", str(p)])
    total_dur = sum(durations) - fade * (len(durations) - 1)
    cmd.extend(["-f", "lavfi", "-t", f"{total_dur:.2f}", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100"])

    filters = []
    for i in range(len(png_paths)):
        filters.append(f"[{i}:v]fps=30,format=yuv420p[v{i}]")

    cur = "v0"
    offset = durations[0] - fade
    for i in range(1, len(png_paths)):
        out_label = "vout" if i == len(png_paths) - 1 else f"x{i}"
        filters.append(f"[{cur}][v{i}]xfade=transition=slideleft:duration={fade}:offset={offset:.2f}[{out_label}]")
        cur = out_label
        if i < len(png_paths) - 1:
            offset += durations[i] - fade

    out_mp4 = REELS_DIR / f"{name}.mp4"
    cmd.extend([
        "-filter_complex", ";".join(filters),
        "-map", "[vout]",
        "-map", f"{len(png_paths)}:a",
        "-c:v", "libx264",
        "-preset", "medium",
        "-tune", "stillimage",
        "-crf", "24",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "64k",
        "-shortest",
        "-movflags", "+faststart",
        str(out_mp4),
    ])
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return out_mp4


def main() -> None:
    REELS_DIR.mkdir(parents=True, exist_ok=True)
    for name, slides in REELS.items():
        mp4 = build_video(name, slides)
        size_kb = mp4.stat().st_size // 1024
        print(f"Built {mp4.name} ({size_kb} KB)")


if __name__ == "__main__":
    main()
