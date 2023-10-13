import Character from './Character';
import Choice from './Choice';

export default class Happening {
  public id: string;
  public title: string = '';
  public text: string;
  public choices: Choice[];
  public context: string = ''; //context passed from previous happening/choice
  public onArrival: (party: Character[]) => void;

  constructor(
    id: string,
    text: string,
    choices: Choice[],
    onArrival: (party: Character[]) => void
  ) {
    this.id = id;
    this.text = text;
    this.choices = choices;
    this.onArrival = onArrival;
  }
}
