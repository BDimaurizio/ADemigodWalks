import Character from './Character';
import { Tag, Target } from './Index';

export default class Skill {
  public name: string;
  public description: string;
  public target: Target;
  public maxTargets: number = 1;
  public tags: Tag[];

  public spCost: number = 0;
  public mpCost: number = 0;

  public eligibilityChecker?: (character: Character) => boolean;
  public skillCast: (caster: Character, targets: Character[]) => boolean;

  constructor(
    name?: string,
    description?: string,
    target?: Target,
    tags?: Tag[],
    maxTargets?: number,
    spCost?: number,
    mpCost?: number,
    eligibilityChecker?: (character: Character) => boolean,
    skillCast?: (caster: Character, targets: Character[]) => boolean
  ) {
    this.name = name ?? 'NONE';
    this.description = description ?? 'NONE';
    this.target = target ?? 'ANY';
    this.tags = tags ?? [];
    this.maxTargets = maxTargets ?? 1;
    this.spCost = spCost ?? 0;
    this.mpCost = mpCost ?? 0;
    this.eligibilityChecker =
      eligibilityChecker ??
      function (character) {
        if (character) return true;
        return false;
      };
    this.skillCast =
      skillCast ??
      function (caster, victim) {
        if (caster || victim) return true;
        return false;
      };
  }
}
