import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'TRAIT';

//reminder: do NOT call character.stats in eligibilitychecker. call character.statsWithoutTraits instead

const ModList: Partial<Mod>[] = [
  {
    name: 'Healthy Time',
    description: 'helthy time trait descriptionnnnn',
    rarity: 0,
    HP: 99,
    tags: ['Feasts'],
    eligibilityChecker(character) {
      if (character.statsWithoutTraits.VIT > 5) return true;
      return false;
    },
  },
  {
    name: 'Trait 2',
    description: 'trait 2 example description - this trait gives +10 crafting',
    rarity: 0,
    Crafting: 10,
    tags: [],
    eligibilityChecker(character) {
      if (character.currentHP < 5) return true;
      return false;
    },
  },
  {
    name: 'Hat Wearer',
    description: 'a trait that gives you +10 INT while wearing a hat',
    rarity: 0,
    INT: 10,
    tags: ['TAILORING'],
    eligibilityChecker(character) {
      if (character.equippedItems[2]) return true;
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
    tags, //oneofthese
    minRarity,
    maxRarity,
    exclusionTags,
    mustHaveTags
  );
}
