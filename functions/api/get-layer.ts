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
    const layerName = searchParams.get("layerName")?.toLowerCase();
    const onchain = searchParams.get("onchain") === "true";
    const host = searchParams.get("host")
      ? searchParams.get("host")!
      : undefined;
    // validate name is provided
    if (!name) {
      return new Response("Missing name parameter", { status: 400 });
    }
    const normalizedName = decodeURIComponent(name).toLowerCase().trim();
    // validate layerName is provided
    if (!layerName) {
      return new Response("Missing layerName parameter", { status: 400 });
    }
    // create a hash array from the input string
    const hashArray = await createHashArray(normalizedName);
    // determine layer selections
    const selectedLayers = selectLayersFromHash(hashArray, onchain);
    // create svg layers from selected layers
    const svgLayers = getLayersFromSelection(selectedLayers, onchain, host);
    // get selected layer
    if (!svgLayers[layerName]) {
      return new Response(`Layer not found: ${layerName}`, { status: 404 });
    }
    // return selected layer
    return new Response(svgLayers[layerName], {
      status: 200,
    });
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
