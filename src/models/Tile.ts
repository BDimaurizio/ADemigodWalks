import Happening from './Happening';
import { Terrain } from './Index';

export default class Tile {
  public name: string;
  public threat: number;
  public terrain: Terrain;
  public civilization: number;
  public unique: number;

  //contents
  public happenings: Happening[] = [];

  constructor(
    name: string,
    threat: number,
    terrain: Terrain,
    civilization: number,
    unique: number
  ) {
    this.name = name;
    this.threat = threat;
    this.terrain = terrain;
    this.civilization = civilization;
    this.unique = unique;
  }
}
