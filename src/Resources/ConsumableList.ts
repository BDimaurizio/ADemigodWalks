import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';
import { getTraitByName } from './TraitList';

const modType: ModType = 'CONSUMABLE';

const ModList: Partial<Mod>[] = [
  {
    name: 'Rations',
    description: '',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Food/I_C_Bread.png',
      import.meta.url
    ),
    slot: 'Consumable',
    tags: ['Feasts'],
  },
  {
    name: 'Scroll',
    description: 'A scroll that can be used to cast the contained spell',
    rarity: 0,
    inventoryIcon: new URL(
      'src/assets/Icons/Books/scroll_new.png',
      import.meta.url
    ),
    slot: 'Consumable',
    tags: ['Magic'],
    consume(consumer, item) {
      if (!item.computeStats.Skills) {
        return;
      }
      const skills = item.computeStats.Skills;
      skills.forEach((skill) => {
        const scrollTrait = getTraitByName('Scroll Reading: ');
        scrollTrait.Skills.push(skill);
        scrollTrait.name = scrollTrait.name + skill.name;
        consumer.tackOnTrait(scrollTrait);
      });
    },
  },
];

function getConsumableModByIndex(index: number): Mod {
  if (index < 0) index = 0;
  const result = ModList[index];
  return prepareModForExport(result, modType);
}

export function getConsumableModByName(name: string): Mod {
  const index = ModList.findIndex((element) => element.name === name);
  return getConsumableModByIndex(index);
}

export function getConsumableModByCriteria(
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
