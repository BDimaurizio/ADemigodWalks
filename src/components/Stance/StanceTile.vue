<template>
  <q-card
    class="row flex inventoryItem clickable cursor-pointer"
    style="outline: 2px ridge rgba(50, 0, 0, 0.5)"
    @click="stanceClicked"
  >
    <div class="col text-h5 vertical-center">
      {{ stance.name }}
    </div>
  </q-card>
</template>

<script lang="ts">
//import Mod from 'src/models/Mod';
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {
    stance: { type: Object, required: true },
  },
  emits: ["stanceClicked"],

  setup(props, context) {
    function stanceClicked() {
      context.emit("stanceClicked");
    }

    return {
      ...props,

      //methods
      stanceClicked,
    };
  },
});
</script>

<style scoped>
.inventoryItem:hover {
  background-color: rgba(67, 62, 71, 0.25);
}
</style>
