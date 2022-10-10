import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'SOCKET';

const ModList: Partial<Mod>[] = [
  {
    name: 'ruby',
    description: 'fcsng',
    rarity: 0,
    tags: ['WOOD'],
  },
];

export function getSocketModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getSocketModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getSocketModByIndex(index);
}

export function getSocketModByCriteria(
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
