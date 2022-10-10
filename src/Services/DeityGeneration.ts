import Deity from 'src/models/Deity';
import { Aspect, Gender, Temperment } from 'src/models/Index';
import Adjectives from 'src/Resources/Adjectives';
import { getAllAspects } from 'src/Resources/AspectList';
import Names from 'src/Resources/Names';
import { shuffleArray } from './Funcs';

function getRandomAdjective() {
  return Adjectives[Math.floor(Math.random() * Adjectives.length)];
}

function getRandomName() {
  return Names[Math.floor(Math.random() * Names.length)];
}

function GenerateDeityName(): string {
  let stringBuilder = getRandomName();

  const rollForApostrophe = Math.floor(Math.random() * 8); //0-8 inclusive
  const rollForDash = Math.floor(Math.random() * 8); //0-8 inclusive
  const rollForSpace = Math.floor(Math.random() * 8); //0-8 inclusive
  const rollForAdjective = Math.floor(Math.random() * 8); //0-8 inclusive

  if (rollForApostrophe == 0) {
    stringBuilder = stringBuilder + "'";
    const addition = getRandomName();
    const additionLen = Math.floor(Math.random() * 2) + 2; //2-3 inclusive
    stringBuilder = stringBuilder + addition.substring(0, additionLen);
  }
  if (rollForDash == 0) {
    stringBuilder = stringBuilder + '-';
    stringBuilder =
      stringBuilder +
      getRandomName().split('').reverse().join('').toLowerCase();
  }
  if (rollForSpace == 0) {
    stringBuilder = stringBuilder + ' ' + getRandomName();
  }
  if (rollForAdjective == 0) {
    stringBuilder = stringBuilder + ' The ' + getRandomAdjective();
  }

  return stringBuilder;
}

const genderRoll: Gender[] = ['Male', 'Female'];
const tempermentRoll: Temperment[] = [
  'None',
  'None',
  'None',
  'None',
  'None',
  'Fickle',
  'Impassive',
  'Benevolent',
  'Malevolent',
  'Whimsical',
];

export function GenerateDeities(
  howMany: number, //pantheon size
  domainSizeFriendly: number = 2, //domain cohesion strength
  domainSizeNonconflicting: number = 2, //domain cohesion strictness
  domainSizeAny: number = 2, //domain incohesion fallback (if we can't make a cohesive god. high = give them random stuff, low = go with what you've got)
  domainVariability: number = 1, //domain cohesion variability
  domainSizeMinimum: number = 3, //domain size minimum / domain cohesion limiter
  domainSizeMaximum: number = 5 //domain size maximum / influence concentration
): Deity[] {
  const deities: Deity[] = [];
  let unusedAspects: Aspect[] = shuffleArray(getAllAspects());
  for (let i = 0; i < howMany; i++) {
    //determine domain size
    let thisDomainSize =
      Math.floor(Math.random() * (domainSizeMaximum + 1 - domainSizeMinimum)) +
      domainSizeMinimum;
    if (
      thisDomainSize == domainSizeMaximum &&
      domainSizeMinimum < domainSizeMaximum &&
      Math.floor(Math.random() * 2) == 0
    ) {
      thisDomainSize--;
    }
    //determine domain cohesion variability
    const rollCohesion =
      Math.floor(Math.random() * (domainVariability * 2)) - domainVariability;
    const tempDomainSizeFriendly = domainSizeFriendly + rollCohesion;
    //add primary aspect
    let tempAspects: Aspect[] = [];
    if (unusedAspects.length > 0) {
      tempAspects.push(unusedAspects.pop() as Aspect);
    }
    //add friendly aspects
    for (let i = 0; i < tempDomainSizeFriendly; i++) {
      if (unusedAspects.length <= 0 || tempAspects.length >= thisDomainSize) {
        break;
      }
      const index = unusedAspects.findIndex(
        (aspect) => tempAspects[0].friendlyAspects.includes(aspect.tagName) //primary.friendly.includes aspect.name
      );
      if (index == -1) break;
      tempAspects.push(unusedAspects.splice(index, 1)[0]);
    }
    unusedAspects = shuffleArray(unusedAspects);
    tempAspects = tempAspects.filter(Boolean);
    //add nonconflicting aspects
    for (let i = 0; i < domainSizeNonconflicting; i++) {
      if (unusedAspects.length <= 0 || tempAspects.length >= thisDomainSize) {
        break;
      }
      const index = unusedAspects.findIndex(
        (aspect) => !tempAspects[0].enemyAspects.includes(aspect.tagName) //primarly.enemy.doesnotinclude aspect.name
      );
      if (index == -1) break;
      tempAspects.push(unusedAspects.splice(index, 1)[0]);
    }
    unusedAspects = shuffleArray(unusedAspects);
    tempAspects = tempAspects.filter(Boolean);
    //add any aspects
    for (let i = 0; i < domainSizeAny; i++) {
      if (unusedAspects.length <= 0 || tempAspects.length >= thisDomainSize) {
        break;
      }
      tempAspects.push(unusedAspects.splice(0, 1)[0]);
    }
    unusedAspects = shuffleArray(unusedAspects);
    tempAspects = tempAspects.filter(Boolean);

    deities.push(
      new Deity(
        GenerateDeityName(),
        genderRoll[Math.floor(Math.random() * genderRoll.length)],
        tempermentRoll[Math.floor(Math.random() * tempermentRoll.length)],
        tempAspects
      )
    );
    /*
    console.log(
      thisDomainSize,
      tempAspects.length,
      unusedAspects.length,
      deities[deities.length - 1]
    );*/
  }
  return deities;
}
