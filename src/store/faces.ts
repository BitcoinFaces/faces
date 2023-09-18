import BitcoinFace1 from "../components/faces/bitcoin-face-1";
import BitcoinFace2 from "../components/faces/bitcoin-face-2";
import BitcoinFace3 from "../components/faces/bitcoin-face-3";
import BitcoinFace4 from "../components/faces/bitcoin-face-4";
import BitcoinFace5 from "../components/faces/bitcoin-face-5";
import BitcoinFace6 from "../components/faces/bitcoin-face-6";
import BitcoinFace7 from "../components/faces/bitcoin-face-7";
import BitcoinFace8 from "../components/faces/bitcoin-face-8";
import BitcoinFace9 from "../components/faces/bitcoin-face-9";
import BitcoinFace10 from "../components/faces/bitcoin-face-10";
import BitcoinFace11 from "../components/faces/bitcoin-face-11";
import BitcoinFace12 from "../components/faces/bitcoin-face-12";
import BitcoinFace13 from "../components/faces/bitcoin-face-13";
import BitcoinFace14 from "../components/faces/bitcoin-face-14";
import BitcoinFace15 from "../components/faces/bitcoin-face-15";
import BitcoinFace16 from "../components/faces/bitcoin-face-16";
import BitcoinFace17 from "../components/faces/bitcoin-face-17";
import BitcoinFace18 from "../components/faces/bitcoin-face-18";
import BitcoinFace19 from "../components/faces/bitcoin-face-19";
import BitcoinFace20 from "../components/faces/bitcoin-face-20";
import BitcoinFace21 from "../components/faces/bitcoin-face-21";
import BitcoinFace22 from "../components/faces/bitcoin-face-22";
import BitcoinFace23 from "../components/faces/bitcoin-face-23";
import BitcoinFace24 from "../components/faces/bitcoin-face-24";
import BitcoinFace25 from "../components/faces/bitcoin-face-25";
import BitcoinFace26 from "../components/faces/bitcoin-face-26";
import BitcoinFace27 from "../components/faces/bitcoin-face-27";
import BitcoinFace28 from "../components/faces/bitcoin-face-28";
import BitcoinFace29 from "../components/faces/bitcoin-face-29";
import BitcoinFace30 from "../components/faces/bitcoin-face-30";
import { createHashArray, selectedNameAtom } from "./common";
import { atom } from "jotai";
import {
  CHANCE_CHAIN,
  CHANCE_EARRING,
  CHANCE_GLASSES,
  CHANCE_HAT,
  EyeAttributes,
  EyeTypes,
  INSCRIBED_ATTRIBUTES,
  LOCAL_ATTRIBUTES,
  LayerAttributes,
  Layers,
  OPTIONAL_LAYERS,
  OptionalLayers,
} from "./attributes";

/////////////////////////
// CONSTANTS
/////////////////////////

export const FACES_COMPONENTS = [
  BitcoinFace1,
  BitcoinFace2,
  BitcoinFace3,
  BitcoinFace4,
  BitcoinFace5,
  BitcoinFace6,
  BitcoinFace7,
  BitcoinFace8,
  BitcoinFace9,
  BitcoinFace10,
  BitcoinFace11,
  BitcoinFace12,
  BitcoinFace13,
  BitcoinFace14,
  BitcoinFace15,
  BitcoinFace16,
  BitcoinFace17,
  BitcoinFace18,
  BitcoinFace19,
  BitcoinFace20,
  BitcoinFace21,
  BitcoinFace22,
  BitcoinFace23,
  BitcoinFace24,
  BitcoinFace25,
  BitcoinFace26,
  BitcoinFace27,
  BitcoinFace28,
  BitcoinFace29,
  BitcoinFace30,
];

/////////////////////////
// TYPES
/////////////////////////

type LayerSelection = Record<Layers, string | undefined>;
type LayerCode = Record<Layers, string>;

export interface NameData {
  name: string;
  hashArray: number[];
  layersSelection: NameDataCode<LayerSelection>;
  layersSelectionList: string[];
  layersCode: NameDataCode<LayerCode>;
  svgCodeLayers: NameDataCode<string>;
  svgCode: NameDataCode<string>;
}

interface NameDataCode<T> {
  local: T;
  onchain: T;
}

export type BitcoinFaceLogoProps = {
  width: string;
  height: string;
};

/////////////////////////
// DERIVED ATOMS
/////////////////////////

// nameDataAtom
export const nameDataAtom = atom(async (get): Promise<NameData> => {
  const name = get(selectedNameAtom);
  if (!name) return undefined;
  const hashArray = await createHashArray(name);
  const layersSelection: NameDataCode<LayerSelection> = {
    local: selectLayersFromHash(hashArray, false),
    onchain: selectLayersFromHash(hashArray, true),
  };
  const layersSelectionList = listLayersFromHash(hashArray);
  const layersCode: NameDataCode<LayerCode> = {
    local: getLayersFromSelection(layersSelection.local, false),
    onchain: getLayersFromSelection(layersSelection.onchain, true),
  };
  const svgCodeLayers: NameDataCode<string> = {
    local: createLayersFromSelection(layersSelection.local, false),
    onchain: createLayersFromSelection(layersSelection.onchain, true),
  };
  const svgCode: NameDataCode<string> = {
    local: createSvgFileFromLayers(name, svgCodeLayers.local),
    onchain: createSvgFileFromLayers(name, svgCodeLayers.onchain),
  };
  return {
    name,
    hashArray,
    layersSelection,
    layersSelectionList,
    layersCode,
    svgCodeLayers,
    svgCode,
  };
});

/////////////////////////
// HELPER FUNCTIONS
/////////////////////////

// calculates the eye type
function calculateEyeType(hashArray: number[], hashIndex: number): EyeTypes {
  const eyeProb = hashArray[hashIndex % hashArray.length] % 100;
  if (eyeProb < 50) {
    return "normal";
  } else {
    const laserProb = (eyeProb - 50) % 50;
    if (laserProb < 20) {
      return "starburst";
    } else {
      return "laser";
    }
  }
}

// calculates layer index
function calculateLayerIndex(
  hashArray: number[],
  hashIndex: number,
  length: number
): number {
  return hashArray[hashIndex % hashArray.length] % length;
}

// handles optional layers
function handleOptionalLayer(
  key: string,
  value: any,
  hashArray: number[],
  hashIndex: number
): string | undefined {
  const randomValue = hashArray[hashIndex % hashArray.length] % 100;
  const chance = {
    chain: CHANCE_CHAIN,
    earring: CHANCE_EARRING,
    glasses: CHANCE_GLASSES,
    hat: CHANCE_HAT,
  }[key];

  if (chance && randomValue < chance) {
    const layerIndex = calculateLayerIndex(hashArray, hashIndex, value.length);
    return `${key}-${layerIndex + 1}`;
  }

  return undefined;
}

// takes hash array and returns code for selected layers
export function selectLayersFromHash(hashArray: number[], onchain = false) {
  const selectedLayers: Record<Layers, string | undefined> = {
    background: undefined,
    body: undefined,
    head: undefined,
    ears: undefined,
    eyes: undefined,
    nose: undefined,
    mouth: undefined,
    chain: undefined,
    earring: undefined,
    glasses: undefined,
    hat: undefined,
  };

  let hashIndex = 0;
  const attributes: LayerAttributes = onchain
    ? INSCRIBED_ATTRIBUTES
    : LOCAL_ATTRIBUTES;

  // iterate over each layer
  for (const [key, value] of Object.entries(attributes)) {
    const index = hashArray[hashIndex % hashArray.length];
    // handle 'eyes' separately
    if (key === "eyes") {
      const eyeAttributes = value as EyeAttributes;
      const eyeType = calculateEyeType(hashArray, hashIndex);
      const eyeIndex =
        hashArray[(hashIndex + 1) % hashArray.length] %
        eyeAttributes[eyeType].length;
      selectedLayers[key] = eyeAttributes[eyeType][eyeIndex];
    }
    // handle optional layers
    else if (OPTIONAL_LAYERS.includes(key as OptionalLayers)) {
      const layer = handleOptionalLayer(key, value, hashArray, hashIndex);
      if (layer) {
        selectedLayers[key as Layers] = layer;
      }
      // handle required layers (other than 'eyes')
      else {
        selectedLayers[key as Layers] = (value as string[])[
          index % (value as string[]).length
        ];
      }

      hashIndex++;
    }
    return selectedLayers;
  }
}
  // takes hash array and returns list of selected layers by key name
  export function listLayersFromHash(hashArray: number[], onchain = false) {
    const listedLayers: string[] = [];
    let hashIndex = 0;
    const attributes: LayerAttributes = onchain
      ? INSCRIBED_ATTRIBUTES
      : LOCAL_ATTRIBUTES;

    for (const [key, value] of Object.entries(attributes)) {
      const index = hashArray[hashIndex % hashArray.length];

      // handle 'eyes' separately
      if (key === "eyes") {
        const eyeAttributes = value as EyeAttributes;
        const eyeProb = index % 100;
        let eyeType: EyeTypes;
        if (eyeProb < 50) {
          eyeType = "normal";
        } else {
          const laserProb = (eyeProb - 50) % 50;
          if (laserProb < 20) {
            eyeType = "starburst";
          } else {
            eyeType = "laser";
          }
        }
        const eyeIndex =
          hashArray[(hashIndex + 1) % hashArray.length] %
          eyeAttributes[eyeType].length;
        listedLayers.push(`${key}-${eyeType}-${eyeIndex + 1}`);
      }
      // handle optional layers
      else if (OPTIONAL_LAYERS.includes(key as OptionalLayers)) {
        const randomValue = index % 100; // based on index
        if (
          (key === "chain" && randomValue < CHANCE_CHAIN) ||
          (key === "earring" && randomValue < CHANCE_EARRING) ||
          (key === "glasses" && randomValue < CHANCE_GLASSES) ||
          (key === "hat" && randomValue < CHANCE_HAT)
        ) {
          const layerIndex = index % (value as string[]).length;
          listedLayers.push(`${key}-${layerIndex + 1}`);
        }
      }
      // handle required layers (other than 'eyes')
      else {
        listedLayers.push(`${key}-${(index % (value as string[]).length) + 1}`);
      }

      hashIndex++;
    }

    return listedLayers;
  }
}

export function getLayersFromSelection(
  layers: LayerSelection,
  onchain = false,
  host = "/content"
) {
  const result: { [key: string]: string } = {};
  Object.entries(layers)
    .filter(([key, value]) => value !== undefined)
    .forEach(([key, value], index) => {
      if (onchain) {
        result[key] = `<image id="${key}-${
          index + 1
        }" xlink:href="${host}/${value}" x="0" y="0" width="100%" height="100%"></image>`;
      } else {
        result[key] = value as string;
      }
    });
  return result;
}

export function createLayersFromSelection(
  layers: LayerSelection,
  onchain = false,
  host = "/content"
) {
  return Object.entries(layers)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value], index) => {
      if (onchain) {
        // return a link to the on-chain image hash
        return `<image id="${key}-${
          index + 1
        }" xlink:href="${host}/${value}" x="0" y="0" width="100%" height="100%"></image>`;
      }
      // return the matching layer in the cache
      return value;
    })
    .join("\n");
}

export function createSvgFileFromLayers(
  name: string,
  svgLayers: string,
  width = "100%",
  height = "100%"
) {
  // TODO: add flag for laser eyes, add defs
  return `<svg id="Bitcoin Face for ${name}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n${svgLayers}\n</svg>`;
}
