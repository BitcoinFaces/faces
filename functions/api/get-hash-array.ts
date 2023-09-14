import { EventContext } from "@cloudflare/workers-types";
import { createHashArray } from "../../src/store/common";

export async function onRequest(
  context: EventContext<any, any, any>
): Promise<Response> {
  try {
    const { searchParams } = new URL(context.request.url);
    const name = searchParams.get("name")?.toLowerCase();
    // validate name is provided
    if (!name) {
      return new Response("Missing name parameter", { status: 400 });
    }
    // create a hash array from the input string
    const hashArray = await createHashArray(name);
    // return hash array
    return new Response(hashArray.join(","), { status: 200 });
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
