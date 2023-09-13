import { EventContext } from "@cloudflare/workers-types";

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
    // return the path parameter as a string
    return new Response(name);
  } catch (err) {
    // return error as string
    return new Response(String(err), { status: 404 });
  }
}
