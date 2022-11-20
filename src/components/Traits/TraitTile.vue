<template>
  <q-card
    class="row flex inventoryItem clickable cursor-pointer"
    style="outline: 2px ridge rgba(50, 0, 0, 0.5)"
    @click="inventoryClicked"
  >
    <div class="col text-h5 vertical-center">
      {{ itemName }}
    </div>
  </q-card>
</template>

<script lang="ts">
import Item from 'src/models/Item';
import { ref, defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    item: { type: Item, required: true },
  },
  emits: ['inventoryClicked'],

  computed: {
    itemName(): string {
      return this.item.fullName;
    },
    itemRarityColor(): string {
      return this.item.rarityColor;
    },
  },

  setup(props, context) {
    const theItem = ref(props.item.computeStats);

    const iconPath = ref(props.item.inventoryIcon);

    function inventoryClicked() {
      context.emit('inventoryClicked');
    }

    return {
      ...props,
      theItem,
      iconPath,

      //methods
      inventoryClicked,
    };
  },
});
</script>

<style scoped>
.inventoryItem:hover {
  background-color: rgba(67, 62, 71, 0.25);
}
</style>
