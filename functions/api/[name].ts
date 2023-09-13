import { EventContext } from "@cloudflare/workers-types";

// function to create a hash array from a given input string
async function createHashArray(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray;
}

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

    // return the path parameter as a string
    return new Response(
      JSON.stringify({
        name,
        hashArray,
      })
    );
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
