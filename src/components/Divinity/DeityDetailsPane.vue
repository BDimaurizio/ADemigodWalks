<template>
  <h4>{{ Deity.Name }}</h4>

  <h6>Domains:</h6>

  <div v-for="aspect in Deity.Aspects" :key="aspect.name">
    <div class="col-12 text-blue-10 text-h5 q-pl-md">
      {{ aspect.name }}
    </div>
    <div class="col-12 text-h6 q-pl-md">
      {{ aspect.description }}
    </div>
    <q-separator />
  </div>

  <div class="col-12 text-h6 q-pl-md">
    {{ favorability }}
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import Deity from 'src/models/Deity';
import { getDeityFavorability } from 'src/Services/DeityOperation';
import Mod from 'src/models/Mod';

export default defineComponent({
  components: {},
  props: {
    Deity: { type: Deity, required: true },
    stats: { type: Object as PropType<Mod>, required: true },
  },

  setup(props) {
    const cachedStats: Mod = { ...props.stats };
    const favorability = getDeityFavorability(
      cachedStats,
      props.Deity as Deity
    );

    return {
      ...props,
      favorability,
    };
  },
});
</script>

<style scoped>
.levelGrid {
  outline: 2px ridge rgba(19, 12, 22, 0.6);
  min-height: 30px;
  text-align: center;
}

.activated {
  background: rgba(35, 101, 223, 0.75);
}

.unactivated {
  background: rgba(97, 97, 97, 0.75);
}
</style>
