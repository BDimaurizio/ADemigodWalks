<template>
  <q-page-container>
    <q-page class="row justify-evenly flex pane">
      <q-scroll-area class="col scroll pane q-pa-md q-ma-sm">
        <CharacterPane
          :chara="(selectedCharacter as Character)"
          :key="update"
          @charaClicked="charaClicked"
          @changePane="changeVisiblePane"
          @return-to-protag="returnToProtag"
        >
        </CharacterPane>
      </q-scroll-area>
      <q-scroll-area class="col scroll pane q-pa-md q-ma-sm">
        <InventoryPane
          v-if="visiblePaneStatus == 'inventory'"
          :inventory="directedInventory"
          :item-sorting-schema="itemSortingSchema"
          @inventoryClicked="inventoryTileClicked"
          @updateSortingSchema="updateSortingSchema"
          :key="update"
        ></InventoryPane>
        <StatsPane
          v-else-if="visiblePaneStatus == 'stats'"
          :chara="(selectedCharacter as Character)"
          :key="update + 1"
        ></StatsPane>
        <JobPane
          v-else-if="visiblePaneStatus == 'class'"
          :jobList="selectedCharacter.jobs"
          :job-sorting-schema="itemSortingSchema"
          :key="update + 2"
          @jobClicked="jobTileClicked"
        ></JobPane>
        <FavorabilityDisplay
          v-else-if="visiblePaneStatus == 'divinity'"
          :chara="(selectedCharacter as Character)"
          :pantheon="pantheon"
          @deityClicked="deityClicked"
        ></FavorabilityDisplay>
        <TraitListPane
          v-else-if="visiblePaneStatus == 'traits'"
          :trait-list="selectedCharacter.traits"
          :sorting-schema="itemSortingSchema"
          :chara="(selectedCharacter as Character)"
          @trait-list-clicked="traitClicked"
        ></TraitListPane>
        <SkillListPane
          v-else-if="visiblePaneStatus == 'skills'"
          :skill-list="selectedCharacter.skills"
          :sorting-schema="itemSortingSchema"
          :chara="(selectedCharacter as Character)"
          @skill-list-clicked="skillClicked"
        ></SkillListPane>
        <PartyList
          v-else-if="visiblePaneStatus == 'party'"
          :partyMemberList="(party as Character[])"
          :partyMemberSortingSchema="itemSortingSchema"
          @partyMemberClicked="partyMemberClicked"
        ></PartyList>
        <HappeningPane
          style="max-width: 29vw"
          v-else-if="visiblePaneStatus == 'happening'"
          :happening="currentHappening"
          @choiceClicked="choiceClicked"
          :key="update + currentHappening.title"
        ></HappeningPane>
        <SkillCastingPane
          v-else-if="visiblePaneStatus == 'cast'"
          :skill="selectedSkill"
          :party-member-list="(party as Character[])"
          :sorting-schema="itemSortingSchema"
          :caster="(selectedCharacter as Character)"
          @updateSortingSchema="updateSortingSchema"
        ></SkillCastingPane>
        <StanceListPane
          v-else-if="visiblePaneStatus == 'stance'"
          :stance-list="selectedCharacter.stances"
          :active-stance="selectedCharacter.currentStance"
          @stance-list-clicked="stanceClicked"
          :key="update + 3"
        ></StanceListPane>
      </q-scroll-area>
      <q-scroll-area class="col scroll pane q-pa-md q-ma-sm">
        <item-info-pane
          v-if="selectedItem"
          :item="selectedItem"
          :where="directedWhere"
          :key="selectedItem"
          :chara="(selectedCharacter as Character)"
          @update="updatePanes"
        ></item-info-pane>
        <JobInfoPane
          v-else-if="selectedJob"
          :job="selectedJob"
          :where="directedWhere"
          :key="update + selectedJob"
          :exp-to-spend="selectedCharacter.currentEXP"
          @level-up="levelup"
        ></JobInfoPane>
        <DeityDetailsPane
          v-else-if="selectedDeity"
          :Deity="selectedDeity"
          :stats="(selectedCharacter.stats as Mod)"
          :key="selectedDeity"
        ></DeityDetailsPane>
        <TraitInfoPane
          v-else-if="selectedTrait"
          :trait="(selectedTrait as Mod)"
          :active="(selectedTrait.eligibilityChecker(selectedCharacter) as boolean)"
          :key="selectedTrait"
        ></TraitInfoPane>
        <SkillInfoPane
          v-else-if="selectedSkill"
          :skill="(selectedSkill as Skill)"
          :key="selectedSkill"
          @on-click-cast="onClickCast"
        ></SkillInfoPane>
        <PartyMemberInfoPane
          v-else-if="selectedPartyMember"
          :partyMember="(selectedPartyMember as Character)"
          :key="selectedPartyMember"
          @on-click-inspect="onClickInspect"
        ></PartyMemberInfoPane>
        <LogPane
          v-else-if="visiblePaneStatus == 'happening'"
          :log="logCollection"
          :key="update"
        ></LogPane>
        <StanceInfoPane
          v-else-if="selectedStance"
          :stance="(selectedStance as Stance)"
          :chara="(selectedCharacter as Character)"
          :key="selectedStance"
          @update="updatePanes"
        ></StanceInfoPane>
      </q-scroll-area>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import Character from "src/models/Character";
import Item from "src/models/Item";
import { GenerateDeities } from "src/Services/DeityGeneration";
import { defineComponent, ref } from "vue";
import ItemInfoPane from "src/components/Inventory/ItemInfoPane.vue";
import InventoryPane from "src/components/Inventory/InventoryPane.vue";
import CharacterPane from "src/components/Characters/CharacterPane.vue";
import StatsPane from "src/components/Characters/StatsPane.vue";
import JobPane from "src/components/Jobs/JobPane.vue";
import Job from "src/models/Job";
import JobInfoPane from "src/components/Jobs/JobInfoPane.vue";
import FavorabilityDisplay from "src/components/Divinity/FavorabilityDisplay.vue";
import Deity from "src/models/Deity";
import DeityDetailsPane from "src/components/Divinity/DeityDetailsPane.vue";
import TraitListPane from "src/components/Traits/TraitListPane.vue";
import TraitInfoPane from "src/components/Traits/TraitInfoPane.vue";
import Mod from "src/models/Mod";
import SkillListPane from "src/components/Skills/SkillListPane.vue";
import Skill from "src/models/Skill";
import SkillInfoPane from "src/components/Skills/SkillInfoPane.vue";
import PartyList from "src/components/Characters/PartyList.vue";
import { testCharacter, testProtagonist } from "src/Services/CharacterService";
import PartyMemberInfoPane from "src/components/Characters/PartyMemberInfoPane.vue";
import { GenerateWorld } from "src/Services/WorldGeneration";
import HappeningPane from "src/components/Happening/HappeningPane.vue";
import { getHappeningByID } from "src/Resources/HappeningList";
import LogPane from "src/components/Happening/LogPane.vue";
import SkillCastingPane from "src/components/Skills/SkillCastingPane.vue";
import StanceListPane from "src/components/Stance/StanceListPane.vue";
import Stance from "src/models/Stance";
import StanceInfoPane from "src/components/Stance/StanceInfoPane.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    ItemInfoPane,
    InventoryPane,
    CharacterPane,
    StatsPane,
    JobPane,
    JobInfoPane,
    FavorabilityDisplay,
    DeityDetailsPane,
    TraitListPane,
    TraitInfoPane,
    SkillListPane,
    SkillInfoPane,
    PartyList,
    PartyMemberInfoPane,
    HappeningPane,
    LogPane,
    SkillCastingPane,
    StanceListPane,
    StanceInfoPane,
  },

  setup() {
    //key declarations
    const update = ref(0);

    //refs
    const selectedItem = ref();
    const selectedJob = ref();
    const selectedDeity = ref();
    const selectedTrait = ref();
    const selectedStance = ref();
    const selectedSkill = ref();
    const selectedPartyMember = ref();

    const currentHappening = ref(getHappeningByID("setout"));
    const activeLocation = ref();
    const logCollection = ref([] as [string, Date][]);

    const directedWhere = ref("my_inventory");
    const directedInventory = ref();
    const itemSortingSchema = ref({
      style: "Name",
      reverse: false,
    } as unknown as Record<string, boolean>);
    const visiblePaneStatus = ref("blank");
    const pantheon = ref(GenerateDeities(7));

    const party = ref([] as Character[]);

    party.value.push(testProtagonist("(you)"));
    party.value.push(testCharacter("albert"));
    //party.value.push(testCharacter("dianne"));
    //party.value.push(testCharacter("luchious"));
    //party.value.push(testCharacter("martholemew"));
    //party.value.push(testCharacter("mathmatical"));

    let selectedCharacter = ref(party.value[0]);

    //inventory pane

    function inventoryTileClicked(item: Item): void {
      if (selectedItem.value == item) {
        updatePanes();
      }
      selectedItem.value = item;
    }

    function updateSortingSchema(schema: Record<string, boolean>) {
      itemSortingSchema.value = schema;
    }

    function updatePanes(where?: string): void {
      console.log("updateo");
      if (visiblePaneStatus.value == "happening") {
        updateLogCollection();
      }
      if (!where) {
        where = directedWhere.value;
      } else {
        directedWhere.value = where;
      }
      if (where.includes("inventory")) {
        directedInventory.value = selectedCharacter.value.getInventory();
      } else if (where.includes("chara")) {
        directedInventory.value = selectedCharacter.value.getEquipment();
      }
      update.value++;
      if (update.value > 999) {
        update.value = 0;
      }
    }

    //chara pane

    function charaClicked(item: Item): void {
      selectedItem.value = item;
      if (directedWhere.value == "my_chara") {
        return;
      }
      visiblePaneStatus.value = "inventory";
      changeVisiblePane("chara");
    }

    //called when a pane change button is pressed
    function changeVisiblePane(pane: string): void {
      //test functionality
      if (pane == "map") {
        const size = 10;
        const map = GenerateWorld(size);
        let mapform: number[][] = [];
        for (let i = 0; i < size; i++) {
          mapform.push([]);
        }
        for (let i = 0; i < map.length; i++) {
          for (let j = 0; j < map[i].length; j++) {
            mapform[i][j] = map[i][j].threat;
          }
        }
        for (let k = 0; k < mapform.length; k++) {
          console.log(mapform[k]);
        }
      }
      //end test

      if (
        visiblePaneStatus.value == pane &&
        visiblePaneStatus.value != "inventory"
      ) {
        return;
      }
      if (pane != "chara") {
        selectedItem.value = undefined;
        visiblePaneStatus.value = pane;
      }
      selectedJob.value = undefined;
      selectedDeity.value = undefined;
      selectedTrait.value = undefined;
      selectedStance.value = undefined;
      selectedSkill.value = undefined;
      selectedPartyMember.value = undefined;
      updatePanes("my_" + pane);
      console.log(selectedCharacter.value);
    }

    //job pane

    function jobTileClicked(job: [Job, number]): void {
      selectedJob.value = job;
    }

    function levelup(job: [Job, number, number]): void {
      //job, level, exp cost
      selectedCharacter.value.levelUp(job[0], job[2]);
      updatePanes();
    }

    //divinity

    function deityClicked(deity: Deity): void {
      selectedDeity.value = deity;
    }

    //traits

    function traitClicked(trait: Mod): void {
      selectedTrait.value = trait;
    }

    //stances
    function stanceClicked(stance: Stance): void {
      selectedStance.value = stance;
    }

    //skills

    function skillClicked(skill: Skill): void {
      selectedSkill.value = skill;
    }

    function onClickCast(skill: Skill): void {
      selectedSkill.value = skill;
      changeVisiblePane("cast");
      selectedSkill.value = skill;
      updatePanes();
    }

    //party

    function partyMemberClicked(partyMember: Character): void {
      selectedPartyMember.value = partyMember;
    }

    function onClickInspect(partyMember: Character): void {
      for (let i = 0; i < party.value.length; i++) {
        if (partyMember == party.value[i]) {
          selectedCharacter.value = party.value[i];
          break;
        }
      }
      changeVisiblePane("stats");
      updatePanes();
    }

    function returnToProtag(): void {
      for (let i = 0; i < party.value.length; i++) {
        if (party.value[i].isProtagonist) {
          selectedCharacter.value = party.value[i];
          break;
        }
      }
      changeVisiblePane("stats");
      updatePanes();
    }

    //happening

    function choiceClicked(index: number, input: string): void {
      currentHappening.value.choices[index].onSelection(
        party.value as Character[]
      );

      specialInput(currentHappening.value.id, input);

      const oldHappening = currentHappening.value;

      currentHappening.value = getHappeningByID(
        oldHappening.choices[index].nextHappeningID
      );

      currentHappening.value.context =
        oldHappening.choices[index].nextHappeningContext;

      currentHappening.value.onArrival(party.value as Character[]);

      updatePanes();
    }

    function specialInput(context: string, input: string): void {
      switch (context) {
        case "nameInput":
          selectedCharacter.value.name = input;
          break;
        case "something":
          //something
          break;
      }
    }

    function updateLogCollection(): void {
      //add the old logs to the logbuilder
      let logBuilder: [string, Date][] = logCollection.value;

      //add all party members logs to the logbuilder
      for (let i = 0; i < party.value.length; i++) {
        logBuilder = logBuilder.concat(party.value[i].log);
        party.value[i].clearLog();
      }

      //check if the logs even changed
      if (logBuilder.length == logCollection.value.length) {
        console.log("no change");
        return;
      }

      //sort the array
      logBuilder.sort((a: [string, Date], b: [string, Date]) =>
        a[1] < b[1] ? 1 : b[1] < a[1] ? -1 : 0
      );

      //truncate the array
      logBuilder.length = Math.min(logBuilder.length, 50);

      logCollection.value = logBuilder;
    }

    return {
      //refs
      selectedItem,
      selectedCharacter,
      directedInventory,
      directedWhere,
      itemSortingSchema,
      visiblePaneStatus,
      selectedJob,
      pantheon,
      selectedDeity,
      selectedTrait,
      selectedStance,
      selectedSkill,
      party,
      selectedPartyMember,
      activeLocation,
      currentHappening,
      logCollection,

      //keys
      update,

      inventoryTileClicked,
      jobTileClicked,
      charaClicked,
      updateSortingSchema,
      changeVisiblePane,
      deityClicked,
      traitClicked,
      stanceClicked,
      skillClicked,
      onClickCast,
      levelup,
      partyMemberClicked,
      onClickInspect,
      returnToProtag,
      choiceClicked,
      updatePanes,
    };
  }, //need to generate in order: base, material, quality, prefix?, the rest
});
</script>

<style scoped>
.pane {
  outline: 2px ridge rgba(19, 12, 22, 0.6);
  border-radius: 2rem;
  height: auto;
  background: rgba(124, 116, 128, 0.2);
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
