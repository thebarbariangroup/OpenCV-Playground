<template>
  <div class="composer">
    <div class="composer_content-container">
      <h1 class="composer_header">Build-a-Filter Workshop</h1>
      <div class="composer_controls-container">
        <Queue />
        <Inventory :schemas="schemas" />
      </div>
    </div>
    <Editor />
  </div>
</template>

<script>
import { EventBus, events } from '../utils/EventBus.js';
import schemas from '../../settings/schemas';

import draggable from 'vuedraggable';

import Inventory from './Inventory.vue';
import Queue from './Queue.vue';
import Editor from './Editor.vue';

export default {
  components: {
    Inventory,
    Queue,
    Editor,
  },
  data () {
    return {
      schemas,
    };
  },
}
</script>

<style lang="scss">
.composer {
  &_controls-container {
    display: flex;
  }

  &_header {
    margin-bottom: 8px;
  }
}
</style>