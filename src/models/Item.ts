import { combineMods } from 'src/Services/ModListManipulationService';
import Mod from './Mod';

export default class Item {
  //properties
  public BaseMods: Mod[] = []; //[0] = blurse, [1] = quality, [2] = material, [3] = prefix, [4] = base, [5] = suffix
  public SocketMods: Mod[] = [];
  public RuneMods: Mod[] = [];
  public EnchantmentMods: Mod[] = [];
  public PlusMods: Mod[] = [];

  //constructor
  constructor(modArray: Mod[]) {
    for (let i = 0; i < modArray.length; i++) {
      if (modArray[i].modType == 'BLESSING') {
        this.BaseMods[0] = modArray[i];
      } else if (modArray[i].modType == 'CURSE') {
        this.BaseMods[0] = modArray[i];
      } else if (modArray[i].modType == 'QUALITY') {
        this.BaseMods[1] = modArray[i];
      } else if (modArray[i].modType == 'MATERIAL') {
        this.BaseMods[2] = modArray[i];
      } else if (modArray[i].modType == 'PREFIX') {
        this.BaseMods[3] = modArray[i];
      } else if (
        modArray[i].modType == 'BASE' ||
        modArray[i].modType == 'MISC' ||
        modArray[i].modType == 'QUEST'
      ) {
        this.BaseMods[4] = modArray[i];
      } else if (modArray[i].modType == 'SUFFIX') {
        this.BaseMods[5] = modArray[i];
      } else if (modArray[i].modType == 'SOCKET') {
        this.SocketMods.push(modArray[i]);
      } else if (modArray[i].modType == 'RUNE') {
        this.RuneMods.push(modArray[i]);
      } else if (modArray[i].modType == 'ENCHANTMENT') {
        this.EnchantmentMods.push(modArray[i]);
      } else if (modArray[i].modType == 'PLUS') {
        this.PlusMods.push(modArray[i]);
      }
    }
  }

  get baseBodyMod(): Mod {
    if (this.BaseMods[4]) return this.BaseMods[4];
    return new Mod();
  }

  //functions
  get fullName(): string {
    let stringBuilder = '';

    if (this.BaseMods[0] && this.BaseMods[0].modType == 'BLESSING') {
      stringBuilder = stringBuilder + 'Blessed ';
    } else if (this.BaseMods[0] && this.BaseMods[0].modType == 'CURSE') {
      stringBuilder = stringBuilder + 'Cursed ';
    }
    for (let i = 1; i < this.BaseMods.length; i++) {
      if (this.BaseMods[i]) {
        stringBuilder = stringBuilder + this.BaseMods[i].name + ' ';
      }
    }
    stringBuilder = stringBuilder.trim();

    return stringBuilder;
  }

  get computeStats(): Mod {
    let modList = this.BaseMods.concat(
      this.SocketMods,
      this.RuneMods,
      this.EnchantmentMods,
      this.PlusMods
    );
    modList = modList.filter(Boolean);

    const stats = combineMods(modList);

    if (this.BaseMods[4]) {
      stats[this.BaseMods[4].importantA] += this.BaseMods[4].importantAval;
      stats[this.BaseMods[4].importantB] += this.BaseMods[4].importantBval;
      stats[this.BaseMods[4].importantC] += this.BaseMods[4].importantCval;
    }

    stats.slot = this.BaseMods[4].slot;
    stats.description = 'TODO add description';

    return stats;
  }

  get expectedPrice(): number {
    return Math.round(
      this.computeStats.price * (this.computeStats.priceMultiplier * 0.1 + 1)
    );
  }

  get rarityString(): string {
    const r = this.computeStats.rarity;
    if (r < 2) return 'Common';
    else if (r < 4) return 'Uncommon';
    else if (r < 6) return 'Super Uncommon';
    else if (r < 8) return 'Ultra Uncommon';
    else if (r < 10) return 'Rare';
    else if (r < 15) return 'Super Rare';
    else if (r < 20) return 'Ultra Rare';
    else if (r < 30) return 'Epic';
    else if (r < 45) return 'Super Epic';
    else if (r < 65) return 'Ultra Epic';
    else if (r < 85) return 'Legendary';
    else if (r < 100) return 'Super Legendary';
    else if (r >= 100) return 'Ultra Legendary';
    return 'Unknown';
  }

  get rarityColor(): string {
    const r = this.computeStats.rarity;
    if (r < 0) return 'text-brown-10';
    else if (r < 1) return 'text-grey-10';
    else if (r < 2) return 'text-blue-grey-10';
    else if (r < 4) return 'text-blue-10';
    else if (r < 6) return 'text-cyan-8';
    else if (r < 8) return 'text-green-8';
    else if (r < 10) return 'text-orange-10';
    else if (r < 15) return 'text-deep-orange';
    else if (r < 20) return 'text-red';
    else if (r < 30) return 'text-purple';
    else if (r < 45) return 'text-deep-purple';
    else if (r < 65) return 'text-deep-purple-10';
    else if (r < 85) return 'text-pink-10';
    else if (r < 100) return 'text-pink-10';
    else if (r >= 100) return 'text-pink-10';
    return 'Unknown';
  }

  get inventoryIcon(): URL {
    //custom icon logic

    //otherwise, just serve up the base icon
    return this.baseBodyMod.inventoryIcon;
  }
}
