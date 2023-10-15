import Character from "src/models/Character";
import { geti, testItemArray } from "./ItemService";
import { getJobByName } from "src/Resources/JobList";

export function testProtagonist(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 3;
  output.tackOnStat("HP", 1);
  output.currentEXP = 500;
  output.addItemToInventory([geti("base=dagger=mat=stone")]);
  output.gainJob(getJobByName("Adventurer"));
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
