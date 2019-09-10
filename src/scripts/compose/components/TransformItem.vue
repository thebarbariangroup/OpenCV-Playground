<template>
  <div class="transform-item">
    <div class="transform-item_label">
      {{ schema.label }}
    </div>
    <button
      class="transform-item_edit"
      v-show="location === 'queue'"
      @click="onEditClick"
    >
      edit
    </button>
    <button
      class="transform-item_delete"
      v-show="location === 'queue'"
      @click="onDeleteClick"
    >
      delete
    </button>
  </div>
</template>

<script>
import { EventBus, events } from '../utils/EventBus';

import Radio from './inputs/Radio.vue';
import Slider from './inputs/Slider.vue';

export default {
  components: {
    // Radio,
    // Slider,
  },
  props: {
    schema: Object,
    opts: Object,
    idx: Number,
    location: String, // 'inventory' or 'queue'
  },
  methods: {
    onDeleteClick () {
      if (this.location === 'queue') {
        EventBus.$emit(events.QUEUE_REMOVE_ITEM, this.idx);
      }
    },
    onEditClick () {
      if (this.location === 'queue') {
        EventBus.$emit(events.OPEN_EDITOR, this.$props);
      }    
    }
  }
}
</script>

<style lang="scss">
.transform-item {
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 8px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  background-color: #444;

  &_label {
    display: block;
  }

  &_delete,
  &_edit {
    cursor: pointer;
    display: block;
    padding: 0px;
    margin: 0px;
    border: none;
    background-color: transparent;
  }

  &_delete {
    color: #B00;
  }

  &_edit {
    color: #DDD;
  }
}
</style>