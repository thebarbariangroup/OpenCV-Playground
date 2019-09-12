<template>
  <div class="queue">
    <div class="queue_content-container">
      <h2 class="queue_header">Queue</h2>
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
          :key="'queue' + i + item.schema.name"
          :schema="item.schema"
          :opts="item.opts"
          location="queue"
          :id="item.id"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import { EventBus, events } from '../utils/EventBus.js';
import getUniqueId from '../utils/getUniqueId';

import draggable from 'vuedraggable';

import TransformItem from './TransformItem.vue';

import schemas from '../../settings/schemas';

const DEFAULT_ITEMS = [
  {
    schema: schemas[0],
    opts: {},
    id: getUniqueId(),
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
      EventBus.$on(events.REMOVE_ITEM, this.removeItem);
      EventBus.$on(events.UPDATE_ITEM, this.updateItem);
    },
    getItemId (item) {
      return typeof item.id === 'number' ? item.id : getUniqueId();
    },
    removeItem (id) {
      debugger;
      this.items = this.items.filter((item) => item.id !== id);
      this.updateComposition();
    },
    updateItem (id, item) {
      // this.items.splice(id, 1, item);
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
      // console.log(e);
      // console.log(this.items);
      // debugger;
      this.updateComposition();
    }
  }
}
</script>

<style lang="scss">
.queue {
  flex: 0 1 300px;
  margin-right: 16px;

  &_content-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &_items {
    flex-grow: 1;
    display: block;
    padding: 8px;
    background-color: #222;
  }
}
</style>