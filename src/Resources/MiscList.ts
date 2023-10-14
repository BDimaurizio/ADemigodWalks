import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'MISC';

const ModList: Partial<Mod>[] = [
  {
    name: 'Lucky Coin',
    description:
      "A shiny coin you found on the ground many years ago. It's tarnish implies it contains some silver.",
    rarity: 0,
    price: 20,
    inventoryIcon: new URL(
      'src/assets/Icons/Items/I_SilverCoin.png',
      import.meta.url
    ),
    slot: 'Item',
    tags: ['Commerce', 'METAL'],
  },
  {
    name: 'Rope',
    description: 'A Length of sturdy rope',
    rarity: 0,
    price: 20,
    inventoryIcon: new URL('src/assets/Icons/Items/rope.png', import.meta.url),
    slot: 'Item',
    tags: [],
  },
];

export function getMiscModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getMiscModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getMiscModByIndex(index);
}

export function getMiscModByCriteria(
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