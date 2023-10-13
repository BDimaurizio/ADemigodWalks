<template>
  <q-card
    class="row tile clickable cursor-pointer"
    style="outline: 2px ridge rgba(50, 0, 0, 0.5)"
    @click="deityClicked"
  >
    <div class="col-12 text-blue-10 text-h5 q-pl-md">
      {{ Deity.fullTitle }}
    </div>
    <div class="col-12 text-h6 q-pl-md">
      {{ favorability }}
    </div>
  </q-card>
</template>

<script lang="ts">
import Deity from 'src/models/Deity';
import Mod from 'src/models/Mod';
import { getDeityFavorability } from 'src/Services/DeityOperation';
import { ref, defineComponent, PropType } from 'vue';

export default defineComponent({
  components: {},
  props: {
    Deity: { type: Object, required: true },
    stats: { type: Object as PropType<Mod>, required: true },
  },
  emits: ['deityClicked'],

  computed: {},

  setup(props, context) {
    const favorability = ref(
      getDeityFavorability(props.stats, props.Deity as Deity)
    );

    function deityClicked() {
      context.emit('deityClicked', props.Deity);
    }

    return {
      ...props,
      favorability,

      //methods
      deityClicked,
    };
  },
});
</script>

<style scoped>
.tile:hover {
  background-color: rgba(67, 62, 71, 0.25);
}
</style>
