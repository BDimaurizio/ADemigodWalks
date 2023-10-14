<template>
  <h4>{{ skill.name }}</h4>
  <q-separator />
  <h5>{{ skill.description }}</h5>
  <q-separator />
  <div class="row justify-center q-mt-xl">
    <q-btn
      class="col-5 q-pa-sm q-ma-sm"
      :label="castLabel"
      @click="onClickCast"
    ></q-btn>
  </div>
</template>

<script lang="ts">
import Skill from 'src/models/Skill';
import { PropType, computed, defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    skill: { type: Object as PropType<Skill>, required: true },
  },
  emits: ['onClickCast'],

  setup(props, context) {
    const castLabel = computed(() => {
      return props.skill.mpCost > 0 ? 'Cast' : 'Use';
    });

    function onClickCast() {
      context.emit('onClickCast', props.skill);
    }
    return {
      ...props,
      castLabel,
      onClickCast,
    };
  },
});
</script>
