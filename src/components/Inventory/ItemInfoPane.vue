<template>
  <h4 :class="itemRarityColor">{{ itemName }}</h4>
  <q-separator />
  <h5 :class="itemRarityColor">{{ itemTagline }}</h5>
  <q-separator />
  <pre
    v-if="cachedStats"
    class="text-bold text-indigo-10"
    style="font-family: Arial"
    >{{ cachedStats[0] }}</pre
  >
  <q-separator />
  <pre
    v-if="cachedStats"
    class="text-bold text-red"
    style="font-family: Arial"
    >{{ cachedStats[1] }}</pre
  >
  <q-separator />
  <div class="q-pt-sm q-pb-sm">
    {{ theItem.description }}
  </div>
  <q-separator />
  <div>Expected Price: {{ item.expectedPrice }}</div>
  <q-separator />
  <div class="row justify-center q-mt-xl">
    <q-btn
      v-if="propWhere.includes('my_inventory')"
      class="col-5 q-pa-sm q-ma-sm"
      label="Equip"
      @click="onClickEquip"
    ></q-btn>
    <q-btn
      v-if="propWhere.includes('my_chara')"
      class="col-5 q-pa-sm q-ma-sm"
      label="Unequip"
      @click="onClickUnequip"
    ></q-btn>
    <q-btn
      v-if="propWhere.includes('my')"
      class="col-5 q-pa-sm q-ma-sm"
      label="Discard"
      @click="onClickDiscard"
    ></q-btn>

    <div v-if="propWhere.includes('discarded')" class="text-red">Discarded</div>
  </div>
</template>

<script lang="ts">
import Item from 'src/models/Item';
import { ref, defineComponent } from 'vue';
import { getModStatsFormatted } from 'src/Services/ModListManipulationService';

export default defineComponent({
  components: {},
  props: {
    item: { type: Item, required: true },
    where: { type: String, required: true },
  },
  emits: ['equipItem', 'unequipItem', 'discardItem'],

  computed: {
    itemName(): string {
      return this.item.fullName;
    },
    itemTagline(): string {
      return this.item.rarityString + ' ' + this.item.baseBodyMod.slot;
    },
    itemRarityColor(): string {
      return this.item.rarityColor;
    },
  },

  setup(props, context) {
    const theItem = ref(props.item.computeStats);
    const propWhere = ref(props.where);
    const cachedStats = ref(getModStatsFormatted(theItem.value, true));

    function onClickEquip() {
      context.emit('equipItem', props.item);
      propWhere.value = 'my_chara';
    }

    function onClickUnequip() {
      context.emit('unequipItem', props.item);
      propWhere.value = 'my_inventory';
    }

    function onClickDiscard() {
      context.emit('discardItem', props.item);
      propWhere.value = 'discarded';
    }

    return {
      ...props,
      theItem,
      propWhere,
      cachedStats,

      //methods
      onClickEquip,
      onClickUnequip,
      onClickDiscard,
    };
  },
});
</script>
