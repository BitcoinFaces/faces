import { EventContext } from "@cloudflare/workers-types";
import { createHashArray } from "../../src/store/common";
import {
  getLayersFromSelection,
  selectLayersFromHash,
} from "../../src/store/faces";

export async function onRequest(
  context: EventContext<any, any, any>
): Promise<Response> {
  try {
    const { searchParams } = new URL(context.request.url);
    const name = searchParams.get("name");
    const onchain = searchParams.get("onchain") === "true";
    const host = searchParams.get("host")
      ? searchParams.get("host")!
      : undefined;
    // validate name is provided
    if (!name) {
      return new Response("Missing name parameter", { status: 400 });
    }
    const normalizedName = decodeURIComponent(name).toLowerCase();
    // create a hash array from the input string
    const hashArray = await createHashArray(normalizedName);
    // determine layer selections
    const selectedLayers = selectLayersFromHash(hashArray, onchain);
    // create svg layers from selected layers
    const svgLayers = getLayersFromSelection(selectedLayers, onchain, host);
    // return selected layers
    return new Response(JSON.stringify(svgLayers, null, 2), {
      status: 200,
    });
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
