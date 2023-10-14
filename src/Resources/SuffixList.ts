import { ModType, Tag } from "src/models/Index";
import Mod from "src/models/Mod";
import {
  getModByCriteria,
  prepareModForExport,
} from "src/Services/ModListManipulationService";
import { getSkillByName } from "./SkillList";
import Skill from "src/models/Skill";

const modType: ModType = "SUFFIX";

const ModList: Partial<Mod>[] = [
  {
    name: "of Power",
    description: "It makes you feel more powerful just by holding it",
    importantAval: 1,
    STR: 1,
    rarity: 1,
    tags: ["Destruction", "Battle"],
  },
  {
    name: "of Strength",
    description: "",
    STR: 1,
    rarity: 0,
    tags: ["Destruction", "Battle"],
  },
  {
    name: "of Vitality",
    description: "",
    VIT: 1,
    rarity: 0,
    tags: ["Battle"],
  },
  {
    name: "of Punishment",
    description: "",
    CriticalChance: 1,
    rarity: 0,
    tags: ["Judgement"],
  },
];

export function getSuffixModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getSuffixModByName(name: string): Mod {
  const index = ModList.findIndex(
    (element) => element.name?.toLowerCase() === name?.toLowerCase()
  );
  return getSuffixModByIndex(index);
}

export function getSuffixOfSpell(input: string | Skill): Mod {
  let skill;
  if (typeof input == "string") {
    skill = getSkillByName(input);
  } else {
    skill = input;
  }

  const output = new Mod({
    name: "of " + skill.name,
    description: "Allows you to cast the spell: " + skill.name,
    Skills: [skill],
    tags: skill.tags,
  });
  return prepareModForExport(output, modType);
}

export function getSuffixModByCriteria(
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
