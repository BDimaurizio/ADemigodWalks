<template>
  <div>
    <div v-if="charSelectionsRemaining > 0">
      <div class="row">
        <q-icon
          class="col"
          style="font-size: 2em"
          name="sort_by_alpha"
        ></q-icon>
        <q-btn class="col" label="Name" @click="sortChar('Name')"></q-btn>
        <q-btn class="col" label="Level" @click="sortChar('Level')"></q-btn>
      </div>
      <h5>Select {{ charSelectionsRemaining }} target(s):</h5>
      <div
        class="q-ma-sm row"
        style="vertical-align: top"
        v-for="(partyMemberObject, index) in partyMemberArray"
        :key="partyMemberObject.name + index"
      >
        <PartyMemberTile
          v-if="
            partyMemberObject &&
            !charSelectionTargets.includes(partyMemberObject)
          "
          class="col"
          :partyMember="(partyMemberObject as Character)"
          @partyMemberClicked="
            partyMemberClicked(partyMemberObject as Character, index)
          "
        ></PartyMemberTile>
      </div>
    </div>

    <div v-if="itemSelectionsRemaining > 0">
      <div class="row">
        <q-icon
          class="col"
          style="font-size: 2em"
          name="sort_by_alpha"
        ></q-icon>
        <q-btn class="col" label="Name" @click="sortItem('Name')"></q-btn>
        <q-btn class="col" label="Rarity" @click="sortItem('Rarity')"></q-btn>
        <q-btn class="col" label="Type" @click="sortItem('Type')"></q-btn>
      </div>
      <h5>Select {{ itemSelectionsRemaining }} target(s):</h5>
      <div
        class="q-ma-sm row"
        v-for="(inventoryObject, index) in inventoryArray"
        :key="inventoryObject.fullName + index"
      >
        <InventoryTile
          class="col"
          :item="(inventoryObject as Item)"
          @inventoryClicked="inventoryClicked(inventoryObject as Item, index)"
        ></InventoryTile>
      </div>
    </div>

    <div v-if="itemSelectionsRemaining < 1 && charSelectionsRemaining < 1">
      <h5 v-if="castSuccess">Cast Successful!</h5>
      <h5 v-else>Cast failed.</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, PropType } from 'vue';
import PartyMemberTile from '../Characters/PartyMemberTile.vue';
import Character from 'src/models/Character';
import Skill from 'src/models/Skill';
import InventoryTile from 'src/components/Inventory/InventoryTile.vue';
import Item from 'src/models/Item';

export default defineComponent({
  components: { PartyMemberTile, InventoryTile },
  props: {
    skill: { type: Object as PropType<Skill>, required: true },
    partyMemberList: { type: Object as PropType<Character[]>, required: true },
    caster: { type: Object as PropType<Character>, required: true },
    sortingSchema: { type: Object, required: true },
  },
  emits: ['updateSortingSchema'],

  computed: {},

  setup(props, context) {
    const partyMemberArray = ref(
      props.partyMemberList.filter(Boolean) as Character[]
    );
    const sortingSchema = ref(props.sortingSchema);
    let prevIndex = -1;

    const inventoryArray = ref(
      props.partyMemberList[0].getInventory().filter(Boolean)
    );

    const charSelectionsRemaining = ref(props.skill.characterTargets);
    const itemSelectionsRemaining = ref(props.skill.itemTargets);

    const charSelectionTargets = ref([] as Character[]);
    const itemSelectionTargets = ref([] as Item[]);

    const castSuccess = ref(false);

    function partyMemberClicked(partyMember: Character, index: number): void {
      if (index == prevIndex) {
        return;
      }
      prevIndex = index;
      charSelectionsRemaining.value--;
      charSelectionTargets.value.push(partyMember);
      if (charSelectionsRemaining.value < 1) {
        prevIndex = -1;
        if (itemSelectionsRemaining.value < 1) {
          doCast();
        }
      }
    }

    function inventoryClicked(item: Item, index: number): void {
      console.log(item.fullName);
      if (index == prevIndex) {
        return;
      }
      prevIndex = index;
      itemSelectionsRemaining.value--;
      itemSelectionTargets.value.push(item);
      if (itemSelectionsRemaining.value < 1) {
        prevIndex = -1;
        if (charSelectionsRemaining.value < 1) {
          doCast();
        }
      }
    }

    function doCast() {
      castSuccess.value = props.skill.skillCast(
        props.caster,
        charSelectionTargets.value as Character[],
        itemSelectionTargets.value as Item[]
      );
      props.caster.removeTackOnTrait('Scroll Reading: ' + props.skill.name); //wrong
    }

    function sortChar(style: string, forceDirection: boolean = false): void {
      prevIndex = -1;
      if (style == 'Name') {
        partyMemberArray.value.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      } else if (style == 'Level') {
        partyMemberArray.value.sort((a, b) =>
          a.totalLevel < b.totalLevel ? 1 : b.totalLevel < a.totalLevel ? -1 : 0
        );
      }

      //reversal on double click
      if (sortingSchema.value.style != style) {
        sortingSchema.value.reverse = false;
      } else if (sortingSchema.value.style == style && !forceDirection) {
        sortingSchema.value.reverse = !sortingSchema.value.reverse;
      }
      if (sortingSchema.value.reverse) {
        partyMemberArray.value.reverse();
      }

      sortingSchema.value.style = style;
      context.emit('updateSortingSchema', sortingSchema.value);
    }

    function sortItem(style: string, forceDirection: boolean = false): void {
      prevIndex = -1;
      if (style == 'Name') {
        inventoryArray.value.sort((a, b) =>
          a.fullName > b.fullName ? 1 : b.fullName > a.fullName ? -1 : 0
        );
      } else if (style == 'Type') {
        inventoryArray.value.sort((a, b) =>
          a.baseBodyMod.slot > b.baseBodyMod.slot
            ? 1
            : b.baseBodyMod.slot > a.baseBodyMod.slot
            ? -1
            : 0
        );
      } else if (style == 'Rarity') {
        inventoryArray.value.sort((a, b) =>
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
      sortChar(sortingSchema.value.style ?? 'name', true);
      sortItem(sortingSchema.value.style ?? 'name', true);
    });

    return {
      ...props,
      partyMemberArray,
      inventoryArray,
      charSelectionsRemaining,
      itemSelectionsRemaining,
      charSelectionTargets,
      itemSelectionTargets,
      castSuccess,

      //methods
      partyMemberClicked,
      inventoryClicked,
      sortChar,
      sortItem,
    };
  },
});
</script>
