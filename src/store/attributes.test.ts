import {
  EyeAttributes,
  INSCRIBED_ATTRIBUTES,
  LOCAL_ATTRIBUTES,
  Layers,
} from "./attributes";
import { delay } from "./common";

describe("LOCAL_ATTRIBUTES matches INSCRIBED_ATTRIBUTES", () => {
  it("keys are in the same order", () => {
    const inscribedKeys = Object.keys(INSCRIBED_ATTRIBUTES);
    const localKeys = Object.keys(LOCAL_ATTRIBUTES);
    expect(inscribedKeys).toEqual(localKeys);
  });
});

describe("Local attributes match on-chain attributes", () => {
  function testLayer(layer: string, inscribedArray: any) {
    if (Array.isArray(inscribedArray)) {
      for (let i = 0; i < inscribedArray.length; i++) {
        const layerId = `${layer}-${i + 1}`;
        it(layerId, async () => {
          const hash = inscribedArray[i];
          if (hash !== undefined) {
            const response = await fetch(
              `https://inscribe.news/api/content/${hash}`
            );
            if (!response.ok) {
              // back off and try again
              await delay(2000);
              return await fetch(`https://inscribe.news/api/content/${hash}`);
            }
            const data = await response.text();
            const cleanedSVG = data
              .replace(/>\s+/g, ">")
              .replace(/\s+</g, "<")
              .replace(/\s+/g, " ")
              .trim();

            const [layerName, eyeType] = layer.split(".") as [
              Layers,
              keyof EyeAttributes
            ];

            const attributeLayer =
              layerName === "eyes"
                ? LOCAL_ATTRIBUTES[layerName][eyeType]
                : LOCAL_ATTRIBUTES[layerName];

            if (Array.isArray(attributeLayer)) {
              expect(cleanedSVG).toEqual(attributeLayer[i]);
            } else if (attributeLayer && eyeType) {
              expect(cleanedSVG).toEqual(attributeLayer[eyeType][i]);
            }
          }
          await delay(500);
        });
      }
    } else {
      for (const [key, subArray] of Object.entries(inscribedArray)) {
        testLayer(`${layer}.${key}`, subArray);
      }
    }
  }

  for (const [key, inscribedArray] of Object.entries(INSCRIBED_ATTRIBUTES)) {
    testLayer(key, inscribedArray);
  }
});
