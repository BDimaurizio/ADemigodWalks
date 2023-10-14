import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';

const modType: ModType = 'BASE';

const ModList: Partial<Mod>[] = [
  {
    name: 'Dagger',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Weapons/Dagger.png',
      import.meta.url
    ),
    slot: 'Light Weapon',
    tags: ['Piercing', 'Blade', 'Weapon'],
  },
  {
    name: 'Club',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Weapons/Club.png',
      import.meta.url
    ),
    slot: 'Medium Weapon',
    tags: ['Weapon', 'Blunt'],
  },
  {
    name: 'Axe',
    description: '',
    rarity: 0,
    inventoryIcon: new URL('src/assets/Icons/Weapons/Axe.png', import.meta.url),
    slot: 'Heavy Weapon',
    tags: ['Weapon', 'Blade'],
  },
  {
    name: 'Greatsword',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Weapons/VHWeapon.png',
      import.meta.url
    ),
    slot: 'Very Heavy Weapon',
    tags: ['Weapon', 'Blade'],
  },
  {
    name: 'Cap',
    description: '',
    rarity: 0,
    inventoryIcon: new URL('src/assets/Icons/Helmets/Cap.png', import.meta.url),
    slot: 'Light Helmet',
    tags: [],
  },
  {
    name: 'Helm',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Helmets/Helm.png',
      import.meta.url
    ),
    slot: 'Medium Helmet',
    tags: [],
  },
  {
    name: 'Cloak',
    description: '',
    rarity: 0,
    inventoryIcon: new URL('src/assets/Icons/Armor/Cloak.png', import.meta.url),
    slot: 'Light Armor',
    tags: [],
  },
  {
    name: 'Cape',
    description: '',
    rarity: 0,
    inventoryIcon: new URL('src/assets/Icons/Armor/Cloak.png', import.meta.url),
    slot: 'Light Armor',
    tags: ['Cape'],
  },
  {
    name: 'Jerkin',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Armor/Jerkin.png',
      import.meta.url
    ),
    slot: 'Medium Armor',
    tags: [],
  },
  {
    name: 'Chainmail',
    description: '',
    rarity: 0,
    inventoryIcon: new URL('src/assets/Icons/Armor/Armor.png', import.meta.url),
    slot: 'Heavy Armor',
    tags: ['METAL-SPECIFIC'],
  },
  {
    name: 'Buckler',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Shields/Buckler.png',
      import.meta.url
    ),
    slot: 'Light Shield',
    tags: [],
  },
  {
    name: 'Kite Shield',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Shields/Kite.png',
      import.meta.url
    ),
    slot: 'Medium Shield',
    tags: [],
  },
  {
    name: 'Tower Shield',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Shields/Tower.png',
      import.meta.url
    ),
    slot: 'Heavy Shield',
    tags: [],
  },
  {
    name: 'Gloves',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Gloves/Gloves.png',
      import.meta.url
    ),
    slot: 'Gloves',
    tags: [],
  },
  {
    name: 'Boots',
    description: '',
    rarity: 0,
    inventoryIcon: new URL('src/assets/Icons/Boots/Boots.png', import.meta.url),
    slot: 'Boots',
    tags: [],
  },
  {
    name: 'Belt',
    description: '',
    rarity: 0,
    inventoryIcon: new URL('src/assets/Icons/Items/Belt.png', import.meta.url),
    slot: 'Belt',
    tags: [],
  },
  {
    name: 'Ring',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Trinkets/Ring1.png',
      import.meta.url
    ),
    slot: 'Trinket',
    tags: [],
  },
  {
    name: 'Amulet',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Trinkets/Ac_Necklace02.png',
      import.meta.url
    ),
    slot: 'Trinket',
    tags: [],
  },
  {
    name: 'Bracelet',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Trinkets/Ac_Ring02.png',
      import.meta.url
    ),
    slot: 'Trinket',
    tags: [],
  },
  {
    name: 'Orb',
    description: '',
    rarity: 0,
    importantA: 'WIL',
    WIL: 1,
    inventoryIcon: new URL('src/assets/Icons/Gems/redOrb.png', import.meta.url),
    slot: 'Implement',
    tags: [],
  },
  {
    name: 'Robes',
    description: '',
    rarity: 0,
    importantA: 'FAI',
    importantB: 'Clarity',
    Clarity: 1,
    inventoryIcon: new URL(
      'src/assets/Icons/Armor/cloak_2.png',
      import.meta.url
    ),
    slot: 'Light Armor',
    tags: [],
  },
  {
    name: 'Quarterstaff',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Weapons/W_Staff01.png',
      import.meta.url
    ),
    slot: 'Heavy Weapon',
    tags: ['Weapon', 'Blunt'],
  },
  {
    name: 'Wand',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Weapons/wand_2.png',
      import.meta.url
    ),
    slot: 'Implement',
    tags: ['Magic'],
  },
  {
    name: 'Tunic',
    description: '',
    rarity: 0,
    importantA: 'STR',
    importantB: 'Accuracy',
    inventoryIcon: new URL(
      'src/assets/Icons/Armor/A_Clothing02.png',
      import.meta.url
    ),
    slot: 'Light Armor',
    tags: [],
  },
];

export function getBaseModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getBaseModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getBaseModByIndex(index);
}

export function getBaseModByCriteria(
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
