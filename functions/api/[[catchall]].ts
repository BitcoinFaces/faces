export async function onRequest(): Promise<Response> {
  return new Response(
    `Welcome to the Bitcoin Faces API! Supported endpoints below:
 - /api/get-svg-code?name=yourname.sats
 - /api/get-image?name=yourname.sats
 - /api/get-hash-array?name=yourname.sats
 - /api/get-layers?name=yourname.sats`
  );
}
