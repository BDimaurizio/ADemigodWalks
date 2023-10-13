import Tile from 'src/models/Tile';

function GenerateBasicTile(progenitor: Tile): Tile {
  const coinflip = Math.floor(Math.random() * 2);
  const output = new Tile(
    'inner',
    progenitor.threat + coinflip,
    'Forest',
    0,
    0
  );
  return output;
}

function GenerateStartingTile(): Tile {
  const output = new Tile('start', 0, 'Plains', 1, 1);
  return output;
}

export function GenerateWorld(size: number): Tile[][] {
  const output = create2dArray(size, size);

  output[Math.trunc(size / 2)][Math.trunc(size / 2)] = GenerateStartingTile();

  let counter = 0;

  console.log(output);

  while (true) {
    //select random tile
    const randomCoords = [];
    for (let k = 0; k < output.length; k++) {
      for (let m = 0; m < output[k].length; m++) {
        if (output[k][m]) {
          randomCoords.push([k, m]);
        }
      }
    }
    const randomSelection = Math.floor(Math.random() * randomCoords.length);
    const i = randomCoords[randomSelection][0];
    const j = randomCoords[randomSelection][1];
    console.log(i, j);
    if (!output[i][j]) continue;
    //locate empty adjacent tile
    let target = [];
    if (i + 1 < size && !output[i + 1][j]) target = [i + 1, j];
    else if (j + 1 < size && !output[i][j + 1]) target = [i, j + 1];
    else if (j - 1 >= 0 && !output[i][j - 1]) target = [i, j - 1];
    else if (i - 1 >= 0 && !output[i - 1][j]) target = [i - 1, j];
    else continue;
    //generate tile in empty space
    output[target[0]][target[1]] = GenerateBasicTile(output[i][j]);
    //check if all tiles are generated
    console.log(counter++);
    if (counter >= size * size - 1) {
      break;
    }
  }
  console.log('done');

  return output;
}

const create2dArray = (rows: number, columns: number): Tile[][] =>
  [...Array(rows).keys()].map(() => Array(columns));
