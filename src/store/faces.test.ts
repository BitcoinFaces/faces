import { INSCRIBED_ATTRIBUTES, LOCAL_ATTRIBUTES, Layer } from "./faces";

describe("Local attributes match on-chain attributes", () => {
  for (const [key, inscribedArray] of Object.entries(INSCRIBED_ATTRIBUTES)) {
    const layer = key as Layer;
    for (let i = 0; i < inscribedArray.length; i++) {
      let layerId = "";
      if (key === "head" && i > 6) {
        // head-8 intentionally missing, too many embedded images
        layerId = `${layer}-${i + 2}`;
      } else {
        layerId = `${layer}-${i + 1}`;
      }
      it(layerId, async () => {
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
          expect(cleanedSVG).toEqual(LOCAL_ATTRIBUTES[layer][i]);
        }
      });
    }
  }
});
