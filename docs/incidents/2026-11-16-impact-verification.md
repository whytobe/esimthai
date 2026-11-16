# Impact website verification failure

- Report: Impact onboarding returned a generic failure when adding `https://esim.whytobe.com/`.
- Confirmed implementation defect: the ownership tag matched the supplied value but was not the first meta tag in the head. Impact's instructions require the first position. The initial verification checked the value and head placement only, missing this requirement.
- Fix: move the existing ownership tag before all other meta tags. The production build passes; both generated pages have the expected tag as their first meta tag.
- Additional evidence: on 2026-11-16, curl's default user agent and a descriptive test user agent received HTTP 200 with the tag; `Python-urllib/3.14` received HTTP 403, Cloudflare error 1010, on both the custom domain and the Pages hostname. This does not establish the user agent or response received by Impact.
- Cloudflare documents that Pages-managed Browser Integrity Check cannot be disabled with zone settings. No security settings were changed.
- Remaining verification: retry the authenticated Impact onboarding submission. The generic error alone does not establish its underlying cause.
- Prevention: check verifier-specific instructions before deployment, validate tag ordering as well as the value in the served HTML, and distinguish a successful fetch from acceptance by the third-party verifier.

References:

- https://help.impact.com/partner/what-would-you-like-to-learn-about/account-management/account-settings/connect-media-properties/connect-and-verify-a-website
- https://developers.cloudflare.com/pages/platform/known-issues/#browser-integrity-check-on-pages
