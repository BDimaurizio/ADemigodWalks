<template>
  <div>
    <h4>{{ stance.name }}</h4>
    <q-separator />
    <pre class="text-bold text-indigo-10" style="font-family: Arial">
Physical Defense: {{ stanceDescription2[0] }}
{{ showCalc ? stanceDescription1[0] : undefined }}  </pre
    >
    <pre class="text-bold text-indigo-10" style="font-family: Arial">
Piercing Defense: {{ stanceDescription2[1] }}
{{ showCalc ? stanceDescription1[1] : undefined }}  </pre
    >
    <pre class="text-bold text-indigo-10" style="font-family: Arial">
Arcane Defense: {{ stanceDescription2[2] }}
{{ showCalc ? stanceDescription1[2] : undefined }}  </pre
    >
    <pre class="text-bold text-indigo-10" style="font-family: Arial">
Elemental Defense: {{ stanceDescription2[3] }}
{{ showCalc ? stanceDescription1[3] : undefined }}  </pre
    >
    <pre class="text-bold text-indigo-10" style="font-family: Arial">
Psychic Defense: {{ stanceDescription2[4] }}
{{ showCalc ? stanceDescription1[4] : undefined }}  </pre
    >
    <pre class="text-bold text-indigo-10" style="font-family: Arial">
Toxic Defense: {{ stanceDescription2[5] }}
{{ showCalc ? stanceDescription1[5] : undefined }}  </pre
    >
    <pre class="text-bold text-indigo-10" style="font-family: Arial">
Judgement Defense: {{ stanceDescription2[6] }}
{{ showCalc ? stanceDescription1[6] : undefined }}  </pre
    >
    <div class="row">
      <q-checkbox
        class="col-9"
        label="Show Calculations"
        v-model="showCalc"
      ></q-checkbox>
      <q-btn
        v-if="stance.name != chara.currentStance.name && !hideUse"
        class="col-5 q-pa-sm q-ma-sm"
        label="Use"
        @click="onClickEquipStance"
      ></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Stance from "src/models/Stance";
import Character from "src/models/Character";

export default defineComponent({
  components: {},
  props: {
    stance: { type: Object as PropType<Stance>, required: true },
    chara: { type: Object as PropType<Character>, required: true },
  },
  emits: ["update"],

  setup(props, context) {
    const stanceDescription1 = ref(props.stance.getDefenseDescriptions());
    const stanceDescription2 = ref(
      props.stance.getDefenseValuesFormatted(props.chara.stats)
    );

    const showCalc = ref(false);
    const hideUse = ref(false);

    function onClickEquipStance() {
      props.chara.changeStance(props.stance);
      hideUse.value = true;
      context.emit("update");
    }
    return {
      ...props,
      stanceDescription1,
      stanceDescription2,
      showCalc,
      hideUse,

      onClickEquipStance,
    };
  },
});
</script>
