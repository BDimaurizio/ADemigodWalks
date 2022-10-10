<template>
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
        :itemSortingSchema="itemSortingSchema"
        @inventoryClicked="inventoryClicked"
        @updateSortingSchema="updateSortingSchema"
        :key="update"
      ></InventoryPane>
      <StatsPane
        v-else-if="visiblePaneStatus == 'stats'"
        :chara="selectedCharacter"
      ></StatsPane>
    </q-scroll-area>
    <q-scroll-area class="col scroll pane q-pa-md q-ma-sm">
      <item-info-pane
        v-if="selectedItem"
        :item="selectedItem"
        :where="directedInventoryWhere"
        :key="selectedItem"
        @equipItem="equipItem"
        @unequipItem="unequipItem"
        @discardItem="discardItem"
      ></item-info-pane>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import Character from 'src/models/Character';
import Item from 'src/models/Item';
import { getJobByName } from 'src/Resources/JobList';
import { GenerateDeities } from 'src/Services/DeityGeneration';
import { defineComponent, reactive, ref } from 'vue';
import ItemInfoPane from '../components/ItemInfoPane.vue';
import InventoryPane from 'src/components/InventoryPane.vue';
import { testItemArray } from 'src/Services/ItemService';
import CharacterPane from 'src/components/CharacterPane.vue';
import StatsPane from 'src/components/StatsPane.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { ItemInfoPane, InventoryPane, CharacterPane, StatsPane },
  setup() {
    //key declarations
    const update = ref(0);

    //refs
    const selectedItem = ref();
    const directedInventoryWhere = ref('my_inventory');
    const directedInventory = ref();
    const itemSortingSchema = ref({
      style: 'Name',
      reverse: false,
    } as unknown as Record<string, boolean>);
    const visiblePaneStatus = ref('blank');

    console.log(GenerateDeities(50));

    let selectedCharacter = reactive(new Character('Playername'));
    selectedCharacter.jobs = [
      [getJobByName('Adventurer'), 10],
      [getJobByName('Sailor'), 10],
      [getJobByName('not a class'), 10],
    ];
    selectedCharacter.inventory = testItemArray(30);
    directedInventory.value = selectedCharacter.inventory;

    ///////////////////////emits:

    //inventory pane

    function inventoryClicked(item: Item): void {
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
        where = directedInventoryWhere.value;
      } else {
        directedInventoryWhere.value = where;
      }
      if (where.includes('inventory')) {
        directedInventory.value = selectedCharacter.inventory;
      } else if (where.includes('chara')) {
        directedInventory.value = selectedCharacter.equippedItems.concat(
          selectedCharacter.equippedTrinkets
        );
      }
      update.value++;
    }

    //chara pane

    function charaClicked(item: Item): void {
      selectedItem.value = item;
      if (directedInventoryWhere.value == 'my_chara') {
        return;
      }
      visiblePaneStatus.value = 'inventory';
      updatePanes('my_chara');
    }

    //called when a pane change button is pressed
    function changeVisiblePane(pane: string): void {
      visiblePaneStatus.value = pane;
      selectedItem.value = undefined;
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

    return {
      //refs
      selectedItem,
      selectedCharacter,
      directedInventory,
      directedInventoryWhere,
      itemSortingSchema,
      visiblePaneStatus,

      //keys
      update,

      inventoryClicked,
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
