<template>
  <h3 class="row justify-center">{{ chara.name }}</h3>
  <div class="charaBody text-bold row justify-center">
    <div class="col-12 charaSheetRow">
      <div class="full-height charaSheetBox"></div>
      <div :class="'full-height charaSheetBox ' + computeItemRarityColor(2)">
        <q-img
          class="cursor-pointer"
          @click="charaClicked(2)"
          :src="computeSlotDisplay(2) + ''"
          fit="contain"
          height="40%"
          width="40%"
          no-spinner
          no-transition
        />
        <div class="vertical-bottom">●</div>
      </div>
      <div class="full-height charaSheetBox"></div>
    </div>
    <div class="col-12 charaSheetRow">
      <div class="full-height charaSheetBox">
        <div :class="'full-height charaSheetBox ' + computeItemRarityColor(0)">
          <q-img
            class="cursor-pointer"
            @click="charaClicked(0)"
            :src="computeSlotDisplay(0) + ''"
            no-spinner
            no-transition
          />●
        </div>
      </div>
      <div class="full-height charaSheetBox">
        <div :class="'full-height charaSheetBox ' + computeItemRarityColor(3)">
          <q-img
            class="cursor-pointer"
            @click="charaClicked(3)"
            :src="computeSlotDisplay(3) + ''"
            no-spinner
            no-transition
          />●
        </div>
      </div>
      <div class="full-height charaSheetBox">
        <div :class="'full-height charaSheetBox ' + computeItemRarityColor(1)">
          <q-img
            class="cursor-pointer"
            @click="charaClicked(1)"
            :src="computeSlotDisplay(1) + ''"
            no-spinner
            no-transition
          />●
        </div>
      </div>
    </div>
    <div class="col-12 charaSheetRow">
      <div class="full-height charaSheetBox">
        <div :class="'full-height charaSheetBox ' + computeItemRarityColor(-1)">
          <q-img
            class="cursor-pointer"
            @click="charaClicked(-1)"
            :src="computeSlotDisplay(-1) + ''"
            no-spinner
            no-transition
          />
          <div v-if="selectedChara.getTrinkets().length > 1">
            + {{ selectedChara.getTrinkets().length - 1 }}
          </div>
          <div v-else>●</div>
        </div>
      </div>
      <div class="full-height charaSheetBox">
        <div :class="'full-height charaSheetBox ' + computeItemRarityColor(6)">
          <q-img
            class="cursor-pointer"
            @click="charaClicked(6)"
            :src="computeSlotDisplay(6) + ''"
            no-spinner
            no-transition
          />●
        </div>
      </div>
      <div class="full-height charaSheetBox">
        <div :class="'full-height charaSheetBox ' + computeItemRarityColor(4)">
          <q-img
            class="cursor-pointer"
            @click="charaClicked(4)"
            :src="computeSlotDisplay(4) + ''"
            no-spinner
            no-transition
          />●
        </div>
      </div>
    </div>
    <div class="col-12 charaSheetRow">
      <div class="full-height charaSheetBox"></div>
      <div class="full-height charaSheetBox">
        <div :class="'full-height charaSheetBox ' + computeItemRarityColor(5)">
          <q-img
            class="cursor-pointer"
            @click="charaClicked(5)"
            :src="computeSlotDisplay(5) + ''"
            no-spinner
            no-transition
          />●
        </div>
      </div>
      <div class="full-height charaSheetBox"></div>
    </div>
  </div>
  <div class="row justify-center">
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      label="Stats"
      @click="changePane('stats')"
    ></q-btn>
    <q-btn
      v-if="chara.isProtagonist"
      class="col-5 q-pa-sm q-ma-sm"
      label="Party"
      @click="changePane('party')"
    ></q-btn>
    <q-btn
      v-else
      class="col-5 q-pa-sm q-ma-sm"
      label="Return"
      @click="returnToProtag"
    ></q-btn>
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      label="Inventory"
      @click="changePane('inventory')"
    ></q-btn>
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      label="Class"
      @click="changePane('class')"
    ></q-btn>
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      label="Traits"
      @click="changePane('traits')"
    ></q-btn>
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      label="Skills / Spells"
      @click="changePane('skills')"
    ></q-btn>
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      label="Divinity"
      @click="changePane('divinity')"
    ></q-btn>
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      label="Crafting"
      @click="changePane('crafting')"
    ></q-btn>
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      label="Map"
      @click="changePane('map')"
    ></q-btn>
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      label="Location"
      @click="changePane('location')"
    ></q-btn>
  </div>
</template>

<script lang="ts">
import Character from 'src/models/Character';
import { reactive, defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    chara: { type: Character, required: true },
  },
  emits: ['charaClicked', 'changePane', 'returnToProtag'],
  computed: {},

  setup(props, context) {
    const selectedChara = reactive(props.chara);

    function computeSlotDisplay(index: number): URL {
      if (index == -1) {
        return (
          selectedChara.getTrinkets()[0]?.inventoryIcon ??
          new URL('src/assets/Icons/empty.png', import.meta.url)
        );
      } else {
        return (
          selectedChara.getEquipment()[index]?.inventoryIcon ??
          new URL('src/assets/Icons/empty.png', import.meta.url)
        );
      }
    }

    function computeItemRarityColor(index: number): string {
      if (index == -1) {
        return (
          selectedChara.getTrinkets()[0]?.rarityColor ?? 'text-transparent'
        );
      } else {
        return (
          selectedChara.getEquipment()[index]?.rarityColor ?? 'text-transparent'
        );
      }
    }

    //button functions

    function charaClicked(index: number) {
      if (index == -1) {
        context.emit('charaClicked', selectedChara.getTrinkets()[0]);
        return;
      }
      context.emit('charaClicked', selectedChara.getEquipment()[index]);
    }

    function changePane(pane: string) {
      context.emit('changePane', pane);
    }

    function returnToProtag() {
      context.emit('returnToProtag');
    }

    return {
      selectedChara,

      //methods
      computeSlotDisplay,
      computeItemRarityColor,
      charaClicked,
      changePane,
      returnToProtag,
    };
  },
});
</script>

<style scoped>
.charaBody {
  background-image: URL('src/assets/equipmentScreen.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 1px;
  max-height: 40vh;
  min-width: 1px;
  aspect-ratio: 1;
  margin: auto;
}

.charaSheetRow {
  height: 25%;
  vertical-align: middle;
}

.charaSheetBox {
  width: calc(100% / 3);
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  transform: translateY(15%);
  bottom: 0;
  right: 0;
}
</style>
