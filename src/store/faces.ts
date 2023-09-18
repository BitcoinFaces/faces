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
import * as Faces from "../components/faces";
import { atomFamily } from "jotai/utils";

/////////////////////////
// CONSTANTS
/////////////////////////

export const FACES_COMPONENTS = [
  Faces.BitcoinFace82,
  Faces.BitcoinFace118,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "image 8",
  }),
  Faces.BitcoinFace107,
  Faces.BitcoinFace428,
  Faces.BitcoinFace532,
  Faces.BitcoinFace292,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "Group",
  }),
  Faces.BitcoinFace443,
  Faces.BitcoinFace568,
  Faces.BitcoinFace521,
  Faces.BitcoinFace142,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "image 7",
  }),
  Faces.BitcoinFace613,
  Faces.BitcoinFace581,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "image 1",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "image 27",
  }),
  Faces.BitcoinFace675,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "bitcoin-face-85",
  }),
  Faces.BitcoinFace517,
  Faces.BitcoinFace522,
  Faces.BitcoinFace287,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "Group",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "Group",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "11",
  }),
  Faces.BitcoinFace308,
  Faces.BitcoinFace298,
  Faces.BitcoinFace135,
  Faces.BitcoinFace515,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "30",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "13",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "16",
  }),
  Faces.BitcoinFace425,
  Faces.BitcoinFace584,
  Faces.BitcoinFace608,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "26",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "14",
  }),
  Faces.BitcoinFace586,
  Faces.BitcoinFace109,
  Faces.BitcoinFace230,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "22",
  }),
  Faces.BitcoinFace672,
  Faces.BitcoinFace525,
  Faces.BitcoinFace547,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "2",
  }),
  Faces.BitcoinFace112,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "24",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "4",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "23",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "group-1",
  }),
  Faces.BitcoinFace209,
  Faces.BitcoinFace476,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "21",
  }),
  Faces.BitcoinFace160,
  Faces.BitcoinFace614,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "group-2",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "25",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "6",
  }),
  Faces.BitcoinFace593,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "31",
  }),
  Faces.BitcoinFace115,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "29",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "5",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "19",
  }),
  Faces.BitcoinFace105,
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "18",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "group-3",
  }),
  Faces.BitcoinFaceGenerator({
    width: "100%",
    height: "100%",
    name: "9",
  }),
];

/* UNUSED FACES
  Faces.BitcoinFace107,
  Faces.BitcoinFace292,
  Faces.BitcoinFace428,
  Faces.BitcoinFace532,
*/

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

export interface NameDataCode<T> {
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
export const nameDataAtom = atom(async (get): Promise<NameData | undefined> => {
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

export const nameDataAtomFamily = atomFamily((inputName: string) =>
  atom(async (): Promise<NameData | undefined> => {
    const name = inputName;
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
  })
);

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
): { id: string; svg: string } | undefined {
  const randomValue = hashArray[hashIndex % hashArray.length] % 100;
  const chance = {
    chain: CHANCE_CHAIN,
    earring: CHANCE_EARRING,
    glasses: CHANCE_GLASSES,
    hat: CHANCE_HAT,
  }[key];

  if (chance && randomValue < chance) {
    const layerIndex = calculateLayerIndex(hashArray, hashIndex, value.length);
    return {
      id: `${key}-${layerIndex + 1}`,
      svg: value[layerIndex],
    };
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
        selectedLayers[key as Layers] = layer.svg;
      }
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

// takes hash array and returns list of selected layers by key name
export function listLayersFromHash(hashArray: number[], onchain = false) {
  const listedLayers: string[] = [];
  let hashIndex = 0;
  const attributes: LayerAttributes = onchain
    ? INSCRIBED_ATTRIBUTES
    : LOCAL_ATTRIBUTES;

  for (const [key, value] of Object.entries(attributes)) {
    // handle 'eyes' separately
    if (key === "eyes") {
      const eyeAttributes = value as EyeAttributes;
      const eyeType = calculateEyeType(hashArray, hashIndex);
      const eyeIndex =
        hashArray[(hashIndex + 1) % hashArray.length] %
        eyeAttributes[eyeType].length;
      listedLayers.push(`${key}-${eyeType}-${eyeIndex + 1}`);
    }
    // handle optional layers
    else if (OPTIONAL_LAYERS.includes(key as OptionalLayers)) {
      const layer = handleOptionalLayer(key, value, hashArray, hashIndex);
      if (layer) {
        listedLayers.push(layer.id);
      }
    }
    // handle required layers (other than 'eyes')
    else {
      const index = hashArray[hashIndex % hashArray.length];
      listedLayers.push(`${key}-${(index % (value as string[]).length) + 1}`);
    }

    hashIndex++;
  }

  return listedLayers;
}

export function getLayersFromSelection(
  layers: LayerSelection,
  onchain = false,
  host = "/content"
) {
  const result: LayerCode = Object.fromEntries(
    Object.keys(layers).map((key) => [key, ""])
  ) as LayerCode;

  Object.entries(layers)
    .filter(([key, value]) => value !== undefined)
    .forEach(([key, value], index) => {
      if (onchain) {
        result[key as Layers] = `<image id="${key}-${
          index + 1
        }" xlink:href="${host}/${value}" x="0" y="0" width="100%" height="100%"></image>`;
      } else {
        result[key as Layers] = value as string;
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
  return `<svg id="bitcoin-face-for-${name}" width="${width}" height="${height}" viewBox="0 0 1025 1025" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n${svgLayers}\n</svg>`;
}
