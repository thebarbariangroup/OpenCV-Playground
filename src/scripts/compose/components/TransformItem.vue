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

export default {
  props: {
    schema: Object,
    opts: Object,
    id: Number,
    location: String, // 'inventory' or 'queue'
  },
  methods: {
    onDeleteClick () {
      if (this.location === 'queue') {
        EventBus.$emit(events.REMOVE_ITEM, this.id);
      }
    },
    onEditClick () {
      if (this.location === 'queue') {
        EventBus.$emit(events.OPEN_EDITOR, {
          id: this.id,
          schema: this.schema,
          opts: this.opts,
        });
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
    flex-grow: 1;
  }

  &_delete,
  &_edit {
    flex-shrink: 0;
    cursor: pointer;
    display: block;
    padding: 0px 4px;
    margin: 0px 8px;
    border: none;
    background-color: transparent;
  }

  &_delete {
    color: #B00;
  }

  &_edit {
    text-align: right;
    color: #DDD;
  }
}
</style>