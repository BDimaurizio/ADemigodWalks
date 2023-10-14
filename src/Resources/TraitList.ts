import { ModType, Tag } from "src/models/Index";
import Mod from "src/models/Mod";
import {
  getModByCriteria,
  prepareModForExport,
} from "src/Services/ModListManipulationService";

const modType: ModType = "TRAIT";

//reminder: do NOT call character.stats in eligibilitychecker. call character.statsWithoutTraits instead

const ModList: Partial<Mod>[] = [
  {
    name: "Test Trait",
    description: "gihierbhlearvke",
    rarity: 99999,
    tags: [],
    eligibilityChecker() {
      return false;
    },
  },
  {
    name: "Super Duper Healthy",
    description: "test trait - gives you 99 hp if you have at least 6 VIT",
    rarity: 0,
    HP: 99,
    tags: ["Feasts"],
    eligibilityChecker(character) {
      if (character.statsWithoutTraits.VIT > 5) return true;
      return false;
    },
  },
  {
    name: "Low Health Crafter",
    description:
      "test trait - this trait gives +10 crafting if your current HP is below 5",
    rarity: 0,
    Crafting: 10,
    tags: [],
    eligibilityChecker(character) {
      if (character.currentHP < 5) return true;
      return false;
    },
  },
  {
    name: "Hat Wearer",
    description:
      "test trait - a trait that gives you +10 INT while wearing a hat",
    rarity: 0,
    INT: 10,
    tags: ["TAILORING"],
    eligibilityChecker(character) {
      if (character.getSpecificEquipment(2)) return true;
      return false;
    },
  },
  {
    name: "Greedy",
    description: "You have a keen eye for money and always haggle for a deal",
    rarity: 0,
    Bargaining: 3,
    tags: ["Commerce"],
    eligibilityChecker() {
      return true;
    },
  },
  {
    name: "Friendly",
    description: "blah",
    rarity: 0,
    Leadership: 1,
    Diplomacy: 1,
    tags: ["Humility"],
    eligibilityChecker() {
      return true;
    },
  },
  {
    name: "Scroll Reading: ",
    description:
      "You can cast the spell written on the scroll. Wait too long and you'll forget, though",
    rarity: 0,
    tags: ["Magic"],
    Skills: [],
    duration: -1,
    eligibilityChecker() {
      return true;
    },
  },
  {
    name: "Explorer",
    description: "blah",
    rarity: 0,
    Survival: 1,
    tags: ["Nature"],
    eligibilityChecker() {
      return true;
    },
  },
  {
    name: "Sage's Touch",
    description:
      "When you read a scroll, you have a small chance to not consume it",
    rarity: 1,
    tags: ["Magic"],
    eligibilityChecker() {
      return true;
    },
  },
  {
    name: "Power-Hungry",
    description: "When you read a scroll, you gain a small amount of EXP",
    rarity: 1,
    tags: ["Magic"],
    eligibilityChecker() {
      return true;
    },
  },
  {
    name: "Heroic Aura",
    description:
      "While wearing a cape, your Vitality is added to your Leadership",
    rarity: 1,
    tags: [],
    eligibilityChecker(character) {
      return character.equipmentStats.tags.includes("Cape");
    },
  },
  {
    name: "Righteous Cause",
    description: "Your mental status resistance is increased by your Faith",
    rarity: 1,
    tags: [],
    eligibilityChecker() {
      return true;
    },
  },
  {
    name: "Treasure Seeker",
    description:
      "You've got a keen eye for treasure. You're sure to find some soon...",
    rarity: 1,
    tags: [],
    eligibilityChecker() {
      return true;
    },
  },
  {
    name: "Quarterstaff Proficiency",
    description: "+5 Max SP while weilding a quarterstaff",
    SP: 5,
    rarity: 0,
    tags: [],
    eligibilityChecker(character) {
      return (
        character.getSpecificEquipment(0)?.baseBodyMod.name == "Quarterstaff"
      );
    },
  },
  {
    name: "Martial Adept",
    description: "",
    rarity: 0,
    tags: [],
    eligibilityChecker() {
      return true;
    },
  },
  {
    name: "Mental Adept",
    description: "",
    MP: 3,
    rarity: 0,
    tags: [],
    eligibilityChecker() {
      return true;
    },
  },
];

export function getTraitByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getTraitByName(name: string): Mod {
  const index = ModList.findIndex(
    (element) => element.name?.toLowerCase() === name?.toLowerCase()
  );
  return getTraitByIndex(index);
}

export function getTraitByCriteria(
  tags: Tag[],
  minRarity: number,
  maxRarity: number,
  exclusionTags: Tag[] = [],
  mustHaveTags: Tag[] = []
): Mod {
  return getModByCriteria(
    ModList,
    modType,
    tags, //oneofthese
    minRarity,
    maxRarity,
    exclusionTags,
    mustHaveTags
  );
}
