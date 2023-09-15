import { INSCRIBED_ATTRIBUTES, LOCAL_ATTRIBUTES, Layer } from "./faces";

describe("Attributes Match Test", () => {
  for (const [key, inscribedArray] of Object.entries(INSCRIBED_ATTRIBUTES)) {
    const layer = key as Layer;
    for (let i = 0; i < inscribedArray.length; i++) {
      it(`should match ${layer}-${i + 1}`, async () => {
        const hash = inscribedArray[i];
        if (hash !== undefined) {
          const response = await fetch(
            `https://inscribe.news/api/content/${hash}`
          );
          const data = await response.text();
          const cleanedSVG = data
            .replace(/>\s+/g, ">") // spaces following '>'
            .replace(/\s+</g, "<") // spaces preceding '<'
            .replace(/\s+/g, " ") // multiple spaces to single space
            .replace(/"\s+\n/g, '"') // spaces and newlines following '"'
            .replace(/\n/g, " ") // all newlines to space
            .trim(); // leading and trailing whitespace
          //console.log("returned SVG", data);
          //console.log("cleaned SVG", cleanedSVG);
          //console.log("local SVG", LOCAL_ATTRIBUTES[layer][i]);
          expect(cleanedSVG).toEqual(LOCAL_ATTRIBUTES[layer][i]);
        }
      });
    }
  }
});
