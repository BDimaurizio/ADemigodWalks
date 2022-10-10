import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'TRAIT';

const ModList: Partial<Mod>[] = [
  {
    name: 'Healthy Time',
    description: 'hehe',
    rarity: 0,
    CHA: 99,
    tags: ['Feasts'],
    eligibilityChecker(character) {
      if (character.currentHP > 5) return true;
      return false;
    },
  },
  {
    name: 'Trait 2',
    description: 'hehe',
    rarity: 0,
    Crafting: 555,
    tags: ['TAILORING'],
    eligibilityChecker(character) {
      if (character.currentHP < 5) return true;
      return false;
    },
  },
];

export function getTraitByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getTraitByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
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
    tags,
    minRarity,
    maxRarity,
    exclusionTags,
    mustHaveTags
  );
}
