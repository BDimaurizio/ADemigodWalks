<template>
  <h4>{{ theJob.name }}</h4>

  <q-separator />
  Stats per level:
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
  Level unlocks:
  <div class="row">
    <div
      class="col-12 row levelGrid"
      v-for="(trait, index) in theJob.traits"
      :key="trait.name"
    >
      <div v-if="index <= level" class="row col-12 activated">
        <div class="col-2 levelGrid">{{ index }}</div>
        <div class="col-5 levelGrid">{{ notNone(trait.name) }}</div>
        <div class="col-5 levelGrid">
          {{ notNone(theJob.skills[index].name) }}
        </div>
      </div>
      <div v-else class="row col-12 unactivated">
        <div class="col-2 levelGrid">{{ index }}</div>
        <div class="col-5 levelGrid">{{ notNone(trait.name) }}</div>
        <div class="col-5 levelGrid">
          {{ notNone(theJob.skills[index].name) }}
        </div>
      </div>
    </div>
  </div>
  <q-separator />
  <div class="row justify-center q-mt-xl">
    <q-btn label="Level Up" class="col-5 q-pa-sm q-ma-sm"></q-btn>
    <div class="col-5 q-pa-sm q-ma-sm">(costs {{ 100 + level * 10 }} EXP)</div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { getModStatsFormatted } from 'src/Services/ModListManipulationService';
import Job from 'src/models/Job';

export default defineComponent({
  components: {},
  props: {
    job: { type: Object, required: true },
    where: { type: String, required: true },
  },
  emits: ['levelUp'],

  computed: {},

  setup(props) {
    const theJob = ref(props.job[0] as Job);
    const level = ref(props.job[1]);
    const propWhere = ref(props.where);
    const cachedStats = ref(getModStatsFormatted(theJob.value.statsPerLevel));

    function notNone(name: string): string {
      // TODO make these clickable and take you to the appropriate trait/skill page!
      if (name == 'NONE') {
        return ' ';
      }
      return name;
    }

    return {
      ...props,
      theJob,
      level,
      propWhere,
      cachedStats,

      //methods
      notNone,
    };
  },
});
</script>

<style scoped>
.levelGrid {
  outline: 2px ridge rgba(19, 12, 22, 0.6);
  min-height: 30px;
  text-align: center;
}

.activated {
  background: rgba(35, 101, 223, 0.75);
}

.unactivated {
  background: rgba(97, 97, 97, 0.75);
}
</style>
