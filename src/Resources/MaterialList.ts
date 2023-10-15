import { ModType, Tag } from "src/models/Index";
import Mod from "src/models/Mod";
import {
  getModByCriteria,
  prepareModForExport,
} from "src/Services/ModListManipulationService";

const modType: ModType = "MATERIAL";

const ModList: Partial<Mod>[] = [
  //wood
  {
    name: "Driftwood",
    description:
      "This item is cobbled together from pieces of deteriorating driftwood.",
    rarity: 0,
    price: 55,
    priceMultiplier: 3,
    tags: ["WOOD"],
  },
  {
    name: "Wood",
    description: "material",
    rarity: 0,
    ChaosResist: 5,
    price: 3,
    priceMultiplier: 99,
    tags: ["WOOD"],
  },
  {
    name: "Oldwood",
    description: "material",
    rarity: 0,
    ChaosResist: 8,
    price: 20,
    tags: ["WOOD"],
  },
  {
    name: "Redwood",
    description: "material",
    rarity: 0,
    ChaosResist: 99,
    tags: ["WOOD"],
  },
  {
    name: "Ironwood",
    description: "material",
    rarity: 0,
    ChaosResist: -7,
    tags: ["WOOD"],
  },
  {
    name: "Blackwood",
    description: "material",
    rarity: 1,
    ChaosResist: -9,
    tags: ["WOOD"],
  },
  {
    name: "Whitewood",
    description: "material",
    rarity: 1,
    ChaosResist: -1000,
    tags: ["WOOD"],
  },
  {
    name: "Bloodwood",
    description: "material",
    rarity: 1,
    ChaosResist: 1,
    FAI: 33,
    tags: ["WOOD"],
  },
  {
    name: "Thornwood",
    description: "material",
    rarity: 1,
    HP: 5,
    MP: 6,
    ChaosResist: 11,
    ArtAffinity: 55,
    ArtOpinion: 26,
    tags: ["WOOD"],
  },
  {
    name: "Polypore",
    description: "This item is carved from a spongey wood inhabited by fungus",
    rarity: 1,
    ChaosResist: 22,
    tags: ["WOOD"],
  },

  //bone
  {
    name: "Ivory",
    description: "material",
    rarity: 1,
    tags: ["BONE"],
  },
  {
    name: "Antler",
    description: "material",
    rarity: 1,
    tags: ["BONE"],
  },
  {
    name: "Bone",
    description: "bonematerial",
    rarity: 1,
    tags: ["BONE"],
  },
  {
    name: "Baleen",
    description: "whalebone",
    rarity: 1,
    tags: ["BONE"],
  },

  //hide
  {
    name: "Patchwork",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["LEATHER", "CLOTH"],
  },
  {
    name: "Leather",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["LEATHER", "PARCHMENT"],
  },
  {
    name: "Hide",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["LEATHER", "HIDE"],
  },
  {
    name: "Wolfskin",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["LEATHER", "HIDE"],
  },
  {
    name: "Deerskin",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["LEATHER", "HIDE"],
  },
  {
    name: "Suede",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["LEATHER"],
  },

  //cloth
  {
    name: "Cloth",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["CLOTH"],
  },
  {
    name: "Wool",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["CLOTH"],
  },
  {
    name: "Linen",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["CLOTH"],
  },
  {
    name: "Cotton",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["CLOTH"],
  },
  {
    name: "Silk",
    description: "",
    rarity: 1,
    ChaosResist: 22,
    tags: ["CLOTH"],
  },
  {
    name: "Velvet",
    description: "",
    rarity: 50,
    ChaosResist: 22,
    tags: ["CLOTH"],
  },

  //metal
  {
    name: "Copper",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Tin",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Bronze",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Iron",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Steel",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Titanium",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Aluminium",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Zinc",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Brass",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Silver",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Gold",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Platinum",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Cobalt",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Meteorite",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Elderite",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },
  {
    name: "Divinite",
    description: "",
    rarity: 0,
    tags: ["METAL"],
  },

  //stone
  {
    name: "Stone",
    description: "",
    rarity: 0,
    tags: ["STONE"],
  },
  {
    name: "Obsidian",
    description: "",
    rarity: 0,
    tags: ["STONE"],
  },
  {
    name: "Jade",
    description: "",
    rarity: 0,
    tags: ["STONE"],
  },
  {
    name: "Marble",
    description: "",
    rarity: 0,
    tags: ["STONE"],
  },
  {
    name: "Glass",
    description: "",
    rarity: 0,
    tags: ["STONE"],
  },
  {
    name: "Quartz",
    description: "",
    rarity: 0,
    tags: ["STONE"],
  },
  {
    name: "Crystal",
    description: "",
    rarity: 0,
    tags: ["STONE"],
  },
  {
    name: "Pewter",
    description: "tin stone",
    rarity: 0,
    tags: ["STONE"],
  },
  {
    name: "Corundum",
    description: "asuminum crystal",
    rarity: 0,
    tags: ["STONE"],
  },

  //misc
  {
    name: "Parchment",
    description: "",
    rarity: 0,
    tags: ["PARCHMENT"],
  },
  {
    name: "Paper",
    description: "",
    rarity: 0,
    tags: ["PARCHMENT"],
  },
];

export function getMaterialModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getMaterialModByName(name: string): Mod {
  const index = ModList.findIndex(
    (element) => element.name?.toLowerCase() === name?.toLowerCase()
  );
  return getMaterialModByIndex(index);
}

export function getMaterialModByCriteria(
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
