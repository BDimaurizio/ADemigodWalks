/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import Item from './Item';
import Mod from './Mod';
import Job from './Job';
import { combineMods } from 'src/Services/ModListManipulationService';
import { Gender, Tag } from './Index';
import Skill from './Skill';
import { removeDuplicates } from 'src/Services/Funcs';

export default class Character {
  public name: string;
  public gender: Gender = 'Male';
  public age: number = 25;
  public jobs: [Job, number][] = [];
  public permanentMod: Mod = new Mod(); //naturaltraits and naturalskills included

  public currentHP: number = 1;
  public currentMP: number = 0;
  public currentSP: number = 0;
  public currentEXP: number = 0;

  public equippedItems: (Item | undefined)[] = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]; //0 = mainhand, 1 = offhand, 2 = head, 3 = body, 4 = hands, 5 = feet, 6 = waist
  public equippedTrinkets: Item[] = [];
  public inventory: Item[] = [];

  constructor(name: string) {
    this.name = name;
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
    stringbuilder =
      stringbuilder +
      this.jobs[index][0].name +
      ' (' +
      this.currentEXP +
      ' unspent EXP)';
    return stringbuilder;
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
      ...this.permanentMod.Traits,
      ...this.equipmentStats.Traits,
      ...this.jobStats.Traits,
    ]);
  }

  get skills(): Skill[] {
    return removeDuplicates([
      ...this.permanentMod.Skills,
      ...this.equipmentStats.Skills,
      ...this.jobStats.Skills,
    ]);
  }

  get stats(): Mod {
    let output = combineMods([
      this.permanentMod,
      this.equipmentStats,
      this.jobStats,
    ]);
    const traitsToAdd: Mod[] = [];
    for (let i = 0; i < output.Traits.length; i++) {
      if (
        typeof output.Traits[i].eligibilityChecker !== 'undefined' &&
        output.Traits[i].eligibilityChecker!(this)
      ) {
        traitsToAdd.push(output.Traits[i]);
      }
    }
    if (traitsToAdd.length > 0) {
      output = combineMods([output, ...traitsToAdd]);
    }
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

  equipItem = (item: Item): boolean => {
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
        this.equippedTrinkets.push(item);
        return true;
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
}
