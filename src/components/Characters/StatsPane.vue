<template>
  <h4 style="vertical-align: bottom">{{ chara.name }}</h4>
  <div>{{ chara.jobTitle }} ({{ chara.currentEXP }} unspent EXP)</div>
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
  <div class="row justify-center q-mt-xl">
    <!--
    <q-btn
      v-if="true"
      class="col-5 q-pa-sm q-ma-sm"
      label="Dismiss"
      @click=""
    ></q-btn>
    -->
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import Character from 'src/models/Character';
import { getModStatsFormatted } from 'src/Services/ModListManipulationService';

export default defineComponent({
  components: {},
  props: {
    chara: { type: Character, required: true },
  },
  emits: [],

  computed: {},

  setup(props) {
    const cachedStats = ref(
      getModStatsFormatted(props.chara.stats, false, true)
    );

    return {
      ...props,
      cachedStats,

      //methods
    };
  },
});
</script>
