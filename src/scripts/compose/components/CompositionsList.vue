<template>
  <div class="compositions-list">
    <div class="compositions-list_content-container">
      <div class="compositions-list_header">Try some presets!</div>
      <div
        class="compositions-list_items"
      >
        <button
        class="compositions-list_item"
          v-for="(composition, i) in compositions"
          :key="i"
          @click="onClick(composition)"
        >
          {{ composition.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import compositions from '../../settings/compositions';
import { EventBus, events } from '../utils/EventBus';

export default {
  data () {
    return {
      compositions,
    };
  },
  methods: {
    onClick (composition) {
      EventBus.$emit(events.SET_COMPOSITION, composition.transforms);
    },
  }
};
</script>

<style lang="scss">
.compositions-list {
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;

  &_item {
    margin: 0 5px;
  }
}
</style>