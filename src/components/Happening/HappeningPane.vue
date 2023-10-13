<template>
  <h4 style="vertical-align: bottom">{{ happening.title }}</h4>
  <div>{{ happening.text }}</div>
  <q-separator />
  <div class="row justify-center q-mt-xl"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Happening from 'src/models/Happening';

export default defineComponent({
  components: {},
  props: {
    happening: { type: Object as PropType<Happening>, required: true },
  },
  emits: [],

  computed: {},

  setup(props) {
    return {
      ...props,

      //methods
    };
  },
});
</script>
