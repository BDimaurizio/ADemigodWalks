<template>
  <q-card
    class="row flex inventoryItem clickable cursor-pointer"
    style="outline: 2px ridge rgba(50, 0, 0, 0.5)"
    @click="choiceClicked"
  >
    <div class="col text-h5 vertical-center">
      {{ choice.text }}
    </div>
  </q-card>
</template>

<script lang="ts">
import Choice from 'src/models/Choice';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    choice: { type: Object as PropType<Choice>, required: true },
  },
  emits: ['choiceClicked'],

  setup(props, context) {
    function choiceClicked() {
      context.emit('choiceClicked');
    }

    return {
      ...props,

      //methods
      choiceClicked,
    };
  },
});
</script>

<style scoped>
.inventoryItem:hover {
  background-color: rgba(67, 62, 71, 0.25);
}
</style>
