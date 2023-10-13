<template>
  <q-card
    class="row flex inventoryItem clickable cursor-pointer"
    style="outline: 2px ridge rgba(50, 0, 0, 0.5)"
    @click="choiceClicked"
  >
    <div class="col text-h5 vertical-center">
      {{ name }}
    </div>
  </q-card>
</template>

<script lang="ts">
//import Mod from 'src/models/Mod';
import Choice from 'src/models/Choice';
import { PropType, computed, defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    choice: { type: Object as PropType<Choice>, required: true },
  },
  emits: ['choiceClicked'],

  setup(props, context) {
    function inventoryClicked() {
      context.emit('inventoryClicked');
    }

    return {
      ...props,
      name: computed(() => props.trait.name),
      colour: computed(() => (props.active ? 'red' : 'white')),

      //methods
      inventoryClicked,
    };
  },
});
</script>

<style scoped>
.inventoryItem:hover {
  background-color: rgba(67, 62, 71, 0.25);
}
</style>
