import Happening from "src/models/Happening";
import {
  ChoiceBucketDetrimentI,
  ChoiceBucketDivinityI,
  ChoiceBucketHeirloomI,
  ChoiceBucketMISC,
  ChoiceBucketMotivationI,
  ChoiceBucketOccupationI,
  ChoiceBucketTest,
  getChoiceByID,
  getChoiceByIndex,
  getRandomChoicesFromBucket,
} from "./ChoiceList";
import Choice from "src/models/Choice";

const HappeningList: Happening[] = [
  //idea:a log below the main buttons showing recent stuff like items gained?
  {
    id: "test-0",
    title: "test",
    text: "test text long text box lorum ipsum.\n\ntest text long text box <br><br><br> lorum ipsum test text long text box lorum ipsum test text long text box lorum ipsum t t loergergergergerng texergegergergt boxedgberbwsvsvbsdfvsdvsdvsdv lorum ipsum test text long text box lorum ipsum test text long text box lorum ipsum \n\n onelongwordonelongwordonelongwordonelongwordonelongwordonelongwordonelongwordonelongwordonelongwordonelongwordonelongwordonelongwordonelongwordonelongword",
    choices: [
      c("test choice 2", ChoiceBucketTest),
      c("nonsense intentionally wqefqwgqwg", ChoiceBucketTest),
      n("Start Game", "nameInput"),
    ],
    context: "",
    onArrival(party): void {
      console.log("onarrival");
      console.log(party);
    },
  },
  {
    id: "test-1",
    title: "",
    text: "testing 111000 testing",
    choices: [],
    context: "",
    onArrival(party) {
      this.choices = [i(1, ChoiceBucketTest)];
      console.log(party);
    },
  },
  {
    id: "setout",
    title: "The Adventure Begins",
    text: "",
    choices: [n("Begin", "nameInput")],
    context: "",
    onArrival(party): void {
      console.log("onarrival");
      console.log(party);
    },
  },
  {
    id: "nameInput",
    title: "Who Are You?",
    text: "What is your name?",
    choices: [],
    context: "",
    onArrival() {
      this.choices = [i(0, ChoiceBucketMISC), i(1, ChoiceBucketMISC)];
    },
  },
  {
    id: "init-motivation",
    title: "Who Are You?",
    text: "What is your reason for embarking on an adventure?",
    choices: [],
    context: "",
    onArrival() {
      this.choices = [...r(ChoiceBucketMotivationI, 5)];
    },
  },
  {
    id: "init-occupation",
    title: "Who Are You?",
    text: "What was your life like before you stepped foot into the wider world?",
    choices: [],
    context: "",
    onArrival() {
      this.choices = [...r(ChoiceBucketOccupationI, 5)];
      if (this.context == "divinity") {
        this.choices.forEach((element) => {
          element.nextHappeningID = "init-divinity";
        });
      }
    },
  },
  {
    id: "init-divinity",
    title: "Who Are You?",
    text: "What God do you follow?",
    choices: [],
    context: "",
    onArrival() {
      this.choices = [...r(ChoiceBucketDivinityI, 5)];
    },
  },
  {
    id: "init-detriment",
    title: "Who Are You?",
    text: "What is your greatest weakness?",
    choices: [],
    context: "",
    onArrival() {
      this.choices = [...r(ChoiceBucketDetrimentI, 5)];
    },
  },
  {
    id: "init-heirloom",
    title: "Who Are You?",
    text: "You brought one precious object with you on your journey...",
    choices: [],
    context: "",
    onArrival() {
      this.choices = [...r(ChoiceBucketHeirloomI, 5)];
    },
  },
];

export function getHappeningByIndex(index: number): Happening {
  if (index < 0) index = 0;
  return HappeningList[index];
}

export function getHappeningByID(id: string): Happening {
  const index = HappeningList.findIndex((element) => element.id === id);
  return getHappeningByIndex(index);
}

//get choice by id
function c(id: string, bucket: Choice[]): Choice {
  return getChoiceByID(id, bucket);
}

//get choice by index
function i(index: number, bucket: Choice[]): Choice {
  return getChoiceByIndex(index, bucket);
}

//create a new choice inline with no special properties
function n(text: string, next: string) {
  return new Choice(
    "id",
    text,
    next,
    () => {
      return true;
    },
    () => {
      return true;
    }
  );
}

//get x random choices from the specificed bucket
function r(bucket: Choice[], amount: number = 1) {
  return getRandomChoicesFromBucket(bucket, amount);
}
