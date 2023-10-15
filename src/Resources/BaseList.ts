import { ModType, Tag } from "src/models/Index";
import Mod from "src/models/Mod";
import {
  getModByCriteria,
  prepareModForExport,
} from "src/Services/ModListManipulationService";

const modType: ModType = "BASE";

const ModList: Partial<Mod>[] = [
  {
    name: "Invalid Item",
    description:
      "whoopsie this item is bugged please submit a bug report also what were you doing when this item appeared",
    rarity: 9999,
    inventoryIcon: new URL("src/assets/Icons/error.png", import.meta.url),
    slot: "Quest Item",
    tags: [],
  },
  {
    name: "2HanderDummyItem",
    description: "",
    rarity: 9999,
    inventoryIcon: new URL("src/assets/Icons/2hander.png", import.meta.url),
    slot: "Quest Item",
    tags: [],
  },
  {
    name: "Dagger",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Weapons/Dagger.png",
      import.meta.url
    ),
    slot: "Light Weapon",
    tags: ["Blade", "Weapon"],
    attackType: "Piercing",
  },
  {
    name: "Knife",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Weapons/Dagger.png",
      import.meta.url
    ),
    slot: "Light Weapon",
    tags: ["Blade", "Weapon"],
    attackType: "Physical",
  },
  {
    name: "Sword",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Weapons/W_Sword001.png",
      import.meta.url
    ),
    slot: "Medium Weapon",
    tags: ["Blade", "Weapon"],
    attackType: "Physical",
  },
  {
    name: "Machete",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Weapons/W_Sword001.png",
      import.meta.url
    ),
    slot: "Medium Weapon",
    tags: ["Blade", "Weapon"],
    attackType: "Physical",
  },
  {
    name: "Club",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Weapons/Club.png",
      import.meta.url
    ),
    slot: "Medium Weapon",
    tags: ["Weapon", "Blunt"],
    attackType: "Physical",
  },
  {
    name: "Axe",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/Weapons/Axe.png", import.meta.url),
    slot: "Heavy Weapon",
    tags: ["Weapon", "Blade"],
    attackType: "Physical",
  },
  {
    name: "Greatsword",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Weapons/VHWeapon.png",
      import.meta.url
    ),
    slot: "Very Heavy Weapon",
    tags: ["Weapon", "Blade"],
    attackType: "Physical",
  },
  {
    name: "Cap",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/Helmets/Cap.png", import.meta.url),
    slot: "Light Helmet",
    tags: [],
  },
  {
    name: "Hat",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Helmets/elven_leather_helm.png",
      import.meta.url
    ),
    slot: "Light Helmet",
    tags: [],
  },
  {
    name: "Helm",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Helmets/Helm.png",
      import.meta.url
    ),
    slot: "Medium Helmet",
    tags: [],
  },
  {
    name: "Cloak",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/Armor/Cloak.png", import.meta.url),
    slot: "Light Armor",
    tags: [],
  },
  {
    name: "Cape",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/Armor/Cloak.png", import.meta.url),
    slot: "Light Armor",
    tags: ["Cape"],
  },
  {
    name: "Jerkin",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Armor/Jerkin.png",
      import.meta.url
    ),
    slot: "Medium Armor",
    tags: [],
  },
  {
    name: "Chainmail",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/Armor/Armor.png", import.meta.url),
    slot: "Heavy Armor",
    tags: ["METAL-SPECIFIC"],
  },
  {
    name: "Buckler",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Shields/Buckler.png",
      import.meta.url
    ),
    slot: "Light Shield",
    tags: [],
  },
  {
    name: "Kite Shield",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Shields/Kite.png",
      import.meta.url
    ),
    slot: "Medium Shield",
    tags: [],
  },
  {
    name: "Tower Shield",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Shields/Tower.png",
      import.meta.url
    ),
    slot: "Heavy Shield",
    tags: [],
  },
  {
    name: "Gloves",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Gloves/Gloves.png",
      import.meta.url
    ),
    slot: "Gloves",
    tags: [],
  },
  {
    name: "Boots",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/Boots/Boots.png", import.meta.url),
    slot: "Boots",
    tags: [],
  },
  {
    name: "Belt",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/Items/Belt.png", import.meta.url),
    slot: "Belt",
    tags: [],
  },
  {
    name: "Ring",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Trinkets/Ring1.png",
      import.meta.url
    ),
    slot: "Trinket",
    tags: [],
  },
  {
    name: "Amulet",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Trinkets/Ac_Necklace02.png",
      import.meta.url
    ),
    slot: "Trinket",
    tags: [],
  },
  {
    name: "Necklace",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Trinkets/Ac_Necklace02.png",
      import.meta.url
    ),
    slot: "Trinket",
    tags: [],
  },
  {
    name: "Bracelet",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Trinkets/Ac_Ring02.png",
      import.meta.url
    ),
    slot: "Trinket",
    tags: [],
  },
  {
    name: "Orb",
    description: "",
    rarity: 0,
    importantA: "WIL",
    WIL: 1,
    inventoryIcon: new URL(
      "src/assets/Icons/Implements/Orb_01.png",
      import.meta.url
    ),
    slot: "Implement",
    tags: [],
  },
  {
    name: "Robes",
    description: "",
    rarity: 0,
    importantA: "FAI",
    importantB: "Clarity",
    Clarity: 1,
    inventoryIcon: new URL(
      "src/assets/Icons/Armor/cloak_2.png",
      import.meta.url
    ),
    slot: "Light Armor",
    tags: [],
  },
  {
    name: "Quarterstaff",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Weapons/W_Staff01.png",
      import.meta.url
    ),
    slot: "Heavy Weapon",
    tags: ["Weapon", "Blunt"],
    attackType: "Physical",
  },
  {
    name: "Wand",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Implements/wand_2.png",
      import.meta.url
    ),
    slot: "Implement",
    tags: ["Magic"],
  },
  {
    name: "Tunic",
    description: "",
    rarity: 0,
    importantA: "STR",
    importantB: "Accuracy",
    inventoryIcon: new URL(
      "src/assets/Icons/Armor/A_Clothing02.png",
      import.meta.url
    ),
    slot: "Light Armor",
    tags: [],
  },
  {
    name: "Pickaxe",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Tools/Pickaxe2.png",
      import.meta.url
    ),
    slot: "Heavy Weapon",
    tags: ["Weapon", "Tool"],
    attackType: "Physical",
  },
  {
    name: "Shovel",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Tools/Shovel2.png",
      import.meta.url
    ),
    slot: "Heavy Weapon",
    tags: ["Weapon", "Polearm", "Tool"],
    attackType: "Physical",
  },
  {
    name: "Hammer",
    description: "",
    rarity: 0,
    inventoryIcon: new URL(
      "src/assets/Icons/Tools/Hammer2.png",
      import.meta.url
    ),
    slot: "Medium Weapon",
    tags: ["Weapon", "Blunt", "Tool"],
    attackType: "Physical",
  },
  {
    name: "Herbalist's Pouch",
    description: "",
    rarity: 0,
    importantA: "Medicine",
    importantB: "Survival",
    importantC: "price",
    inventoryIcon: new URL("src/assets/Icons/Items/bag.png", import.meta.url),
    slot: "Implement",
    tags: ["Tool"],
  },
  {
    name: "Flute",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/placeholder.png", import.meta.url),
    slot: "Implement",
    tags: ["Instrument"],
  },
  {
    name: "Lute",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/placeholder.png", import.meta.url),
    slot: "Implement",
    tags: ["Instrument"],
  },
  {
    name: "Drum",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/placeholder.png", import.meta.url),
    slot: "Implement",
    tags: ["Instrument"],
  },
  {
    name: "Horn",
    description: "",
    rarity: 0,
    inventoryIcon: new URL("src/assets/Icons/placeholder.png", import.meta.url),
    slot: "Implement",
    tags: ["Instrument"],
  },
];

export function getBaseModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getBaseModByName(name: string): Mod {
  const index = ModList.findIndex(
    (element) => element.name?.toLowerCase() === name?.toLowerCase()
  );
  return getBaseModByIndex(index);
}

export function getBaseModByCriteria(
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
