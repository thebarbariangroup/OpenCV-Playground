<template>
  <div class="composer">
    <div class="composer_content-container">
      <div class="composer_header">Build-a-Filter Workshop</div>
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
    margin-top: 16px;
    max-width: 700px;
    display: flex;
    justify-content: space-between;
  }
}
</style>