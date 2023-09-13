import { EventContext } from "@cloudflare/workers-types";

export async function onRequest(
  context: EventContext<any, any, any>
): Promise<Response> {
  try {
    // Get path parameter
    const name = decodeURIComponent(String(context.params.name));
    // Return the path parameter as a string
    return new Response(name);
  } catch (err) {
    // Return error
    return new Response(String(err), { status: 404 });
  }
}
