<template>
  <div :class="['editor', {active: 'active'}]">
    <div class="editor_content-container">
      EDITOR
    </div>
  </div>
</template>

<script>
import { EventBus, events } from '../utils/EventBus';

import Radio from './inputs/Radio.vue';
import Slider from './inputs/Slider.vue';

export default {
  components: {
    // Radio,
    // Slider,
  },
  data () {
    return {
      item: null,
      active: false,
    };
  },
  mounted () {

  },
  methods: {
    setupEventHandlers () {
      EventBus.$on(events.OPEN_EDITOR, this.open);
    },
    open (item) {
      this.active = true;
      console.log(item);
    }
  }
};
</script>

<style lang="scss">
.editor {
  $this: &;

  &.active {

  }
}
</style>