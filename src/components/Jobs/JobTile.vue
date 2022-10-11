<template>
  <q-card
    class="row flex tile clickable cursor-pointer"
    style="outline: 2px ridge rgba(50, 0, 0, 0.5)"
    @click="jobClicked"
  >
    <div class="text-blue-10 col text-h5 vertical-center q-pl-md">
      {{ theJob.name }}
    </div>
    <div class="col text-h5 vertical-center text-center">Level {{ level }}</div>
  </q-card>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    job: { type: Object, required: true },
  },
  emits: ['jobClicked'],

  computed: {},

  setup(props, context) {
    const theJob = ref(props.job[0]);

    const level = ref(props.job[1]);

    function jobClicked() {
      context.emit('jobClicked');
    }

    return {
      ...props,
      theJob,
      level,

      //methods
      jobClicked,
    };
  },
});
</script>

<style scoped>
.tile:hover {
  background-color: rgba(67, 62, 71, 0.25);
}
</style>
