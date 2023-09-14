export async function onRequest(): Promise<Response> {
  return new Response(
    `Welcome to the Bitcoin Faces API! Supported endpoints below:
 - /api/get-hash-array: returns the hash array for a given name, used to select the layers
 - /api/get-image: returns the svg image for a given name
 - /api/get-layers: returns the selected layers for a given name
 - /api/get-layers-code: returns the svg code for each layer of a given name
 - /api/get-svg-code: returns the full svg code for a given name`
  );
}
