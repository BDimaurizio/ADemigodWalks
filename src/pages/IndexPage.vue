<template>
  <q-page-container>
    <q-page class="row justify-evenly flex pane">
      <q-scroll-area class="col scroll pane q-pa-md q-ma-sm">
        <CharacterPane
          :chara="(selectedCharacter as Character)"
          :key="update"
          @charaClicked="charaClicked"
          @changePane="changeVisiblePane"
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
        ></StatsPane>
        <JobPane
          v-else-if="visiblePaneStatus == 'class'"
          :jobList="selectedCharacter.jobs"
          :job-sorting-schema="itemSortingSchema"
          :key="update + 1"
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
      </q-scroll-area>
      <q-scroll-area class="col scroll pane q-pa-md q-ma-sm">
        <item-info-pane
          v-if="selectedItem"
          :item="selectedItem"
          :where="directedWhere"
          :key="selectedItem"
          @equipItem="equipItem"
          @unequipItem="unequipItem"
          @discardItem="discardItem"
        ></item-info-pane>
        <JobInfoPane
          v-else-if="selectedJob"
          :job="selectedJob"
          :where="directedWhere"
          :key="selectedJob"
          :exp-to-spend="selectedCharacter.currentEXP"
          @level-up="levelup"
        ></JobInfoPane>
        <DeityDetailsPane
          v-else-if="selectedDeity"
          :Deity="selectedDeity"
          :chara="(selectedCharacter as Character)"
          :key="selectedDeity"
        ></DeityDetailsPane>
        <TraitInfoPane
          v-else-if="selectedTrait"
          :trait="selectedTrait"
          :active="true"
          :key="selectedTrait"
        ></TraitInfoPane>
      </q-scroll-area>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import Character from 'src/models/Character';
import Item from 'src/models/Item';
import { getJobByName } from 'src/Resources/JobList';
import { GenerateDeities } from 'src/Services/DeityGeneration';
import { defineComponent, ref } from 'vue';
import ItemInfoPane from 'src/components/Inventory/ItemInfoPane.vue';
import InventoryPane from 'src/components/Inventory/InventoryPane.vue';
import { testItemArray } from 'src/Services/ItemService';
import CharacterPane from 'src/components/Characters/CharacterPane.vue';
import StatsPane from 'src/components/Characters/StatsPane.vue';
import JobPane from 'src/components/Jobs/JobPane.vue';
import Job from 'src/models/Job';
import JobInfoPane from 'src/components/Jobs/JobInfoPane.vue';
import FavorabilityDisplay from 'src/components/Divinity/FavorabilityDisplay.vue';
import Deity from 'src/models/Deity';
import DeityDetailsPane from 'src/components/Divinity/DeityDetailsPane.vue';
import TraitListPane from 'src/components/Traits/TraitListPane.vue';
import { getTraitByName } from 'src/Resources/TraitList';
import TraitInfoPane from 'src/components/Traits/TraitInfoPane.vue';
import Mod from 'src/models/Mod';

export default defineComponent({
  name: 'IndexPage',
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
  },
  setup() {
    //key declarations
    const update = ref(0);

    //refs
    const selectedItem = ref();
    const selectedJob = ref();
    const selectedDeity = ref();
    const selectedTrait = ref();

    const directedWhere = ref('my_inventory');
    const directedInventory = ref();
    const itemSortingSchema = ref({
      style: 'Name',
      reverse: false,
    } as unknown as Record<string, boolean>);
    const visiblePaneStatus = ref('blank');
    const pantheon = ref(GenerateDeities(7));

    let selectedCharacter = ref(new Character('Playername'));
    selectedCharacter.value.jobs = [
      [getJobByName('Adventurer'), 7],
      [getJobByName('Sailor'), 0],
      [getJobByName('not a class'), 5],
    ];
    selectedCharacter.value.inventory = testItemArray(30);
    directedInventory.value = selectedCharacter.value.inventory;
    selectedCharacter.value.tackedOnMod.FAI = 29;
    selectedCharacter.value.tackedOnMod.VIT = 6;
    selectedCharacter.value.currentEXP = 500;
    selectedCharacter.value.tackedOnMod.Traits.push(
      getTraitByName('Hat Wearer')
    );

    ///////////////////////emits:

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
      console.log(where);
      console.log(directedWhere.value);
      if (!where) {
        where = directedWhere.value;
      } else {
        directedWhere.value = where;
      }
      if (where.includes('inventory')) {
        directedInventory.value = selectedCharacter.value.inventory;
      } else if (where.includes('chara')) {
        directedInventory.value = selectedCharacter.value.equippedItems.concat(
          selectedCharacter.value.equippedTrinkets
        );
      }
      update.value++;
      if (update.value > 999) {
        update.value = 0;
      }
    }

    //chara pane

    function charaClicked(item: Item): void {
      selectedItem.value = item;
      if (directedWhere.value == 'my_chara') {
        return;
      }
      visiblePaneStatus.value = 'inventory';
      changeVisiblePane('chara');
    }

    //called when a pane change button is pressed
    function changeVisiblePane(pane: string): void {
      if (
        visiblePaneStatus.value == pane &&
        visiblePaneStatus.value != 'inventory'
      ) {
        return;
      }
      if (pane != 'chara') {
        selectedItem.value = undefined;
        visiblePaneStatus.value = pane;
      }
      selectedJob.value = undefined;
      selectedDeity.value = undefined;
      updatePanes('my_' + pane);
      console.log(selectedCharacter.value);
    }

    //iteminfopane

    function equipItem(item: Item): void {
      selectedCharacter.value.equipItem(item);
      updatePanes();
    }

    function unequipItem(item: Item): void {
      selectedCharacter.value.unequipItemByItem(item);
      updatePanes();
    }

    function discardItem(item: Item): void {
      selectedCharacter.value.unequipItemByItem(item);
      selectedCharacter.value.removeItemFromInventory(item);
      updatePanes();
    }

    //job pane

    function jobTileClicked(job: [Job, number]): void {
      selectedJob.value = job;
    }

    function levelup(job: [Job, number, number]): void {
      //job, level, exp cost
      for (let i = 0; i < selectedCharacter.value.jobs.length; i++) {
        if (selectedCharacter.value.jobs[i][0].name == job[0].name) {
          selectedCharacter.value.currentEXP -= job[2];
          selectedCharacter.value.jobs[i][1]++;
          break;
        }
      }
      updatePanes();
    }

    //divinity

    function deityClicked(deity: Deity): void {
      console.log(deity);
      selectedDeity.value = deity;
    }

    //traits

    function traitClicked(trait: Mod): void {
      selectedTrait.value = trait;
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

      //keys
      update,

      inventoryTileClicked,
      jobTileClicked,
      charaClicked,
      equipItem,
      unequipItem,
      discardItem,
      updateSortingSchema,
      changeVisiblePane,
      deityClicked,
      traitClicked,
      levelup,
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
