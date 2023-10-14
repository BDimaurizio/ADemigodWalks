import { getSpecificItem } from 'src/Services/ItemService';
import Choice from 'src/models/Choice';
import { getPrefixModByName } from './PrefixList';
import { getBaseModByCriteria, getBaseModByName } from './BaseList';
import { getConsumableModByName } from './ConsumableList';
import { getMiscModByName } from './MiscList';
import { getTraitByName } from './TraitList';
import { getSuffixModByName, getSuffixOfSpell } from './SuffixList';
import { getMaterialModByName } from './MaterialList';

export function getChoiceByIndex(
  index: number,
  bucket: Choice[] = ChoiceBucketTest
): Choice {
  if (index < 0) index = 0;
  return bucket[index];
}

export function getChoiceByID(
  id: string,
  bucket: Choice[] = ChoiceBucketTest
): Choice {
  const index = bucket.findIndex((element) => element.id === id);
  return getChoiceByIndex(index, bucket);
}

export function getRandomChoicesFromBucket(
  bucket: Choice[],
  amount: number = 1
): Choice[] {
  const output: Choice[] = [];
  if (amount >= bucket.length) {
    return bucket;
  }
  while (output.length < amount) {
    const candidate = bucket[Math.floor(Math.random() * bucket.length)];
    if (!output.includes(candidate)) {
      output.push(candidate);
    }
  }
  return output;
}

export const ChoiceBucketTest: Choice[] = [
  {
    id: 'test choice',
    text: 'test choice',
    nextHappeningID: 'test-1',
    nextHappeningContext: '',
    eligibility(party, context): boolean {
      console.log(party, context);
      return true;
    },
    onSelection(party): void {
      console.log(party);
    },
  },
  {
    id: 'test choice 2',
    text: 'back',
    nextHappeningID: 'test-0',
    nextHappeningContext: '',
    eligibility(party, context): boolean {
      console.log(party, context);
      return true;
    },
    onSelection(party): void {
      console.log(party);
    },
  },
];

export const ChoiceBucketMISC: Choice[] = [
  {
    id: 'gender-male',
    text: 'Male',
    nextHappeningID: 'init-motivation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].gender = 'Male';
    },
  },
  {
    id: 'gender-female',
    text: 'Female',
    nextHappeningID: 'init-motivation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].gender = 'Female';
    },
  },
];

//init

export const ChoiceBucketMotivationI: Choice[] = [
  {
    id: 'motivation-seetheworld',
    text: 'I want to see the world',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].tackOnTrait(getTraitByName('Explorer'));
      party[0].addItemToInventory([
        getSpecificItem([
          getMaterialModByName('Patchwork'),
          getPrefixModByName("Traveler's"),
          getBaseModByName('Boots'),
        ]),
        getSpecificItem([
          getMaterialModByName('Patchwork'),
          getPrefixModByName("Traveler's"),
          getBaseModByName('Cloak'),
        ]),
        getSpecificItem([getConsumableModByName('Rations')]),
        getSpecificItem([getMiscModByName('Rope')]),
      ]);
    },
  },
  {
    id: 'motivation-obtainwealth',
    text: 'I want to obtain fabulous wealth',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].tackOnTrait(getTraitByName('Greedy'));
      party[0].tackOnTrait(getTraitByName('Treasure Seeker'));
      party[0].addItemToInventory([
        getSpecificItem([
          getMaterialModByName('Silver'),
          getMiscModByName('Lucky Coin'),
        ]),
      ]);
      party[0].addItemToInventory([
        getSpecificItem([
          getBaseModByName('Ring'),
          getMaterialModByName('Gold'),
        ]),
      ]);
    },
  },
  {
    id: 'motivation-obtainpower',
    text: 'I want to gain immense power',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].tackOnTrait(getTraitByName('Power-Hungry'));
      party[0].addItemToInventory([
        getSpecificItem([getBaseModByName('Orb')]),
        getSpecificItem([
          getConsumableModByName('Scroll'),
          getSuffixOfSpell('Power Enhance'),
        ]),
        getSpecificItem([
          getBaseModByCriteria([], 0, 0),
          getSuffixModByName('of Vitality'),
        ]),
      ]);
    },
  },
  {
    id: 'motivation-obtainallies',
    text: 'I want to meet new people',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].tackOnTrait(getTraitByName('Friendly'));
      party[0].addItemToInventory([
        getSpecificItem([
          getBaseModByName('Bracelet'),
          getPrefixModByName('Friendship'),
        ]),
      ]);
    },
  },
  {
    id: 'motivation-becomehero',
    text: 'I want to become a hero',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].tackOnTrait(getTraitByName('Heroic Aura'));
      party[0].addItemToInventory([
        getSpecificItem([
          getBaseModByName('Cape'),
          getPrefixModByName('Heroic'),
        ]),
        getSpecificItem([
          getBaseModByCriteria([], 0, 0),
          getSuffixModByName('of Vitality'),
        ]),
      ]);
    },
  },
  {
    id: 'motivation-divinejudgement',
    text: 'I want to smite the enemies of my god',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: 'divinity',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].tackOnTrait(getTraitByName('Righteous Cause'));
      party[0].addItemToInventory([
        getSpecificItem([
          getBaseModByName('Robes'),
          getPrefixModByName("Acolyte's"),
        ]),
        getSpecificItem([
          getBaseModByCriteria(['Blunt'], 0, 0),
          getSuffixModByName('of Punishment'),
        ]),
      ]);
    },
  },
  {
    id: 'motivation-becomemartial',
    text: 'I want to train my body',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].tackOnTrait(getTraitByName('Martial Adept'));
      party[0].tackOnTrait(getTraitByName('Quarterstaff Proficiency'));
      party[0].addItemToInventory([
        getSpecificItem([getBaseModByName('Quarterstaff')]),
        getSpecificItem([getBaseModByCriteria([], 0, 0)]),
      ]);
    },
  },
  {
    id: 'motivation-becomemagic',
    text: 'I want to train my mind',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      party[0].tackOnTrait(getTraitByName('Mental Adept'));
      party[0].addItemToInventory([
        getSpecificItem([getBaseModByName('Quarterstaff')]),
        getSpecificItem([
          getBaseModByName('Wand'),
          getSuffixOfSpell('Fireball'),
        ]),
      ]);
    },
  },
  {
    id: 'motivation-communewithnature',
    text: 'I want to commune with nature',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      console.log(party[0]);
    },
  },
  {
    id: 'motivation-establishstronghold',
    text: 'I want to settle some unclaimed land',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      console.log(party[0]);
    },
  },
  {
    id: 'motivation-findlove',
    text: 'I want to find my one true love',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      console.log(party[0]);
    },
  },
  {
    id: 'motivation-huntandgather',
    text: 'I want to hunt and experience the wilds',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      console.log(party[0]);
    },
  },
  {
    id: 'motivation-becomeoutlaw',
    text: 'I want to become an outlaw',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      console.log(party[0]);
    },
  },
  {
    id: 'motivation-darkarts',
    text: 'I want to seek out forbidden knowledge',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: '',
    eligibility() {
      return true;
    },
    onSelection(party) {
      console.log(party[0]);
    },
  },
  {
    id: 'motivation-proselytize',
    text: 'I want to further the influence of my Deity',
    nextHappeningID: 'init-occupation',
    nextHappeningContext: 'divinity',
    eligibility() {
      return true;
    },
    onSelection(party) {
      console.log(party[0]);
    },
  },
];

export const ChoiceBucketOccupationI: Choice[] = [];

export const ChoiceBucketDivinityI: Choice[] = [];

export const ChoiceBucketDetrimentI: Choice[] = [];

export const ChoiceBucketHeirloomI: Choice[] = [];
