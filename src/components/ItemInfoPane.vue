<template>
  <h4 :class="itemRarityColor">{{ itemName }}</h4>
  <q-separator />
  <h5 :class="itemRarityColor">{{ itemTagline }}</h5>
  <q-separator />
  <div class="text-bold text-indigo-10" v-for="stat in array" :key="stat">
    {{ formatStatDisplay(stat) }}
  </div>
  <q-separator />
  <div class="text-bold text-red" v-for="stat in array" :key="stat">
    {{ formatNegativeDisplay(stat) }}
  </div>
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
import { ImportantStatPossibility, statArray } from 'src/models/Index';

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
    const array = ref(statArray);

    function formatStatDisplay(statName: ImportantStatPossibility): string {
      let stringBuilder = '';
      const value: number = theItem.value[statName];
      if (value <= 0) return '';

      if (statName.toUpperCase() == statName) {
        if (statName == 'HP' || statName == 'MP' || statName == 'SP') {
          stringBuilder = 'Maximum ';
        }
        return stringBuilder + statName + ': ' + value;
      }

      stringBuilder = statName.toString();
      stringBuilder = stringBuilder.replace(/([A-Z])/g, ' $1').trim();
      stringBuilder = stringBuilder.replace('Resist', 'Resistance');

      stringBuilder = stringBuilder + ': ' + value;

      return stringBuilder;
    }

    function formatNegativeDisplay(statName: ImportantStatPossibility): string {
      let stringBuilder = '';
      const value: number = theItem.value[statName];
      if (value >= 0) return '';

      if (statName.toUpperCase() == statName) {
        if (statName == 'HP' || statName == 'MP' || statName == 'SP') {
          stringBuilder = 'Maximum ';
        }
        return stringBuilder + statName + ': ' + value;
      }

      stringBuilder = statName.toString();
      stringBuilder = stringBuilder.replace(/([A-Z])/g, ' $1').trim();
      stringBuilder = stringBuilder.replace('Resist', 'Vulnerability');
      stringBuilder = stringBuilder.replace('Amplification', 'Debilitation');
      stringBuilder = stringBuilder.replace('Affinity', 'Deficiency');

      stringBuilder = stringBuilder + ': ' + value;

      return stringBuilder;
    }

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
      array,
      propWhere,

      //methods
      formatStatDisplay,
      formatNegativeDisplay,
      onClickEquip,
      onClickUnequip,
      onClickDiscard,
    };
  },
});
</script>
