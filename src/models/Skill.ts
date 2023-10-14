import Character from './Character';
import { Tag, Target } from './Index';
import Item from './Item';

export default class Skill {
  public name: string;
  public description: string;
  public target: Target;
  public characterTargets: number = 1;
  public itemTargets: number = 0;
  public tags: Tag[];

  public spCost: number = 0;
  public mpCost: number = 0;

  public eligibilityChecker?: (character: Character) => boolean;
  public skillCast: (
    caster: Character,
    characterTargets: Character[],
    itemTargets: Item[]
  ) => boolean;

  constructor(
    name?: string,
    description?: string,
    target?: Target,
    tags?: Tag[],
    characterTargets?: number,
    itemTargets?: number,
    spCost?: number,
    mpCost?: number,
    eligibilityChecker?: (character: Character) => boolean,
    skillCast?: (
      caster: Character,
      characterTargets: Character[],
      itemTargets: Item[]
    ) => boolean
  ) {
    this.name = name ?? 'NONE';
    this.description = description ?? 'NONE';
    this.target = target ?? 'ANY';
    this.tags = tags ?? [];
    this.characterTargets = characterTargets ?? 1;
    this.itemTargets = itemTargets ?? 1;
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
      function (
        caster: Character,
        characterTargets: Character[],
        itemTargets: Item[]
      ) {
        if (caster || characterTargets || itemTargets) return true;
        return false;
      };
  }
}
