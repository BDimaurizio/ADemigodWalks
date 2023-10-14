<template>
  <div>
    <h4 style="vertical-align: bottom">{{ happening.title }}</h4>
    <div style="white-space: pre-line; word-wrap: break-word">
      {{ happening.text }}
    </div>
    <q-separator />
    <q-input
      v-if="inputActivated.includes(happening.id)"
      v-model="input"
      bg-color="white"
      outlined
      class="q-pa-md"
    />
    <div class="justify-center q-mt-xl">
      <div
        class="q-pa-sm"
        v-for="(choice, index) in happening.choices"
        :key="choice.text"
      >
        <ChoiceTile
          class="q-pa-xs"
          :choice="choice"
          @choiceClicked="choiceClicked(choice, index)"
        ></ChoiceTile>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import Happening from 'src/models/Happening';
import Choice from 'src/models/Choice';
import ChoiceTile from './ChoiceTile.vue';

export default defineComponent({
  components: { ChoiceTile },
  props: {
    happening: { type: Object as PropType<Happening>, required: true },
  },
  emits: ['choiceClicked'],

  computed: {},

  setup(props, context) {
    const input = ref('');

    function choiceClicked(choice: Choice, index: number) {
      console.log(choice);
      context.emit('choiceClicked', index, input.value);
      input.value = '';
    }
    return {
      ...props,
      input,

      //happening ids that require free text user input
      inputActivated: [
        'nameInput',
        'test-1',
        'something',
        'something',
        'something',
        'something',
      ],

      //methods
      choiceClicked,
    };
  },
});
</script>
