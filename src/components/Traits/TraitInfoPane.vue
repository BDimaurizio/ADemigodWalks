<template>
  <h4 :class="activatedColour">{{ trait.name }}</h4>
  <q-separator />
  <h5>{{ trait.description }}</h5>
  <q-separator />
  <!--
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
  -->
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
//import { getModStatsFormatted } from 'src/Services/ModListManipulationService';
import Mod from 'src/models/Mod';

export default defineComponent({
  components: {},
  props: {
    trait: { type: Mod, required: true },
    active: { type: Boolean, required: true },
  },

  setup(props, context) {
    //const cachedStats = ref(getModStatsFormatted(props.trait));

    return {
      ...props,
      //cachedStats,
      activatedColour: computed(() =>
        props.active ? 'activated' : 'unactivated'
      ),
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
  background: rgba(255, 255, 255, 0);
}

.unactivated {
  background: rgba(233, 7, 7, 0.178);
}
</style>
