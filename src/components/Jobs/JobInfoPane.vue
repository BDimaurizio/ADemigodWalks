<template>
  <h4>{{ theJob.name }}</h4>
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

    return {
      ...props,
      theJob,
      level,
      propWhere,
      cachedStats,

      //methods
    };
  },
});
</script>
