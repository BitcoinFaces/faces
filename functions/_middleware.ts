import { PagesFunction } from "@cloudflare/workers-types";

// Set CORS to all /api responses
export const onRequest: PagesFunction = async ({ next }) => {
  const response = await next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Max-Age", "86400");
  response.headers.set("Bitcoin-Faces", "1.0.0");
  return response;
};
