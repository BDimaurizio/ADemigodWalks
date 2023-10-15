<template>
  <div class="q-ma-sm row">
    <div class="col-12 q-mb-sm">Active Stance:</div>
    <br />
    <StanceTile
      class="col-12"
      :stance="activeStance"
      @stanceClicked="stanceClicked(activeStance)"
    ></StanceTile>
  </div>
  <br class="col-12" />
  <q-separator class="col-12" />
  <div class="q-ma-sm">Stances:</div>
  <div class="q-ma-sm row" v-for="(stance, index) in stanceList" :key="index">
    <StanceTile
      v-if="stance.name != activeStance.name"
      class="col"
      :stance="stance"
      @stanceClicked="stanceClicked(stance)"
    ></StanceTile>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import StanceTile from "./StanceTile.vue";
import Stance from "src/models/Stance";

export default defineComponent({
  components: { StanceTile },
  props: {
    stanceList: { type: Object as PropType<Stance[]>, required: true },
    activeStance: { type: Object as PropType<Stance>, required: true },
  },
  emits: ["stanceListClicked"],

  computed: {},

  setup(props, context) {
    function stanceClicked(stance: Stance): void {
      console.log(stance);
      context.emit("stanceListClicked", stance);
    }

    return {
      ...props,

      //methods
      stanceClicked,
    };
  },
});
</script>
