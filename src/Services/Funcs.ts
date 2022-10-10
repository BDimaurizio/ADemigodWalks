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
