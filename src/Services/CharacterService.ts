import Character from 'src/models/Character';
import { getJobByName } from 'src/Resources/JobList';
import { testItemArray } from './ItemService';
import { getTraitByName } from 'src/Resources/TraitList';

export function testProtagonist(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 3;
  output.gainJob(getJobByName('Adventurer'), 5);
  output.gainJob(getJobByName('Sailor'));
  output.gainJob(getJobByName('gethehgdghdrvd'), 2);
  output.addItemToInventory(testItemArray(30));
  output.tackOnStat('FAI', 10);
  output.tackOnStat('VIT', 6);
  output.tackOnTrait(getTraitByName('Hat Wearer'));
  output.currentEXP = 500;
  return output;
}

export function testCharacter(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 0;
  output.tackOnStat('VIT', 1);
  output.gainJob(getJobByName('Adventurer'), 0);
  output.addItemToInventory(testItemArray(5));
  return output;
}
