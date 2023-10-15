import { prepareModForExport } from "src/Services/ModListManipulationService";
import { Tag } from "src/models/Index";
import Mod from "src/models/Mod";
import Skill from "src/models/Skill";

const SkillList: Skill[] = [
  {
    name: "Fireball",
    description: "boom haha",
    target: "ENEMY",
    characterTargets: 1,
    itemTargets: 0,
    mpCost: 5,
    spCost: 0,
    tags: ["Flame", "Magic"],
    eligibilityChecker(character): boolean {
      return !!character;
    },
    skillCast(caster, victims): boolean {
      //const damage = 5 + caster.computeCertainStats('FlameAffinity', 'MagicAffinity')
      victims.forEach((victim) => {
        console.log(victim);
        //victim.damage(damage, tags);
      });
      return true;
    },
  },
  {
    name: "Cat Ward",
    description: "Target cats are launched into the sun",
    target: "ENEMY",
    characterTargets: 999,
    itemTargets: 0,
    spCost: 0,
    mpCost: 0,
    tags: ["Beasts", "Magic", "Day", "Cat"],
    //no eligibilitychecker what do it do
    skillCast(caster, victims): boolean {
      for (let i = 0; i < victims.length; i++) {
        if (victims[i].stats.tags.includes("Cat")) {
          victims[i].currentHP = 0;
        }
      }
      return true;
    },
  },
  {
    name: "Power Enhance",
    description: "Enhance an item",
    target: "ITEM",
    characterTargets: 0,
    itemTargets: 1,
    mpCost: 0,
    spCost: 0,
    tags: ["Magic"],
    eligibilityChecker() {
      return true;
    },
    skillCast(caster, victims, items): boolean {
      items.forEach((item) => {
        const newMod = prepareModForExport(
          new Mod({
            name: "of Power",
            description: "It makes you feel more powerful just by holding it",
            importantAval: 1,
            STR: 1,
            rarity: 1,
            tags: ["Destruction", "Battle"],
          }),
          "SUFFIX"
        );
        item.transform(newMod);
      });
      return true;
    },
  },
  {
    name: "Vital Blessing",
    description: "give someone +1 vit",
    target: "ALLY",
    characterTargets: 1,
    itemTargets: 0,
    mpCost: 0,
    spCost: 0,
    tags: ["Magic"],
    eligibilityChecker() {
      return true;
    },
    skillCast(caster, victims): boolean {
      victims.forEach((victim) => {
        victim.tackOnStat("VIT", 1);
      });
      return true;
    },
  },
  {
    name: "Lesser Restoration",
    description: "heel",
    target: "ALLY",
    characterTargets: 1,
    itemTargets: 0,
    mpCost: 3,
    spCost: 0,
    tags: ["Magic"],
    eligibilityChecker() {
      return true;
    },
    skillCast(caster, victims): boolean {
      victims.forEach((victim) => {
        victim.heal(1);
      });
      return true;
    },
  },
];

export function getSkillByIndex(index: number): Skill {
  if (index < 0) index = 0;
  return SkillList[index];
}

export function getSkillByName(name: string): Skill {
  const index = SkillList.findIndex(
    (element) => element.name?.toLowerCase() === name?.toLowerCase()
  );
  return getSkillByIndex(index);
}

export function getSkillByTag(requiredTags: Tag[], excludedTags: Tag[]): Skill {
  let array = SkillList;
  for (let i = 0; i < requiredTags.length; i++) {
    array = array.filter((skill) => {
      return skill.tags && skill.tags.includes(requiredTags[i]);
    });
  }
  for (let i = 0; i < excludedTags.length; i++) {
    array = array.filter((skill) => {
      return (
        !skill.tags ||
        skill.tags.length < 1 ||
        !skill.tags.includes(excludedTags[i])
      );
    });
  }
  return array[Math.floor(Math.random() * array.length)];
}
