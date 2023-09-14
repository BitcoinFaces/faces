/////////////////////////
// CONSTANTS
/////////////////////////

// TBD

/////////////////////////
// TYPES
/////////////////////////

// TBD

/////////////////////////
// LOCAL STORAGE ATOMS
/////////////////////////

// TBD

/////////////////////////
// HELPER FUNCTIONS
/////////////////////////

// delay by a given number of milliseconds
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// create a hash array from a given input string
export async function createHashArray(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray;
}

// validate a given input string against the SNS spec
// https://docs.satsnames.org/sats-names/sns-spec/mint-names#registration-limitations
// regex ensures that: no spaces, only one period, no leading or trailing periods
export function validateName(name: string) {
  return !/^[^\s.]*\.?[^\s.]*$/.test(name) ? true : false;
}
