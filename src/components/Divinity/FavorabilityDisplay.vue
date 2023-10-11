<template>
  <div v-for="deity in pantheon" :key="deity.Aspects[0].name" class="q-ma-sm">
    <DeityTile
      :Deity="deity"
      :chara="chara"
      @deityClicked="deityClicked"
    ></DeityTile>
    <q-separator />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Character from 'src/models/Character';
import Deity from 'src/models/Deity';
import DeityTile from './DeityTile.vue';

export default defineComponent({
  components: {
    DeityTile,
  },
  props: {
    chara: { type: Character, required: true },
    pantheon: { type: Array as PropType<Array<Deity>>, required: true },
  },
  emits: ['deityClicked'],

  computed: {},

  setup(props, context) {
    function deityClicked(deity: Deity) {
      context.emit('deityClicked', deity);
    }

    return {
      ...props,
      deityClicked,
    };
  },
});
</script>
