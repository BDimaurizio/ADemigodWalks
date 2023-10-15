import { getSkillByName } from "src/Resources/SkillList";
import { getTraitByName } from "src/Resources/TraitList";
import Mod from "./Mod";
import Skill from "./Skill";

export default class Job {
  public name: string = "_JOBNAME_";
  public statsPerLevel: Mod = new Mod();
  public traits: Mod[] = [];
  public skills: Skill[] = [];

  constructor(
    name: string,
    statsPerLevel: Mod,
    traits: string[],
    traitLevels: number[],
    skills: string[],
    skillLevels: number[]
  ) {
    this.name = name;
    this.statsPerLevel = statsPerLevel;

    const tempTraits: Mod[] = new Array(11).fill(new Mod());
    for (let i = 0; i < traits.length; i++) {
      tempTraits[traitLevels[i]] = getTraitByName(traits[i]);
    }
    this.traits = tempTraits;

    const tempSkills: Skill[] = new Array(11).fill(new Skill());
    for (let i = 0; i < skills.length; i++) {
      tempSkills[skillLevels[i]] = getSkillByName(skills[i]);
    }
    this.skills = tempSkills;
  }

  getStatModifier(level: number): Mod {
    const result = new Mod();
    let property: keyof Mod;
    for (property in this.statsPerLevel) {
      if (typeof this.statsPerLevel[property] == "number") {
        (result[property] as number) =
          (this.statsPerLevel[property] as number) * level;
      }
    }
    return result;
  }

  getTraits(level: number): Mod[] {
    const result: Mod[] = [];
    for (let i = 0; i <= level; i++) {
      if (
        i < this.traits.length &&
        this.traits[i] &&
        this.traits[i].name != "NONE"
      )
        result.push(this.traits[i]);
    }
    return result;
  }

  getSkills(level: number): Skill[] {
    const result: Skill[] = [];
    for (let i = 0; i <= level; i++) {
      if (
        i < this.skills.length &&
        this.skills[i] &&
        this.skills[i].name != "NONE"
      )
        result.push(this.skills[i]);
    }
    return result;
  }
}
