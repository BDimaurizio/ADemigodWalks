<template>
  <q-layout view="lHh Lpr lFf">
    <IndexPage></IndexPage>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import IndexPage from 'src/pages/IndexPage.vue';
//import MapTest from 'src/pages/MapTest.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    IndexPage,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
