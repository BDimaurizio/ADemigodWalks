import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'BLESSING';

const ModList: Partial<Mod>[] = [
  {
    name: 'blessoig',
    description: 'Blessing',
    rarity: 0,
    tags: ['WOOD'],
  },
];

export function getBlessingModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getBlessingModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getBlessingModByIndex(index);
}

export function getBlessingModByCriteria(
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
