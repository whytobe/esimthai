/** Append Impact subId tracking parameters so conversions are attributed by article and CTA slot. */
export function withSubId(url: string, subId1: string, subId2?: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set('subId1', subId1);
  if (subId2) {
    parsed.searchParams.set('subId2', subId2);
  }
  return parsed.toString();
}
