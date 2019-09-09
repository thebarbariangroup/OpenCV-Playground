<template>
  <div class="composer">
    <div class="composer_content-container">
      <div class="composer_header">Build-a-Filter Workshop</div>
      <div class="composer_controls-container">
        <Inventory :schemas="schemas" />
        <Queue />
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus, events } from '../utils/EventBus.js';
import schemas from '../../settings/schemas';

import draggable from 'vuedraggable';

import Inventory from './Inventory.vue';
import Queue from './Queue.vue';

export default {
  components: {
    Inventory,
    Queue,
  },
  data () {
    return {
      schemas,
    };
  },
  mounted () {
    // this.$nextTick(() => {
      this.init();
    // });
  },
  methods: {
    init () {
      const containers = this.$el.querySelectorAll('.DragContainer');
    },
  }
}
</script>

<style lang="scss">
.composer {

}
</style>