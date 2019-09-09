<template>
  <li :class="`transform-item ${draggable ? 'DragItem' : ''}`">
    {{ schema.label }}
  </li>
</template>

<script>
import Radio from './inputs/Radio.vue';
import Slider from './inputs/Slider.vue';

export default {
  components: {
    // Radio,
    // Slider,
  },
  props: {
    draggable: Boolean,
    schema: Object,
    opts: Object,
    location: String, // 'inventory' or 'queue'
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {

    },
  }
}
</script>

<style lang="scss">
.transform-item {
  cursor: pointer;
  user-select: none;
}
</style>