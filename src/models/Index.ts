import Job from './Job';

export type ModType =
  | 'NONE'
  //equippable item mods
  | 'BLESSING'
  | 'CURSE'
  | 'QUALITY'
  | 'MATERIAL'
  | 'PREFIX'
  | 'BASE'
  | 'SUFFIX'
  | 'SOCKET'
  | 'RUNE'
  | 'ENCHANTMENT'
  | 'PLUS'
  //mods applied to CHARACTERS by traits or skills
  | 'TRAIT'
  | 'SKILL'
  //utility mod for calculations
  | '_CALC_'
  //mods for non-equippable items
  | 'MISC'
  | 'QUEST';

export type ItemSlot =
  | 'NONE' //normal slot            //alternate slot
  | 'Light Weapon' //mainhand       //offhand
  | 'Medium Weapon' //mainhand      //offhand(rare)
  | 'Heavy Weapon' //bothhand       //mainhand
  | 'Very Heavy Weapon' //bothhand
  | 'Exotic Weapon' //mainhand
  | 'Throwing Weapon' //mainhand    //offhand
  | 'Light Ranged Weapon' //mainhand //offhand
  | 'Ranged Weapon' //bothhand
  | 'Firearm' //mainhand            //offhand
  | 'Heavy Firearm' //bothhand
  | 'Light Shield' //offhand
  | 'Medium Shield' //offhand
  | 'Heavy Shield' //bothhand       //offhand
  | 'Implement' //offhand/mainhand
  | 'Light Helmet'
  | 'Medium Helmet'
  | 'Heavy Helmet'
  | 'Light Armor'
  | 'Medium Armor'
  | 'Heavy Armor'
  | 'Very Heavy Armor'
  | 'Gloves' //hands
  | 'Boots' //feet
  | 'Belt' //waist
  | 'Trinket' //trinket
  //NON EQUIPPABLE:
  | 'Material'
  | 'Consumable'
  | 'Item'
  | 'Quest Item'
  | 'NONE';

export type Target = 'SELF' | 'ALLY' | 'ENEMY' | 'ANY';

export type Gender = 'Male' | 'Female';

export type Temperment =
  | 'None' //normal
  | 'Fickle' //all changes are amplified
  | 'Impassive' //all changes are reduced
  | 'Malevolent' //negative changes are amplified
  | 'Benevolent' //positive changes are amplified
  | 'Whimsical'; //+random

export type Tag =
  | 'NONE'
  //aspects
  | 'Alchemy'
  | 'Art'
  | 'Battle'
  | 'Beasts'
  | 'Blood'
  | 'Chaos'
  | 'Commerce'
  | 'Creation'
  | 'Shadow'
  | 'Death'
  | 'Destruction'
  | 'Flame'
  | 'Feasts'
  | 'Frost'
  | 'Honor'
  | 'Humility'
  | 'Knowledge'
  | 'Life'
  | 'Light'
  | 'Love'
  | 'Madness'
  | 'Magic'
  | 'Might'
  | 'Nature'
  | 'Pain'
  | 'Plague'
  | 'Revelry'
  | 'Stone'
  | 'Forge'
  | 'Moon'
  | 'Water'
  | 'Storm'
  | 'Stars'
  | 'Day'
  | 'Time'
  | 'Trickery'
  | 'Wind'
  //damage types //Associated aspect(s) (//chaos, destruction, time, and star are untyped)
  //magic
  //flame
  //frost
  //light
  //shadow
  //storm
  | 'Judgement' // Honor // boons/punishments
  | 'Physical' // Battle // Beast // Stone // Might // The Sea
  | 'Piercing' // Trickery // Nature // Pain // Blood
  | 'Toxic' // Alchemy // Food & Drink // Plague // (sometimes water (acid))
  | 'Psychic' // Art & Music // Knowledge // Humility // Madness // The Moon // Commerce?
  //item management
  | 'NAME_OVERRIDE'
  | 'HIDE_MATERIAL'
  | 'HIDDEN'
  //material types
  | 'WOOD'
  | 'METAL'
  | 'STONE'
  | 'GEM'
  | 'BONE'
  | 'LEATHER'
  | 'HIDE'
  | 'CLOTH'
  //crafting types
  | 'CARPENTRY' // WOOD, BONE
  | 'SMITHING' // METAL
  | 'TAILORING' // LEATHER, CLOTH
  //qualities
  | 'ARMOR-SPECIFIC'
  | 'WEAPON-SPECIFIC'
  | 'METAL-SPECIFIC'
  | 'CLOTHING-SPECIFIC'
  | 'WOOD-SPECIFIC'
  | 'NEGATIVE'
  | 'INFLICTED'
  //enemy species tags
  | 'Cat'
  | 'NONE'
  | 'NONE'
  | 'NONE';

export type ImportantStatPossibility =
  | 'price'
  | 'priceMultiplier'
  | 'MaxSockets'
  | 'MaxRunes'
  | 'MaxEnchantments'
  | 'MaxTrinkets'
  | 'HP'
  | 'MP'
  | 'SP'
  | 'VIT'
  | 'STR'
  | 'DEX'
  | 'AGI'
  | 'INT'
  | 'FAI'
  | 'WIL'
  | 'CHA'
  | 'LUK'
  | 'Accuracy'
  | 'Clarity'
  | 'Attack'
  | 'Finesse'
  | 'Arcana'
  | 'CriticalChance'
  | 'CriticalDamage'
  | 'Evasion'
  | 'Supression'
  | 'Armor'
  | 'Deflect'
  | 'Ward'
  | 'PhysicalStatusResist'
  | 'MentalStatusResist'
  | 'JudgementAmplification'
  | 'PhysicalAmplification'
  | 'PiercingAmplification'
  | 'ToxicAmplification'
  | 'PsychicAmplification'
  | 'JudgementResist'
  | 'PhysicalResist'
  | 'PiercingResist'
  | 'ToxicResist'
  | 'PsychicResist'
  | 'AlchemyAffinity'
  | 'ArtAffinity'
  | 'BattleAffinity'
  | 'BeastsAffinity'
  | 'BloodAffinity'
  | 'ChaosAffinity'
  | 'CommerceAffinity'
  | 'CreationAffinity'
  | 'ShadowAffinity'
  | 'DeathAffinity'
  | 'DestructionAffinity'
  | 'FlameAffinity'
  | 'FeastsAffinity'
  | 'FrostAffinity'
  | 'HonorAffinity'
  | 'HumilityAffinity'
  | 'KnowledgeAffinity'
  | 'LifeAffinity'
  | 'LightAffinity'
  | 'LoveAffinity'
  | 'MadnessAffinity'
  | 'MagicAffinity'
  | 'MightAffinity'
  | 'NatureAffinity'
  | 'PainAffinity'
  | 'PlagueAffinity'
  | 'RevelryAffinity'
  | 'StoneAffinity'
  | 'ForgeAffinity'
  | 'MoonAffinity'
  | 'WaterAffinity'
  | 'StormAffinity'
  | 'StarsAffinity'
  | 'DayAffinity'
  | 'TimeAffinity'
  | 'TrickeryAffinity'
  | 'WindAffinity'
  | 'AlchemyResist'
  | 'ArtResist'
  | 'BattleResist'
  | 'BeastsResist'
  | 'BloodResist'
  | 'ChaosResist'
  | 'CommerceResist'
  | 'CreationResist'
  | 'ShadowResist'
  | 'DeathResist'
  | 'DestructionResist'
  | 'FlameResist'
  | 'FeastsResist'
  | 'FrostResist'
  | 'HonorResist'
  | 'HumilityResist'
  | 'KnowledgeResist'
  | 'LifeResist'
  | 'LightResist'
  | 'LoveResist'
  | 'MadnessResist'
  | 'MagicResist'
  | 'MightResist'
  | 'NatureResist'
  | 'PainResist'
  | 'PlagueResist'
  | 'RevelryResist'
  | 'StoneResist'
  | 'ForgeResist'
  | 'MoonResist'
  | 'WaterResist'
  | 'StormResist'
  | 'StarsResist'
  | 'DayResist'
  | 'TimeResist'
  | 'TrickeryResist'
  | 'WindResist'
  | 'AlchemyOpinion'
  | 'ArtOpinion'
  | 'BattleOpinion'
  | 'BeastsOpinion'
  | 'BloodOpinion'
  | 'ChaosOpinion'
  | 'CommerceOpinion'
  | 'CreationOpinion'
  | 'ShadowOpinion'
  | 'DeathOpinion'
  | 'DestructionOpinion'
  | 'FlameOpinion'
  | 'FeastsOpinion'
  | 'FrostOpinion'
  | 'HonorOpinion'
  | 'HumilityOpinion'
  | 'KnowledgeOpinion'
  | 'LifeOpinion'
  | 'LightOpinion'
  | 'LoveOpinion'
  | 'MadnessOpinion'
  | 'MagicOpinion'
  | 'MightOpinion'
  | 'NatureOpinion'
  | 'PainOpinion'
  | 'PlagueOpinion'
  | 'RevelryOpinion'
  | 'StoneOpinion'
  | 'ForgeOpinion'
  | 'MoonOpinion'
  | 'WaterOpinion'
  | 'StormOpinion'
  | 'StarsOpinion'
  | 'DayOpinion'
  | 'TimeOpinion'
  | 'TrickeryOpinion'
  | 'WindOpinion'
  | 'Leadership'
  | 'Diplomacy'
  | 'Bargaining'
  | 'Crafting'
  | 'Foraging'
  | 'Trapping'
  | 'Mining'
  | 'Stealth'
  | 'Medicine';

export const statArray: ImportantStatPossibility[] = [
  'VIT',
  'STR',
  'DEX',
  'AGI',
  'INT',
  'FAI',
  'WIL',
  'CHA',
  'LUK',
  'HP',
  'MP',
  'SP',
  'Accuracy',
  'Clarity',
  'Attack',
  'Finesse',
  'Arcana',
  'CriticalChance',
  'CriticalDamage',
  'Evasion',
  'Supression',
  'Armor',
  'Deflect',
  'Ward',
  'PhysicalStatusResist',
  'MentalStatusResist',
  'JudgementAmplification',
  'PhysicalAmplification',
  'PiercingAmplification',
  'ToxicAmplification',
  'PsychicAmplification',
  'JudgementResist',
  'PhysicalResist',
  'PiercingResist',
  'ToxicResist',
  'PsychicResist',
  'AlchemyAffinity',
  'ArtAffinity',
  'BattleAffinity',
  'BeastsAffinity',
  'BloodAffinity',
  'ChaosAffinity',
  'CommerceAffinity',
  'CreationAffinity',
  'ShadowAffinity',
  'DeathAffinity',
  'DestructionAffinity',
  'FlameAffinity',
  'FeastsAffinity',
  'FrostAffinity',
  'HonorAffinity',
  'HumilityAffinity',
  'KnowledgeAffinity',
  'LifeAffinity',
  'LightAffinity',
  'LoveAffinity',
  'MadnessAffinity',
  'MagicAffinity',
  'MightAffinity',
  'NatureAffinity',
  'PainAffinity',
  'PlagueAffinity',
  'RevelryAffinity',
  'StoneAffinity',
  'ForgeAffinity',
  'MoonAffinity',
  'WaterAffinity',
  'StormAffinity',
  'StarsAffinity',
  'DayAffinity',
  'TimeAffinity',
  'TrickeryAffinity',
  'WindAffinity',
  'AlchemyResist',
  'ArtResist',
  'BattleResist',
  'BeastsResist',
  'BloodResist',
  'ChaosResist',
  'CommerceResist',
  'CreationResist',
  'ShadowResist',
  'DeathResist',
  'DestructionResist',
  'FlameResist',
  'FeastsResist',
  'FrostResist',
  'HonorResist',
  'HumilityResist',
  'KnowledgeResist',
  'LifeResist',
  'LightResist',
  'LoveResist',
  'MadnessResist',
  'MagicResist',
  'MightResist',
  'NatureResist',
  'PainResist',
  'PlagueResist',
  'RevelryResist',
  'StoneResist',
  'ForgeResist',
  'MoonResist',
  'WaterResist',
  'StormResist',
  'StarsResist',
  'DayResist',
  'TimeResist',
  'TrickeryResist',
  'WindResist',
  'Leadership',
  'Diplomacy',
  'Bargaining',
  'Crafting',
  'Foraging',
  'Trapping',
  'Mining',
  'Stealth',
  'Medicine',
];

export class Aspect {
  public name!: string;
  public tagName!: Tag;
  public description!: string;
  public altDescription!: string;
  public friendlyAspects!: Tag[];
  public enemyAspects!: Tag[];
}

export class JobLevelPair {
  public job: Job;
  public level: number;

  constructor(jobName: Job, level: number = 0) {
    this.job = jobName;
    this.level = level;
  }
}
