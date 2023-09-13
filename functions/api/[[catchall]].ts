export async function onRequest({ request }): Promise<Response> {
  return new Response(
    `Welcome to the Bitcoin Faces API! Provide a string to the path to generate a Bitcoin Face SVG. e.g. /api/yourname.sats`
  );
}
