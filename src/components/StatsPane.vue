<template>
  <h4 style="vertical-align: bottom">{{ theChara.name }}</h4>
  <div>
    Level
    {{
      theChara.jobs.reduce((partialSum, element) => partialSum + element[1], 0)
    }}
    {{ theChara.jobs[indexOfHighestLevelClass()][0].name }} ({{
      theChara.currentEXP
    }}
    unspent EXP)
  </div>
  <q-separator />
  <div
    class="text-bold text-indigo-10"
    v-for="stat in arrayOfAllStats"
    :key="stat"
  >
    {{ formatStatDisplay(stat) }}
  </div>
  <q-separator />
  <div class="text-bold text-red" v-for="stat in arrayOfAllStats" :key="stat">
    {{ formatNegativeDisplay(stat) }}
  </div>
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
import { ImportantStatPossibility, statArray } from 'src/models/Index';
import Character from 'src/models/Character';

export default defineComponent({
  components: {},
  props: {
    chara: { type: Character, required: true },
  },
  emits: [],

  computed: {},

  setup(props) {
    const theChara = ref(props.chara);
    const cachedStats = theChara.value.stats;
    const arrayOfAllStats = ref(statArray);

    function formatStatDisplay(statName: ImportantStatPossibility): string {
      let stringBuilder = '';
      const value: number = cachedStats[statName];
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
      const value: number = cachedStats[statName];
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

    function indexOfHighestLevelClass(): number {
      let index = 0;
      let max = 0;
      for (let i = 0; i < theChara.value.jobs.length; i++) {
        if (theChara.value.jobs[i][1] > max) {
          max = theChara.value.jobs[i][1];
          index = i;
        }
      }
      return index;
    }

    return {
      ...props,
      theChara,
      arrayOfAllStats,

      //methods
      formatStatDisplay,
      formatNegativeDisplay,
      indexOfHighestLevelClass,
    };
  },
});
</script>
