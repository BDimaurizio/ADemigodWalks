import Character from './Character';

export default class Choice {
  public id: string;
  public text: string;
  public nextHappeningID: string;
  public nextHappeningContext: string = '';
  public eligibility: (party: Character[], context: string) => boolean;
  public onSelection: (party: Character[]) => void;

  constructor(
    id: string,
    text: string,
    nextHappeningID: string,
    eligibility: (party: Character[], context: string) => boolean,
    onSelection: (party: Character[]) => boolean
  ) {
    this.id = id;
    this.text = text;
    this.nextHappeningID = nextHappeningID;
    this.eligibility = eligibility;
    this.onSelection = onSelection;
  }
}
