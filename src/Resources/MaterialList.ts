import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'MATERIAL';

const ModList: Partial<Mod>[] = [
  {
    name: 'Driftwood',
    description:
      'This item is cobbled together from pieces of deteriorating driftwood.',
    rarity: 0,
    price: 55,
    priceMultiplier: 3,
    tags: ['WOOD'],
  },
  {
    name: 'Wood',
    description: 'material',
    rarity: 0,
    ChaosResist: 5,
    price: 3,
    priceMultiplier: 99,
    tags: ['WOOD'],
  },
  {
    name: 'Oldwood',
    description: 'material',
    rarity: 0,
    ChaosResist: 8,
    price: 20,
    tags: ['WOOD'],
  },
  {
    name: 'Redwood',
    description: 'material',
    rarity: 0,
    ChaosResist: 99,
    tags: ['WOOD'],
  },
  {
    name: 'Ironwood',
    description: 'material',
    rarity: 0,
    ChaosResist: -7,
    tags: ['WOOD'],
  },
  {
    name: 'Blackwood',
    description: 'material',
    rarity: 1,
    ChaosResist: -9,
    tags: ['WOOD'],
  },
  {
    name: 'Whitewood',
    description: 'material',
    rarity: 1,
    ChaosResist: -1000,
    tags: ['WOOD'],
  },
  {
    name: 'Bloodwood',
    description: 'material',
    rarity: 1,
    ChaosResist: 1,
    tags: ['WOOD'],
  },
  {
    name: 'Thornwood',
    description: 'material',
    rarity: 1,
    ChaosResist: 11,
    tags: ['WOOD'],
  },
  {
    name: 'Polypore',
    description: 'This item is carved from a spongey wood inhabited by fungus',
    rarity: 1,
    ChaosResist: 22,
    tags: ['WOOD'],
  },
];

export function getMaterialModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getMaterialModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getMaterialModByIndex(index);
}

export function getMaterialModByCriteria(
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
