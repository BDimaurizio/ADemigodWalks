<template>
  <div class="row">
    <q-icon class="col" style="font-size: 2em" name="sort_by_alpha"></q-icon>
    <q-btn class="col" label="Name" @click="sort('Name')"></q-btn>
    <q-btn class="col" label="Level" @click="sort('Level')"></q-btn>
  </div>
  <h5>Party Members:</h5>
  <div
    class="q-ma-sm row"
    style="vertical-align: top"
    v-for="(partyMemberObject, index) in partyMemberArray"
    :key="partyMemberObject.name + index"
  >
    <PartyMemberTile
      v-if="partyMemberObject"
      class="col"
      :partyMember="(partyMemberObject as Character)"
      @partyMemberClicked="
        partyMemberClicked(partyMemberObject as Character, index)
      "
    ></PartyMemberTile>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, PropType } from 'vue';
import PartyMemberTile from './PartyMemberTile.vue';
import Character from 'src/models/Character';

export default defineComponent({
  components: { PartyMemberTile },
  props: {
    partyMemberList: { type: Object as PropType<Character[]>, required: true }, // array of characters
    partyMemberSortingSchema: { type: Object, required: true },
  },
  emits: ['partyMemberClicked', 'updateSortingSchema'],

  computed: {},

  setup(props, context) {
    const partyMemberArray = ref(
      props.partyMemberList.filter(Boolean) as Character[]
    );
    const sortingSchema = ref(props.partyMemberSortingSchema);
    let prevIndex = -1;

    function partyMemberClicked(partyMember: Character, index: number): void {
      if (index == prevIndex) {
        return;
      }
      prevIndex = index;
      context.emit('partyMemberClicked', partyMember);
    }

    function sort(style: string, forceDirection: boolean = false): void {
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

    onMounted(() => {
      sort(sortingSchema.value.style ?? 'name', true);
    });

    return {
      ...props,
      partyMemberArray,

      //methods
      partyMemberClicked,
      sort,
    };
  },
});
</script>
