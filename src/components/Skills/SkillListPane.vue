<template>
  <div class="row">
    <q-icon class="col" style="font-size: 2em" name="sort_by_alpha"></q-icon>
    <q-btn class="col" label="Name" @click="sort('Name')"></q-btn>
    <q-btn class="col" label="Eligibility" @click="sort('Eligibility')"></q-btn>
  </div>
  <div
    class="q-ma-sm row"
    v-for="(skill, index) in skillListArray"
    :key="index"
  >
    <SkillTile
      class="col"
      :skill="skill"
      @inventoryClicked="skillClicked(skill)"
    ></SkillTile>
  </div>
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { ref, defineComponent, onMounted } from "vue";
import SkillTile from "./SkillTile.vue";
import Mod from "src/models/Mod";
import Character from "src/models/Character";

export default defineComponent({
  components: { SkillTile },
  props: {
    skillList: { type: Object, required: true },
    sortingSchema: { type: Object, required: true },
    chara: { type: Character, required: true },
  },
  emits: ["skillListClicked", "updateSortingSchema"],

  computed: {},

  setup(props, context) {
    const skillListArray = ref(props.skillList.filter(Boolean));
    const sortingSchema = ref(props.sortingSchema);

    function skillClicked(item: Mod): void {
      context.emit("skillListClicked", item);
    }

    function sort(style: string, forceDirection: boolean = false): void {
      if (style == "Name") {
        skillListArray.value.sort((a: Mod, b: Mod) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      } else if (style == "Eligibility") {
        skillListArray.value.sort((a: Mod, b: Mod) =>
          a.eligibilityChecker!(props.chara) >
          b.eligibilityChecker!(props.chara)
            ? 1
            : b.eligibilityChecker!(props.chara) >
              a.eligibilityChecker!(props.chara)
            ? -1
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
        skillListArray.value.reverse();
      }

      sortingSchema.value.style = style;
      context.emit("updateSortingSchema", sortingSchema.value);
    }

    onMounted(() => {
      sort(sortingSchema.value.style ?? "name", true);
    });

    return {
      ...props,
      skillListArray,

      //methods
      skillClicked,
      sort,
    };
  },
});
</script>
