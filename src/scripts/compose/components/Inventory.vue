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
      >
        <TransformItem
          v-for="(item, i) in items"
          :key="i + item.schema.category + item.schema.name"
          :schema="item.schema"
          location="inventory"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
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
         };
      })
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
    },
    getDefaultOpts (schema) {
      const defaultConf = {};

      schema.conf.args.forEach((arg) => {
        defaultConf[arg.name] = arg.defaultValue;
      });

      return defaultConf;
    }
  }
};
</script>

<style lang="scss">
.inventory {
  &_items {
    display: block;
    min-height: 100px;
    min-width: 300px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
    background-color: #222;
  }
}
</style>