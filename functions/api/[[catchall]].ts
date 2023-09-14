export async function onRequest({ request }): Promise<Response> {
  return new Response(
    `Welcome to the Bitcoin Faces API! Supported endpoints below:
    - /api/get-svg-code/yourname.sats
    - /api/get-image/yourname.sats
    - /api/get-hash-array/yourname.sats
    - /api/get-layers/yourname.sats`
  );
}
