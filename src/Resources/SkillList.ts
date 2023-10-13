import { Tag } from 'src/models/Index';
import Skill from 'src/models/Skill';

const SkillList: Skill[] = [
  {
    name: 'Fireball',
    description: 'boom haha',
    target: 'ENEMY',
    maxTargets: 1,
    mpCost: 5,
    spCost: 0,
    tags: ['Flame', 'Magic'],
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
    name: 'Cat Ward',
    description: 'Target cats are launched into the sun',
    target: 'ENEMY',
    maxTargets: 999,
    spCost: 0,
    mpCost: 0,
    tags: ['Beasts', 'Magic', 'Day', 'Cat'],
    //no eligibilitychecker what do it do
    skillCast(caster, victims): boolean {
      for (let i = 0; i < victims.length; i++) {
        if (victims[i].stats.tags.includes('Cat')) {
          victims[i].currentHP = 0;
        }
      }
      return true;
    },
  },
];

export function getSkillByIndex(index: number): Skill {
  if (index < 0) index = 0;
  return SkillList[index];
}

export function getSkillByName(name: string): Skill {
  const index = SkillList.findIndex((element) => element.name === name);
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
