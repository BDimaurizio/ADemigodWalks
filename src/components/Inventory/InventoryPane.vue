<template>
  <div class="row">
    <q-icon class="col" style="font-size: 2em" name="sort_by_alpha"></q-icon>
    <q-btn class="col" label="Name" @click="sort('Name')"></q-btn>
    <q-btn class="col" label="Rarity" @click="sort('Rarity')"></q-btn>
    <q-btn class="col" label="Type" @click="sort('Type')"></q-btn>
  </div>
  <div
    class="q-ma-sm row"
    v-for="(inventoryObject, index) in inventoryArray"
    :key="inventoryObject"
  >
    <InventoryTile
      class="col"
      :item="inventoryObject"
      @inventoryClicked="inventoryClicked(inventoryObject, index)"
    ></InventoryTile>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import InventoryTile from 'src/components/Inventory/InventoryTile.vue';
import Item from 'src/models/Item';

export default defineComponent({
  components: { InventoryTile },
  props: {
    inventory: { type: Object, required: true },
    itemSortingSchema: { type: Object, required: true },
  },
  emits: ['inventoryClicked', 'updateSortingSchema'],

  computed: {},

  setup(props, context) {
    const inventoryArray = ref(props.inventory.filter(Boolean));
    const sortingSchema = ref(props.itemSortingSchema);
    let prevIndex = -1;

    function inventoryClicked(item: Item, index: number): void {
      if (index == prevIndex) {
        return;
      }
      prevIndex = index;
      context.emit('inventoryClicked', item);
    }

    function sort(style: string, forceDirection: boolean = false): void {
      if (style == 'Name') {
        inventoryArray.value.sort((a: Item, b: Item) =>
          a.fullName > b.fullName ? 1 : b.fullName > a.fullName ? -1 : 0
        );
      } else if (style == 'Type') {
        inventoryArray.value.sort((a: Item, b: Item) =>
          a.baseBodyMod.slot > b.baseBodyMod.slot
            ? 1
            : b.baseBodyMod.slot > a.baseBodyMod.slot
            ? -1
            : 0
        );
      } else if (style == 'Rarity') {
        inventoryArray.value.sort((a: Item, b: Item) =>
          a.computeStats.rarity > b.computeStats.rarity
            ? -1
            : b.computeStats.rarity > a.computeStats.rarity
            ? 1
            : 0
        );
      }

      //reversal on double click
      if (sortingSchema.value.style != style) {
        sortingSchema.value.reverse = false;
      } else if (sortingSchema.value.style == style && !forceDirection) {
        sortingSchema.value.reverse = !sortingSchema.value.reverse;
      }
      if (sortingSchema.value.reverse) {
        inventoryArray.value.reverse();
      }

      sortingSchema.value.style = style;
      context.emit('updateSortingSchema', sortingSchema.value);
    }

    onMounted(() => {
      sort(sortingSchema.value.style ?? 'name', true);
    });

    return {
      ...props,
      inventoryArray,

      //methods
      inventoryClicked,
      sort,
    };
  },
});
</script>
