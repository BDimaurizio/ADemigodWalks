<template>
  <q-card
    class="row flex inventoryItem clickable cursor-pointer"
    style="outline: 2px ridge rgba(50, 0, 0, 0.5)"
    @click="inventoryClicked"
  >
    <div>
      <q-img
        class="col-1"
        :src="iconPath + ''"
        height="50px"
        width="50px"
        ratio="1"
        no-transition
        no-spinner
      >
      </q-img>
    </div>
    <div :class="itemRarityColor + ' col text-h5 vertical-center'">
      {{ itemName }}
    </div>
  </q-card>
</template>

<script lang="ts">
import Item from 'src/models/Item';
import { ref, defineComponent } from 'vue';

//https://opengameart.org/content/496-pixel-art-icons-for-medievalfantasy-rpg
//https://opengameart.org/content/16x16-weapon-rpg-icons
//https://opengameart.org/content/basic-gems-icon-set
//https://opengameart.org/node/12210
//https://opengameart.org/node/109980
//https://opengameart.org/content/bag-icon
//https://opengameart.org/content/studded-belt

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
      context.emit('inventoryClicked', props.item);
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
