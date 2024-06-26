import { Tag } from "src/models/Index";
import Item from "src/models/Item";
import Mod from "src/models/Mod";
import {
  getBaseModByCriteria,
  getBaseModByIndex,
  getBaseModByName,
} from "src/Resources/BaseList";
import { getBlessingModByName } from "src/Resources/BlessingList";
import { getConsumableModByName } from "src/Resources/ConsumableList";
import { getCurseModByName } from "src/Resources/CurseList";
import { getEnchantmentModByName } from "src/Resources/EnchantmentList";
import {
  getMaterialModByCriteria,
  getMaterialModByName,
} from "src/Resources/MaterialList";
import { getMiscModByName } from "src/Resources/MiscList";
import { getPlusModByName } from "src/Resources/PlusList";
import { getPrefixModByName } from "src/Resources/PrefixList";
import {
  //getQualityModByCriteria,
  getQualityModByName,
} from "src/Resources/QualityList";
import { getRuneModByName } from "src/Resources/RuneList";
import { getSocketModByName } from "src/Resources/SocketList";
import { getSuffixModByName, getSuffixOfSpell } from "src/Resources/SuffixList";

export function testItemArray(howMany: number): Item[] {
  const output: Item[] = [];
  for (let i = 0; i < howMany; i++) {
    output.push(generateRandomCommonItem());
  }
  return output;
}

export function generateRandomCommonItem(): Item {
  const base = getBaseModByCriteria([], 0, 9);
  return new Item([
    base,
    getMaterialModByCriteria(getAllowedMaterialsByBase(base), -2, 999),
    //getQualityModByCriteria([], -2, 999),
  ]);
}

export function getSpecificItem(MODS: Mod[]): Item {
  const output = new Item(MODS);
  if (!output.baseBodyMod) {
    console.log("missing base");
  }
  //TODO validate
  return output;
}

export function get2HanderDummyItem(): Item {
  return new Item([getBaseModByIndex(1)]);
}

//base            ba=
//blessing        bl=
//consumable      co=
//curse           cu=
//enchantment     en=
//material        ma=
//misc            mi=
//plus            pl=
//prefix          pr=
//quality         qu=
//rune            ru=
//socket          so=
//suffix          su=
//suffix by spell sp=

export function geti(
  itemString: string,
  additionalMods?: Mod[],
  autoSelectMaterial?: boolean
): Item {
  const substringMods = itemString.split("=");
  const outputMods: Mod[] = [];

  for (let i = 0; i < substringMods.length; i += 2) {
    outputMods.push(parseSubstringMod(substringMods[i], substringMods[i + 1]));
  }
  if (additionalMods) {
    additionalMods.forEach((element) => {
      outputMods.push(element);
    });
  }
  if (autoSelectMaterial) {
    let base;
    for (let i = 0; i < outputMods.length; i++) {
      if (outputMods[i].modType == "BASE") {
        base = outputMods[i];
        break;
      }
    }
    if (base) {
      outputMods.push(
        getMaterialModByCriteria(getAllowedMaterialsByBase(base), -2, 2)
      );
    }
  }

  return getSpecificItem(outputMods);
}

function parseSubstringMod(keyword: string, modword: string): Mod {
  switch (keyword.substring(0, 2)) {
    case "ba": //base
      return getBaseModByName(modword);
    case "bl": //blessing
      return getBlessingModByName(modword);
    case "co": //consumable
      return getConsumableModByName(modword);
    case "cu": //curse
      return getCurseModByName(modword);
    case "en": //enchantment
      return getEnchantmentModByName(modword);
    case "ma": //material
      return getMaterialModByName(modword);
    case "mi": //misc
      return getMiscModByName(modword);
    case "pl": //plus
      return getPlusModByName(modword);
    case "pr": //prefix
      return getPrefixModByName(modword);
    case "qu": //quality
      return getQualityModByName(modword);
    case "ru": //rune
      return getRuneModByName(modword);
    case "so": //socket
      return getSocketModByName(modword);
    case "su": //suffix
      return getSuffixModByName(modword);
    case "sp": //suffix by spell
      return getSuffixOfSpell(modword);
  }
  return new Mod();
}

function getAllowedMaterialsByBase(base: Mod): Tag[] {
  const output: Tag[] = [];
  for (let i = 0; i < base.tags.length; i++) {
    if (base.tags[i].slice(0, 6) == "allow_") {
      output.push(base.tags[i].slice(6) as Tag);
    }
  }
  return output;
}
