import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';
import {
  getModByCriteria,
  prepareModForExport,
} from 'src/Services/ModListManipulationService';
import { getSkillByName } from './SkillList';

const modType: ModType = 'SUFFIX';

const ModList: Partial<Mod>[] = [
  {
    name: 'of Power',
    description: 'It makes you feel more powerful just by holding it',
    importantAval: 1,
    STR: 1,
    rarity: 1,
    tags: ['Destruction', 'Battle'],
  },
  {
    name: 'of Power Enhance',
    description: 'wooble',
    Skills: [getSkillByName('Power Enhance')],
    tags: ['Destruction', 'Battle'],
  },
  {
    name: 'of Vital Blessing',
    description: 'wooble',
    Skills: [getSkillByName('Vital Blessing')],
    tags: ['Destruction', 'Battle'],
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
