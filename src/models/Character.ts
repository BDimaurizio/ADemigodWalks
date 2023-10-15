/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import Item from "./Item";
import Mod from "./Mod";
import Job from "./Job";
import { combineMods } from "src/Services/ModListManipulationService";
import {
  Gender,
  ImportantStatPossibility,
  ItemSlot,
  OpinionArray,
  ResistArray,
  Tag,
} from "./Index";
import Skill from "./Skill";
import { removeDuplicateTags, removeDuplicates } from "src/Services/Funcs";
import Stance from "./Stance";
import { getStanceByIndex } from "src/Resources/StanceList";
import { get2HanderDummyItem } from "src/Services/ItemService";

export default class Character {
  public name: string;
  public gender: Gender = "Male";
  public age: number = 25;
  public jobs: [Job, number][] = [];
  private tackedOnMod: Mod = new Mod(); //naturaltraits and naturalskills included, as well as temporary debuffs in the form of traits

  public currentHP: number = 1;
  public currentMP: number = 0;
  public currentSP: number = 0;
  public currentEXP: number = 0;

  public currentStance: Stance;

  public morale: number = 0;
  public opinionOfProtagonist: number = 0;
  public controlLevel: number = 0; //0 = npc or hired mercenary | 1 = ally, or someone mind controlled by you | 2 = construct, automoaton, controlled undead, etc | 3 = the player character | -1 enemy, or someone you cannot inspect

  public log: [string, Date][] = [];
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
    this.editTackedOnMod(new Mod({ Stances: [getStanceByIndex(1)] }));
    this.currentStance = getStanceByIndex(1);
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
      "Level " +
      this.jobs.reduce((partialSum, element) => partialSum + element[1], 0) +
      " ";
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
      ...combineMods(this.getAllEligibleTraitsFromList(this.traits)).Skills,
    ]);
  }

  get stances(): Stance[] {
    return removeDuplicates([
      ...this.tackedOnMod.Stances,
      ...this.equipmentStats.Stances,
      ...this.jobStats.Stances,
      ...combineMods(this.getAllEligibleTraitsFromList(this.traits)).Stances,
    ]);
  }

  get tags(): Tag[] {
    return removeDuplicateTags([
      ...this.tackedOnMod.tags,
      ...this.equipmentStats.tags,
      ...this.jobStats.tags,
      ...combineMods(this.getAllEligibleTraitsFromList(this.traits)).tags,
    ]);
  }

  get tagsWithoutTraits(): Tag[] {
    return removeDuplicateTags([
      ...this.tackedOnMod.tags,
      ...this.equipmentStats.tags,
      ...this.jobStats.tags,
    ]);
  }

  get stats(): Mod {
    console.log("performance");
    let output;
    if (this.cacheDirty) {
      console.log("performance performance");
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

    output = combineMods([
      output,
      ...this.getAllEligibleTraitsFromList(output.Traits),
    ]);

    return this.applyDerivedStats(output);
  }

  get statsWithoutTraits(): Mod {
    let output;
    if (this.cacheDirty) {
      console.log("performancet");
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
    if (output.Fortitude > 0) output.Fortitude += mod.VIT;
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
    output.Initiative += mod.AGI;
    if (output.Stealth > 0) output.Stealth += mod.AGI;
    if (output.Survival > 0) output.Survival += mod.AGI;
    //INT
    output.Arcana += mod.INT;
    output.MP += mod.INT;
    if (output.CriticalChance > 0) output.CriticalChance += mod.INT / 2;
    if (output.Crafting > 0) output.Crafting += mod.INT;
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
    if (output.Resolve > 0) output.Resolve += mod.WIL;
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
    if (output.CriticalChance > 0) output.CriticalChance += mod.LUK / 2;

    //trait-based bonuses
    //VIT
    if (this.isTraitExistAndEligible("Heroic Aura")) {
      output.Leadership += mod.VIT;
    }
    //STR

    //DEX

    //INT

    //FAI
    if (this.isTraitExistAndEligible("Righteous Cause")) {
      output.Resolve += mod.FAI;
    }
    //WIL

    //CHA

    //LUK

    return output;
  }

  public isTraitExistAndEligible(name: string): boolean {
    const traitFullList = this.traits;
    for (let i = 0; i < traitFullList.length; i++) {
      if (traitFullList[i].name == name) {
        if (
          typeof traitFullList[i].eligibilityChecker !== "undefined" &&
          traitFullList[i].eligibilityChecker!(this)
        ) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  public getAllEligibleTraitsFromList(traits: Mod[]) {
    const output = [];
    for (let i = 0; i < traits.length; i++) {
      if (
        typeof traits[i].eligibilityChecker !== "undefined" &&
        traits[i].eligibilityChecker!(this)
      ) {
        output.push(traits[i]);
      }
    }
    return output;
  }

  removeItemFromInventory = (
    item: Item,
    bypassLog: boolean = false
  ): boolean => {
    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].fullName == item.fullName) {
        this.inventory.splice(i, 1);
        if (!bypassLog) {
          this.updateLog(`${this.name} lost item: ${item.fullName}`);
        }
        return true;
      }
    }
    return false;
  };

  addItemToInventory = (items: Item[]): void => {
    this.inventory.push(...items);
    if (items.length > 1) {
      let stringBuilder = items[0].fullName;
      for (let i = 1; i < items.length; i++) {
        stringBuilder = stringBuilder + `, ${items[i].fullName}`;
      }
      this.updateLog(
        `${this.name} gained ${items.length} items: ${stringBuilder}`
      );
    } else {
      this.updateLog(`${this.name} gained item: ${items[0].fullName}`);
    }
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

  equipItemAlt = (item: Item, slot: number): boolean => {
    //0 = mainhand, 1 = offhand, -1 = 2hander
    this.cacheDirty = true;
    if (!this.removeItemFromInventory(item, true)) {
      console.log("item not in inventory", slot);
      return false;
    }
    return true;
  };

  equipItem = (item: Item): boolean => {
    this.cacheDirty = true;
    if (!this.removeItemFromInventory(item, true)) {
      console.log("item not in inventory");
      return false;
    }
    let index = 0;
    let hander2dummyrequired = false;
    switch (item.baseBodyMod.slot) {
      case "Light Weapon":
      case "Medium Weapon":
      case "Exotic Weapon":
      case "Throwing Weapon":
      case "Light Ranged Weapon":
      case "Firearm":
      case "Medium Shield":
      case "Implement":
        break;
      case "Heavy Weapon":
      case "Very Heavy Weapon":
      case "Ranged Weapon":
      case "Heavy Firearm":
      case "Heavy Shield":
        this.unequipItemByIndex(1);
        hander2dummyrequired = true;
        break;
      case "Light Shield":
        index = 1;
        break;
      case "Light Helmet":
      case "Medium Helmet":
      case "Heavy Helmet":
        index = 2;
        break;
      case "Light Armor":
      case "Medium Armor":
      case "Heavy Armor":
      case "Very Heavy Armor":
        index = 3;
        break;
      case "Gloves":
        index = 4;
        break;
      case "Boots":
        index = 5;
        break;
      case "Belt":
        index = 6;
        break;
      case "Trinket":
        if (this.checkAttunement()) {
          this.equippedTrinkets.push(item);
          this.updateLog(`${this.name} equipped item: ${item.fullName}`);
          return true;
        } else {
          this.inventory.push(item);
          return false;
        }
      default:
        return false;
    }
    //check if offhand overwriting 2hander
    if (
      index == 1 &&
      this.equippedItems[index] &&
      this.equippedItems[index]?.baseBodyMod.name == "2HanderDummyItem"
    ) {
      this.unequipItemByIndex(0);
    }
    //unequip old item
    this.unequipItemByIndex(index);
    //if new item is a 2 hander, equip the dummy item in the offhand
    if (hander2dummyrequired) {
      this.equippedItems[1] = get2HanderDummyItem();
    }
    //equip the new item
    this.equippedItems[index] = item;
    this.updateLog(`${this.name} equipped item: ${item.fullName}`);
    return true;
  };

  unequipItemByIndex = (index: number, trinket: boolean = false): boolean => {
    this.cacheDirty = true;
    if (!trinket) {
      if (
        index == 0 &&
        this.equippedItems[1] &&
        this.equippedItems[1].baseBodyMod.name == "2HanderDummyItem"
      ) {
        this.equippedItems[1] = undefined;
      }
      if (
        this.equippedItems[index] &&
        this.equippedItems[index]!.fullName != "NONE"
      ) {
        this.updateLog(
          `${this.name} unequipped item: ${this.equippedItems[index]!.fullName}`
        );
        this.inventory.push(this.equippedItems[index]!);
        this.equippedItems[index] = undefined;
        return true;
      }
    } else {
      if (
        this.equippedTrinkets[index] &&
        this.equippedTrinkets[index].fullName != "NONE"
      ) {
        this.updateLog(
          `${this.name} unequipped item: ${this.equippedTrinkets[index].fullName}`
        );
        this.inventory.push(this.equippedTrinkets[index]);
        this.equippedTrinkets.splice(index, 1);
        return true;
      }
    }
    return false;
  };

  unequipItemByItem = (item: Item): boolean => {
    this.cacheDirty = true;
    if (item.baseBodyMod.slot != "Trinket") {
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
    this.updateLog(`${this.name} gained class: ${job.name}`);
    return true;
  };

  levelUp = (job: Job, expCost: number): boolean => {
    //job, level, exp cost
    this.cacheDirty = true;
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i][0].name == job.name) {
        this.currentEXP -= expCost;
        this.jobs[i][1]++;
        this.updateLog(`${this.name} gained 1 level in ${job.name}`);
        return true;
      }
    }
    return false;
  };

  editTackedOnMod = (mod: Mod): void => {
    this.tackedOnMod = combineMods([this.tackedOnMod, mod]);
  };

  tackOnStat = (stat: ImportantStatPossibility, amount: number): void => {
    this.cacheDirty = true;
    const tack = new Mod({});
    tack[stat] = amount;
    this.editTackedOnMod(tack);
    this.updateLog(`${this.name} gained ${amount} ${stat}`);
  };

  tackOnTrait = (trait: Mod): void => {
    this.cacheDirty = true;
    const tack = new Mod({});
    tack.Traits = [trait];
    this.editTackedOnMod(tack);
    this.updateLog(`${this.name} gained trait: ${trait.name}`);
  };

  removeTackOnTrait = (name: string): boolean => {
    this.cacheDirty = true;
    let found = false;
    for (let i = 0; i < this.tackedOnMod.Traits.length; i++) {
      if (this.tackedOnMod.Traits[i].name == name) {
        found = true;
        this.tackedOnMod.Traits.splice(i, 1);
        i--;
      }
    }
    return found;
  };

  checkAttunement = (): boolean => {
    return !!(Math.trunc(this.stats.Attunement) > this.equippedTrinkets.length);
  };

  updateLog = (entry: string): void => {
    if (this.log.length > 20) {
      this.log.shift();
    }
    this.log.push([entry, new Date()]);
  };

  clearLog = (): void => {
    this.log = [];
  };

  transformItem = (index: number, newMod: Mod): void => {
    this.cacheDirty = true;
    if (this.equippedItems[index]) {
      this.equippedItems[index]!.transform(newMod);
      this.updateLog(
        `${this.name}'s ${this.equippedItems[index]!.fullName} was transformed!`
      );
    }
  };

  gainEXP = (amount: number): void => {
    this.currentEXP += amount;
    this.updateLog(`${this.name} gained ${amount} EXP`);
  };

  damage = (amount: number): void => {
    this.cacheDirty = true;
    this.currentHP += amount;
  };

  heal = (amount: number): void => {
    this.cacheDirty = true;
    this.currentHP -= amount;
  };

  changeStance = (stance: Stance): void => {
    this.cacheDirty = true;
    this.currentStance = stance;
  };

  checkEquipPossibility = (item: Item): number[] => {
    const slot: ItemSlot = item.baseBodyMod.slot;
    switch (slot) {
      case "Light Weapon":
        if (this.isTraitExistAndEligible("Dual Wielding Proficiency"))
          return [0, 1];
        break;
      case "Medium Weapon":
        if (this.isTraitExistAndEligible("Dual Wielding Mastery"))
          return [0, 1];
        break;
      case "Heavy Weapon":
        if (this.isTraitExistAndEligible("Heavy Weapon Expertise"))
          return [0, -1];
        break;
      case "Light Ranged Weapon":
        if (this.isTraitExistAndEligible("Light Ranged Mastery")) return [0, 1];
        break;
      case "Firearm":
        if (this.isTraitExistAndEligible("Firearm Mastery")) return [0, 1];
        break;
      case "Medium Shield":
        if (this.isTraitExistAndEligible("Medium Shield Proficiency"))
          return [0, 1];
        break;
      case "Heavy Shield":
        if (this.isTraitExistAndEligible("Heavy Shield Proficiency"))
          return [-1, 1];
        break;
      case "Implement":
        if (this.isTraitExistAndEligible("Implement Proficiency"))
          return [0, 1];
        break;
    }
    return [];
  };
}
