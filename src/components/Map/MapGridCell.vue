<template>
  <q-card
    class="row flex inventoryItem clickable cursor-pointer"
    style="
      outline: 2px ridge rgba(50, 0, 0, 0.5);
      max-width: 100px;
      max-height: 100px;
    "
  >
    <div></div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    name: { type: String, required: false },
    threat: { type: Number, required: true },
    terrain: { type: String, required: true },
    civilization: { type: Number, required: true },
    uniqueness: { type: Number, required: true },
  },
  emits: [''],

  computed: {
    gridName(): string {
      return this.name ?? 'unnamed';
    },
    gridthreat(): number {
      return this.threat;
    },
    gridterrain(): string {
      return this.terrain;
    },
    gridcivilization(): number {
      return this.civilization;
    },
    griduniqueness(): number {
      return this.uniqueness;
    },
  },

  setup(props /*context*/) {
    function clicked() {
      console.log('');
    }

    return {
      ...props,

      //methods
      clicked,
    };
  },
});
</script>

<style scoped>
.inventoryItem:hover {
  background-color: rgba(67, 62, 71, 0.25);
}
</style>
