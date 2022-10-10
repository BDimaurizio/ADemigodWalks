/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { ModType, Tag } from 'src/models/Index';
import Mod from 'src/models/Mod';

function criterionizeArray( //valid if at least ONE OF the tags is matching
  array: Partial<Mod>[],
  tags: Tag[],
  minRarity: number,
  maxRarity: number
): Partial<Mod>[] {
  const output: Partial<Mod>[] = [];
  for (let i = array.length - 1; i >= 0; i--) {
    if (
      (tags.length < 1 || tags.some((r) => array[i].tags!.includes(r))) &&
      array[i].rarity! >= minRarity &&
      array[i].rarity! <= maxRarity
    ) {
      output.push(array[i]);
    }
  }
  return output;
}

function criterionizeArrayMustHave(
  array: Partial<Mod>[],
  requiredTag: Tag
): Partial<Mod>[] {
  const output = array.filter((mod) => {
    return mod.tags && mod.tags.includes(requiredTag);
  });
  return output;
}

function criterionizeArrayExclude(
  array: Partial<Mod>[],
  excludedTag: Tag
): Partial<Mod>[] {
  const output = array.filter((mod) => {
    return !mod.tags || mod.tags.length < 1 || !mod.tags.includes(excludedTag);
  });
  return output;
}

export function prepareModForExport(mod: Partial<Mod>, modType: ModType): Mod {
  if (!mod) {
    return new Mod();
  }
  mod.modType = modType;
  return new Mod(mod);
}

export function getModByCriteria(
  ModList: Partial<Mod>[],
  modType: ModType,
  tags: Tag[],
  minRarity: number,
  maxRarity: number,
  exclusionTags: Tag[] = [],
  mustHaveTags: Tag[] = []
): Mod {
  let filteredArray = criterionizeArray(ModList, tags, minRarity, maxRarity);
  for (let i = 0; i < exclusionTags.length; i++) {
    filteredArray = criterionizeArrayExclude(filteredArray, exclusionTags[i]);
  }
  for (let i = 0; i < mustHaveTags.length; i++) {
    filteredArray = criterionizeArrayMustHave(filteredArray, mustHaveTags[i]);
  }
  return prepareModForExport(
    filteredArray[Math.floor(Math.random() * filteredArray.length)],
    modType
  );
}

export function combineMods(modList: Mod[]): Mod {
  const output = new Mod({ modType: '_CALC_' });
  modList = modList.filter(Boolean);

  let property: keyof Mod;
  for (property in output) {
    if (typeof output[property] == 'number') {
      for (let i = 0; i < modList.length; i++) {
        (output[property] as number) += modList[i][property] as number;
      }
    }
  }

  for (let i = 0; i < modList.length; i++) {
    output.aspects.push(...modList[i].aspects);
    output.Skills.push(...modList[i].Skills);
    output.Traits.push(...modList[i].Traits);
    output.tags.push(...modList[i].tags);
  }
  output.aspects = [...new Set(output.aspects)];
  output.Skills = [...new Set(output.Skills)];
  output.Traits = [...new Set(output.Traits)];
  output.tags = [...new Set(output.tags)];

  return output;
}
