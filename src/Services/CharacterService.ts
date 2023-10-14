import Character from 'src/models/Character';
import { getJobByName } from 'src/Resources/JobList';
import { getSpecificItem, testItemArray } from './ItemService';
import { getBaseModByName } from 'src/Resources/BaseList';
import { getConsumableModByName } from 'src/Resources/ConsumableList';
import { getSuffixModByName } from 'src/Resources/SuffixList';

export function testProtagonist(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 3;
  output.tackOnStat('HP', 5);
  output.currentEXP = 500;
  output.gainJob(getJobByName('Adventurer'), 0);
  output.clearLog();
  output.addItemToInventory([
    getSpecificItem([getBaseModByName('Orb')]),
    getSpecificItem([
      getConsumableModByName('Scroll'),
      getSuffixModByName('of Power Enhance'),
    ]),
    getSpecificItem([
      getConsumableModByName('Scroll'),
      getSuffixModByName('of Vital Blessing'),
    ]),
  ]);
  return output;
}

export function testCharacter(name: string): Character {
  const output: Character = new Character(name);
  output.controlLevel = 0;
  output.tackOnStat('VIT', 1);
  output.gainJob(getJobByName('Adventurer'), 0);
  output.addItemToInventory(testItemArray(5));
  output.clearLog();
  return output;
}
