import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'RUNE';

const ModList: Partial<Mod>[] = [
  {
    name: 'The Agnostic',
    description: 'projecvfromcurse',
    rarity: 0,
    tags: ['WOOD'],
  },
];

export function getRuneModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getRuneModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getRuneModByIndex(index);
}

export function getRuneModByCriteria(
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
