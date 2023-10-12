import Job from 'src/models/Job';
import Mod from 'src/models/Mod';

const JobList: Job[] = [
  new Job(
    'Bug Catcher',
    new Mod({
      WIL: 7,
      Attunement: 1,
    }),
    ['Super Duper Healthy', 'Low Health Crafter', 'wergwer'],
    [5, 6, 7],
    ['Fireball'],
    [3]
  ),
  new Job(
    'Adventurer',
    new Mod({
      STR: 1,
      DEX: 1,
      INT: 1,
    }),
    ['Super Duper Healthy', 'Low Health Crafter'],
    [5, 6],
    ['Fireball'],
    [3]
  ),
  new Job(
    'Sailor',
    new Mod({
      LUK: 1,
    }),
    ['Super Duper Healthy', 'Low Health Crafter'],
    [2, 4],
    ['Fireball'],
    [9]
  ),
];

export function getJobByIndex(index: number): Job {
  if (index < 0) index = 0;
  return JobList[index];
}

export function getJobByName(name: string): Job {
  const index = JobList.findIndex((element) => element.name === name);
  return getJobByIndex(index);
}
