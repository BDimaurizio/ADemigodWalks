<template>
  <h4>{{ skill.name }}</h4>
  <q-separator />
  <h5>{{ skill.description }}</h5>
  <q-separator />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    skill: { type: Object, required: true },
    active: { type: Boolean, required: true },
  },

  setup(props) {
    return {
      ...props,
    };
  },
});
</script>
