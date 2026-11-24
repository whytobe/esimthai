#!/usr/bin/env bash
set -euo pipefail

# Query Cloudflare Web Analytics (RUM) for esim.whytobe.com and run live site health checks.
# Uses personal-secrets so tokens never touch disk or stdout.

SITE_URL="https://esim.whytobe.com"
ACCOUNT_ID="658e36def0db06256556a4a3f7e4ef0f"
SITE_TAG="e0a17b2c4e814f0aab89e7fa469a95ad"

echo "=== 1. Live HTTP & SEO Endpoints ==="
python3 - <<'PY'
import urllib.error, urllib.request
import xml.etree.ElementTree as ET

def head_or_get(url):
    req = urllib.request.Request(url, headers={"Cache-Control": "no-cache", "User-Agent": "curl/8.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status, r.read().decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "ignore")

st_home, _ = head_or_get("https://esim.whytobe.com/")
st_robots, robots = head_or_get("https://esim.whytobe.com/robots.txt")
st_sm, sm = head_or_get("https://esim.whytobe.com/sitemap.xml")
st_404, _ = head_or_get("https://esim.whytobe.com/nonexistent-healthcheck/")

urls = []
if st_sm == 200:
    root = ET.fromstring(sm)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [el.text for el in root.findall("sm:url/sm:loc", ns)]

print(f"Home: HTTP {st_home}")
print(f"robots.txt: HTTP {st_robots} (has sitemap: {'sitemap.xml' in robots})")
print(f"sitemap.xml: HTTP {st_sm} ({len(urls)} URLs)")
print(f"404 check: HTTP {st_404}")
PY

echo ""
echo "=== 2. Cloudflare Web Analytics (Last 30 Days · esim.whytobe.com) ==="

personal-secrets run --passthrough --agent antigravity --secret WHYTOBE_CLOUDFLARE_API_TOKEN --timeout 30 -- /bin/bash -c '
python3 - <<'"'"'PY'"'"'
from datetime import datetime, timedelta, timezone
import json, os, urllib.request

account_id = "658e36def0db06256556a4a3f7e4ef0f"
site_tag = "e0a17b2c4e814f0aab89e7fa469a95ad"
start_iso = (datetime.now(timezone.utc) - timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%SZ")

query = """
{
  viewer {
    accounts(filter: {accountTag: "%s"}) {
      rumPageloadEventsAdaptiveGroups(
        limit: 50,
        filter: {
          datetime_geq: "%s",
          siteTag: "%s",
          requestHost: "esim.whytobe.com"
        },
        orderBy: [count_DESC]
      ) {
        count
        sum { visits }
        dimensions { requestPath }
      }
    }
  }
}
""" % (account_id, start_iso, site_tag)

req = urllib.request.Request(
    "https://api.cloudflare.com/client/v4/graphql",
    data=json.dumps({"query": query}).encode("utf-8"),
    headers={
        "Authorization": "Bearer " + os.environ["WHYTOBE_CLOUDFLARE_API_TOKEN"],
        "Content-Type": "application/json",
    },
    method="POST",
)
with urllib.request.urlopen(req, timeout=20) as r:
    data = json.loads(r.read().decode("utf-8"))

if data.get("errors"):
    print("GraphQL errors:", data["errors"])
    raise SystemExit(1)

groups = data["data"]["viewer"]["accounts"][0]["rumPageloadEventsAdaptiveGroups"]
if not groups:
    print("No RUM pageviews recorded yet for esim.whytobe.com (beacon just deployed or 0 organic visits so far).")
else:
    total_views = sum(g["count"] for g in groups)
    total_visits = sum((g.get("sum") or {}).get("visits", 0) for g in groups)
    print(f"Total Pageviews: {total_views} | Total Visits: {total_visits}")
    for g in groups:
        path = g["dimensions"]["requestPath"]
        views = g["count"]
        visits = (g.get("sum") or {}).get("visits", 0)
        print(f"  {path:35s} views={views} visits={visits}")
PY
'
