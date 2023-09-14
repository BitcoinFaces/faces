import { EventContext } from "@cloudflare/workers-types";
import { createHashArray, validateName } from "../../src/store/common";
import {
  createLayers,
  createSvgFile,
  selectLayers,
} from "../../src/store/faces";

export async function onRequest(
  context: EventContext<any, any, any>
): Promise<Response> {
  try {
    const { searchParams } = new URL(context.request.url);
    const name = searchParams.get("name")?.toLowerCase();
    const cache = searchParams.get("cache") === "true";
    // validate name is provided
    if (!name) {
      return new Response("Missing name parameter", { status: 400 });
    }
    // validate the input against SNS spec
    if (!validateName(name)) {
      return new Response("Invalid input per SNS spec", { status: 400 });
    }
    // create a hash array from the input string
    const hashArray = await createHashArray(name);
    // determine layer selections
    const selectedLayers = selectLayers(hashArray);
    // create svg layers from selected layers
    const svgLayers = createLayers(selectedLayers, cache);
    // create svg file from svg layers
    const svgFile = createSvgFile(svgLayers);
    // return svg code as string
    return new Response(svgFile, { status: 200 });
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
