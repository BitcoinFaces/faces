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
    // return details
    return new Response(
      JSON.stringify({
        name,
        hashArray,
        selectedLayers,
      })
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
