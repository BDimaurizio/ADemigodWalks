import Happening from 'src/models/Happening';
import { getChoiceByID } from './ChoiceList';
import Choice from 'src/models/Choice';

const HappeningList: Happening[] = [
  //idea:a log below the main buttons showing recent stuff like items gained?
  {
    id: 'start-0',
    text: 'testing 123 testing',
    choices: [c('start-0>start-1')],
    context: '',
    onArrival(party): void {
      console.log(this.text + 'onarrival');
      console.log(party);
    },
  },
  {
    id: 'start-1',
    text: 'testing 111000 testing',
    choices: [],
    context: '',
    onArrival(party): void {
      console.log(this.text + 'onarrival');
      console.log(party);
    },
  },
];

export function getHappeningByIndex(index: number): Happening {
  if (index < 0) index = 0;
  return HappeningList[index];
}

export function getHappeningByID(id: string): Happening {
  const index = HappeningList.findIndex((element) => element.id === id);
  return getHappeningByIndex(index);
}

function c(id: string): Choice {
  return getChoiceByID(id);
}
