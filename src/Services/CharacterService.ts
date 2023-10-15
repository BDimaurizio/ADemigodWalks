import Character from "src/models/Character";
import { geti, testItemArray } from "./ItemService";
import { getJobByName } from "src/Resources/JobList";
import { getTraitByName } from "src/Resources/TraitList";

export function testProtagonist(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 3;
  output.tackOnStat("HP", 1);
  output.currentEXP = 500;
  output.addItemToInventory([
    geti("base=dagger=mat=stone"),
    geti("base=quarterstaff"),
    geti("base=orb"),
    geti("base=buckler"),
  ]);
  output.gainJob(getJobByName("Adventurer"));
  output.tackOnTrait(getTraitByName("Dual Wielding Proficiency"));
  output.clearLog();
  return output;
}

export function testCharacter(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 0;
  output.tackOnStat("HP", 1);
  output.addItemToInventory(testItemArray(5));
  output.gainJob(getJobByName("Adventurer"));
  output.clearLog();
  return output;
}
