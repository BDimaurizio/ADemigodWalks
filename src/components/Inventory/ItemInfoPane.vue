<template>
  <h4 :class="itemRarityColor">{{ itemName }}</h4>
  <q-separator />
  <div :class="itemRarityColor + ' text-h6'">{{ itemTagline }}</div>
  <q-separator v-if="itemMaterial != ''" />
  <div v-if="itemMaterial != ''" :class="itemRarityColor + ' text-h6'">
    Material: {{ itemMaterial }}
  </div>
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
    <!--use button-->
    <q-btn
      v-if="
        propWhere.includes('my_inventory') &&
        item.baseBodyMod.modType == 'CONSUMABLE'
      "
      class="col-5 q-pa-sm q-ma-sm"
      label="Use"
      @click="onClickUse"
    ></q-btn>
    <!--equip buttons-->
    <q-btn
      v-if="
        propWhere.includes('my_inventory') &&
        item.isEquipment &&
        chara.checkEquipPossibility(item).length == 0
      "
      class="col-5 q-pa-sm q-ma-sm"
      label="Equip"
      :disable="item.baseBodyMod.slot == 'Trinket' && !chara.checkAttunement()"
      @click="onClickEquip"
    ></q-btn>
    <q-btn
      v-if="
        propWhere.includes('my_inventory') &&
        item.isEquipment &&
        chara.checkEquipPossibility(item).includes(0)
      "
      class="col-5 q-pa-sm q-ma-sm"
      label="Equip To Main Hand"
      @click="onClickAltEquip(0)"
    ></q-btn>
    <q-btn
      v-if="
        propWhere.includes('my_inventory') &&
        item.isEquipment &&
        chara.checkEquipPossibility(item).includes(1)
      "
      class="col-5 q-pa-sm q-ma-sm"
      label="Equip To Off Hand"
      @click="onClickAltEquip(1)"
    ></q-btn>
    <q-btn
      v-if="
        propWhere.includes('my_inventory') &&
        item.isEquipment &&
        chara.checkEquipPossibility(item).includes(-1)
      "
      class="col-5 q-pa-sm q-ma-sm"
      label="Equip To Both Hands"
      @click="onClickAltEquip(-1)"
    ></q-btn>
    <!--unequp and discard buttons-->
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
import Item from "src/models/Item";
import { ref, defineComponent, PropType } from "vue";
import { getModStatsFormatted } from "src/Services/ModListManipulationService";
import Character from "src/models/Character";
import { Tag } from "src/models/Index";

export default defineComponent({
  components: {},
  props: {
    item: { type: Object as PropType<Item>, required: true },
    where: { type: String, required: true },
    chara: { type: Object as PropType<Character>, required: true },
  },
  emits: ["update"],

  computed: {
    itemName(): string {
      return this.item.fullNameWithoutMateiral;
    },
    itemTagline(): string {
      const customTaglineTags: Tag[] = ["Tool", "Instrument"];
      for (let i = 0; i < customTaglineTags.length; i++) {
        if (this.theItem.tags.includes(customTaglineTags[i])) {
          return this.item.rarityString + " " + customTaglineTags[i];
        }
      }

      return this.item.rarityString + " " + this.item.baseBodyMod.slot;
    },
    itemMaterial(): string {
      return this.item.materialName;
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
      props.chara.equipItem(props.item);
      context.emit("update");
      propWhere.value = "my_chara"; //todo fix this switching the button to unequip even if the equip is unsucessful
    }

    function onClickAltEquip(slot: number) {
      props.chara.equipItemAlt(props.item, slot);
      context.emit("update");
      propWhere.value = "my_chara"; //todo fix this switching the button to unequip even if the equip is unsucessful
    }

    function onClickUnequip() {
      props.chara.unequipItemByItem(props.item);
      context.emit("update");
      propWhere.value = "my_inventory";
    }

    function onClickDiscard() {
      props.chara.unequipItemByItem(props.item);
      props.chara.removeItemFromInventory(props.item);
      context.emit("update");
      propWhere.value = "discarded";
    }

    function onClickUse() {
      props.item.consume(props.chara);
    }

    return {
      ...props,
      theItem,
      propWhere,
      cachedStats,

      //methods
      onClickEquip,
      onClickAltEquip,
      onClickUnequip,
      onClickDiscard,
      onClickUse,
    };
  },
});
</script>
