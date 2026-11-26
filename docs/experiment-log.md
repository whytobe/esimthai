# Organic eSIM Experiment Scorecard (16 Nov 2026 → 11 Jan 2027)

> Reference agreement: `/home/whytobe/.t3/projects/chiangrai-updates/affiliate-experiment-lab.md` (Section 8)
> Target review date: **11 Jan 2027** (8-week organic experiment, zero ad spend)

## 1. Definition of Done Tracker

| Criterion | Target (by 11 Jan 2027) | Current Status (26 Nov 2026) | Gap / Next Action |
| --- | --- | --- | --- |
| 1. Content Volume | ≥ 12 pieces (≥ 8 SEO articles + ≥ 4 Reels) | **12 SEO articles live** + **FB Launch Post A live** + **FB Posts B–E scheduled (`2026-11-26..29 19:00` Asia/Bangkok)** + **EP 1 Mascot Reel LIVE on [TikTok](https://www.tiktok.com/@simpainai/video/7711964708361817352) & [FB Reels](https://www.facebook.com/reel/2443289293166231)** + **Angle A Japan Price Carousel LIVE on [TikTok](https://www.tiktok.com/@simpainai/photo/7712154423409003797) (`82` views, `2` likes)** + **Angle B Roaming Trap Carousel LIVE on [TikTok](https://www.tiktok.com/@simpainai/photo/7712305187905342740) with UTM comment** | Run daily 4-angle test-first cadence: publish **Angle C (China Alipay/LINE without VPN)** tomorrow (`2026-11-27`) and compare 7-day engagement/clicks before scaling winners |
| 2. Indexing & Measurement | All key pages indexed in Google + GSC + Analytics + SubID | GSC `sitemap.xml` **processed successfully (9 discovered pages initially; 13 URLs now in sitemap)**; homepage live test passed & indexing requested; `FAQPage` + `BreadcrumbList` + `Article` JSON-LD + Web Analytics + SubID active | Remaining manual per-URL GSC indexing hit reCAPTCHA (`esim-japan`) — sitemap will crawl remaining URLs automatically unless owner solves reCAPTCHA |
| 3. Traffic & Clicks | ≥ 30 organic affiliate clicks + full funnel data | Measurement active (`scripts/check-metrics.sh` + Impact SubIDs); **CF 30d: 30 pageviews / 30 visits**; **Impact baseline Nov 10–24, 2026 confirmed at 0 clicks, 0 actions, ฿0.00 earnings** (live Impact re-check blocked: signed out on `omarchy`, `puie-m4pro` locked); **TikTok `@simpainai`: 5 followers, 12 likes (+2)** | Monitor CF Analytics & `utm_campaign=angle-*` traffic daily; verify Impact once signed in |
| 4. Partner Diversification | Backup payout-compatible programs prepared/applied | Airalo active across **12 articles + 8 TripRecommender destinations**; **Holafly declined (`2026-11-25 13:22 GMT+7`)**; **Nomad auto-acknowledgment received (`2026-11-25 11:22 GMT+7`, landed in Spam; expects reply in 1–2 business days)**; **Ubigi & aloSIM outreach sent (`2026-11-25`), awaiting replies** | Monitor Nomad, Ubigi, aloSIM replies in `whytobe@gmail.com`; re-apply to Holafly only after higher traffic/follower traction |

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
  - Vertical Destination Invitation Posters (`1080×1920`, EP 1–5 complete): `assets/brand/creatives/post-japan-invite.png`, `assets/brand/creatives/post-seoul-night-invite.png`, `assets/brand/creatives/post-china-shanghai-invite.png`, `assets/brand/creatives/post-preflight-lantern-invite.png`, `assets/brand/creatives/post-japan-ramen-invite.png` *(source backdrops in `assets/brand/creatives/`)*
  - Google Flow Character Reference Sheets (Ingredients): `assets/brand/characters/{pi-tua-base,pi-tua-sheet,nong-simpok-base,nong-simpok-sheet,nong-chip-base,duo-hero}.png`
- Website favicon & legacy brand kit: `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png` (`180×180`), `assets/brand/esimthai-profile.png`, `assets/brand/esimthai-cover.png`
- OG share image: `public/og-default.png` (`1200×630`)
- Relatable Mascot Episode Kit (Batch 2, Google Flow + Lyrics prompts): [reels-batch2-mascot.md](reels-batch2-mascot.md)
- Produced Batch 2 Mascot Video & Frame Assets:
  - **EP 1 (`LIVE` on TikTok & FB Reels):** `assets/reels/simpainai-ep01-narita-japan.mp4` (`36.13s`, `1080×1920`, Thai Neural TTS; built via `scripts/generate-mascot-reels.py` + `assets/reels/ep01-frames/scene-0{2,3,4}*.png`)
- Reels Batch 1 covers (`1080×1920`) & Ready-to-upload MP4 videos (`1080×1920`, H.264):
  - `assets/reels/reel-01-japan-vs-sim2fly.{png,mp4}`
  - `assets/reels/reel-02-check-esim-eid.{png,mp4}`
  - `assets/reels/reel-03-korea-naver-010.{png,mp4}`
  - `assets/reels/reel-04-preflight-checklist.{png,mp4}`
  - `assets/reels/reel-05-6-countries-prices.{png,mp4}`
- Scripts & social captions: [reels-scripts.md](reels-scripts.md), [reels-batch2-mascot.md](reels-batch2-mascot.md), and [distribution-pack.md](distribution-pack.md)

---

## 4. Current Blockers / Decisions Needed from Owner

1. **Social Distribution (Brand Separation & Launch Live on `puie-m4pro`):**
   - **Facebook Page (`fb.com/simpainai` — LIVE & LAUNCHED):** [`https://www.facebook.com/simpainai`](https://www.facebook.com/simpainai) (`ซิมไปไหน Simpainai`) — Launch **Post A** published publicly [`pfbid0BgLL6XpMT6WUZ2AQoQtapjVDc1SvmMYV6w4UqUHybgnMvnt6wiTQ6incNA7H2n59l`](https://www.facebook.com/simpainai/posts/pfbid0BgLL6XpMT6WUZ2AQoQtapjVDc1SvmMYV6w4UqUHybgnMvnt6wiTQ6incNA7H2n59l); **Posts B–E scheduled in Meta Business Suite** for `2026-11-26..29 19:00` Asia/Bangkok (0 boosted); **EP 1 Reel LIVE**: [`https://www.facebook.com/reel/2443289293166231`](https://www.facebook.com/reel/2443289293166231) (`Shared with Public` + Page UTM comment verified in feed; standalone reel viewer stalled on direct open). *(Public Incognito Page header showed no `Learn More` CTA button, so `utm_medium=cta` remains unverified publicly.)*
   - **TikTok Account Separation (`SimPaiNai` Chrome Profile — LIVE):** [`https://www.tiktok.com/@simpainai`](https://www.tiktok.com/@simpainai) (`ซิมไปไหน · SimPaiNai`) — rebranded from `@whytobe_music`; 5 older videos set to Private (`Only me`), `@pukpuie` in `Default` Chrome untouched. **EP 1 Video LIVE**: [`https://www.tiktok.com/@simpainai/video/7711964708361817352`](https://www.tiktok.com/@simpainai/video/7711964708361817352) (`Everyone` + UTM `Comments (1)` posted; initial filename caption prefix corrected & saved in Studio, though cached video page still displayed it and direct reload returned a network error).
   - **Google Flow Readiness Check:** Signed in as `whytobe@gmail.com` with **10,050 credits** and project editor/ingredient picker accessible (no standalone `Ingredients to Video` label; 0 credits spent).
2. **Holafly Partner Application:** 🔴 Declined on `2026-11-25 13:22 GMT+7` (`creators@holafly.com`, *"unable to move forward with a collaboration at this time"*). Hold re-application until stronger site traffic & TikTok traction.
3. **Notion Shared Context (Saved & Verified `2026-11-25`):** [Playbook Document](https://app.notion.com/p/SimPaiNai-Brand-Travel-First-Mascot-Playbook-esim-whytobe-com-4239f1ab89268158bfd6e6e82763c0c1) · [Decision Memory](https://app.notion.com/p/eSIM-Affiliate-Brand-Identity-SimPaiNai-Travel-First-Mascot-Universe-4239f1ab8926810d8eecf00324945099).
4. **Ubigi, Nomad & aloSIM Partner Outreach (`2026-11-25`):** 🟡 **Nomad** auto-reply received (`2026-11-25 11:22 GMT+7`, landed in Spam; follow-up in 1–2 business days if interested); **Ubigi** and **aloSIM** have no reply yet as of `2026-11-26 09:38 GMT+7`.
5. **GSC Manual Per-URL Indexing (Optional):** `sitemap.xml` processed cleanly (9 discovered initially; now serving 13 URLs). Manual `esim-japan` inspection previously hit reCAPTCHA.
6. **Automated Weekly Metrics Check:** Daemon cron `0 9 * * 1` scheduled to run `scripts/check-metrics.sh`.

---

## 5. Funnel Snapshot Log

| Date | GSC Sitemap / Indexed | GSC Impressions / Clicks | CF Web Analytics Pageviews | Impact Affiliate Clicks | Conversions / Earnings | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-11-24 13:30 | `sitemap.xml` processed (**9 discovered pages**, updated to **13 URLs**); Homepage live test passed & indexing requested | 0 / 0 | 0 (just deployed) | Unverified (Impact login expired) | Unverified | Shipped technical SEO, 12 articles, TripRecommender, Web Analytics, 5 Reels kits + 5 MP4 videos |
| 2026-11-24 15:32 | 13 URLs live in `sitemap.xml` | 0 / 0 | Pending live re-check | **0** *(Nov 10–24 Impact baseline verified)* | **0 / ฿0.00** | Generated SG/HK/CN/Asia Airalo deep links (`dyBDOq`, `NGLe9v`, `YVejRm`, `MKOkA3`); shipped custom brand profile/cover & favicon; staged FB Page creation & TikTok Reel #1 on `puie-m4pro` |
| 2026-11-25 09:02 | 13 URLs live in `sitemap.xml` | 0 / 0 | 0 *(unchanged ahead of social launch)* | **0** *(unchanged)* | **0 / ฿0.00** | Verified `@simpainai` untaken on TikTok; submitted Holafly application (`SIMPAINAI` / HubSpot confirmed); FB Tab 4 `ซิมไปไหน SimPaiNai` ready & focused on `puie-m4pro`; saved & read-back verified Brand Playbook + Decision Memory in Notion |
| 2026-11-25 09:10 | 13 URLs live in `sitemap.xml` *(flagship internal links deployed)* | 0 / 0 | 0 *(unchanged ahead of social launch)* | **0** *(unchanged)* | **0 / ฿0.00** | Deployed internal cross-links in `esim-japan` & `esim-korea` (`https://bbb09a40.esimthai.pages.dev`, HTTP 200 + `subId1` verified); completed 5/5 Batch 2 travel-first vertical posters (`post-china-shanghai`, `post-preflight-lantern`, `post-japan-ramen`); added EP 1–5 UTM pinned-comment pack & Ubigi/aloSIM outreach drafts |
| 2026-11-25 09:17 | 13 URLs live in `sitemap.xml` | 0 / 0 | 0 *(no posts published yet)* | **0** *(unchanged)* | **0 / ฿0.00** | Live FB Page `ซิมไปไหน SimPaiNai` branded (`id=61596804965384`, `simpainai-profile/cover.png`, Website & CTA saved); `puie-m4pro` synced to `37c4bc7`; username `simpainai` available & paused on FB password confirmation |
| 2026-11-25 10:14 | 13 URLs live in `sitemap.xml` | 0 / 0 | Pending post traffic | **0** *(unchanged)* | **0 / ฿0.00** | Claimed `https://www.facebook.com/simpainai` username cleanly; published launch Post A (`post-japan-invite.png` + `utm_campaign=launch_post_a`) and verified live feed after reload (`Learn More` CTA visibility unverified in management view) |
| 2026-11-25 11:05 | 13 URLs live in `sitemap.xml` | 0 / 0 | Pending social traffic | **0** *(unchanged)* | **0 / ฿0.00** | Rebranded TikTok `@whytobe_music` (`whytobeats`) to live [`https://www.tiktok.com/@simpainai`](https://www.tiktok.com/@simpainai) in isolated `SimPaiNai` Chrome profile (`simpainai-profile.png` + 3-line Bio); set all 5 prior videos to Private (`Only me`, 0 public/0 deleted); weekly Mon 09:00 daemon cron active |
| 2026-11-25 11:50 | 13 URLs live in `sitemap.xml` | 0 / 0 | Pending new reel/post traffic | **0** *(unchanged)* | **0 / ฿0.00** | Sent Nomad (`affiliate@getnomad.app`), Ubigi (`affiliates@ubigi.com`), aloSIM (`affiliates@alosim.com`) outreach via `whytobe@gmail.com` (verified Sent; Mail.app unavailable); scheduled FB Posts B–E (`2026-11-26..29 19:00` Asia/Bangkok); Google Flow verified (`10,050 credits`); built & published EP 1 Mascot Reel (`simpainai-ep01-narita-japan.mp4`) live on [TikTok](https://www.tiktok.com/@simpainai/video/7711964708361817352) & [FB Reels](https://www.facebook.com/reel/2443289293166231) with UTM comments |
| 2026-11-26 00:00 | 13 URLs live in `sitemap.xml` (`HTTP 200`) | 0 / 0 *(unverified this pass)* | **30 views / 30 visits** *(30d: `/` 10, `/blog/esim-china/` 10, `/blog/how-to-use-airalo/` 10)* | Unverified *(last baseline 0)* | Unverified | Migrated TikTok `@simpainai` into OpenBot browser; started 4-angle test-first cadence (owner authorized daily autonomous ops + daily metrics report; `daily-affiliate-ops` updated for 09:30 Asia/Bangkok). Built & published **Angle A** 5-slide Japan price carousel (`assets/carousels/angle-a-japan-price/`, commit `91e68b2`, 0 Flow credits) live on [TikTok](https://www.tiktok.com/@simpainai/photo/7712154423409003797) (`utm_campaign=angle-a-price`); **Angle B** visual draft rendered (`21s`, 1080×1920 on `puie-m4pro`, awaiting Mac unlock for free-tier Leda TTS); EP 2 Flow review (`simpainai-ep02-review-leda.mp4`, 9,720 Flow credits left) held unposted while testing high-intent angles. TikTok baseline: 5 followers, 10 likes, EP 1 = 0 views. |
| 2026-11-26 09:45 | 13 URLs live in `sitemap.xml` (`HTTP 200`) | 0 / 0 *(unverified this pass)* | **30 views / 30 visits** *(delta `+0/+0`; 30d: `/` 10, `/blog/esim-china/` 10, `/blog/how-to-use-airalo/` 10)* | Unverified *(Impact signed out on `omarchy`; `puie-m4pro` screen-locked)* | Unverified | **TikTok `@simpainai`:** **5 followers (`+0`), 12 likes (`+2`)** — **Angle A** carousel (`7712154423409003797`, posted Nov 25 23:58 BKK) jumped to **82 views, 2 likes, 1 comment** vs **EP 1** mascot video (**0 views, 0 likes, 1 comment**). **Published Angle B** 5-slide Roaming Trap carousel (`assets/carousels/angle-b-roaming-trap/`, commit `f14c315`, 0 Flow credits, ฿0) live on [TikTok](https://www.tiktok.com/@simpainai/photo/7712305187905342740) (`Everyone`, verified after reload) with UTM comment (`utm_campaign=angle-b-roaming-trap` → `/blog/how-to-use-airalo/`). **Partner Inbox (`whytobe@gmail.com` via `omarchy`):** **Holafly declined** (`2026-11-25 13:22 GMT+7`); **Nomad** auto-reply received in Spam (`1–2 business days`); **Ubigi & aloSIM** no reply yet. FB Business Suite signed out on `omarchy` & `puie-m4pro` screen-locked (Post B scheduled 19:00 today). Google AI Studio TTS confirmed signed in on `omarchy`. |
| 2026-11-26 23:53 | 13 URLs live in `sitemap.xml` (`HTTP 200`) | 0 / 0 *(unverified)* | **30 views / 30 visits** *(delta `+0/+0`)* | **0** *(verified live on Impact `Nov 12–26, 2026` via Google SSO)* | **0 / ฿0.00** | **15-Day First-Revenue Sprint (deadline 2026-12-11) & 4-Agent Team Live:** TikTok `@simpainai` jumped to **5 followers, 14 likes (`+2`)** — **Angle B** hit **186 views** (`12h`), **Angle A** hit **136 views** (`+54`), **EP 1** still `0 views`. **FB `fb.com/simpainai`:** Post B published at 19:00 BKK (`2` followers, Posts C–E queued 27–29 Nov). **Vacay Affiliate Approved & Live (`?thref=PSXT8BB3`, code `THAF-TIWE`, PromptPay, 10% 1st order):** embedded across all 12 articles (`QuickPick` + `TicketCta`) and homepage `TripRecommender` alongside Airalo (`NEWTOAIRALO15`) + Travelpayouts Drive script (`tpembars.com/NjA3MjEw.js?t=607210`, `defer`) deployed live to `esim.whytobe.com` (`https://6842d425.esimthai.pages.dev`, HTTP 200 verified). **Pre-staged upgraded A/B carousels** (`angle-c-china-style-a` for 27 Nov + `angle-e-otp-style-b` for 28 Nov by `simpainai-creator`), added `simpainai-research` (`docs/idea-backlog.md`, daily 14:00) & `simpainai-reviewer` (GPT-6.2-Sol adversarial gate before any spend of owner's ฿1,000 cap in `LAP Marketing / Love Golden`). |
