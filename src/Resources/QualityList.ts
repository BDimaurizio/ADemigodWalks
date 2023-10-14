import { ModType, Tag } from "src/models/Index";
import Mod from "src/models/Mod";
import {
  getModByCriteria,
  prepareModForExport,
} from "src/Services/ModListManipulationService";

const modType: ModType = "QUALITY";

const ModList: Partial<Mod>[] = [
  {
    name: "Crude",
    description: "",
    rarity: -1,
    tags: [],
  },
  {
    name: "Warped",
    description: "",
    rarity: -1,
    tags: ["Alchemy"],
  },
  {
    name: "Poor",
    description: "",
    rarity: -1,
    tags: [],
  },
  {
    name: "Broken",
    description: "",
    rarity: -1,
    tags: ["NEGATIVE", "INFLICTED"],
  },
  {
    name: "Damaged",
    description: "",
    rarity: -1,
    tags: ["NEGATIVE", "INFLICTED"],
  },
  {
    name: "Rusty",
    description: "",
    rarity: -1,
    tags: ["NEGATIVE", "INFLICTED", "METAL-SPECIFIC"],
  },
  {
    name: "Corroded",
    description: "",
    rarity: -1,
    tags: ["NEGATIVE", "INFLICTED", "METAL-SPECIFIC"],
  },
  {
    name: "Tattered",
    description: "",
    rarity: -1,
    tags: ["NEGATIVE", "INFLICTED", "CLOTHING-SPECIFIC"],
  },
  {
    name: "Rotted",
    description: "",
    rarity: -1,
    tags: ["NEGATIVE", "INFLICTED", "WOOD-SPECIFIC"],
  },
  //
  {
    name: "Fine",
    description: "",
    rarity: 0,
    tags: [],
  },
  {
    name: "Superior",
    description: "",
    rarity: 1,
    tags: [],
  },
  {
    name: "Exceptional",
    description: "",
    rarity: 2,
    tags: [],
  },
  {
    name: "Supple",
    description: "",
    rarity: 1,
    tags: [],
  },
  //
  {
    name: "Stiff",
    description: "",
    rarity: 1,
    tags: [],
  },
  {
    name: "Balanced",
    description: "",
    rarity: 1,
    tags: [],
  },
  {
    name: "Polished",
    description: "",
    rarity: 1,
    tags: [],
  },
  {
    name: "Odd",
    description: "",
    rarity: 1,
    tags: [],
  },
  {
    name: "Stained",
    description: "",
    rarity: 1,
    tags: [],
  },
  {
    name: "Artisinal",
    description: "",
    rarity: 2,
    tags: [],
  },
  {
    name: "Antique",
    description: "",
    rarity: 2,
    tags: [],
  },
  {
    name: "Magnificent",
    description: "",
    rarity: 3,
    tags: [],
  },
  {
    name: "Masterwork",
    description: "",
    rarity: 4,
    tags: [],
  },
];

export function getQualityModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getQualityModByName(name: string): Mod {
  const index = ModList.findIndex(
    (element) => element.name?.toLowerCase() === name?.toLowerCase()
  );
  return getQualityModByIndex(index);
}

export function getQualityModByCriteria(
  tags: Tag[],
  minRarity: number,
  maxRarity: number,
  exclusionTags: Tag[] = [],
  mustHaveTags: Tag[] = []
): Mod {
  return getModByCriteria(
    ModList,
    modType,
    tags,
    minRarity,
    maxRarity,
    exclusionTags,
    mustHaveTags
  );
}
