import Character from "src/models/Character";
import { getJobByName } from "src/Resources/JobList";
import { geti, testItemArray } from "./ItemService";
import { getTraitByName } from "src/Resources/TraitList";

export function testProtagonist(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 3;
  output.tackOnStat("HP", 5);
  output.currentEXP = 500;
  output.gainJob(getJobByName("Adventurer"), 0);
  output.addItemToInventory([
    geti("ba=Orb"),
    geti("co=Scroll=sp=Power Enhance"),
    geti("co=Scroll=sp=Vital Blessing"),
    geti("ba=Quarterstaff=ma=Wood"),
  ]);
  output.tackOnTrait(getTraitByName("Heroic Aura"));

  output.clearLog();
  return output;
}

export function testCharacter(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 0;
  output.tackOnStat("VIT", 1);
  output.gainJob(getJobByName("Adventurer"), 0);
  output.addItemToInventory(testItemArray(5));
  output.clearLog();
  return output;
}
