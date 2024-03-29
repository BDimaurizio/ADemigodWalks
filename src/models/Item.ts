import { combineMods } from "src/Services/ModListManipulationService";
import Mod from "./Mod";
import Character from "./Character";
import { getBaseModByIndex } from "src/Resources/BaseList";
import { AttackType } from "./Index";

export default class Item {
  //properties
  public BaseMods: Mod[] = []; //[0] = blurse, [1] = quality, [2] = material, [3] = prefix, [4] = base, [5] = suffix
  public SocketMods: Mod[] = [];
  public RuneMods: Mod[] = [];
  public EnchantmentMods: Mod[] = [];
  public PlusMods: Mod[] = [];

  private cachedCompute: Mod = new Mod();
  private cacheDirty: boolean = true;

  //constructor
  constructor(modArray: Mod[]) {
    for (let i = 0; i < modArray.length; i++) {
      this.addModToItem(modArray[i]);
    }
    this.cacheDirty = true;
  }

  get baseBodyMod(): Mod {
    if (this.BaseMods[4]) {
      return this.BaseMods[4];
    } else {
      this.addModToItem(getBaseModByIndex(0));
      return this.BaseMods[4];
    }
  }

  get materialName(): string {
    if (this.BaseMods[2]) {
      return this.BaseMods[2].name;
    } else {
      return "";
    }
  }

  get fullName(): string {
    let stringBuilder = "";

    if (this.BaseMods[0] && this.BaseMods[0].modType == "BLESSING") {
      stringBuilder = stringBuilder + "Blessed ";
    } else if (this.BaseMods[0] && this.BaseMods[0].modType == "CURSE") {
      stringBuilder = stringBuilder + "Cursed ";
    }
    for (let i = 1; i < this.BaseMods.length; i++) {
      if (this.BaseMods[i]) {
        stringBuilder = stringBuilder + this.BaseMods[i].name + " ";
      }
    }
    stringBuilder = stringBuilder.trim();

    return stringBuilder;
  }

  get fullNameWithoutMateiral(): string {
    let stringBuilder = "";

    if (this.BaseMods[0] && this.BaseMods[0].modType == "BLESSING") {
      stringBuilder = stringBuilder + "Blessed ";
    } else if (this.BaseMods[0] && this.BaseMods[0].modType == "CURSE") {
      stringBuilder = stringBuilder + "Cursed ";
    }
    for (let i = 1; i < this.BaseMods.length; i++) {
      if (this.BaseMods[i] && i != 2) {
        stringBuilder = stringBuilder + this.BaseMods[i].name + " ";
      }
    }
    stringBuilder = stringBuilder.trim();

    return stringBuilder;
  }

  get computeStats(): Mod {
    if (!this.cacheDirty) {
      return this.cachedCompute;
    }
    console.log("performance compute");
    let modList = this.BaseMods.concat(
      this.SocketMods,
      this.RuneMods,
      this.EnchantmentMods,
      this.PlusMods
    );
    modList = modList.filter(Boolean);

    const stats = combineMods(modList);

    if (this.BaseMods[4]) {
      stats[this.BaseMods[4].importantA] += stats.importantAval;
      stats[this.BaseMods[4].importantB] += stats.importantBval;
      stats[this.BaseMods[4].importantC] += stats.importantCval;
    }

    stats.slot = this.BaseMods[4].slot;
    stats.description = "TODO add description";

    this.cachedCompute = stats;
    this.cacheDirty = false;
    return stats;
  }

  get expectedPrice(): number {
    return Math.round(
      this.computeStats.price * (this.computeStats.priceMultiplier * 0.1 + 1)
    );
  }

  get rarityString(): string {
    const r = this.computeStats.rarity;
    if (r < 2) return "Common";
    else if (r < 4) return "Uncommon";
    else if (r < 6) return "Uncommon";
    else if (r < 8) return "Uncommon";
    else if (r < 10) return "Rare";
    else if (r < 15) return "Rare";
    else if (r < 20) return "Rare";
    else if (r < 30) return "Epic";
    else if (r < 45) return "Epic";
    else if (r < 65) return "Epic";
    else if (r < 85) return "Legendary";
    else if (r < 100) return "Legendary";
    else if (r >= 100) return "Legendary";
    return "";
  }

  get rarityColor(): string {
    const r = this.computeStats.rarity;
    if (r < 0) return "text-brown-10";
    else if (r < 1) return "text-grey-10";
    else if (r < 2) return "text-blue-grey-10";
    else if (r < 4) return "text-blue-10";
    else if (r < 6) return "text-cyan-8";
    else if (r < 8) return "text-green-8";
    else if (r < 10) return "text-orange-10";
    else if (r < 15) return "text-deep-orange";
    else if (r < 20) return "text-red";
    else if (r < 30) return "text-purple";
    else if (r < 45) return "text-deep-purple";
    else if (r < 65) return "text-deep-purple-10";
    else if (r < 85) return "text-pink-10";
    else if (r < 100) return "text-pink-10";
    else if (r >= 100) return "text-pink-10";
    return "";
  }

  get inventoryIcon(): URL {
    //custom icon logic

    //otherwise, just serve up the base icon
    return this.baseBodyMod.inventoryIcon;
  }

  get attackType(): AttackType[] {
    let modList = this.BaseMods.concat(
      this.SocketMods,
      this.RuneMods,
      this.EnchantmentMods,
      this.PlusMods
    );
    modList = modList.filter(Boolean);
    const typeList: AttackType[] = [];
    modList.forEach((element) => {
      if (element.attackType) {
        typeList.push(element.attackType);
      }
    });
    return typeList;
  }

  get isEquipment(): boolean {
    if (
      this.baseBodyMod.modType == "MISC" ||
      this.baseBodyMod.modType == "CONSUMABLE" ||
      this.baseBodyMod.modType == "QUEST"
    ) {
      return false;
    }
    return true;
  }

  private addModToItem(newMod: Mod): void {
    this.cacheDirty = true;
    if (newMod.modType == "BLESSING") {
      this.BaseMods[0] = newMod;
    } else if (newMod.modType == "CURSE") {
      this.BaseMods[0] = newMod;
    } else if (newMod.modType == "QUALITY") {
      this.BaseMods[1] = newMod;
    } else if (newMod.modType == "MATERIAL") {
      this.BaseMods[2] = newMod;
    } else if (newMod.modType == "PREFIX") {
      this.BaseMods[3] = newMod;
    } else if (
      newMod.modType == "BASE" ||
      newMod.modType == "MISC" ||
      newMod.modType == "CONSUMABLE" ||
      newMod.modType == "QUEST"
    ) {
      this.BaseMods[4] = newMod;
    } else if (newMod.modType == "SUFFIX") {
      this.BaseMods[5] = newMod;
    } else if (newMod.modType == "SOCKET") {
      this.SocketMods.push(newMod);
    } else if (newMod.modType == "RUNE") {
      this.RuneMods.push(newMod);
    } else if (newMod.modType == "ENCHANTMENT") {
      this.EnchantmentMods.push(newMod);
    } else if (newMod.modType == "PLUS") {
      this.PlusMods.push(newMod);
    }
  }

  public transform(newMod: Mod): void {
    this.addModToItem(newMod);
    this.cacheDirty = true;
  }

  public consume(consumer: Character, user?: Character): void {
    if (!user) {
      user = consumer;
    }

    this.BaseMods.forEach((mod) => {
      if (mod.modType == "CONSUMABLE" && mod.consume) {
        mod.consume(consumer, this);
      }
    });
    this.SocketMods.forEach((mod) => {
      if (mod.modType == "CONSUMABLE" && mod.consume) {
        mod.consume(consumer, this);
      }
    });
    this.RuneMods.forEach((mod) => {
      if (mod.modType == "CONSUMABLE" && mod.consume) {
        mod.consume(consumer, this);
      }
    });
    this.EnchantmentMods.forEach((mod) => {
      if (mod.modType == "CONSUMABLE" && mod.consume) {
        mod.consume(consumer, this);
      }
    });
    this.PlusMods.forEach((mod) => {
      if (mod.modType == "CONSUMABLE" && mod.consume) {
        mod.consume(consumer, this);
      }
    });

    //useable-related traits
    let consume: boolean = this.baseBodyMod.modType == "CONSUMABLE";

    if (
      this.baseBodyMod.name == "Scroll" &&
      consumer.isTraitExistAndEligible("Sage's Touch")
    ) {
      const roll =
        Math.random() * 50 + Math.log(Math.abs(consumer.stats.INT) + 1) * 4;
      if (roll > 45) {
        consume = false;
      }
    }
    if (
      this.baseBodyMod.name == "Scroll" &&
      consumer.isTraitExistAndEligible("Power-Hungry")
    ) {
      consumer.gainEXP(10);
    }

    //remove the item if its a consumable
    if (consume) {
      user.removeItemFromInventory(this);
    }
  }
}
