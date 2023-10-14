/* eslint-disable @typescript-eslint/no-explicit-any */

import Deity from 'src/models/Deity';
import { Aspect, Tag } from 'src/models/Index';
import Item from 'src/models/Item';
import Job from 'src/models/Job';
import Mod from 'src/models/Mod';
import Skill from 'src/models/Skill';

export function shuffleArray<
  T extends Mod | Skill | Job | Aspect | Tag | Deity | Item
>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function removeDuplicates<T extends Mod | Skill | Job | Aspect>(
  array: T[]
): T[] {
  const seen = new Set();
  return array.filter((el) => {
    const duplicate = seen.has(el.name);
    seen.add(el.name);
    return !duplicate;
  });
}

export function mergeTuples( //depricated
  arr1: [string, Date][],
  arr2: [string, Date][]
): [string, Date][] {
  if (arr1.length < 1 && arr2.length < 1) return [] as [string, Date][];
  if (arr1.length < 1) return arr2;
  if (arr2.length < 1) return arr1;

  console.log('merging');
  console.log(arr1);
  console.log(arr2);

  const merged = [];
  let index1 = 0;
  let index2 = 0;
  let current = 0;

  while (current < arr1.length + arr2.length) {
    if (arr1[index1] == undefined) {
      merged[current] = arr2[index2];
      index2++;
    } else if (arr2[index2] == undefined) {
      merged[current] = arr1[index1];
      index1++;
    } else {
      const unmerged1 = arr1[index1][1];
      const unmerged2 = arr2[index2][1];

      if (unmerged1 < unmerged2) {
        merged[current] = arr1[index1];
        index1++;
      } else {
        merged[current] = arr2[index2];
        index2++;
      }
    }
    current++;
  }

  return merged;
}
