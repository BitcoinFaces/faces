import { EventContext } from "@cloudflare/workers-types";
import { cvToValue, hexToCV } from "@stacks/transactions";
import { createHashArray } from "../../src/store/common";
import {
  listLayersFromHash,
  selectLayersFromHash,
} from "../../src/store/faces";

export async function onRequest(
  context: EventContext<any, any, any>
): Promise<Response> {
  try {
    const { searchParams } = new URL(context.request.url);
    const name = searchParams.get("name");
    const hashedName = searchParams.get("hashedName");
    const onchain = searchParams.get("onchain") === "true";
    // validate name is provided
    if (!name && !hashedName) {
      return new Response("Missing name  or hashedName parameter", {
        status: 400,
      });
    } else if (name && hashedName) {
      return new Response("Only provide name or hashedName parameter", {
        status: 400,
      });
    }
    // compute normalized name from either case
    // where name has to exist in 2nd case
    const normalizedName = hashedName
      ? cvToValue(hexToCV(hashedName), true).toLowerCase().trim()
      : decodeURIComponent(name!).toLowerCase().trim();

    // create a hash array from the input string
    const hashArray = await createHashArray(normalizedName);

    // determine layer selections
    const listedLayers = listLayersFromHash(hashArray, onchain);
    // const selectedLayers = selectLayersFromHash(hashArray, onchain);

    // create attributes array from selected layers
    const attributes = Object.entries(listedLayers)
      .filter(([, value]) => value !== undefined) // filter out undefined values
      .map(([key, value]) => ({
        trait_type: key,
        value: value as string,
      }));

    const metadata = {
      sip: 16,
      name: normalizedName,
      description:
        "Every name has a face! Get yours at https://bitcoinfaces.xyz",
      image: `https://bitcoinfaces.xyz/api/get-image?name=${encodeURIComponent(
        normalizedName
      )}`,
      attributes: attributes,
      properties: {
        category: "image",
        collection: "Bitcoin Faces",
        collection_image: `https://bitcoinfaces.xyz/api/get-image?name=${encodeURIComponent(
          normalizedName
        )}`,
      },
    };

    // return metadata as json
    return new Response(JSON.stringify(metadata), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
