export async function onRequest({ request }): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  return new Response(
    `Welcome to the Bitcoin Faces API! Provide a string to the path to generate a Bitcoin Face SVG.`
  );
}
