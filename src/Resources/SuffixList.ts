import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'SUFFIX';

const ModList: Partial<Mod>[] = [
  {
    name: 'of the pyre',
    description: 'spicy',
    rarity: 0,
    tags: ['Flame'],
  },
];

export function getSuffixModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getSuffixModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getSuffixModByIndex(index);
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
