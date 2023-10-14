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
      v-if="
        propWhere.includes('my_inventory') &&
        item.baseBodyMod.modType == 'CONSUMABLE'
      "
      class="col-5 q-pa-sm q-ma-sm"
      label="Use"
      @click="onClickConsume"
    ></q-btn>
    <q-btn
      v-if="propWhere.includes('my_inventory') && item.isEquipment"
      class="col-5 q-pa-sm q-ma-sm"
      label="Equip"
      :disable="item.baseBodyMod.slot == 'Trinket' && !chara.checkAttunement()"
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

    <div v-if="propWhere.includes('discarded')" class="text-red">
      No Longer In Inventory
    </div>
  </div>
</template>

<script lang="ts">
import Item from 'src/models/Item';
import { ref, defineComponent, PropType } from 'vue';
import { getModStatsFormatted } from 'src/Services/ModListManipulationService';
import Character from 'src/models/Character';

export default defineComponent({
  components: {},
  props: {
    item: { type: Object as PropType<Item>, required: true },
    where: { type: String, required: true },
    chara: { type: Object as PropType<Character>, required: true },
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
    const cachedStats = ref(getModStatsFormatted(theItem.value, true, false));

    function onClickEquip() {
      context.emit('equipItem', props.item);
      propWhere.value = 'my_chara'; //todo fix this switching the button to unequip even if the equip is unsucessful
    }

    function onClickUnequip() {
      context.emit('unequipItem', props.item);
      propWhere.value = 'my_inventory';
    }

    function onClickDiscard() {
      context.emit('discardItem', props.item);
      propWhere.value = 'discarded';
    }

    function onClickConsume() {
      props.item.consume(props.chara);
      onClickDiscard();
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
      onClickConsume,
    };
  },
});
</script>
