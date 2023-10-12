import Character from 'src/models/Character';
import Deity from 'src/models/Deity';

export function getDeityFavorability(chara: Character, deity: Deity): string {
  const stats = chara.stats;
  const wis = stats.FAI;
  let favCalc = 0;
  for (let i = 0; i < deity.Aspects.length; i++) {
    let tempCalc = stats[`${deity.Aspects[i].tagName}Opinion`];
    if (i == 0) {
      tempCalc = tempCalc * 1.5;
    }
    tempCalc = tempCalc + stats[`${deity.Aspects[i].tagName}Affinity`] / 10;
    tempCalc = tempCalc - stats[`${deity.Aspects[i].tagName}Resist`] / 50;

    favCalc = favCalc + tempCalc;
  }
  if (wis < 5) return 'Favorability unknown';
  else if (wis < 10) {
    if (favCalc > 10) return deity.Name + ' is pleased with you';
    if (favCalc > -10) return deity.Name + ' does not deign to notice you';
    return deity.Name + ' is displeased with you';
  } else if (wis < 20) {
    if (favCalc > 30) return 'You are favored by ' + deity.Name;
    if (favCalc > 10) return deity.Name + ' is pleased with you';
    if (favCalc > -10) return deity.Name + ' does not deign to notice you';
    if (favCalc > -30) return deity.Name + ' is displeased with you';
    return 'You are despised by ' + deity.Name;
  } else if (wis < 40) {
    if (favCalc > 50) return 'You are a paragon of ' + deity.Name;
    if (favCalc > 40) return 'You are greatly favored by ' + deity.Name;
    if (favCalc > 30) return 'You are favored by ' + deity.Name;
    if (favCalc > 20) return deity.Name + ' is very pleased with you';
    if (favCalc > 10) return deity.Name + ' is pleased with you';
    if (favCalc > 0) return deity.Name + ' is indifferent towards you';
    if (favCalc > -10) return deity.Name + ' does not deign to notice you';
    if (favCalc > -20) return deity.Name + ' is displeased with you';
    if (favCalc > -30) return deity.Name + ' is very displeased with you';
    if (favCalc > -40) return 'You are despised by ' + deity.Name;
    if (favCalc > -50) return 'You are greatly despised by ' + deity.Name;
    return deity.Name + ' is wrathful towards you';
  } else {
    if (favCalc > 50)
      return (
        'You are a paragon of ' +
        deity.Name +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > 40)
      return (
        'You are greatly favored by ' +
        deity.Name +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > 30)
      return (
        'You are favored by ' +
        deity.Name +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > 20)
      return (
        deity.Name +
        ' is very pleased with you' +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > 10)
      return (
        deity.Name +
        ' is pleased with you' +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > 0)
      return (
        deity.Name +
        ' is indifferent towards you' +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > -10)
      return (
        deity.Name +
        ' does not deign to notice you' +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > -20)
      return (
        deity.Name +
        ' is displeased with you' +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > -30)
      return (
        deity.Name +
        ' is very displeased with you' +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > -40)
      return (
        'You are despised by ' +
        deity.Name +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    if (favCalc > -50)
      return (
        'You are greatly despised by ' +
        deity.Name +
        '. Favorability: ' +
        Math.floor(favCalc)
      );
    return (
      deity.Name +
      ' is wrathful towards you' +
      '. Favorability: ' +
      Math.floor(favCalc)
    );
  }
}
