export type ModType =
  | "NONE"
  //equippable item mods
  | "BLESSING"
  | "CURSE"
  | "QUALITY"
  | "MATERIAL"
  | "PREFIX"
  | "BASE"
  | "SUFFIX"
  | "SOCKET"
  | "RUNE"
  | "ENCHANTMENT"
  | "PLUS"
  //mods applied to CHARACTERS by traits or skills
  | "TRAIT"
  | "SKILL"
  //utility mod for calculations
  | "_CALC_"
  //mods for non-equippable items
  | "MISC"
  | "CONSUMABLE"
  | "QUEST";

export type ItemSlot = //proficiency - expertise - mastery

    | "NONE" //normal slot            //alternate slot
    | "Light Weapon" //mainhand       //offhand           dual weilding proficiency
    | "Medium Weapon" //mainhand      //offhand(rare)     dual weilding mastery
    | "Heavy Weapon" //bothhand       //mainhand          heavy weapon expertise
    | "Very Heavy Weapon" //bothhand
    | "Exotic Weapon" //mainhand
    | "Throwing Weapon" //consumable that grants a skill
    | "Light Ranged Weapon" //mainhand //offhand          light ranged mastery
    | "Ranged Weapon" //bothhand
    | "Firearm" //mainhand            //offhand           firearm mastery
    | "Heavy Firearm" //bothhand
    | "Light Shield" //offhand
    | "Medium Shield" //mainhand      //offhand           medium shield proficiency
    | "Heavy Shield" //bothhand       //offhand           heavy shield proficiency
    | "Implement" //offhand/mainhand                      implement proficiency
    | "Light Helmet"
    | "Medium Helmet"
    | "Heavy Helmet"
    | "Light Armor"
    | "Medium Armor"
    | "Heavy Armor"
    | "Very Heavy Armor"
    | "Gloves" //hands
    | "Boots" //feet
    | "Belt" //waist
    | "Trinket" //trinket
    //NON EQUIPPABLE:
    | "Material"
    | "Consumable"
    | "Item"
    | "Quest Item"
    | "NONE";

export type Target = "SELF" | "ALLY" | "ENEMY" | "ANY" | "ITEM";

export type Gender = "Male" | "Female";

export type Temperment =
  | "None" //normal
  | "Fickle" //all changes are amplified
  | "Impassive" //all changes are reduced
  | "Malevolent" //negative changes are amplified
  | "Benevolent" //positive changes are amplified
  | "Whimsical"; //+random

export type Tag =
  | "NONE"
  //aspects
  | "Alchemy"
  | "Art"
  | "Battle"
  | "Beasts"
  | "Blood"
  | "Chaos"
  | "Commerce"
  | "Creation"
  | "Shadow"
  | "Death"
  | "Destruction"
  | "Flame"
  | "Feasts"
  | "Frost"
  | "Honor"
  | "Humility"
  | "Knowledge"
  | "Life"
  | "Light"
  | "Love"
  | "Madness"
  | "Magic"
  | "Might"
  | "Nature"
  | "Pain"
  | "Plague"
  | "Revelry"
  | "Stone"
  | "Forge"
  | "Moon"
  | "Water"
  | "Storm"
  | "Stars"
  | "Day"
  | "Time"
  | "Trickery"
  | "Wind"
  //item management
  | "NAME_OVERRIDE"
  | "HIDDEN"
  //material types
  | "WOOD"
  | "METAL"
  | "STONE"
  | "GEM"
  | "BONE"
  | "LEATHER"
  | "HIDE"
  | "CLOTH"
  | "PARCHMENT"
  //weapon types
  | "Weapon"
  | "Tool"
  | "Blade"
  | "Blunt"
  | "Stabbing"
  | "Polearm"
  //clothing types
  | "Cape"
  //tool types
  | "Tool"
  | "Instrument"
  //crafting types
  | "CARPENTRY" // WOOD, BONE
  | "SMITHING" // METAL
  | "TAILORING" // LEATHER, CLOTH
  //qualities
  | "ARMOR-SPECIFIC"
  | "WEAPON-SPECIFIC"
  | "METAL-SPECIFIC"
  | "CLOTHING-SPECIFIC"
  | "WOOD-SPECIFIC"
  | "NEGATIVE"
  | "INFLICTED"
  //consumable types
  | "SCROLL"
  | "POTION"
  | "FOOD"
  //enemy species tags
  | "Cat"
  | "NONE"
  | "NONE"
  | "NONE";

export type AttackType =
  | "Physical" // Battle // Beast // Stone // Might // The Sea //destruction
  | "Piercing" // Trickery // Nature // Pain // Blood
  | "Arcane" //magic //time //star //shadow sometimes?
  | "Elemental" //flame, frost, storm, wind
  | "Psychic" // Art & Music // Knowledge // Humility // Madness // The Moon // Commerce //shadow //chaos //knowledge
  | "Toxic" // Alchemy // Food & Drink // Plague // (sometimes water (acid))
  | "Judgement" // Honor // boons/punishments //light
  | "Auto"; //beneficial effects

export type DefenseType =
  | "Avoidance"
  | "Percentage Reduction"
  | "Flat Reduction";

export type ImportantStatPossibility =
  | "price"
  | "priceMultiplier"
  | "MaxSockets"
  | "MaxRunes"
  | "MaxEnchantments"
  | "Attunement"
  | "HP"
  | "MP"
  | "SP"
  | "VIT"
  | "STR"
  | "DEX"
  | "AGI"
  | "INT"
  | "FAI"
  | "WIL"
  | "CHA"
  | "LUK"
  | "Accuracy"
  | "Clarity"
  | "Attack"
  | "Arcana"
  | "CriticalChance"
  | "CriticalDamage"
  | "Armor"
  | "Evasion"
  | "Deflect"
  | "Block"
  | "Parry"
  | "Supression"
  | "Ward"
  | "Fortitude"
  | "Resolve"
  | "Initiative"
  | "AlchemyAffinity"
  | "ArtAffinity"
  | "BattleAffinity"
  | "BeastsAffinity"
  | "BloodAffinity"
  | "ChaosAffinity"
  | "CommerceAffinity"
  | "CreationAffinity"
  | "ShadowAffinity"
  | "DeathAffinity"
  | "DestructionAffinity"
  | "FlameAffinity"
  | "FeastsAffinity"
  | "FrostAffinity"
  | "HonorAffinity"
  | "HumilityAffinity"
  | "KnowledgeAffinity"
  | "LifeAffinity"
  | "LightAffinity"
  | "LoveAffinity"
  | "MadnessAffinity"
  | "MagicAffinity"
  | "MightAffinity"
  | "NatureAffinity"
  | "PainAffinity"
  | "PlagueAffinity"
  | "RevelryAffinity"
  | "StoneAffinity"
  | "ForgeAffinity"
  | "MoonAffinity"
  | "WaterAffinity"
  | "StormAffinity"
  | "StarsAffinity"
  | "DayAffinity"
  | "TimeAffinity"
  | "TrickeryAffinity"
  | "WindAffinity"
  | "AlchemyResist"
  | "ArtResist"
  | "BattleResist"
  | "BeastsResist"
  | "BloodResist"
  | "ChaosResist"
  | "CommerceResist"
  | "CreationResist"
  | "ShadowResist"
  | "DeathResist"
  | "DestructionResist"
  | "FlameResist"
  | "FeastsResist"
  | "FrostResist"
  | "HonorResist"
  | "HumilityResist"
  | "KnowledgeResist"
  | "LifeResist"
  | "LightResist"
  | "LoveResist"
  | "MadnessResist"
  | "MagicResist"
  | "MightResist"
  | "NatureResist"
  | "PainResist"
  | "PlagueResist"
  | "RevelryResist"
  | "StoneResist"
  | "ForgeResist"
  | "MoonResist"
  | "WaterResist"
  | "StormResist"
  | "StarsResist"
  | "DayResist"
  | "TimeResist"
  | "TrickeryResist"
  | "WindResist"
  | "AlchemyOpinion"
  | "ArtOpinion"
  | "BattleOpinion"
  | "BeastsOpinion"
  | "BloodOpinion"
  | "ChaosOpinion"
  | "CommerceOpinion"
  | "CreationOpinion"
  | "ShadowOpinion"
  | "DeathOpinion"
  | "DestructionOpinion"
  | "FlameOpinion"
  | "FeastsOpinion"
  | "FrostOpinion"
  | "HonorOpinion"
  | "HumilityOpinion"
  | "KnowledgeOpinion"
  | "LifeOpinion"
  | "LightOpinion"
  | "LoveOpinion"
  | "MadnessOpinion"
  | "MagicOpinion"
  | "MightOpinion"
  | "NatureOpinion"
  | "PainOpinion"
  | "PlagueOpinion"
  | "RevelryOpinion"
  | "StoneOpinion"
  | "ForgeOpinion"
  | "MoonOpinion"
  | "WaterOpinion"
  | "StormOpinion"
  | "StarsOpinion"
  | "DayOpinion"
  | "TimeOpinion"
  | "TrickeryOpinion"
  | "WindOpinion"
  | "Leadership"
  | "Diplomacy"
  | "Bargaining"
  | "Crafting"
  | "Survival"
  | "Mining"
  | "Stealth"
  | "Medicine";

export const statArray: ImportantStatPossibility[] = [
  "HP",
  "MP",
  "SP",
  "VIT",
  "STR",
  "DEX",
  "AGI",
  "INT",
  "FAI",
  "WIL",
  "CHA",
  "LUK",
  "Accuracy",
  "Clarity",
  "Attack",
  "Arcana",
  "CriticalChance",
  "CriticalDamage",
  "Supression",
  "Armor",
  "Evasion",
  "Deflect",
  "Block",
  "Parry",
  "Supression",
  "Ward",
  "Fortitude",
  "Resolve",
  "Attunement",
  "AlchemyAffinity",
  "ArtAffinity",
  "BattleAffinity",
  "BeastsAffinity",
  "BloodAffinity",
  "ChaosAffinity",
  "CommerceAffinity",
  "CreationAffinity",
  "ShadowAffinity",
  "DeathAffinity",
  "DestructionAffinity",
  "FlameAffinity",
  "FeastsAffinity",
  "FrostAffinity",
  "HonorAffinity",
  "HumilityAffinity",
  "KnowledgeAffinity",
  "LifeAffinity",
  "LightAffinity",
  "LoveAffinity",
  "MadnessAffinity",
  "MagicAffinity",
  "MightAffinity",
  "NatureAffinity",
  "PainAffinity",
  "PlagueAffinity",
  "RevelryAffinity",
  "StoneAffinity",
  "ForgeAffinity",
  "MoonAffinity",
  "WaterAffinity",
  "StormAffinity",
  "StarsAffinity",
  "DayAffinity",
  "TimeAffinity",
  "TrickeryAffinity",
  "WindAffinity",
  "AlchemyResist",
  "ArtResist",
  "BattleResist",
  "BeastsResist",
  "BloodResist",
  "ChaosResist",
  "CommerceResist",
  "CreationResist",
  "ShadowResist",
  "DeathResist",
  "DestructionResist",
  "FlameResist",
  "FeastsResist",
  "FrostResist",
  "HonorResist",
  "HumilityResist",
  "KnowledgeResist",
  "LifeResist",
  "LightResist",
  "LoveResist",
  "MadnessResist",
  "MagicResist",
  "MightResist",
  "NatureResist",
  "PainResist",
  "PlagueResist",
  "RevelryResist",
  "StoneResist",
  "ForgeResist",
  "MoonResist",
  "WaterResist",
  "StormResist",
  "StarsResist",
  "DayResist",
  "TimeResist",
  "TrickeryResist",
  "WindResist",
  "Leadership",
  "Diplomacy",
  "Bargaining",
  "Crafting",
  "Survival",
  "Mining",
  "Stealth",
  "Medicine",
];

export const AffinityArray: ImportantStatPossibility[] = [
  "AlchemyAffinity",
  "ArtAffinity",
  "BattleAffinity",
  "BeastsAffinity",
  "BloodAffinity",
  "ChaosAffinity",
  "CommerceAffinity",
  "CreationAffinity",
  "ShadowAffinity",
  "DeathAffinity",
  "DestructionAffinity",
  "FlameAffinity",
  "FeastsAffinity",
  "FrostAffinity",
  "HonorAffinity",
  "HumilityAffinity",
  "KnowledgeAffinity",
  "LifeAffinity",
  "LightAffinity",
  "LoveAffinity",
  "MadnessAffinity",
  "MagicAffinity",
  "MightAffinity",
  "NatureAffinity",
  "PainAffinity",
  "PlagueAffinity",
  "RevelryAffinity",
  "StoneAffinity",
  "ForgeAffinity",
  "MoonAffinity",
  "WaterAffinity",
  "StormAffinity",
  "StarsAffinity",
  "DayAffinity",
  "TimeAffinity",
  "TrickeryAffinity",
  "WindAffinity",
];

export const ResistArray: ImportantStatPossibility[] = [
  "AlchemyResist",
  "ArtResist",
  "BattleResist",
  "BeastsResist",
  "BloodResist",
  "ChaosResist",
  "CommerceResist",
  "CreationResist",
  "ShadowResist",
  "DeathResist",
  "DestructionResist",
  "FlameResist",
  "FeastsResist",
  "FrostResist",
  "HonorResist",
  "HumilityResist",
  "KnowledgeResist",
  "LifeResist",
  "LightResist",
  "LoveResist",
  "MadnessResist",
  "MagicResist",
  "MightResist",
  "NatureResist",
  "PainResist",
  "PlagueResist",
  "RevelryResist",
  "StoneResist",
  "ForgeResist",
  "MoonResist",
  "WaterResist",
  "StormResist",
  "StarsResist",
  "DayResist",
  "TimeResist",
  "TrickeryResist",
  "WindResist",
];

export const OpinionArray: ImportantStatPossibility[] = [
  "AlchemyOpinion",
  "ArtOpinion",
  "BattleOpinion",
  "BeastsOpinion",
  "BloodOpinion",
  "ChaosOpinion",
  "CommerceOpinion",
  "CreationOpinion",
  "ShadowOpinion",
  "DeathOpinion",
  "DestructionOpinion",
  "FlameOpinion",
  "FeastsOpinion",
  "FrostOpinion",
  "HonorOpinion",
  "HumilityOpinion",
  "KnowledgeOpinion",
  "LifeOpinion",
  "LightOpinion",
  "LoveOpinion",
  "MadnessOpinion",
  "MagicOpinion",
  "MightOpinion",
  "NatureOpinion",
  "PainOpinion",
  "PlagueOpinion",
  "RevelryOpinion",
  "StoneOpinion",
  "ForgeOpinion",
  "MoonOpinion",
  "WaterOpinion",
  "StormOpinion",
  "StarsOpinion",
  "DayOpinion",
  "TimeOpinion",
  "TrickeryOpinion",
  "WindOpinion",
];

export class Aspect {
  public name!: string;
  public tagName!: AspectName;
  public description!: string;
  public altDescription!: string;
  public friendlyAspects!: Tag[];
  public enemyAspects!: Tag[];
}

export type AspectName =
  | "Alchemy"
  | "Art"
  | "Battle"
  | "Beasts"
  | "Blood"
  | "Chaos"
  | "Commerce"
  | "Creation"
  | "Shadow"
  | "Death"
  | "Destruction"
  | "Flame"
  | "Feasts"
  | "Frost"
  | "Honor"
  | "Humility"
  | "Knowledge"
  | "Life"
  | "Light"
  | "Love"
  | "Madness"
  | "Magic"
  | "Might"
  | "Nature"
  | "Pain"
  | "Plague"
  | "Stone"
  | "Revelry"
  | "Forge"
  | "Moon"
  | "Water"
  | "Storm"
  | "Stars"
  | "Day"
  | "Time"
  | "Trickery"
  | "Wind";

export type Terrain =
  | "Water"
  | "Plains"
  | "Forest"
  | "Mountain"
  | "Desert"
  | "Swamp"
  | "Jungle"
  | "Tundra";

export const TerrainArray: Terrain[] = [
  "Water",
  "Plains",
  "Forest",
  "Mountain",
  "Desert",
  "Swamp",
  "Jungle",
  "Tundra",
];
