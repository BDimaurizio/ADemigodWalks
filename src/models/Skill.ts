import Character from './Character';
import { Tag, Target } from './Index';

export default class Skill {
  public name: string;
  public description: string;
  public target: Target;
  public maxTargets: number = 1;
  public tags: Tag[];
  public skillCast: (caster: Character, targets: Character[]) => boolean;

  constructor(
    name?: string,
    description?: string,
    target?: Target,
    tags?: Tag[],
    skillCast?: (caster: Character, targets: Character[]) => boolean
  ) {
    this.name = name ?? 'NONE';
    this.description = description ?? 'NONE';
    this.target = target ?? 'ANY';
    this.tags = tags ?? [];
    this.skillCast =
      skillCast ??
      function (caster, victim) {
        if (caster || victim) return true;
        return false;
      };
  }
}
