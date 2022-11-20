<template>
  <q-page-container>
    <q-page class="row justify-evenly flex pane">
      <q-scroll-area class="col scroll pane q-pa-md q-ma-sm">
        <CharacterPane
          :chara="selectedCharacter"
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
          :chara="selectedCharacter"
        ></StatsPane>
        <JobPane
          v-else-if="visiblePaneStatus == 'class'"
          :jobList="selectedCharacter.jobs"
          :job-sorting-schema="itemSortingSchema"
          @jobClicked="jobTileClicked"
        ></JobPane>
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
        ></JobInfoPane>
      </q-scroll-area>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import Character from 'src/models/Character';
import Item from 'src/models/Item';
import { getJobByName } from 'src/Resources/JobList';
import { GenerateDeities } from 'src/Services/DeityGeneration';
import { defineComponent, reactive, ref } from 'vue';
import ItemInfoPane from 'src/components/Inventory/ItemInfoPane.vue';
import InventoryPane from 'src/components/Inventory/InventoryPane.vue';
import { testItemArray } from 'src/Services/ItemService';
import CharacterPane from 'src/components/Characters/CharacterPane.vue';
import StatsPane from 'src/components/Characters/StatsPane.vue';
import JobPane from 'src/components/Jobs/JobPane.vue';
import Job from 'src/models/Job';
import JobInfoPane from 'src/components/Jobs/JobInfoPane.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    ItemInfoPane,
    InventoryPane,
    CharacterPane,
    StatsPane,
    JobPane,
    JobInfoPane,
  },
  setup() {
    //key declarations
    const update = ref(0);

    //refs
    const selectedItem = ref();
    const selectedJob = ref();

    const directedWhere = ref('my_inventory');
    const directedInventory = ref();
    const itemSortingSchema = ref({
      style: 'Name',
      reverse: false,
    } as unknown as Record<string, boolean>);
    const visiblePaneStatus = ref('blank');

    console.log(GenerateDeities(50));

    let selectedCharacter = reactive(new Character('Playername'));
    selectedCharacter.jobs = [
      [getJobByName('Adventurer'), 7],
      [getJobByName('Sailor'), 3],
      [getJobByName('not a class'), 5],
    ];
    selectedCharacter.inventory = testItemArray(30);
    directedInventory.value = selectedCharacter.inventory;

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
      if (!where) {
        where = directedWhere.value;
      } else {
        directedWhere.value = where;
      }
      if (where.includes('inventory')) {
        directedInventory.value = selectedCharacter.inventory;
      } else if (where.includes('chara')) {
        directedInventory.value = selectedCharacter.equippedItems.concat(
          selectedCharacter.equippedTrinkets
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
      if (pane != 'chara') {
        selectedItem.value = undefined;
        visiblePaneStatus.value = pane;
      }
      selectedJob.value = undefined;
      updatePanes('my_' + pane);
      console.log(selectedCharacter);
    }

    //iteminfopane

    function equipItem(item: Item): void {
      selectedCharacter.equipItem(item);
      updatePanes();
    }

    function unequipItem(item: Item): void {
      selectedCharacter.unequipItemByItem(item);
      updatePanes();
    }

    function discardItem(item: Item): void {
      selectedCharacter.unequipItemByItem(item);
      selectedCharacter.removeItemFromInventory(item);
      updatePanes();
    }

    //job pane

    function jobTileClicked(job: [Job, number]): void {
      selectedJob.value = job;
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
