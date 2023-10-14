<template>
  <h4 style="vertical-align: bottom">Log</h4>
  <q-separator />
  <div v-for="logEntry in log" :key="logEntry[1].toString">
    <div class="text-bold q-pt-xs q-pb-xs">{{ logEntry[0] }}</div>
    <q-separator />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: {},
  props: {
    log: { type: Object as PropType<[string, Date][]>, required: true },
  },
  emits: [],

  computed: {},

  setup(props) {
    return {
      ...props,
    };
  },
});
</script>
