export async function onRequest(context) {
  const pathname = new URL(context.request.url).pathname;
  if (
    pathname === '/README.md' ||
    pathname === '/site-spec.json' ||
    pathname === '/.git' ||
    pathname.startsWith('/.git/')
  ) {
    return new Response('Not found', {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
        'x-robots-tag': 'noindex, nofollow, noarchive',
      },
    });
  }
  return context.next();
}
