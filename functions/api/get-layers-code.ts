import { EventContext } from "@cloudflare/workers-types";
import { createHashArray } from "../../src/store/common";
import { getLayers, selectLayers } from "../../src/store/faces";

export async function onRequest(
  context: EventContext<any, any, any>
): Promise<Response> {
  try {
    const { searchParams } = new URL(context.request.url);
    const name = searchParams.get("name")?.toLowerCase();
    const onchain = searchParams.get("onchain") === "true";
    const host = searchParams.get("host")
      ? searchParams.get("host")!
      : undefined;
    // validate name is provided
    if (!name) {
      return new Response("Missing name parameter", { status: 400 });
    }
    // create a hash array from the input string
    const hashArray = await createHashArray(name);
    // determine layer selections
    const selectedLayers = selectLayers(hashArray, onchain);
    // create svg layers from selected layers
    const svgLayers = getLayers(selectedLayers, onchain, host);
    // return selected layers
    return new Response(JSON.stringify(svgLayers, null, 2), {
      status: 200,
    });
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
