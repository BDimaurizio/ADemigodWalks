/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import Item from './Item';
import Mod from './Mod';
import Job from './Job';
import { combineMods } from 'src/Services/ModListManipulationService';
import {
  Gender,
  ImportantStatPossibility,
  OpinionArray,
  ResistArray,
  Tag,
} from './Index';
import Skill from './Skill';
import { removeDuplicates } from 'src/Services/Funcs';

export default class Character {
  public name: string;
  public gender: Gender = 'Male';
  public age: number = 25;
  public jobs: [Job, number][] = [];
  private tackedOnMod: Mod = new Mod(); //naturaltraits and naturalskills included, as well as temporary debuffs in the form of traits

  public currentHP: number = 1;
  public currentMP: number = 0;
  public currentSP: number = 0;
  public currentEXP: number = 0;

  public morale: number = 0;
  public opinionOfProtagonist: number = 0;
  public controlLevel: number = 0; //0 = npc or hired mercenary | 1 = ally, or someone mind controlled by you | 2 = construct, automoaton, controlled undead, etc | 3 = the player character | -1 enemy, or someone you cannot inspect

  //private memories: memory[] = []

  private equippedItems: (Item | undefined)[] = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]; //0 = mainhand, 1 = offhand, 2 = head, 3 = body, 4 = hands, 5 = feet, 6 = waist
  private equippedTrinkets: Item[] = [];
  private inventory: Item[] = [];

  private cachedCombine: Mod = new Mod();
  private cacheDirty: boolean = true;

  constructor(name: string) {
    this.name = name;
  }

  get isProtagonist() {
    return this.controlLevel === 3;
  }

  get mainWeaponTags(): Tag[] {
    if (!this.equippedItems[0]) return [];
    return this.equippedItems[0].computeStats.tags;
  }

  get jobTitle(): string {
    let stringbuilder =
      'Level ' +
      this.jobs.reduce((partialSum, element) => partialSum + element[1], 0) +
      ' ';
    let index = 0;
    let max = 0;
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i][1] > max) {
        max = this.jobs[i][1];
        index = i;
      }
    }
    stringbuilder = stringbuilder + this.jobs[index][0].name;
    return stringbuilder;
  }

  get totalLevel(): number {
    let output = 0;
    for (let i = 0; i < this.jobs.length; i++) {
      output += this.jobs[i][1];
    }
    return output;
  }

  get equipmentStats(): Mod {
    const allEquippedItemMods: Mod[] = [];
    for (let i = 0; i < this.equippedItems.length; i++) {
      if (this.equippedItems[i])
        allEquippedItemMods.push(this.equippedItems[i]!.computeStats);
    }
    for (let i = 0; i < this.equippedTrinkets.length; i++) {
      if (this.equippedTrinkets[i])
        allEquippedItemMods.push(this.equippedTrinkets[i].computeStats);
    }

    return combineMods(allEquippedItemMods);
  }

  get jobStats(): Mod {
    const modList: Mod[] = [];
    const traitList: Mod[] = [];
    const skillList: Skill[] = [];
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i]) {
        modList.push(this.jobs[i][0].getStatModifier(this.jobs[i][1]));
        traitList.push(...this.jobs[i][0].getTraits(this.jobs[i][1]));
        skillList.push(...this.jobs[i][0].getSkills(this.jobs[i][1]));
      }
    }
    const output = combineMods(modList);
    output.Traits.push(...traitList);
    output.Skills.push(...skillList);
    output.Skills = removeDuplicates(output.Skills);
    output.Traits = removeDuplicates(output.Traits);
    return output;
  }

  get traits(): Mod[] {
    return removeDuplicates([
      ...this.tackedOnMod.Traits,
      ...this.equipmentStats.Traits,
      ...this.jobStats.Traits,
    ]);
  }

  get skills(): Skill[] {
    return removeDuplicates([
      ...this.tackedOnMod.Skills,
      ...this.equipmentStats.Skills,
      ...this.jobStats.Skills,
    ]);
  }

  get stats(): Mod {
    console.log('performance');
    let output;
    if (this.cacheDirty) {
      console.log('performanceFORREAL');
      output = combineMods([
        this.tackedOnMod,
        this.equipmentStats,
        this.jobStats,
      ]);
      this.cachedCombine = output;
      this.cacheDirty = false;
    } else {
      output = this.cachedCombine;
    }

    for (let i = 0; i < output.Traits.length; i++) {
      if (
        typeof output.Traits[i].eligibilityChecker !== 'undefined' &&
        output.Traits[i].eligibilityChecker!(this)
      ) {
        output = combineMods([output, output.Traits[i]]);
      }
    }

    return this.applyDerivedStats(output);
  }

  get statsWithoutTraits(): Mod {
    console.log('performance');
    let output;
    if (this.cacheDirty) {
      console.log('performanceTTT');
      output = combineMods([
        this.tackedOnMod,
        this.equipmentStats,
        this.jobStats,
      ]);
      this.cachedCombine = output;
      this.cacheDirty = false;
    } else {
      output = this.cachedCombine;
    }

    return this.applyDerivedStats(output);
  }

  private applyDerivedStats(mod: Mod): Mod {
    const OpinionTags = OpinionArray;
    const ResistTags = ResistArray;
    const output = { ...mod };
    //VIT
    output.HP += mod.VIT;
    output.SP += mod.VIT;
    if (output.PhysicalStatusResist > 0) output.PhysicalStatusResist += mod.VIT;
    //STR
    output.Attack += mod.STR;
    output.CriticalDamage += mod.STR;
    if (output.Mining > 0) output.Mining += mod.STR;
    //DEX
    output.Accuracy += mod.DEX;
    if (output.Deflect > 0) output.Deflect += mod.DEX;
    if (output.Parry > 0) output.Parry += mod.DEX;
    //AGI
    output.Evasion += mod.AGI;
    if (output.Stealth > 0) output.Stealth += mod.AGI;
    if (output.Survival > 0) output.Survival += mod.AGI;
    //INT
    output.Arcana += mod.INT;
    output.CriticalChance += mod.INT;
    output.MP += mod.INT;
    output.Crafting += mod.INT;
    //FAI
    output.Clarity += mod.FAI;
    if (output.Medicine > 0) output.Medicine += mod.FAI;
    for (let i = 0; i < OpinionTags.length; i++) {
      if (output[OpinionTags[i]] > 9) {
        output[OpinionTags[i]] += mod.FAI;
      } else if (output[OpinionTags[i]] < -9) {
        output[OpinionTags[i]] += mod.FAI / 3;
      }
    }
    //WIL
    output.Attunement += mod.WIL / 10;
    if (output.Ward > 0) output.Ward += mod.WIL;
    if (output.MentalStatusResist > 0) output.MentalStatusResist += mod.WIL;
    for (let i = 0; i < ResistTags.length; i++) {
      if (output[ResistTags[i]] > 0) {
        output[ResistTags[i]] += mod.FAI;
      }
    }
    //CHA
    output.Leadership += mod.CHA;
    output.Diplomacy += mod.CHA;
    output.Bargaining += mod.CHA;
    //LUK
    output.CriticalChance += mod.LUK;
    //trait-based bonuses
    //if (you have the trait Intimidating) mod.Leadership += mod.STR
    //etc.....

    return output;
  }

  public isTraitExistAndEligible(name: string): boolean {
    const traitFullList = this.traits;
    for (let i = 0; i < traitFullList.length; i++) {
      if (traitFullList[i].name == name) {
        if (
          typeof traitFullList[i].eligibilityChecker !== 'undefined' &&
          traitFullList[i].eligibilityChecker!(this)
        ) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  removeItemFromInventory = (item: Item): boolean => {
    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].fullName == item.fullName) {
        this.inventory.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  addItemToInventory = (items: Item[]): void => {
    this.inventory.push(...items);
  };

  getInventory = (): Item[] => {
    return this.inventory;
  };

  getEquipment = (): (Item | undefined)[] => {
    return this.equippedItems.concat(this.equippedTrinkets);
  };

  getSpecificEquipment = (slot: number): Item | undefined => {
    //0 = mainhand, 1 = offhand, 2 = head, 3 = body, 4 = hands, 5 = feet, 6 = waist
    return this.equippedItems[slot];
  };

  getTrinkets = (): Item[] => {
    return this.equippedTrinkets;
  };

  equipItem = (item: Item): boolean => {
    this.cacheDirty = true;
    if (!this.removeItemFromInventory(item)) {
      console.log('item not in inventory');
      return false;
    }
    let index = 0;
    switch (item.baseBodyMod.slot) {
      case 'Light Weapon':
      case 'Medium Weapon':
      case 'Exotic Weapon':
      case 'Throwing Weapon':
      case 'Light Ranged Weapon':
      case 'Firearm':
        break;
      case 'Heavy Weapon':
      case 'Very Heavy Weapon':
      case 'Ranged Weapon':
      case 'Heavy Firearm':
        this.unequipItemByIndex(1);
        break;
      case 'Light Shield':
      case 'Medium Shield':
      case 'Heavy Shield':
      case 'Implement':
        index = 1;
        break;
      case 'Light Helmet':
      case 'Medium Helmet':
      case 'Heavy Helmet':
        index = 2;
        break;
      case 'Light Armor':
      case 'Medium Armor':
      case 'Heavy Armor':
      case 'Very Heavy Armor':
        index = 3;
        break;
      case 'Gloves':
        index = 4;
        break;
      case 'Boots':
        index = 5;
        break;
      case 'Belt':
        index = 6;
        break;
      case 'Trinket':
        if (this.checkAttunement()) {
          this.equippedTrinkets.push(item);
          return true;
        } else {
          this.inventory.push(item);
          return false;
        }
      default:
        return false;
    }
    console.log(this.equippedItems[index]);
    this.unequipItemByIndex(index);
    this.equippedItems[index] = item; //TODO check if offhand overwriting 2hander
    console.log('equipped ' + item.fullName);
    return true;
  };

  unequipItemByIndex = (index: number, trinket: boolean = false): boolean => {
    this.cacheDirty = true;
    console.log(index);
    if (!trinket) {
      if (
        this.equippedItems[index] &&
        this.equippedItems[index]!.fullName != 'NONE'
      ) {
        console.log('unequipped ' + this.equippedItems[index]!.fullName);
        this.inventory.push(this.equippedItems[index]!);
        this.equippedItems[index] = undefined;
        return true;
      }
    } else {
      if (
        this.equippedTrinkets[index] &&
        this.equippedTrinkets[index].fullName != 'NONE'
      ) {
        this.inventory.push(this.equippedTrinkets[index]);
        this.equippedTrinkets.splice(index, 1);
        return true;
      }
    }
    return false;
  };

  unequipItemByItem = (item: Item): boolean => {
    this.cacheDirty = true;
    if (item.baseBodyMod.slot != 'Trinket') {
      const index = this.equippedItems.indexOf(item);
      if (index >= 0) {
        return this.unequipItemByIndex(index);
      }
    } else {
      const index = this.equippedTrinkets.indexOf(item);
      if (index >= 0) {
        return this.unequipItemByIndex(index, true);
      }
    }
    return false;
  };

  gainJob = (job: Job, startingLevel: number = 0): boolean => {
    this.cacheDirty = true;
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i][0].name == job.name) {
        return false;
      }
    }
    this.jobs.push([job, startingLevel]);
    return true;
  };

  levelUp = (job: Job, expCost: number): boolean => {
    //job, level, exp cost
    this.cacheDirty = true;
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i][0].name == job.name) {
        this.currentEXP -= expCost;
        this.jobs[i][1]++;
        return true;
      }
    }
    return false;
  };

  editTackedOnMod = (mod: Mod): void => {
    this.tackedOnMod = combineMods([this.tackedOnMod, mod]);
  };

  tackOnStat = (stat: ImportantStatPossibility, amount: number): void => {
    const tack = new Mod({});
    tack[stat] = amount;
    this.editTackedOnMod(tack);
  };

  tackOnTrait = (trait: Mod): void => {
    const tack = new Mod({});
    tack.Traits = [trait];
    this.editTackedOnMod(tack);
  };

  checkAttunement = (): boolean => {
    return !!(Math.trunc(this.stats.Attunement) > this.equippedTrinkets.length);
  };
}
