<template>
  <q-card
    class="row flex tile clickable cursor-pointer"
    style="outline: 2px ridge rgba(50, 0, 0, 0.5)"
    @click="partyMemberClicked"
    :dark="partyMember.currentHP < 1"
  >
    <div class="col text-h5 vertical-center q-pl-md">
      {{ partyMember.name }}
    </div>
    <div class="text-black-5 col text-h7 vertical-center q-pl-md">
      {{ partyMember.jobTitle }}
    </div>
    <div class="text-red-5 col text-h7 vertical-center q-pl-md">
      {{ partyMember.currentHP }} / {{ partyMemberCachedStats.HP }}
    </div>
    <div class="text-blue-5 col text-h7 vertical-center q-pl-md">
      {{ partyMember.currentMP }} / {{ partyMemberCachedStats.MP }}
    </div>
    <div class="text-green-5 col text-h7 vertical-center q-pl-md">
      {{ partyMember.currentSP }} / {{ partyMemberCachedStats.SP }}
    </div>
  </q-card>
</template>

<script lang="ts">
import Character from 'src/models/Character';
import { PropType, defineComponent, ref } from 'vue';

export default defineComponent({
  components: {},
  props: {
    partyMember: { type: Object as PropType<Character>, required: true },
  },
  emits: ['partyMemberClicked'],

  computed: {},

  setup(props, context) {
    const partyMemberCachedStats = ref(props.partyMember.stats);

    function partyMemberClicked() {
      context.emit('partyMemberClicked');
    }

    return {
      ...props,
      partyMemberCachedStats,

      //methods
      partyMemberClicked,
    };
  },
});
</script>

<style scoped>
.tile:hover {
  background-color: rgba(67, 62, 71, 0.25);
}
</style>
