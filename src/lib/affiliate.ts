export const VACAY_REF_PARAM = 'thref=PSXT8BB3';
export const VACAY_REF_URL = `https://esim.vacay.asia/th/th/?${VACAY_REF_PARAM}`;
export const VACAY_CODE = 'THAF-TIWE';

const VACAY_COUNTRY_PATHS: Record<string, string> = {
  china: 'e-sim/asia/china',
  'esim-china': 'e-sim/asia/china',
  japan: 'e-sim/asia/japan',
  'esim-japan': 'e-sim/asia/japan',
  'esim-japan-vs-sim-card': 'e-sim/asia/japan',
  korea: 'e-sim/asia/south-korea',
  'esim-korea': 'e-sim/asia/south-korea',
  taiwan: 'e-sim/asia/taiwan',
  'esim-taiwan': 'e-sim/asia/taiwan',
  vietnam: 'e-sim/asia/vietnam',
  'esim-vietnam': 'e-sim/asia/vietnam',
  singapore: 'e-sim/asia/singapore',
  'esim-singapore': 'e-sim/asia/singapore',
  'hong-kong': 'e-sim/asia/hong-kong',
  'esim-hong-kong': 'e-sim/asia/hong-kong',
  asia: 'e-sim/asia/multiple-countries-asia',
  'esim-asia': 'e-sim/asia/multiple-countries-asia',
  'china-hk-macau': 'e-sim/asia/china-hong-kong-macau',
  'esim-china-hong-kong-macau': 'e-sim/asia/china-hong-kong-macau',
};

/** Return the Thai-language Vacay country page URL with affiliate ref parameter. */
export function vacayUrlFor(slugOrCountry?: string): string {
  const path = slugOrCountry ? VACAY_COUNTRY_PATHS[slugOrCountry] : undefined;
  return path
    ? `https://esim.vacay.asia/th/th/${path}?${VACAY_REF_PARAM}`
    : VACAY_REF_URL;
}

/** Format an approximate discounted THB price (e.g. "฿507" -> "~฿431") for 15% new-user promo. */
export function discountedThbPrice(priceText: string, percentOff = 15): string | undefined {
  const match = priceText.replace(/,/g, '').match(/฿\s*(\d+(?:\.\d+)?)/);
  if (!match) return undefined;
  const numeric = Number.parseFloat(match[1]);
  if (!Number.isFinite(numeric) || numeric <= 0) return undefined;
  const discounted = Math.round(numeric * (1 - percentOff / 100));
  return `~฿${discounted.toLocaleString('en-US')}`;
}

/** Append Impact subId tracking parameters so conversions are attributed by article and CTA slot. */
export function withSubId(url: string, subId1: string, subId2?: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set('subId1', subId1);
  if (subId2) {
    parsed.searchParams.set('subId2', subId2);
  }
  return parsed.toString();
}
