<template>
  <div class="inventory">
    <div class="inventory_content-container">
      <div class="inventory_header">Inventory</div>
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
import getUniqueId from '../utils/getUniqueId';
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
           opts: this.getDefaultOpts(schema),
           id: null,
         };
      })
    }
  },
  methods: {
    getDefaultOpts (schema) {
      const defaultConf = {};

      schema.conf.args.forEach((arg) => {
        defaultConf[arg.name] = arg.defaultValue;
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