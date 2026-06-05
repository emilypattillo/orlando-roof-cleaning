const FORBIDDEN_PATHS = [
  /^\/\.git(?:\/|$)/i,
  /^\/\.wrangler(?:\/|$)/i,
  /^\/artifacts(?:\/|$)/i,
  /^\/command(?:\/|$)/i,
  /^\/README\.md$/i,
  /^\/site-spec\.json$/i,
];

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

    return env.ASSETS.fetch(request);
  },
};
