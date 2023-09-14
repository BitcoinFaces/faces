import { EventContext } from "@cloudflare/workers-types";
import { createHashArray, validateName } from "../../../src/store/common";
import {
  createLayers,
  createSvgFile,
  selectLayers,
} from "../../../src/store/faces";

export async function onRequest(
  context: EventContext<any, any, any>
): Promise<Response> {
  // flag for using cached SVG code
  let useCache = false;

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
    // determine layer selections
    const selectedLayers = selectLayers(hashArray);
    // check for query parameter
    const url = new URL(context.request.url);
    if (url.searchParams.get("cached") === "true") {
      useCache = true;
    }
    // create svg layers from selected layers
    const svgLayers = createLayers(selectedLayers, useCache);
    // create svg file from svg layers
    const svgFile = createSvgFile(svgLayers);
    // return svg code as string
    return new Response(svgFile, { status: 200 });
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
