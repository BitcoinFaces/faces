import { EventContext } from "@cloudflare/workers-types";
import { ATTRIBUTES, createHashArray } from "../../src/store/common";

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
    // create svg from layers
    const svgLayers = Object.entries(selectedLayers)
      .map(([key, hash]) => {
        return `<image id="${key}" xlink:href="https://inscribe.news/content/${hash}" x="0" y="0" width="500" height="500"></image>`;
      })
      .join("\n");

    const svg = `<svg id="BitcoinFace" width="500" height="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n${svgLayers}\n</svg>`;

    // check for query parameter
    if (context.request.url.includes("format=image")) {
      return new Response(svg, {
        headers: { "Content-Type": "image/svg+xml" },
      });
    }

    // return details as JSON
    return new Response(
      JSON.stringify(
        {
          name,
          hashArray,
          selectedLayers,
          svg,
        },
        null,
        1
      )
    );
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}

function selectLayers(hashArray: number[]) {
  const selectedLayers: { [key: string]: string | undefined } = {};
  let hashIndex = 0;

  for (const [key, value] of Object.entries(ATTRIBUTES)) {
    const index = hashArray[hashIndex % hashArray.length] % value.length;
    const chosenHash = value[index];
    selectedLayers[key] = chosenHash;
    hashIndex++;
  }

  return selectedLayers;
}
