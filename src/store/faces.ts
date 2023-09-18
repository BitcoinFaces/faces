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
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace82({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace118({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-123",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace107({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace428({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace532({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace292({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-2049-2",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace443({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace568({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace521({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace142({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-3",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace613({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace581({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-40515",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-555-400-23-test",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace675({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-666",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace517({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace522({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace287({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-70",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-8000",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-the-best-one",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace308({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace298({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace135({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace515({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-10",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-112",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Forever-12",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace425({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace584({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace608({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-135",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-14",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace586({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace109({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace230({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-151",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace672({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace525({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace547({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-16",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace112({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-150",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-17-2",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-1800",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-19",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace209({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace476({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-20",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace160({ ...props }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace614({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-21",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-22-by-22",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-23",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace593({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-24",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace115({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-25",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-26",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-27",
    }),
  (props: BitcoinFaceLogoProps) => Faces.BitcoinFace105({ ...props }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-wtfbbq",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-290",
    }),
  (props: BitcoinFaceLogoProps) =>
    Faces.BitcoinFaceGenerator({
      ...props,
      name: "Bitcoin-Faces-Random-300",
    }),
];

// https://gamma.io/?is_create_open=true&step=2&path=inscription&image_url=https%3A%2F%2Ffix-invalid-layer-selection.bitcoin-faces.pages.dev%2Fapi%2Fget-onchain-image%3Fname%3Dgamadsfma
export const GAMMA_CREATE_URL = (name: string) => {
  const url = new URL("https://gamma.io");
  url.searchParams.set("is_create_open", "true");
  url.searchParams.set("step", "2");
  url.searchParams.set("path", "inscription");
  url.searchParams.set(
    "image_url",
    `https://bitcoinfaces.xyz/api/get-onchain-image?name=${name}`
  );
  return url.toString();
};

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

export type BitcoinFaceGeneratorProps = BitcoinFaceLogoProps & { name: string };

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
  const order: Layers[] = [
    "background",
    "body",
    "head",
    "ears",
    "chain",
    "mouth",
    "nose",
    "hat",
    "eyes",
  ];
  return order
    .map((key: Layers) => {
      const value = layers[key];
      if (value === undefined) return "";
      if (onchain) {
        return `<image id="${key}-1" xlink:href="${host}/${value}" x="0" y="0" width="100%" height="100%"></image>`;
      }
      return value;
    })
    .filter((str) => str !== "")
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
