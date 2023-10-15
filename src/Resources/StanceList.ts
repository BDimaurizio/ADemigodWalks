import Stance from "src/models/Stance";

/*
    name: "Basic Stance",
    physicalDefense: [["Armor"], [1], "Flat Reduction"],
    piercingDefense: [["Evasion"], [1], "Avoidance"],
    arcaneDefense: [["Ward"], [1], "Percentage Reduction"],
    elementalDefense: [["Evasion"], [1], "Avoidance"],
    psychicDefense: [["Resolve"], [1], "Flat Reduction"],
    toxicDefense: [["Fortitude"], [1], "Percentage Reduction"],
    judgementDefense: [["Resolve"], [0.1], "Flat Reduction"],
*/

const StanceList: Stance[] = [
  new Stance(
    "Test Stance",
    [["STR"], [5], "Flat Reduction"], //physical
    [["DEX"], [3], "Avoidance"], //piercing
    [["INT"], [8], "Percentage Reduction"], //arcane
    [["VIT"], [3], "Avoidance"], //elemental
    [["WIL"], [4], "Flat Reduction"], //psychic
    [["LUK"], [2], "Percentage Reduction"], //toxic
    [["FAI"], [3], "Flat Reduction"] //judgement
  ),
  new Stance(
    "Basic Stance",
    [["Armor"], [0.9], "Flat Reduction"], //physical
    [["Evasion"], [0.9], "Avoidance"], //piercing
    [["Ward"], [0.9], "Percentage Reduction"], //arcane
    [["Evasion"], [0.9], "Avoidance"], //elemental
    [["Resolve"], [0.9], "Flat Reduction"], //psychic
    [["Fortitude"], [0.9], "Percentage Reduction"], //toxic
    [["Resolve"], [0.1], "Flat Reduction"] //judgement
  ),
  new Stance(
    "Martial Defense",
    [["Armor", "VIT"], [1, 0.1], "Flat Reduction"], //physical
    [["Evasion"], [1], "Avoidance"], //piercing
    [["Fortitude"], [1], "Percentage Reduction"], //arcane
    [["Deflect"], [1], "Percentage Reduction"], //elemental
    [["Supression", "Fortitude"], [1, 0.1], "Percentage Reduction"], //psychic
    [["Fortitude"], [1], "Percentage Reduction"], //toxic
    [["Fortitude"], [0.1], "Flat Reduction"] //judgement
  ),
  new Stance(
    "Mental Defense",
    [["Armor", "INT"], [0.8, 0.1], "Percentage Reduction"], //physical
    [["Evasion", "INT"], [0.8, 0.1], "Avoidance"], //piercing
    [["Ward"], [1], "Flat Reduction"], //arcane
    [["Ward"], [1], "Flat Reduction"], //elemental
    [["Resolve"], [1], "Flat Reduction"], //psychic
    [["Fortitude"], [1], "Percentage Reduction"], //toxic
    [["Resolve"], [0.1], "Flat Reduction"] //judgement
  ),
];

export function getStanceByIndex(index: number): Stance {
  if (index < 0) index = 0;
  return StanceList[index];
}

export function getStanceByName(name: string): Stance {
  const index = StanceList.findIndex(
    (element) => element.name?.toLowerCase() === name?.toLowerCase()
  );
  return getStanceByIndex(index);
}
