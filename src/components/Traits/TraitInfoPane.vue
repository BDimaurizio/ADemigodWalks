<template>
  <h4 :class="activatedColour">{{ trait.name }}</h4>
  <q-separator />
  <h5>{{ trait.description }}</h5>
  <q-separator />
  <div v-if="active && cachedStats">
    <pre class="text-bold text-indigo-10" style="font-family: Arial"
      >{{ cachedStats[0] }}
    </pre>
    <q-separator />
    <pre class="text-bold text-red" style="font-family: Arial"
      >{{ cachedStats[1] }}
    </pre>
  </div>
  <div v-if="!active" class="text-bold text-red-10">
    <br />
    Requirements not met
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from "vue";
import { getModStatsFormatted } from "src/Services/ModListManipulationService";
import Mod from "src/models/Mod";

export default defineComponent({
  components: {},
  props: {
    trait: { type: Object as PropType<Mod>, required: true },
    active: { type: Boolean, required: true },
  },

  setup(props) {
    const cachedStats = ref(getModStatsFormatted(props.trait));

    return {
      ...props,
      cachedStats,
      activatedColour: computed(() =>
        props.active ? "activated" : "unactivated"
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
  background: rgba(50, 0, 0, 00.05);
}
</style>
