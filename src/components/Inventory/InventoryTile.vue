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
import Item from "src/models/Item";
import { defineComponent, PropType } from "vue";
/*
https://github.com/game-icons/icons
https://opengameart.org/content/tool-icons
https://opengameart.org/content/ring-set-precious-metals
https://opengameart.org/content/orbs-collection
https://opengameart.org/content/gems-classic
https://opengameart.org/content/gems-jewels
https://opengameart.org/content/attack-icons-wesnoth
https://opengameart.org/content/dungeon-crawl-32x32-tiles
https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental
https://opengameart.org/content/700-rpg-icons
https://opengameart.org/content/16x16-weapon-rpg-icons
https://opengameart.org/content/496-pixel-art-icons-for-medievalfantasy-rpg
https://opengameart.org/content/basic-gems-icon-set
https://opengameart.org/node/12210
https://opengameart.org/node/109980
https://opengameart.org/content/bag-icon
https://opengameart.org/content/studded-belt
*/

export default defineComponent({
  components: {},
  props: {
    item: { type: Object as PropType<Item>, required: true },
    showMaterial: { type: Boolean, required: true },
  },
  emits: ["inventoryClicked"],

  computed: {
    itemName(): string {
      if (this.$props.showMaterial) {
        return this.$props.item.fullName;
      } else {
        return this.$props.item.fullNameWithoutMateiral;
      }
    },
    itemRarityColor(): string {
      return this.$props.item.rarityColor;
    },
    iconPath(): URL {
      return this.$props.item.inventoryIcon;
    },
  },

  setup(props, context) {
    function inventoryClicked() {
      console.log(props.item.fullName);
      context.emit("inventoryClicked");
    }

    return {
      ...props,

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
