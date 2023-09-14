import { EventContext } from "@cloudflare/workers-types";
import { createHashArray, validateName } from "../../../src/store/common";

export async function onRequest(
  context: EventContext<any, any, any>
): Promise<Response> {
  try {
    // get and decode the path parameter
    const encodedName = String(context.params.name);
    const name = decodeURIComponent(encodedName).toLowerCase();
    // validate the input against SNS spec
    if (!validateName(name)) {
      return new Response("Invalid input per SNS spec", { status: 400 });
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
