import { EventContext } from "@cloudflare/workers-types";
import { createHashArray } from "../../../src/store/common";
import { selectLayers } from "../../../src/store/faces";

export async function onRequest(
  context: EventContext<any, any, any>
): Promise<Response> {
  try {
    // get and decode the path parameter
    const encodedName = String(context.params.name);
    const name = decodeURIComponent(encodedName).toLowerCase();
    // validate the input against SNS spec
    // https://docs.satsnames.org/sats-names/sns-spec/mint-names#registration-limitations
    // regex ensures that: no spaces, only one period, no leading or trailing periods
    if (!/^[^\s.]*\.?[^\s.]*$/.test(name)) {
      return new Response("Invalid input per SNS spec", { status: 400 });
    }
    // create a hash array from the input string
    const hashArray = await createHashArray(name);
    // determine layer selections
    const selectedLayers = selectLayers(hashArray);
    // return selected layers
    return new Response(JSON.stringify(selectedLayers), { status: 200 });
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
