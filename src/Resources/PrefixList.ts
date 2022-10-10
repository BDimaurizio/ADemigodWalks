import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'PREFIX';

const ModList: Partial<Mod>[] = [
  {
    name: 'ritual',
    description: 'rrrrrrr',
    rarity: 0,
    tags: ['WOOD'],
  },
];

export function getPrefixModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getPrefixModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getPrefixModByIndex(index);
}

export function getPrefixModByCriteria(
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
