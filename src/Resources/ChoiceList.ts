import Choice from 'src/models/Choice';

const ChoiceList: Choice[] = [
  {
    id: 'start-0>start-1',
    text: 'testing 123 testing',
    nextHappeningID: 'start-1',
    nextHappeningContext: '',
    eligibility(party, context): boolean {
      return true;
    },
    onSelection(party): void {
      console.log('selected. 0 to 1');
    },
  },
];

export function getChoiceByIndex(index: number): Choice {
  if (index < 0) index = 0;
  return ChoiceList[index];
}

export function getChoiceByID(id: string): Choice {
  const index = ChoiceList.findIndex((element) => element.id === id);
  return getChoiceByIndex(index);
}
