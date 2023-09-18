import fs from "fs";
import path from "path";
import * as Faces from "../components/faces";
import { FACES_COMPONENTS } from "../store/faces";

describe("Faces components", () => {
  it("should keep FACES_COMPONENTS, exports and folder contents in sync", () => {
    // Read filenames from 'faces' directory and filter .tsx files
    const filePath = path.resolve(__dirname, "../components/faces");
    const fileNames = fs
      .readdirSync(filePath)
      .filter((f) => f.endsWith(".tsx") && f !== "index.tsx");

    // Convert filenames to export names
    const expectedExports = fileNames.map(
      (f) => "BitcoinFace" + f.replace("bitcoin-face-", "").replace(".tsx", "")
    );

    // Extract actual exports from index.ts
    const actualExports = Object.keys(Faces).filter(
      (f) => f !== "FACES_COMPONENTS"
    );

    // Validate exports against filenames
    expect(actualExports.sort()).toEqual(expectedExports.sort());

    // Validate FACES_COMPONENTS against exports
    const actualComponents = FACES_COMPONENTS.map((c) =>
      typeof c === "function" ? c.name : null
    ).filter(Boolean);
    expect(actualComponents.sort()).toEqual(actualExports.sort());
  });
});
