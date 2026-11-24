# Organic eSIM Experiment Scorecard (16 Nov 2026 → 11 Jan 2027)

> Reference agreement: `/home/whytobe/.t3/projects/chiangrai-updates/affiliate-experiment-lab.md` (Section 8)
> Target review date: **11 Jan 2027** (8-week organic experiment, zero ad spend)

## 1. Definition of Done Tracker

| Criterion | Target (by 11 Jan 2027) | Current Status (24 Nov 2026) | Gap / Next Action |
| --- | --- | --- | --- |
| 1. Content Volume | ≥ 12 pieces (≥ 8 SEO articles + ≥ 4 Reels) | **12 SEO articles live** + **5 Reels scripts + 5 PNG covers + 5 ready-to-upload 1080×1920 MP4 videos** | Owner to review & post Reels using [reels-scripts.md](reels-scripts.md) + [distribution-pack.md](distribution-pack.md) |
| 2. Indexing & Measurement | All key pages indexed in Google + GSC + Analytics + SubID | GSC `sitemap.xml` **processed successfully (9 discovered pages initially; 13 URLs now in sitemap)**; homepage live test passed & indexing requested; `FAQPage` + `BreadcrumbList` + `Article` JSON-LD + Web Analytics + SubID active | Remaining manual per-URL GSC indexing hit reCAPTCHA (`esim-japan`) — sitemap will crawl remaining URLs automatically unless owner solves reCAPTCHA |
| 3. Traffic & Clicks | ≥ 30 organic affiliate clicks + full funnel data | Measurement active (`scripts/check-metrics.sh` + Impact SubIDs); **Impact baseline Nov 10–24, 2026 confirmed at 0 clicks, 0 actions, ฿0.00 earnings**; Reel #1 staged on TikTok Studio & FB Page creation ready | Publish Reels & FB Page posts via owner review to drive initial traffic |
| 4. Partner Diversification | Backup payout-compatible programs prepared/applied | Airalo active with **all 12 articles + 8 TripRecommender destinations using dedicated country/regional links**; Impact Marketplace had 0 listings for Nomad/Ubigi/Holafly; Transatel Impact portal SSO redirected to Airalo; Holafly HubSpot form pre-filled (paused on `Primary Audience Country` validation) | Owner to select `Thailand` + submit Tab 3 Holafly form in Chrome, or approve Nomad email / direct Ubigi outreach |

---

## 2. Published SEO Articles & SubID Attribution

| # | Slug | Focus Keyword | Primary Affiliate | Top/Bottom `subId1` |
| --- | --- | --- | --- | --- |
| 1 | `esim-japan` | `eSIM ญี่ปุ่น` | `airalo.pxf.io/E0B2zX` | `esim-japan` |
| 2 | `esim-korea` | `eSIM เกาหลี` | `airalo.pxf.io/n4MgRx` | `esim-korea` |
| 3 | `what-is-esim` | `eSIM คืออะไร` | `airalo.pxf.io/OYqz9A` | `what-is-esim` |
| 4 | `esim-japan-vs-sim-card` | `eSIM vs ซิมการ์ด` | `airalo.pxf.io/E0B2zX` | `esim-japan-vs-sim-card` |
| 5 | `esim-taiwan` | `eSIM ไต้หวัน` | `airalo.pxf.io/k46V9x` | `esim-taiwan` |
| 6 | `esim-vietnam` | `eSIM เวียดนาม` | `airalo.pxf.io/aNgPjq` | `esim-vietnam` |
| 7 | `how-to-use-airalo` | `Airalo ใช้ยังไง` | `airalo.pxf.io/OYqz9A` | `how-to-use-airalo` |
| 8 | `where-to-buy-esim` | `ซื้อ eSIM ที่ไหน` | `airalo.pxf.io/OYqz9A` | `where-to-buy-esim` |
| 9 | `esim-singapore` | `eSIM สิงคโปร์` | `airalo.pxf.io/dyBDOq` | `esim-singapore` |
| 10 | `esim-hong-kong` | `eSIM ฮ่องกง` | `airalo.pxf.io/NGLe9v` | `esim-hong-kong` |
| 11 | `esim-china` | `eSIM จีน` | `airalo.pxf.io/YVejRm` | `esim-china` |
| 12 | `esim-asia` | `eSIM เอเชีย` | `airalo.pxf.io/MKOkA3` | `esim-asia` |

Plus homepage interactive `TripRecommender` covering 8 destinations (`subId1=home-picker&subId2=<country>`) — all 8 now mapped to their dedicated Airalo country/regional deep links.

---

## 3. Brand, Mascot Universe, Reels & Visual Assets Ready

- **Social Brand (`ซิมไปไหน · SimPaiNai`) & Travel-First Visuals:**
  - Playbook & Character Bible: [brand-playbook.md](brand-playbook.md)
  - Travel-immersed Social Avatar (`1024×1024` circle-safe, Mt. Fuji + pagoda + duo): `assets/brand/simpainai-profile.png`
  - Travel-immersed FB Cover (`1640×924` Shinkansen + Mt. Fuji + duo): `assets/brand/simpainai-cover.png`
  - Vertical Destination Invitation Posters (`1080×1920`): `assets/brand/creatives/post-japan-invite.png`, `assets/brand/creatives/post-seoul-night-invite.png` *(source backdrops in `assets/brand/creatives/`)*
  - Google Flow Character Reference Sheets (Ingredients): `assets/brand/characters/{pi-tua-base,pi-tua-sheet,nong-simpok-base,nong-simpok-sheet,nong-chip-base,duo-hero}.png`
- Website favicon & legacy brand kit: `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png` (`180×180`), `assets/brand/esimthai-profile.png`, `assets/brand/esimthai-cover.png`
- OG share image: `public/og-default.png` (`1200×630`)
- Relatable Mascot Episode Kit (Batch 2, Google Flow + Lyrics prompts): [reels-batch2-mascot.md](reels-batch2-mascot.md)
- Reels Batch 1 covers (`1080×1920`) & Ready-to-upload MP4 videos (`1080×1920`, H.264):
  - `assets/reels/reel-01-japan-vs-sim2fly.{png,mp4}`
  - `assets/reels/reel-02-check-esim-eid.{png,mp4}`
  - `assets/reels/reel-03-korea-naver-010.{png,mp4}`
  - `assets/reels/reel-04-preflight-checklist.{png,mp4}`
  - `assets/reels/reel-05-6-countries-prices.{png,mp4}`
- Scripts & social captions: [reels-scripts.md](reels-scripts.md), [reels-batch2-mascot.md](reels-batch2-mascot.md), and [distribution-pack.md](distribution-pack.md)

---

## 4. Current Blockers / Decisions Needed from Owner

1. **Social Distribution (Brand Separation & Launch Ready on `puie-m4pro`):**
   - **Facebook Page (`puie-m4pro` Tab 4):** Updating staged Page Creation to `ซิมไปไหน SimPaiNai — ทริคเที่ยวและเน็ตต่างประเทศ` (`Digital creator`). Owner to click **Create Page** and upload `assets/brand/simpainai-profile.png` + `assets/brand/simpainai-cover.png`.
   - **TikTok Account Separation (`puie-m4pro`):** Reverted `@pukpuie` (discarded Reel #1 upload; restored previous avatar from `/tmp/pukpuie-old-avatar-crop.png`). Owner to register dedicated `ซิมไปไหน · SimPaiNai` TikTok account using the verified untaken handle and produce Episode 1 via Google Flow + [reels-batch2-mascot.md](reels-batch2-mascot.md).
2. **Holafly Partner Application (`puie-m4pro` Tab 3):** Cleared `@pukpuie` and validated `Primary Audience Country = Thailand`; syncing verified `SimPaiNai` handle + `SIMPAINAI` code for final Submit.
3. **Ubigi Partner Access:** Signing into `https://app.impact.com/bla/Transatel/login.user` via Google redirected directly to the existing Airalo dashboard without showing a Ubigi campaign or signup form (requires direct partner outreach/invite if still desired).
4. **GSC Manual Per-URL Indexing (Optional):** `sitemap.xml` processed cleanly (9 discovered initially; now serving 13 URLs). Manual `esim-japan` inspection previously hit reCAPTCHA.
5. **Automated Weekly Metrics Check:** Daemon cron `0 9 * * 1` scheduled to run `scripts/check-metrics.sh`.

---

## 5. Funnel Snapshot Log

| Date | GSC Sitemap / Indexed | GSC Impressions / Clicks | CF Web Analytics Pageviews | Impact Affiliate Clicks | Conversions / Earnings | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-11-24 13:30 | `sitemap.xml` processed (**9 discovered pages**, updated to **13 URLs**); Homepage live test passed & indexing requested | 0 / 0 | 0 (just deployed) | Unverified (Impact login expired) | Unverified | Shipped technical SEO, 12 articles, TripRecommender, Web Analytics, 5 Reels kits + 5 MP4 videos |
| 2026-11-24 15:32 | 13 URLs live in `sitemap.xml` | 0 / 0 | Pending live re-check | **0** *(Nov 10–24 Impact baseline verified)* | **0 / ฿0.00** | Generated SG/HK/CN/Asia Airalo deep links (`dyBDOq`, `NGLe9v`, `YVejRm`, `MKOkA3`); shipped custom brand profile/cover & favicon; staged FB Page creation & TikTok Reel #1 on `puie-m4pro` |
