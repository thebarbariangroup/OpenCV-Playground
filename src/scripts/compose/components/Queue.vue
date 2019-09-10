<template>
  <div class="queue">
    <div class="queue_content-container">
      <div class="queue_header">Queue</div>
      <draggable
        class="queue_items"
        ref="list"
        v-model="items"
        group="transformItems"
        animation="150"
        @change="onChange"
      >
        <TransformItem
          v-for="(item, i) in items"
          :key="i + item.schema.category + item.schema.name"
          :schema="item.schema"
          :opts="item.opts"
          :idx="i"
          location="queue"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import { EventBus, events } from '../utils/EventBus.js';

import draggable from 'vuedraggable';

import TransformItem from './TransformItem.vue';

import schemas from '../../settings/schemas';

const DEFAULT_ITEMS = [
  {
    schema: schemas[0],
    opts: {},
  }
];

/**
 * Composition
 * 
 * {
 *   category: 'alter',
 *   name: 'grayscale',
 *   opts: {}
 * },
 * {
 *   category: 'alter',
 *   name: 'setChannel',
 *   opts: {
 *     idx: 3,
 *     val: 255,
 *   }
 * }
 * 
 * */


export default {
  components: {
    TransformItem,
    draggable,
  },
  data () {
    return {
      items: DEFAULT_ITEMS,
    };
  },
  mounted () {
    this.setupEventHandlers();
  },
  methods: {
    setupEventHandlers () {
      EventBus.$on(events.SOCKET_OPEN, this.updateComposition);
      EventBus.$on(events.QUEUE_REMOVE_ITEM, this.removeItem);
    },
    removeItem (idx) {
      this.items.splice(idx, 1);
      this.updateComposition();
    },
    updateComposition () {
      this.buildComposition();
      EventBus.$emit(events.UPDATE_COMPOSITION, this.composition);
    },
    buildComposition () {
      this.composition = this.items.map((item) => {
        return {
          category: item.schema.category,
          name: item.schema.name,
          opts: item.opts,
        };
      });
    },
    onChange (e) {
      console.log(e);
      this.updateComposition();
    }
  }
}
</script>

<style lang="scss">
.queue {
  &_content-container {
    height: 100%;
  }

  &_items {
    display: block;
    min-height: 100%;
    min-width: 300px;
    padding: 8px;
    background-color: #222;
  }
}
</style>