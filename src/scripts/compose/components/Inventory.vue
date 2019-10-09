<template>
  <div class="inventory">
    <div class="inventory_content-container">
      <h2 class="inventory_header">Inventory</h2>
      <draggable
        class="inventory_items"
        ref="list"
        v-model="items"
        :sort="false"
        :group="{
          name: 'transformItems',
          pull: 'clone',
          put: false,
        }"
        handle=".drag-handle"
        :clone="onClone"
      >
        <TransformItem
          v-for="(item, i) in items"
          :key="'inventory' + i + item.schema.name"
          :schema="item.schema"
          location="inventory"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import { getUniqueId } from '../utils/helpers';
import draggable from 'vuedraggable';
import TransformItem from './TransformItem.vue';

export default {
  components: {
    TransformItem,
    draggable,
  },
  props: {
    schemas: Array,
  },
  data () {
    return {
      items: this.schemas.map((schema) => {
        return {
          schema,
          argState: this.getDefaultArgState(schema),
          id: null,
        };
      })
    };
  },
  methods: {
    getDefaultArgState (schema) {
      const defaultConf = {};

      schema.conf.args.forEach((arg) => {
        defaultConf[arg.name] = {
          active: arg.defaultActive,
          value: arg.defaultValue,
        };
      });

      return defaultConf;
    },
    onClone (item) {
      const clone = Object.assign({}, item);
      clone.id = getUniqueId();
      return clone;
    }
  }
};
</script>

<style lang="scss">
.inventory {
  flex: 1 1 40%;

  &_content-container {
    height: 80vh;
    display: flex;
    flex-direction: column;
  }

  &_items {
    flex-grow: 1;
    display: block;
    min-width: 200px;
    padding: 8px;
    background-color: #222;
    overflow-y: auto;
  }
}
</style>