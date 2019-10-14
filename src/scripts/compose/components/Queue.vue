<template>
  <div class="queue">
    <div class="queue_content-container">
      <h2 class="queue_header">Queue</h2>
      <draggable
        class="queue_items"
        ref="list"
        v-model="items"
        group="transformItems"
        filter=".no-drag"
        handle=".drag-handle"
        :preventOnFilter="false"
        animation="150"
        @change="onChange"
      >
        <TransformItem
          v-for="(item, i) in items"
          :key="'queue' + i + item.schema.name"
          :schema="item.schema"
          :argState="item.argState"
          location="queue"
          :id="item.id"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import schemas from '../../settings/schemas';
import { EventBus, events } from '../utils/EventBus.js';
import { getUniqueId } from '../utils/helpers';

import draggable from 'vuedraggable';

import TransformItem from './TransformItem.vue';


const DEFAULT_ITEMS = [
  {
    id: getUniqueId(),
    schema: schemas[0],
    argState: {},
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
      EventBus.$on(events.UPDATE_ITEM, this.updateItem);
      EventBus.$on(events.REMOVE_ITEM, this.removeItem);
      EventBus.$on(events.SET_COMPOSITION, this.setComposition);
    },
    getItemId (item) {
      return typeof item.id === 'number' ? item.id : getUniqueId();
    },
    removeItem (id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.updateComposition();
    },
    updateItem (payload) {
      this.items.forEach((item, i) => {
        if (item.id === payload.itemId) {
          this.items[i].argState = Object.assign({}, item.argState, payload.newArgState);
        }
      });
      this.updateComposition();
    },
    updateComposition () {
      this.buildComposition();
      EventBus.$emit(events.RENDER_COMPOSITION, this.composition);
    },
    buildComposition () {
      this.composition = this.items.map((item) => {
        return {
          category: item.schema.category,
          name: item.schema.name,
          opts: this.resolveTransformOpts(item),
        };
      });

      // Forcefully raise opacity for ease of use
      // TODO: make this behavior toggleable
      this.composition.push({
        category: 'alter',
        name: 'setChannel',
        opts: {
          r: 'unchanged',
          g: 'unchanged',
          b: 'unchanged',
          a: 255,
        },
      });
    },
    setComposition (composition) {
      this.composition = composition;
      this.buildItemsFromComposition();
      this.updateComposition();
    },
    buildItemsFromComposition () {
      this.items = this.composition.map((transform) => {
        const item = {
          id: getUniqueId(),
          schema: schemas.find((schema) => {
            return schema.category === transform.category && schema.name === transform.name;
          }),
          argState: {},
        };

        Object.keys(transform.opts).forEach((k) => {
          const argSchema = item.schema.conf.args.find((arg) => arg.name === k);
          const active = argSchema.input ? transform.opts[k] !== argSchema.input.inactiveValue : true;

          item.argState[k] = {
            active,
            value: active ? transform.opts[k] : argSchema.defaultValue,
          };
        });

        return item;
      });
    },
    resolveTransformOpts (item) {
      const argState = item.argState;
      const opts = {};

      Object.keys(argState).forEach((k) => {
        const argSchema = item.schema.conf.args.find((arg) => arg.name === k);
        const useInactiveValue = argSchema.optional && !argState[k].active;
        opts[k] = useInactiveValue ? argSchema.input.inactiveValue : argState[k].value;
      });

      return opts;
    },
    onChange (e) {
      this.updateComposition();
    },
  }
}
</script>

<style lang="scss">
.queue {
  flex: 1 1 60%;
  padding-right: 16px;

  &_content-container {
    height: 80vh;
    display: flex;
    flex-direction: column;
  }

  &_items {
    flex-grow: 1;
    display: block;
    padding: 8px;
    background-color: #222;
    overflow-y: auto;
  }
}
</style>