# Organic eSIM Experiment Scorecard (16 Nov 2026 → 11 Jan 2027)

> Reference agreement: `/home/whytobe/.t3/projects/chiangrai-updates/affiliate-experiment-lab.md` (Section 8)
> Target review date: **11 Jan 2027** (8-week organic experiment, zero ad spend)

## 1. Definition of Done Tracker

| Criterion | Target (by 11 Jan 2027) | Current Status (24 Nov 2026) | Gap / Next Action |
| --- | --- | --- | --- |
| 1. Content Volume | ≥ 12 pieces (≥ 8 SEO articles + ≥ 4 Reels) | **12 SEO articles live** + **5 Reels scripts + 5 PNG covers + 5 ready-to-upload 1080×1920 MP4 videos** | Owner to review & post Reels using [reels-scripts.md](reels-scripts.md) + [distribution-pack.md](distribution-pack.md) |
| 2. Indexing & Measurement | All key pages indexed in Google + GSC + Analytics + SubID | GSC `sitemap.xml` **processed successfully (9 discovered pages initially; 13 URLs now in sitemap)**; homepage live test passed & indexing requested; `FAQPage` + `BreadcrumbList` + `Article` JSON-LD + Web Analytics + SubID active | Remaining manual per-URL GSC indexing hit reCAPTCHA (`esim-japan`) — sitemap will crawl remaining URLs automatically unless owner solves reCAPTCHA |
| 3. Traffic & Clicks | ≥ 30 organic affiliate clicks + full funnel data | Measurement active (`scripts/check-metrics.sh` + Impact SubIDs); Impact dashboard stats unverified due to expired session | Re-sign into Impact on `puie-m4pro` for baseline clicks/earnings + drive clicks via Reels/social |
| 4. Partner Diversification | Backup payout-compatible programs prepared/applied | Airalo active (all 10 articles tracked); Impact Marketplace showed 0 eligible listings for Nomad/Ubigi; Ubigi portal read-only checked (requires sign-in) | Owner to review [partner-expansion-pack.md](partner-expansion-pack.md), sign into Impact/Ubigi, and approve external applications/email |

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
| 9 | `esim-singapore` | `eSIM สิงคโปร์` | `airalo.pxf.io/OYqz9A` *(SG deep link pending)* | `esim-singapore` |
| 10 | `esim-hong-kong` | `eSIM ฮ่องกง` | `airalo.pxf.io/OYqz9A` *(HK deep link pending)* | `esim-hong-kong` |
| 11 | `esim-china` | `eSIM จีน` | `airalo.pxf.io/OYqz9A` *(CN deep link pending)* | `esim-china` |
| 12 | `esim-asia` | `eSIM เอเชีย` | `airalo.pxf.io/OYqz9A` *(Asia deep link pending)* | `esim-asia` |

Plus homepage interactive `TripRecommender` covering 8 destinations (`subId1=home-picker&subId2=<country>`).

---

## 3. Reels & Visual Assets Ready

- OG share image: `public/og-default.png` (`1200×630`)
- Reels covers (`1080×1920`) & Ready-to-upload MP4 videos (`1080×1920`, H.264):
  - `assets/reels/reel-01-japan-vs-sim2fly.{png,mp4}`
  - `assets/reels/reel-02-check-esim-eid.{png,mp4}`
  - `assets/reels/reel-03-korea-naver-010.{png,mp4}`
  - `assets/reels/reel-04-preflight-checklist.{png,mp4}`
  - `assets/reels/reel-05-6-countries-prices.{png,mp4}`
- Scripts & social captions: [reels-scripts.md](reels-scripts.md) and [distribution-pack.md](distribution-pack.md)

---

## 4. Current Blockers / Decisions Needed from Owner

1. **Social Distribution (Zero Posts Published Yet):** Review & publish Reels #1–#5 (`assets/reels/*.png` + `docs/reels-scripts.md`) and Facebook Page posts (`docs/distribution-pack.md`).
2. **Impact Re-login (`puie-m4pro`):** Session redirected to sign-in. Needed to check baseline Clicks/Actions/Earnings, generate country deep links for Singapore & Hong Kong, and check Ubigi portal access (`https://app.impact.com/bla/Transatel/login.user`).
3. **External Partner Applications:** Approve outreach in [partner-expansion-pack.md](partner-expansion-pack.md) (Nomad `affiliate@getnomad.app`, Holafly, Ubigi, aloSIM).
4. **GSC Manual Per-URL Indexing (Optional):** Sitemap already processed cleanly (`9 discovered pages`, now serving `11 URLs`). Remaining manual indexing requests hit reCAPTCHA on `esim-japan`.

---

## 5. Funnel Snapshot Log

| Date | GSC Sitemap / Indexed | GSC Impressions / Clicks | CF Web Analytics Pageviews | Impact Affiliate Clicks | Conversions / Earnings | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-11-24 | `sitemap.xml` processed (**9 discovered pages**, updated to **11 URLs**); Homepage live test passed & indexing requested | 0 / 0 | 0 (just deployed) | Unverified (Impact login expired) | Unverified | Shipped technical SEO, 10 articles, TripRecommender, Web Analytics, 5 Reels kits + 5 PNG covers |
