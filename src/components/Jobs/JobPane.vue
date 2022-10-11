<template>
  <div class="row">
    <q-icon class="col" style="font-size: 2em" name="sort_by_alpha"></q-icon>
    <q-btn class="col" label="Name" @click="sort('Name')"></q-btn>
    <q-btn class="col" label="Level" @click="sort('Level')"></q-btn>
  </div>
  <div
    class="q-ma-sm row"
    v-for="(jobObject, index) in jobArray"
    :key="jobObject"
  >
    <job-tile
      class="col"
      :job="jobObject"
      @jobClicked="jobClicked(jobObject, index)"
    ></job-tile>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import Job from 'src/models/Job';
import JobTile from './JobTile.vue';

export default defineComponent({
  components: { JobTile },
  props: {
    jobList: { type: Object, required: true },
    jobSortingSchema: { type: Object, required: true },
  },
  emits: ['jobClicked', 'updateSortingSchema'],

  computed: {},

  setup(props, context) {
    const jobArray = ref(props.jobList.filter(Boolean));
    const sortingSchema = ref(props.jobSortingSchema);
    let prevIndex = -1;

    function jobClicked(item: [Job, number], index: number): void {
      if (index == prevIndex) {
        return;
      }
      prevIndex = index;
      context.emit('jobClicked', item);
    }

    function sort(style: string, forceDirection: boolean = false): void {
      if (style == 'Name') {
        jobArray.value.sort((a: [Job, number], b: [Job, number]) =>
          a[0].name > b[0].name ? 1 : b[0].name > a[0].name ? -1 : 0
        );
      } else if (style == 'Level') {
        jobArray.value.sort((a: [Job, number], b: [Job, number]) =>
          a[1] < b[1] ? 1 : b[1] < a[1] ? -1 : 0
        );
      }

      //reversal on double click
      if (sortingSchema.value.style != style) {
        sortingSchema.value.reverse = false;
      } else if (sortingSchema.value.style == style && !forceDirection) {
        sortingSchema.value.reverse = !sortingSchema.value.reverse;
      }
      if (sortingSchema.value.reverse) {
        jobArray.value.reverse();
      }

      sortingSchema.value.style = style;
      context.emit('updateSortingSchema', sortingSchema.value);
    }

    onMounted(() => {
      sort(sortingSchema.value.style ?? 'name', true);
    });

    return {
      ...props,
      jobArray,

      //methods
      jobClicked,
      sort,
    };
  },
});
</script>
