import { Aspect, Gender, Temperment } from './Index';

export default class Deity {
  public Name: string;
  public Gender: Gender;
  public Temperment: Temperment;
  public Aspects: Aspect[]; //Aspects[0] is primary
  //skills

  constructor(
    name: string,
    gender: Gender,
    temperment: Temperment,
    aspects: Aspect[]
  ) {
    this.Name = name;
    this.Gender = gender;
    this.Temperment = temperment;
    this.Aspects = aspects;
  }

  get fullTitle(): string {
    if (this.Aspects.length < 1) {
      return this.Name + ', a minor deity';
    } else if (this.Gender == 'Male')
      return this.Name + ', the God of ' + this.Aspects[0].name;
    else return this.Name + ', the Goddess of ' + this.Aspects[0].name;
  }
}
