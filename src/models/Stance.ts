import { DefenseType, ImportantStatPossibility } from "./Index";
import Mod from "./Mod";

export default class Stance {
  public name: string;
  public physicalDefense: [ImportantStatPossibility[], number[], DefenseType];
  public piercingDefense: [ImportantStatPossibility[], number[], DefenseType];
  public arcaneDefense: [ImportantStatPossibility[], number[], DefenseType];
  public elementalDefense: [ImportantStatPossibility[], number[], DefenseType];
  public psychicDefense: [ImportantStatPossibility[], number[], DefenseType];
  public toxicDefense: [ImportantStatPossibility[], number[], DefenseType];
  public judgementDefense: [ImportantStatPossibility[], number[], DefenseType];

  constructor(
    name: string,
    physicalDefense: [ImportantStatPossibility[], number[], DefenseType],
    piercingDefense: [ImportantStatPossibility[], number[], DefenseType],
    arcaneDefense: [ImportantStatPossibility[], number[], DefenseType],
    elementalDefense: [ImportantStatPossibility[], number[], DefenseType],
    psychicDefense: [ImportantStatPossibility[], number[], DefenseType],
    toxicDefense: [ImportantStatPossibility[], number[], DefenseType],
    judgementDefense: [ImportantStatPossibility[], number[], DefenseType]
  ) {
    this.name = name;
    this.physicalDefense = physicalDefense;
    this.piercingDefense = piercingDefense;
    this.arcaneDefense = arcaneDefense;
    this.elementalDefense = elementalDefense;
    this.psychicDefense = psychicDefense;
    this.toxicDefense = toxicDefense;
    this.judgementDefense = judgementDefense;
  }

  get defenseArray(): [ImportantStatPossibility[], number[], DefenseType][] {
    return [
      this.physicalDefense,
      this.piercingDefense,
      this.arcaneDefense,
      this.elementalDefense,
      this.psychicDefense,
      this.toxicDefense,
      this.judgementDefense,
    ];
  }

  public getDefenseDescriptions = (): string[] => {
    const output: string[] = [];
    const defenseArray = this.defenseArray;
    for (let i = 0; i < defenseArray.length; i++) {
      let stringBuilder = "";
      for (let j = 0; j < defenseArray[i][0].length; j++) {
        stringBuilder =
          stringBuilder +
          `(${defenseArray[i][0][j]}*${defenseArray[i][1][j]})+`;
      }
      if (stringBuilder.slice(-1) == "+") {
        stringBuilder = stringBuilder.slice(0, -1);
      }
      //stringBuilder = stringBuilder + "Type: " + defenseArray[i][2];
      output.push(stringBuilder);
    }
    return output;
  };

  public getDefenseValues = (stats: Mod): number[] => {
    const statsCached = { ...stats };
    const output: number[] = [];
    const defenseArray = this.defenseArray;
    for (let i = 0; i < defenseArray.length; i++) {
      let calc = 0;
      for (let j = 0; j < defenseArray[i][0].length; j++) {
        calc = statsCached[defenseArray[i][0][j]] * defenseArray[i][1][j];
      }
      output.push(calc);
    }
    return output;
  };

  public getDefenseValuesFormatted = (stats: Mod): string[] => {
    const statsCached = { ...stats };
    const output: string[] = [];
    const defenseArray = this.defenseArray;
    for (let i = 0; i < defenseArray.length; i++) {
      let calc = 0;
      for (let j = 0; j < defenseArray[i][0].length; j++) {
        calc = statsCached[defenseArray[i][0][j]] * defenseArray[i][1][j];
      }
      if (defenseArray[i][2] == "Avoidance") output.push(`${calc}% Dodge`);
      else if (defenseArray[i][2] == "Percentage Reduction")
        output.push(`${calc}% Resistance`);
      else if (defenseArray[i][2] == "Flat Reduction")
        output.push(`${calc} Damage Reduction`);
    }
    return output;
  };
}
