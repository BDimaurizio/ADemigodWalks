import { ModType, Tag } from "src/models/Index";
import Mod from "src/models/Mod";
import {
  getModByCriteria,
  prepareModForExport,
} from "src/Services/ModListManipulationService";

const modType: ModType = "PREFIX";

const ModList: Partial<Mod>[] = [
  {
    name: "Ritual",
    description: "rrrrrrr",
    rarity: 0,
    tags: ["WOOD"],
  },
  {
    name: "Traveler's",
    description: "trav",
    rarity: 0,
    tags: ["CLOTH"],
  },
  {
    name: "Friendship",
    description: "f",
    Leadership: 1,
    Diplomacy: 1,
    rarity: 0,
    tags: ["Humility"],
  },
  {
    name: "Heroic",
    description: "f",
    STR: 1,
    VIT: 1,
    rarity: 1,
    tags: ["Battle"],
  },
  {
    name: "Acolyte's",
    description: "f",
    FAI: 1,
    Attunement: 1,
    rarity: 1,
    tags: ["Battle"],
  },
  {
    name: "Heart",
    description: "f",
    rarity: 99,
    tags: ["Love"],
  },
  {
    name: "Hunting",
    description: "f",
    Survival: 2,
    rarity: 1,
    tags: ["Nature", "Beasts"],
  },
];

export function getPrefixModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getPrefixModByName(name: string): Mod {
  const index = ModList.findIndex(
    (element) => element.name?.toLowerCase() === name?.toLowerCase()
  );
  return getPrefixModByIndex(index);
}

export function getPrefixModByCriteria(
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
