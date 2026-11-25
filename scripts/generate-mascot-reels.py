#!/usr/bin/env python3
"""Assemble travel-first 9:16 mascot Reels/TikTok episodes with Thai neural TTS, animated frames, and safe captions."""

from __future__ import annotations

import json
import subprocess
import time
from dataclasses import dataclass
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
REELS_DIR = ROOT / "assets" / "reels"
CREATIVES_DIR = ROOT / "assets" / "brand" / "creatives"
TMP_DIR = ROOT / ".astro" / "mascot-video-tmp"

FONT_TH = "Noto Sans Thai, Google Sans, sans-serif"
FONT_MONO = "JetBrains Mono, monospace"

NAVY = "#0e2a3a"
WHITE = "#ffffff"
GREEN = "#0fa47a"
AMBER = "#e8a13d"
MINT = "#8eead0"

VOICE_PI_TUA = "th-TH-NiwatNeural"
VOICE_SIMPOK = "th-TH-PremwadeeNeural"


@dataclass(frozen=True)
class ShotSpec:
    shot_id: str
    image_path: Path
    voice: str
    rate: str
    voiceover_text: str
    eyebrow: str
    top_title: str
    top_sub: str
    caption_title: str
    caption_sub: str
    zoom_dir: str = "in"
    caption_y: int = 1395


EP01_SHOTS = [
    ShotSpec(
        shot_id="ep01-s1",
        image_path=CREATIVES_DIR / "creative-japan-kyoto-fuji.png",
        voice=VOICE_PI_TUA,
        rate="+8%",
        voiceover_text="บินมาถึงญี่ปุ่นอยากเห็นฟูจิตั้งแต่เช้า แต่ลงนาริตะปุ๊บ คิวยาวเป็นหางว่าว แล้วไวไฟสนามบินดันหมุนติ้ว เปิดคิวอาร์ Visit Japan Web ไม่ขึ้น!",
        eyebrow="EP 01 · JAPAN TRAVEL",
        top_title="ลงนาริตะปุ๊บ... ไวไฟสนามบินหมุนติ้ว!",
        top_sub="อยากดูฟูจิแต่เช้า ดันเปิด Visit Japan Web ไม่ขึ้น",
        caption_title="ช็อตนี้เจอทุกไฟลต์เช้านาริตะ!",
        caption_sub="คนต่อคิวแน่น → Wi-Fi สนามบินโหลดช้ามาก",
        zoom_dir="in",
        caption_y=366,
    ),
    ShotSpec(
        shot_id="ep01-s2",
        image_path=REELS_DIR / "ep01-frames" / "scene-02-narita-wifi-panic.png",
        voice=VOICE_SIMPOK,
        rate="+0%",
        voiceover_text="จำไว้เลย แคปคิวอาร์ไว้ตั้งแต่อยู่ไทย แต่พอเดินไปขึ้นรถไฟเข้าโตเกียว จะเติมบัตรซุยกะในมือถือยังไงถ้าไม่มีเน็ต",
        eyebrow="STEP 01 · PRE-FLIGHT",
        top_title="1. แคป QR Visit Japan Web ไว้ก่อนบิน",
        top_sub="แต่เดินขึ้นรถไฟ... จะเติม Suica ยังไงถ้าเน็ตดับ?",
        caption_title="แก้ได้แค่ครึ่งเดียวถ้าพึ่งแต่ Wi-Fi ฟรี!",
        caption_sub="ขึ้นรถไฟเข้าโตเกียว + เปิดแผนที่ต้องใช้เน็ตตลอด",
        zoom_dir="out",
        caption_y=1400,
    ),
    ShotSpec(
        shot_id="ep01-s3",
        image_path=REELS_DIR / "ep01-frames" / "scene-03-shinkansen-gate.png",
        voice=VOICE_PI_TUA,
        rate="+0%",
        voiceover_text="ทางรอดคือติดอีซิมจากไทยไปก่อนเลย พอแตะรันเวย์ญี่ปุ่นเปิดโรมมิ่งสายอีซิม เน็ตห้าจีมาทันทียังไม่ทันเดินถึงเกต",
        eyebrow="STEP 02 · SIMPAINAI TIP",
        top_title="2. ติดตั้ง eSIM ญี่ปุ่นตั้งแต่ไทย",
        top_sub="แตะรันเวย์ปุ๊บ เปิดโรมมิ่งสาย eSIM → เน็ต 5G มาทันที!",
        caption_title="ไม่ต้องถอดซิมไทย! รับ OTP ธนาคารได้ปกติ",
        caption_sub="วันใช้งานยังไม่เดินจนกว่าจะจับคลื่นที่ญี่ปุ่นจริง",
        zoom_dir="in",
        caption_y=1380,
    ),
    ShotSpec(
        shot_id="ep01-s4",
        image_path=REELS_DIR / "ep01-frames" / "scene-04-tokyo-5g-win.png",
        voice=VOICE_SIMPOK,
        rate="+0%",
        voiceover_text="แอร์ราโล ห้ากิก เจ็ดวัน สามร้อยห้าสิบบาท ใส่โค้ดลดสิบห้าเปอร์เซ็นต์เหลือไม่ถึงสามร้อย เทียบห้าค่ายได้ที่ อีซิม ดอท วายทูบี ดอท คอม ช่องซิมไปไหนเลยนะ",
        eyebrow="SAVE ~15% · NEWTOAIRALO15",
        top_title="Airalo 5GB/7 วัน ฿350 → ลดเหลือ ~฿298",
        top_sub="เทียบ 5 ค่าย + กันเน็ตรั่วที่ esim.whytobe.com",
        caption_title="กดเทียบแพ็กญี่ปุ่นเต็มได้ที่ลิงก์คอมเมนต์",
        caption_sub="ซิมไปไหน SimPaiNai · โค้ดลด NEWTOAIRALO15",
        zoom_dir="out",
        caption_y=1405,
    ),
]


def probe_duration(path: Path) -> float:
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "json",
            str(path),
        ],
        text=True,
    )
    return float(json.loads(out)["format"]["duration"])


def synth_voice(shot: ShotSpec, out_mp3: Path) -> float:
    if out_mp3.exists() and out_mp3.stat().st_size > 2048:
        return probe_duration(out_mp3)
    alt_voice = VOICE_PI_TUA if shot.voice == VOICE_SIMPOK else VOICE_SIMPOK
    for voice, retries in ((shot.voice, 3), (alt_voice, 2)):
        for attempt in range(1, retries + 1):
            try:
                cmd = [
                    "uvx",
                    "--from",
                    "edge-tts",
                    "edge-tts",
                    "--voice",
                    voice,
                    "--text",
                    shot.voiceover_text,
                    "--write-media",
                    str(out_mp3),
                ]
                if shot.rate not in ("+0%", "0%"):
                    cmd.insert(6, f"--rate={shot.rate}")
                subprocess.run(cmd, check=True)
                return probe_duration(out_mp3)
            except subprocess.CalledProcessError:
                out_mp3.unlink(missing_ok=True)
                time.sleep(2 * attempt)
    # Clean fallback to gTTS if Microsoft Edge TTS rejects text or throttles
    subprocess.run(
        ["uvx", "--from", "gTTS", "gtts-cli", "-l", "th", shot.voiceover_text, "-o", str(out_mp3)],
        check=True,
    )
    return probe_duration(out_mp3)


def make_overlay_svg(shot: ShotSpec, out_png: Path) -> None:
    """Create a 1080x1920 transparent overlay keeping text safely inside TikTok/Reels margins."""
    top_scrim_h = 540 if shot.caption_y < 600 else 440
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs>
    <linearGradient id="topScrim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="{NAVY}" stop-opacity="0.90"/>
      <stop offset="72%" stop-color="{NAVY}" stop-opacity="0.56"/>
      <stop offset="100%" stop-color="{NAVY}" stop-opacity="0.0"/>
    </linearGradient>
    <linearGradient id="botScrim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="{NAVY}" stop-opacity="0.0"/>
      <stop offset="50%" stop-color="{NAVY}" stop-opacity="0.52"/>
      <stop offset="100%" stop-color="{NAVY}" stop-opacity="0.92"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="1080" height="{top_scrim_h}" fill="url(#topScrim)"/>
  <rect x="0" y="1300" width="1080" height="620" fill="url(#botScrim)"/>

  <!-- Top safe zone y=148..360 (below mobile status bar) -->
  <rect x="64" y="148" width="420" height="44" rx="22" fill="#123a50" fill-opacity="0.92" stroke="{GREEN}" stroke-width="2.5"/>
  <text x="274" y="177" text-anchor="middle" font-family="{FONT_MONO}" font-size="21" font-weight="700" fill="{MINT}">{escape(shot.eyebrow)}</text>

  <text x="64" y="254" font-family="{FONT_TH}" font-size="48" font-weight="700" fill="{WHITE}">{escape(shot.top_title)}</text>
  <text x="64" y="314" font-family="{FONT_TH}" font-size="33" font-weight="600" fill="{AMBER}">{escape(shot.top_sub)}</text>

  <!-- Subtitle safe zone: x=64..880 (avoids TikTok right buttons) -->
  <rect x="64" y="{shot.caption_y}" width="816" height="132" rx="22" fill="{NAVY}" fill-opacity="0.90" stroke="{GREEN}" stroke-width="3.5"/>
  <text x="96" y="{shot.caption_y + 54}" font-family="{FONT_TH}" font-size="34" font-weight="700" fill="{WHITE}">{escape(shot.caption_title)}</text>
  <text x="96" y="{shot.caption_y + 100}" font-family="{FONT_TH}" font-size="26" font-weight="500" fill="{MINT}">{escape(shot.caption_sub)}</text>
</svg>
"""
    svg_path = out_png.with_suffix(".svg")
    svg_path.write_text(svg, encoding="utf-8")
    subprocess.run(
        ["rsvg-convert", "-w", "1080", "-h", "1920", "-o", str(out_png), str(svg_path)],
        check=True,
    )


def render_shot(shot: ShotSpec, duration: float, overlay_png: Path, voice_mp3: Path, out_mp4: Path) -> None:
    fps = 30
    frames = max(int(round(duration * fps)), fps * 4)
    if shot.zoom_dir == "in":
        z_expr = f"min(1.08,1.0+0.08*(on/{frames}))"
    else:
        z_expr = f"max(1.0,1.08-0.08*(on/{frames}))"

    # Pad voice slightly and normalize per shot cleanly before concat/crossfade
    filter_complex = (
        f"[0:v]scale=1296:2304:flags=lanczos,"
        f"zoompan=z='{z_expr}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
        f"d={frames}:s=1080x1920:fps={fps},format=rgba[bg];"
        f"[bg][1:v]overlay=0:0,format=yuv420p[v];"
        f"[2:a]apad=whole_dur={duration:.3f},aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[a]"
    )
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(shot.image_path),
            "-i",
            str(overlay_png),
            "-i",
            str(voice_mp3),
            "-filter_complex",
            filter_complex,
            "-map",
            "[v]",
            "-map",
            "[a]",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "19",
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            "-t",
            f"{duration:.3f}",
            str(out_mp4),
        ],
        check=True,
    )


def assemble_episode(shots: list[ShotSpec], out_mp4: Path) -> None:
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    REELS_DIR.mkdir(parents=True, exist_ok=True)

    shot_files: list[Path] = []
    durations: list[float] = []
    for shot in shots:
        if not shot.image_path.exists():
            raise FileNotFoundError(f"Missing scene image: {shot.image_path}")
        mp3 = TMP_DIR / f"{shot.shot_id}.mp3"
        overlay = TMP_DIR / f"{shot.shot_id}-overlay.png"
        clip = TMP_DIR / f"{shot.shot_id}.mp4"
        voice_dur = synth_voice(shot, mp3)
        clip_dur = max(voice_dur + 0.65, 4.8)
        make_overlay_svg(shot, overlay)
        render_shot(shot, clip_dur, overlay, mp3, clip)
        shot_files.append(clip)
        durations.append(clip_dur)

    concat_list = TMP_DIR / f"{out_mp4.stem}-concat.txt"
    concat_list.write_text("\n".join(f"file '{p.resolve()}'" for p in shot_files), encoding="utf-8")
    merged_mp4 = TMP_DIR / f"{out_mp4.stem}-voiceonly.mp4"
    subprocess.run(
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_list), "-c", "copy", str(merged_mp4)],
        check=True,
    )

    total_dur = probe_duration(merged_mp4)
    # Mix soft warm synth chord bed under clean normalized voiceover
    bed_expr = "0.18*sin(2*PI*261.63*t)+0.14*sin(2*PI*329.63*t)+0.12*sin(2*PI*392.00*t)+0.10*sin(2*PI*493.88*t)"
    mix_filter = (
        f"[0:a]loudnorm=I=-15:TP=-1.5:LRA=9[vo];"
        f"[1:a]lowpass=f=900,volume=0.055,afade=t=in:d=0.6,afade=t=out:st={max(total_dur - 1.2, 0):.3f}:d=1.2[bed];"
        f"[vo][bed]amix=inputs=2:duration=first:normalize=0[a]"
    )
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(merged_mp4),
            "-f",
            "lavfi",
            "-i",
            f"aevalsrc='{bed_expr}':s=48000:d={total_dur:.3f},aformat=channel_layouts=stereo",
            "-filter_complex",
            mix_filter,
            "-map",
            "0:v",
            "-map",
            "[a]",
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-movflags",
            "+faststart",
            str(out_mp4),
        ],
        check=True,
    )
    print(f"Built {out_mp4} ({probe_duration(out_mp4):.2f}s) from {len(shots)} shots: {[round(d, 2) for d in durations]}")


if __name__ == "__main__":
    assemble_episode(EP01_SHOTS, REELS_DIR / "simpainai-ep01-narita-japan.mp4")
