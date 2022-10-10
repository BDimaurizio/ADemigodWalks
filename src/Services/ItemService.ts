import Item from 'src/models/Item';
import { getBaseModByCriteria } from 'src/Resources/BaseList';
import { getMaterialModByCriteria } from 'src/Resources/MaterialList';
import { getQualityModByCriteria } from 'src/Resources/QualityList';

export function testItemArray(howMany: number): Item[] {
  const output: Item[] = [];
  for (let i = 0; i < howMany; i++) {
    output.push(
      new Item([
        getBaseModByCriteria([], 0, 9),
        getMaterialModByCriteria([], -2, 999),
        getQualityModByCriteria([], -2, 999),
      ])
    );
  }
  return output;
}
