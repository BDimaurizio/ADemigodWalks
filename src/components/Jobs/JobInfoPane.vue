<template>
  <h4>{{ job[0].name }}</h4>

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
      v-for="(trait, index) in job[0].traits"
      :key="trait.name"
    >
      <div v-if="index <= job[1]" class="row col-12 activated">
        <div class="col-2 levelGrid">{{ index }}</div>
        <div class="col-5 levelGrid">{{ notNone(trait.name) }}</div>
        <div class="col-5 levelGrid">
          {{ notNone(job[0].skills[index].name) }}
        </div>
      </div>
      <div v-else class="row col-12 unactivated">
        <div class="col-2 levelGrid">{{ index }}</div>
        <div class="col-5 levelGrid">{{ notNone(trait.name) }}</div>
        <div class="col-5 levelGrid">
          {{ notNone(job[0].skills[index].name) }}
        </div>
      </div>
    </div>
  </div>
  <q-separator />
  <div class="row justify-center q-mt-xl" v-if="job[1] < 10">
    <q-btn
      label="Level Up"
      class="col-5 q-pa-sm q-ma-sm"
      :disable="expRequired(job[1]) > expToSpendReactive"
      @click="levelup"
    ></q-btn>
    <div>
      <div class="col-5 q-pa-sm q-ma-sm">
        (costs {{ expRequired(job[1]) }} EXP)
      </div>
      <div>(You have {{ expToSpendReactive }} EXP)</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import { getModStatsFormatted } from 'src/Services/ModListManipulationService';
import Job from 'src/models/Job';

export default defineComponent({
  components: {},
  props: {
    job: { type: Object, required: true }, //duple. [0] is the job, [1] is the level
    where: { type: String, required: true },
    expToSpend: { type: Number, required: true },
  },
  emits: ['levelUp'],

  setup(props, context) {
    const cachedStats = ref(getModStatsFormatted(props.job[0].statsPerLevel));

    function notNone(name: string): string {
      // TODO make these clickable and take you to the appropriate trait/skill page
      if (name == 'NONE') {
        return ' ';
      }
      return name;
    }

    function levelup() {
      if (expRequired(props.job[1]) <= props.expToSpend) {
        const result: [Job, number, number] = [
          props.job[0],
          props.job[1],
          expRequired(props.job[1]),
        ];
        context.emit('levelUp', result);
      }
    }

    function expRequired(currentLevel: number): number {
      return 100 + currentLevel * 15;
    }

    return {
      ...props,
      cachedStats,
      expToSpendReactive: computed(() => props.expToSpend),

      //methods
      notNone,
      levelup,
      expRequired,
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
