// Cloudflare Pages Function: シンプルなアクセスカウンター（KV: COUNTER）
// GET /api/hit?p=<page>[&hit=1]
//   hit=1 のとき +1 して保存、現在値を返す。KV未バインド時は count:null。
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  let key = (url.searchParams.get('p') || 'site').slice(0, 64).replace(/[^a-zA-Z0-9_/.-]/g, '');
  if (!key) key = 'site';
  const headers = {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'cache-control': 'no-store',
  };
  if (!env.COUNTER) {
    return new Response(JSON.stringify({ count: null, note: 'KV未バインド' }), { headers });
  }
  let n = parseInt((await env.COUNTER.get(key)) || '0', 10) || 0;
  if (url.searchParams.get('hit') === '1') {
    n += 1;
    await env.COUNTER.put(key, String(n));
  }
  return new Response(JSON.stringify({ count: n }), { headers });
}
