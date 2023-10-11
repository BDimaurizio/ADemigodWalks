<template>
  <q-page-container>
    <q-page class="row justify-evenly flex pane">
      <MapGridCell
        name="abc"
        :threat="1"
        terrain="Plains"
        :civilization="1"
        :uniqueness="1"
      ></MapGridCell>
      <MapGridCell
        name="abc"
        :threat="1"
        terrain="Plains"
        :civilization="1"
        :uniqueness="1"
      ></MapGridCell>
      <MapGridCell
        name="abc"
        :threat="1"
        terrain="Plains"
        :civilization="1"
        :uniqueness="1"
      ></MapGridCell>
      <MapGridCell
        name="abc"
        :threat="1"
        terrain="Plains"
        :civilization="1"
        :uniqueness="1"
      ></MapGridCell>
      <br />
      <MapGridCell
        name="abc"
        :threat="1"
        terrain="Plains"
        :civilization="1"
        :uniqueness="1"
      ></MapGridCell>
      <MapGridCell
        name="abc"
        :threat="1"
        terrain="Plains"
        :civilization="1"
        :uniqueness="1"
      ></MapGridCell>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent /*reactive, ref*/ } from 'vue';
import MapGridCell from 'src/components/Map/MapGridCell.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { MapGridCell },
  setup() {
    //refs

    //emits:

    //funcs:

    return {
      //refs
      //keys
      //funcs:
    };
  },
});
</script>
