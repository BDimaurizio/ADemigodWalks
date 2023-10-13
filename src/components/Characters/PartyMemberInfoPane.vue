<template>
  <h4>{{ partyMember.name }}</h4>
  <q-separator />

  <div class="row justify-center q-mt-xl">
    <q-btn
      v-if="!partyMember.isProtagonist"
      class="col-5 q-pa-sm q-ma-sm"
      label="Inspect"
      @click="onClickInspect"
    ></q-btn>
  </div>
</template>

<script lang="ts">
import Character from 'src/models/Character';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    partyMember: { type: Object as PropType<Character>, required: true },
  },
  emits: ['onClickInspect'],

  setup(props, context) {
    function onClickInspect() {
      context.emit('onClickInspect', props.partyMember);
    }

    return {
      ...props,
      onClickInspect,
    };
  },
});
</script>
