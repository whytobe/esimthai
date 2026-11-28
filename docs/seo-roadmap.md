# SimPaiNai SEO & Content Growth Roadmap (`esim.whytobe.com`)

อัปเดตล่าสุด: **28 พ.ย. 2569 (2026-11-28)** · เจ้าของแผน: `simpainai-seo`
เป้าหมาย: สร้างทราฟฟิกออร์แกนิกภาษาไทยแบบ Commercial & Comparison Intent เพื่อเพิ่มคลิกและยอดขาย Affiliate (Airalo + Vacay + พาร์ตเนอร์สำรอง) อย่างยั่งยืน

---

## 1. ผลตรวจ SEO บทความเดิมทั้ง 12 หน้า (Audit 2026-11-27 → อัปเดต 2026-11-28)

### สถานะ Technical SEO & Sitemap
- **Sitemap (`src/pages/sitemap.xml.ts`):** ดึงบทความจาก `getCollection('blog')` อัตโนมัติทุกครั้งที่ build (เดิม 13 URLs → หลัง Wave 1 เป็น 15 URLs → หลัง **Wave 2 (28 พ.ย. 2569)** เป็น **17 URLs** อัตโนมัติ)
- **Structured Data (`src/layouts/BlogPost.astro`):** สร้าง `Article` (พร้อม `dateModified` จาก `updatedDate`), `BreadcrumbList`, และ `FAQPage` JSON-LD + visible `<details>` FAQ accordion อัตโนมัติเมื่อบทความมีฟิลด์ `faqs:` ใน frontmatter
- **Related Posts (`src/layouts/BlogPost.astro`):** `simpainai-web` จำกัดแสดงสูงสุด 6 บทความตามคะแนน tag overlap + recency แล้ว (`2857be4`)
- **Meta Pixel & SubID Attribution (`src/layouts/Base.astro`):** คงสภาพ `subId1` (slug), `subId2` (`top`/`bottom`/`sticky`), และ `subId3` (UTM) ครบถ้วน + `OutboundAffiliateClick` ทั้ง Airalo และ Vacay

### ช่องโหว่ที่พบใน 12 บทความเดิม (และแผนแก้ใน Wave 1)

| บทความ | `faqs` JSON-LD (เดิม) | ช่องโหว่ Internal Links & CTR | แผนแก้ Wave 1 |
| --- | --- | --- | --- |
| `esim-japan` | ✅ มี (3 ข้อ) | ขาดลิงก์ไป `where-to-buy-esim`, `esim-dual-sim-otp` | อัปเกรด meta description + เพิ่มลิงก์ `where-to-buy-esim` และ `esim-dual-sim-otp` |
| `esim-japan-vs-sim-card` | ✅ มี (2 ข้อ) | ขาดลิงก์ไป `how-to-use-airalo`, `where-to-buy-esim`, `esim-dual-sim-otp` | เพิ่มลิงก์ตั้งค่า + OTP + 1 FAQ เรื่อง Vacay/PromptPay |
| `esim-korea` | ✅ มี (3 ข้อ) | ขาดลิงก์ไป `esim-dual-sim-otp`, `esim-japan` | เพิ่มลิงก์ `esim-dual-sim-otp` และปรับ meta description ให้ชัดขึ้น |
| `esim-china` | ✅ มี (3 ข้อ) | ขาดลิงก์ไป `esim-hong-kong`, `esim-china-hong-kong-macau`, `esim-dual-sim-otp` | เพิ่มลิงก์เชื่อม `esim-china-hong-kong-macau` + `esim-hong-kong` + `esim-dual-sim-otp` |
| `esim-hong-kong` | ❌ **ไม่มี** | มีหัวข้อ FAQ ในเนื้อหาแต่ไม่ใส่ frontmatter `faqs:` + ขาดลิงก์ไปจีน+ฮ่องกง+มาเก๊า | **เพิ่ม `faqs:` (3 ข้อ)** + ลิงก์ไป `esim-china-hong-kong-macau` + `esim-dual-sim-otp` + อัปเกรด description |
| `esim-taiwan` | ❌ **ไม่มี** | ไม่มี `faqs:` frontmatter + ขาดลิงก์ `esim-asia`, `esim-dual-sim-otp` | **เพิ่ม `faqs:` (3 ข้อ)** + เพิ่ม cross-links + อัปเกรด description |
| `esim-vietnam` | ❌ **ไม่มี** | ไม่มี `faqs:` frontmatter + ขาดลิงก์ `esim-asia`, `esim-dual-sim-otp` | **เพิ่ม `faqs:` (3 ข้อ)** + เพิ่ม cross-links + อัปเกรด description |
| `esim-singapore` | ❌ **ไม่มี** | ไม่มี `faqs:` frontmatter + ขาดลิงก์ `esim-dual-sim-otp` | **เพิ่ม `faqs:` (3 ข้อ)** + เพิ่ม cross-links + อัปเกรด description |
| `esim-asia` | ✅ มี (2 ข้อ) | ขาดลิงก์ไป `esim-china-hong-kong-macau`, `esim-dual-sim-otp`, `how-to-use-airalo` | เพิ่มลิงก์ไปคู่มือจีน+ฮ่องกง+มาเก๊า, OTP และวิธีติดตั้ง + เสริม FAQ |
| `what-is-esim` | ✅ มี (3 ข้อ) | ลิงก์ปลายทางมีแค่ 3 ประเทศ (ขาดจีน/ไต้หวัน/เวียดนาม/สิงคโปร์/ฮ่องกง/เอเชีย/OTP) | ขยาย Internal Link Hub ครบทุกประเทศ + ลิงก์ไป `how-to-use-airalo` และ `esim-dual-sim-otp` |
| `how-to-use-airalo` | ❌ **ไม่มี** | ไม่มี FAQ ในเนื้อหาและ frontmatter + ขาดลิงก์ไปจีน/ฮ่องกง/สิงคโปร์/เอเชีย/OTP | **เพิ่มส่วน FAQ + `faqs:` (4 ข้อ)** + ลิงก์เชื่อม `esim-dual-sim-otp`, `esim-china`, `esim-asia`, `where-to-buy-esim` |
| `where-to-buy-esim` | ❌ **ไม่มี** | ไม่มี FAQ ในเนื้อหาและ frontmatter + ขาดลิงก์ `what-is-esim`, `esim-dual-sim-otp` + ยังไม่ได้กล่าวถึงทางเลือกจ่าย PromptPay (Vacay) | **เพิ่มส่วน FAQ + `faqs:` (4 ข้อ)** + เพิ่มหมายเหตุทางเลือก PromptPay (Vacay) + ลิงก์ `what-is-esim` และ `esim-dual-sim-otp` |

### ข้อเสนอ Technical SEO สำหรับประสานงาน `simpainai-web`
1. **Related Posts Cap (`BlogPost.astro`):** ✅ **เสร็จแล้ว (`2857be4`)** — จำกัดแสดงสูงสุด 6 บทความที่แท็กตรงกันและล่าสุด
2. **Schema `dateModified`:** ✅ **เสร็จแล้ว (`2857be4`)** — เพิ่ม `updatedDate` ใน `src/content.config.ts`, `Article` JSON-LD และ `sitemap.xml` `<lastmod>`
3. **Vacay Destination Deep Links (`src/lib/affiliate.ts`):** แมปประเทศหลักและ `esim-china-hong-kong-macau` แล้ว · ขอเพิ่ม `'esim-japan-how-many-gb': 'e-sim/asia/japan'` ในรอบ deploy Wave 2

---

## 2. โครงสร้าง Topic Cluster & Internal Link Hubs

```
[หน้าแรก / TripRecommender]
 ├── Hub A: ตัดสินใจ & เปรียบเทียบ (Commercial)
 │    ├── /blog/where-to-buy-esim/
 │    ├── /blog/esim-japan-vs-sim-card/
 │    └── [Wave 2] /blog/airalo-vs-vacay-vs-sim2fly/
 │
 ├── Hub B: เช็กเครื่อง & ตั้งค่าก่อนบิน (Pre-Flight / Troubleshooting)
 │    ├── /blog/what-is-esim/
 │    ├── /blog/how-to-use-airalo/
 │    ├── [Wave 1] /blog/esim-dual-sim-otp/
 │    ├── [Wave 2] /blog/esim-when-to-buy-day-count/
 │    └── [Wave 4] /blog/esim-supported-phones-eid/
 │
 ├── Hub C: เอเชียตะวันออก & ทริปข้ามแดน (Core Volume)
 │    ├── /blog/esim-japan/ ──▶ [Wave 2] /blog/esim-japan-how-many-gb/
 │    ├── /blog/esim-china/ + /blog/esim-hong-kong/ + /blog/esim-asia/
 │    │    └── [Wave 1] /blog/esim-china-hong-kong-macau/
 │    ├── /blog/esim-korea/ ──▶ [Wave 4] /blog/esim-korea-phone-number-010/
 │    └── /blog/esim-taiwan/
 │
 ├── Hub D: อาเซียน (Short-Haul)
 │    ├── /blog/esim-vietnam/
 │    └── /blog/esim-singapore/
 │
 └── Hub E: เส้นทางไกล High-AOV (ยุโรป / อังกฤษ / ออสเตรเลีย)
      ├── [Wave 3] /blog/esim-europe/
      ├── [Wave 3] /blog/esim-australia/
      └── [Wave 3] /blog/esim-uk/
```

---

## 3. แผนบทความ SEO ใหม่ 10 บทความถัดไป (จัดลำดับตาม Intent + หลักฐานตลาด)

| ลำดับ | Slug | หัวข้อเป้าหมาย (Draft Title) | คีย์เวิร์ดหลัก / รอง | Search Intent | Internal Link Hub | สถานะ & ลำดับความสำคัญ |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | `esim-china-hong-kong-macau` | eSIM จีน ฮ่องกง มาเก๊า 2569: ใช้ใบเดียวข้ามเซินเจิ้น-กวางโจว ไม่ต้อง VPN | `eSIM จีน ฮ่องกง มาเก๊า`, `ซิมจีน ฮ่องกง`, `eSIM เซินเจิ้น ฮ่องกง`, `ซิมกวางโจว ฮ่องกง` | Commercial / Multi-country comparison | เชื่อม `esim-china`, `esim-hong-kong`, `esim-asia`, `esim-dual-sim-otp` | **P0 — Wave 1 (เผยแพร่ 27 พ.ย. 2569)** · รองรับดีมานด์ Klook HK+CN 29.7%, Pantip `44292624`, และแอด Meta จีน |
| **2** | `esim-dual-sim-otp` | ตั้งค่า eSIM คู่ซิมไทย รับ OTP ธนาคาร ไม่โดนค่าโรมมิ่ง (iPhone & Android 2569) | `ใช้ eSIM รับ OTP ธนาคาร`, `ตั้งค่า eSIM ไม่ให้เสียค่าโรมมิ่ง`, `เปิด Wi-Fi Calling รับ OTP ต่างประเทศ`, `eSIM คู่ซิมไทย` | Pre-purchase anxiety / Setup | เชื่อมจากทุกหน้าประเทศ + `how-to-use-airalo`, `what-is-esim`, `where-to-buy-esim` | **P0 — Wave 1 (เผยแพร่ 27 พ.ย. 2569)** · รองรับ Angle E TikTok (28 พ.ย.) + Pantip `44286745` / `44121932` |
| **3** | `esim-japan-how-many-gb` | ไปญี่ปุ่น 5–7 วัน ใช้เน็ต eSIM กี่ GB พอ? เทียบ 3GB vs 5GB vs 10GB vs Unlimited | `ไปญี่ปุ่น 7 วัน ใช้เน็ตกี่ GB`, `eSIM ญี่ปุ่น กี่ GB พอ`, `ซิมญี่ปุ่น 5 วัน กี่ GB` | Commercial sizing | เชื่อม `esim-japan`, `esim-japan-vs-sim-card`, `esim-when-to-buy-day-count`, `where-to-buy-esim` | **P0 — Wave 2 (เผยแพร่ 28 พ.ย. 2569)** · ตลาดใหญ่สุดของคนไทย (Klook 37.5%, JNTO ต.ค. 133,400 คน) + รองรับแอดญี่ปุ่น Tranche 1 |
| **4** | `airalo-vs-vacay-vs-sim2fly` | Airalo vs Vacay vs SIM2Fly vs True GO 2569: เทียบ 4 ค่ายดัง จ่าย PromptPay / บัตรเครดิต อันไหนคุ้ม | `Airalo vs SIM2Fly`, `Vacay eSIM รีวิว`, `eSIM จ่าย PromptPay`, `Airalo vs True GO` | Brand comparison (BoFu) | เชื่อม `where-to-buy-esim`, `esim-japan-vs-sim-card`, ทุกหน้าประเทศ | **P0 — Wave 2B (ถัดไป)** · จับคีย์เวิร์ดเปรียบเทียบตรง + รองรับคนไทยที่ไม่มีบัตรเครดิต (PromptPay → Vacay) |
| **5** | `esim-when-to-buy-day-count` | ซื้อ eSIM ล่วงหน้าได้กี่วัน? เช็กกติกานับวันใช้งานก่อนบิน (Airalo vs Vacay vs ซิมไทย) | `ซื้อ eSIM ล่วงหน้าได้กี่วัน`, `eSIM นับวันยังไง`, `ติดตั้ง eSIM ก่อนบินวันเดินไหม` | Pre-purchase rule check | เชื่อม `how-to-use-airalo`, `what-is-esim`, `esim-dual-sim-otp`, `where-to-buy-esim`, `esim-japan-how-many-gb` | **P1 — Wave 2 (เผยแพร่ 28 พ.ย. 2569)** · รองรับคารูเซล `angle-g-when-to-buy-esim` คิว 1 ธ.ค. 2569 และคำถามซ้ำบน TikTok |
| **6** | `esim-europe` | eSIM ยุโรป 2569: เที่ยวหลายประเทศเชงเก้น (อิตาลี สวิส ฝรั่งเศส เยอรมัน) แพ็กไหนคุ้มสุด | `eSIM ยุโรป`, `ซิมยุโรป หลายประเทศ`, `Airalo Eurolink รีวิว` | Commercial (High-AOV) | เชื่อม `where-to-buy-esim`, `esim-uk`, `esim-dual-sim-otp` | **P1 — Wave 3** · ทริป 10–15 วัน ยอดสั่งซื้อต่อออเดอร์สูง *(ต้องสร้าง Airalo Europe Impact deep link เพิ่มใน `docs/affiliate-links.md`)* |
| **7** | `esim-australia` | eSIM ออสเตรเลีย 2569: ซิดนีย์ เมลเบิร์น เปรียบเทียบราคา Airalo / Vacay / SIM2Fly | `eSIM ออสเตรเลีย`, `ซิมออสเตรเลีย 2569`, `eSIM ซิดนีย์ เมลเบิร์น` | Commercial (High-AOV) | เชื่อม `where-to-buy-esim`, `esim-asia`, `esim-dual-sim-otp` | **P1 — Wave 3** · กลุ่มเที่ยว + นักเรียนไทยสูง *(ต้องสร้าง Airalo Australia Impact deep link เพิ่ม)* |
| **8** | `esim-uk` | eSIM อังกฤษ (UK) 2569: ลอนดอน + ข้ามเที่ยวยุโรป ต้องซื้อแพ็กไหนไม่ให้เน็ตตัด | `eSIM อังกฤษ`, `eSIM ลอนดอน`, `ซิมอังกฤษ ยุโรป` | Commercial (High-AOV) | เชื่อม `esim-europe`, `where-to-buy-esim`, `esim-dual-sim-otp` | **P1 — Wave 3** · แก้จุดเจ็บ post-Brexit roaming *(ต้องสร้าง Airalo UK Impact deep link เพิ่ม)* |
| **9** | `esim-supported-phones-eid` | เช็กมือถือรองรับ eSIM 2569: iPhone / Samsung / Xiaomi รุ่นไหนใช้ได้ + วิธีดูเลข EID | `มือถือรุ่นไหนรองรับ eSIM`, `เช็ก eSIM *#06#`, `iPhone เครื่องฮ่องกงใช้ eSIM ได้ไหม` | Informational → Pre-buy | เชื่อม `what-is-esim`, `how-to-use-airalo`, `esim-hong-kong`, `esim-china` | **P2 — Wave 4** · ดักคำค้นอันดับต้น ๆ ของมือใหม่ก่อนซื้อ |
| **10** | `esim-korea-phone-number-010` | ไปเกาหลีต้องซื้อซิมที่มีเบอร์ 010 ไหม? เทียบ eSIM เน็ตล้วน vs ซิมมีเบอร์ + CatchTable | `ซิมเกาหลี เบอร์ 010`, `eSIM เกาหลี จองคิวร้านอาหาร`, `CatchTable ใช้เบอร์ไทยได้ไหม` | Commercial problem-solving | เชื่อม `esim-korea`, `esim-dual-sim-otp`, `where-to-buy-esim` | **P2 — Wave 4** · ตอบโจทย์ตรงจาก Pantip `44225008` และนักเดินทางไทยสายคาเฟ่ |

---

## 4. มาตรฐานคุณภาพบทความและกฎความปลอดภัย (Editorial Checklist)

ทุกบทความใหม่และบทความที่อัปเดตต้องผ่านเช็กลิสต์นี้ก่อน commit:
1. **ราคาและข้อมูลต้องตรวจสอบจริง + ระบุวันที่เช็ก** (เช่น `เช็กเมื่อ 27 พ.ย. 2026`) ห้ามเดาราคา โค้ดส่วนลด หรือสเปกเครือข่าย
2. **มีตารางเปรียบเทียบที่สแกนอ่านง่าย** และพูดข้อดี-ข้อเสียตรงไปตรงมา (รวมถึงบอกว่าเคสไหนซิมไทย SIM2Fly / True GO หรือ Vacay PromptPay คุ้มกว่า)
3. **มี `faqs:` ใน frontmatter อย่างน้อย 3 ข้อ** ที่ตรงกับคำถามจริงของคนไทย เพื่อให้ `BlogPost.astro` สร้าง `FAQPage` JSON-LD ได้สมบูรณ์
4. **มี Internal Links อย่างน้อย 3–5 ลิงก์** เชื่อมกลับไปยังหน้าคลัสเตอร์ที่เกี่ยวข้อง (Hub + ประเทศข้างเคียง + คู่มือตั้งค่า/OTP)
5. **ลิงก์ Affiliate ถูกต้องตาม `docs/affiliate-links.md`** (`airalo.pxf.io/...` พร้อมโค้ด `NEWTOAIRALO15` และ Vacay `?thref=PSXT8BB3` / `THAF-TIWE` ที่เรนเดอร์อัตโนมัติใน `QuickPick` & `TicketCta`) — **ห้ามเปิด คลิก หรือ curl `airalo.pxf.io`**
6. **รัน `npm run build` ผ่าน 0 errors** และตรวจ `dist/sitemap.xml` + `FAQPage` JSON-LD ในไฟล์ HTML ที่ build แล้วก่อน push
