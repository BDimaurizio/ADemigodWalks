import Character from "src/models/Character";
import { geti, testItemArray } from "./ItemService";
import { getJobByName } from "src/Resources/JobList";
import { getTraitByName } from "src/Resources/TraitList";
//import { getTraitByName } from "src/Resources/TraitList";

export function testProtagonist(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 3;
  output.tackOnStat("HP", 1);
  output.currentEXP = 500;
  output.addItemToInventory([
    geti("base=dagger=mat=stone"),
    geti("base=quarterstaff=mat=wood"),
    geti("base=orb=mat=iron"),
    geti("base=buckler=mat=iron"),
  ]);
  output.addItemToInventory(testItemArray(5));
  output.gainJob(getJobByName("Adventurer"));
  output.tackOnTrait(getTraitByName("Carpentry I"));
  output.tackOnTrait(getTraitByName("Carpentry II"));
  output.tackOnTrait(getTraitByName("Carpentry I"));
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
