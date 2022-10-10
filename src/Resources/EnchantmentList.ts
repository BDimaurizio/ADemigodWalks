import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'ENCHANTMENT';

const ModList: Partial<Mod>[] = [
  {
    name: 'vorpalized',
    description: 'shor[',
    rarity: 0,
    tags: ['Piercing'],
  },
];

export function getEnchantmentModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getEnchantmentModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getEnchantmentModByIndex(index);
}

export function getEnchantmentModByCriteria(
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
