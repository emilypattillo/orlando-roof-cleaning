const FORBIDDEN_PATHS = [
  /^\/\.git(?:\/|$)/i,
  /^\/\.wrangler(?:\/|$)/i,
  /^\/artifacts(?:\/|$)/i,
  /^\/command(?:\/|$)/i,
  /^\/README\.md$/i,
  /^\/site-spec\.json$/i,
];

// Retired pages (SOP: no pre-call homework pages) -> permanent redirect to /contact.
// Implemented here because advanced-mode workers bypass the _redirects file.
const RETIRED_REDIRECTS = new Map([
  ['/homeowner-checklist', '/contact'],
  ['/homeowner-checklist.html', '/contact'],
]);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (FORBIDDEN_PATHS.some((pattern) => pattern.test(url.pathname))) {
      return new Response('Not found', {
        status: 404,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'x-robots-tag': 'noindex, nofollow',
          'cache-control': 'no-store',
        },
      });
    }

    const redirectTarget = RETIRED_REDIRECTS.get(url.pathname);
    if (redirectTarget) {
      return Response.redirect(`${url.origin}${redirectTarget}`, 301);
    }

    return env.ASSETS.fetch(request);
  },
};
