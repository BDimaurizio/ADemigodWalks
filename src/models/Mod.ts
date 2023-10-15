import Character from "./Character";
import {
  Aspect,
  ImportantStatPossibility,
  ItemSlot,
  ModType,
  Tag,
} from "./Index";
import Item from "./Item";
import Skill from "./Skill";

export default class Mod {
  //general info
  public modType: ModType = "NONE";
  public name = "NONE";
  public rarity = 0;
  public aspects: Aspect[] = [];
  public tags: Tag[] = [];
  public requiredTags: Tag[] = [];
  public description = "NONE";
  public price = 0;
  public priceMultiplier = 0; // 1 point = 10% additional cost
  public inventoryIcon: URL = new URL(
    "src/assets/Icons/placeholder.png",
    import.meta.url
  );
  //important stats
  public importantA: ImportantStatPossibility = "price";
  public importantB: ImportantStatPossibility = "price";
  public importantC: ImportantStatPossibility = "price";
  public importantAval = 0;
  public importantBval = 0;
  public importantCval = 0;
  public slot: ItemSlot = "NONE";
  //slot stats
  public MaxSockets = 0;
  public MaxRunes = 0;
  public MaxEnchantments = 0;
  public Attunement = 0; //max trinkets
  //fluctuating stats (max only)
  public HP = 0;
  public MP = 0;
  public SP = 0;
  //primary stats
  public VIT = 0; //maxhp, maxsp, physicalstatusresist,
  public STR = 0; //attack, criticaldamage, mining
  public DEX = 0; //accuracy, DEFLECT, PARRY
  public AGI = 0; //evasion, stealth, survival
  public INT = 0; //arcana, criticalchance, maxmp, crafting
  public FAI = 0; //clarity, (FAI added to all positive affinity + opinion)
  public WIL = 0; //ward, mentalstatusresist, (WIL added to all positive resists)
  public CHA = 0; //leadership, diplomacy, bargaining
  public LUK = 0;
  //offensive stats
  public Accuracy = 0; //chance to hit (physical & piercing attacks)
  public Clarity = 0; //chance to hit (magic attacks)
  public Attack = 0; //weapon attack damage
  public Arcana = 0; //spell attack damage
  public CriticalChance = 0;
  public CriticalDamage = 0;
  //defensive stats
  public Armor = 0;
  public Evasion = 0;
  public Deflect = 0;
  public Block = 0;
  public Parry = 0;
  public Supression = 0;
  public Ward = 0;
  public PhysicalStatusResist = 0;
  public MentalStatusResist = 0;
  //initiative
  public Initiative = 0;
  //aspect stats | offensive = affinity/deficiency (increases damage/activates other effects) | get via Character.ComputeStats[`${aspect.tagName}affinity`]
  public AlchemyAffinity = 0;
  public ArtAffinity = 0;
  public BattleAffinity = 0;
  public BeastsAffinity = 0;
  public BloodAffinity = 0;
  public ChaosAffinity = 0;
  public CommerceAffinity = 0;
  public CreationAffinity = 0;
  public ShadowAffinity = 0;
  public DeathAffinity = 0;
  public DestructionAffinity = 0;
  public FlameAffinity = 0;
  public FeastsAffinity = 0;
  public FrostAffinity = 0;
  public HonorAffinity = 0;
  public HumilityAffinity = 0;
  public KnowledgeAffinity = 0;
  public LifeAffinity = 0;
  public LightAffinity = 0;
  public LoveAffinity = 0;
  public MadnessAffinity = 0;
  public MagicAffinity = 0;
  public MightAffinity = 0;
  public NatureAffinity = 0;
  public PainAffinity = 0;
  public PlagueAffinity = 0;
  public StoneAffinity = 0;
  public RevelryAffinity = 0;
  public ForgeAffinity = 0;
  public MoonAffinity = 0;
  public WaterAffinity = 0;
  public StormAffinity = 0;
  public StarsAffinity = 0;
  public DayAffinity = 0;
  public TimeAffinity = 0;
  public TrickeryAffinity = 0;
  public WindAffinity = 0;
  //aspect stats | defensive = resist/vulnerability (decreases damage/resists statuses)
  public AlchemyResist = 0;
  public ArtResist = 0;
  public BattleResist = 0;
  public BeastsResist = 0;
  public BloodResist = 0;
  public ChaosResist = 0;
  public CommerceResist = 0;
  public CreationResist = 0;
  public ShadowResist = 0;
  public DeathResist = 0;
  public DestructionResist = 0;
  public FlameResist = 0;
  public FeastsResist = 0;
  public FrostResist = 0;
  public HonorResist = 0;
  public HumilityResist = 0;
  public KnowledgeResist = 0;
  public LifeResist = 0;
  public LightResist = 0;
  public LoveResist = 0;
  public MadnessResist = 0;
  public MagicResist = 0;
  public MightResist = 0;
  public NatureResist = 0;
  public PainResist = 0;
  public PlagueResist = 0;
  public StoneResist = 0;
  public RevelryResist = 0;
  public ForgeResist = 0;
  public MoonResist = 0;
  public WaterResist = 0;
  public StormResist = 0;
  public StarsResist = 0;
  public DayResist = 0;
  public TimeResist = 0;
  public TrickeryResist = 0;
  public WindResist = 0;
  //aspect stats | opinion | get via Character.ComputeStats[`${aspect.tagName}affinity`]
  public AlchemyOpinion = 0;
  public ArtOpinion = 0;
  public BattleOpinion = 0;
  public BeastsOpinion = 0;
  public BloodOpinion = 0;
  public ChaosOpinion = 0;
  public CommerceOpinion = 0;
  public CreationOpinion = 0;
  public ShadowOpinion = 0;
  public DeathOpinion = 0;
  public DestructionOpinion = 0;
  public FlameOpinion = 0;
  public FeastsOpinion = 0;
  public FrostOpinion = 0;
  public HonorOpinion = 0;
  public HumilityOpinion = 0;
  public KnowledgeOpinion = 0;
  public LifeOpinion = 0;
  public LightOpinion = 0;
  public LoveOpinion = 0;
  public MadnessOpinion = 0;
  public MagicOpinion = 0;
  public MightOpinion = 0;
  public NatureOpinion = 0;
  public PainOpinion = 0;
  public PlagueOpinion = 0;
  public StoneOpinion = 0;
  public RevelryOpinion = 0;
  public ForgeOpinion = 0;
  public MoonOpinion = 0;
  public WaterOpinion = 0;
  public StormOpinion = 0;
  public StarsOpinion = 0;
  public DayOpinion = 0;
  public TimeOpinion = 0;
  public TrickeryOpinion = 0;
  public WindOpinion = 0;
  //noncombat stats
  public Leadership = 0;
  public Diplomacy = 0;
  public Bargaining = 0;
  public Crafting = 0; //traits: Carpentry, Smithing, Jewlerymaking, Engineering, Runesmithing, Gemcutting, Enchanting, etc...
  public Survival = 0; //includes foraging, herblore, trapping, skinning
  public Mining = 0;
  public Stealth = 0;
  public Medicine = 0;
  //special effects
  public Traits: Mod[] = [];
  public Skills: Skill[] = [];
  //trait management
  public eligibilityChecker?: (character: Character) => boolean;
  public duration?: number = 0; // 0 = normal trait, -1 = lasts until the end of the current battle, x = x rounds of battle
  //consumable effect
  public consume?: (consumer: Character, item: Item) => void;

  constructor(stats?: Partial<Mod>) {
    if (!stats) {
      return;
    }

    return { ...new Mod(), ...stats };
  }
}

/*
rarity
common mod = 0pts (wood, superior, rusty, minor runes/gems)
uncommon mod = 1pt (titanium, exquisite, sharpened, ritual, of enchantment, major runes/gems, minor blessings/curses)
rare mod = 4pt (soul steel, masterwork, of the blood moon, major blessings/curses
epic mod = 20pt (special)

<0 - common (different color)
0 - common
1 - uncommon
2 - super uncommon
3 - ultra uncommon
4 - rare
7 - super rare
15 - ultra rare
20 - epic
25 - super epic
45 - ultra epic
60 - legendary
80 - super legendary
100 - ultra legendary
*/
