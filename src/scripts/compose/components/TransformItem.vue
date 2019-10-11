<template>
  <div class="transform-item">
    <div class="transform-item_handle drag-handle"></div>
    <div class="transform-item_label">
      {{ schema.label }}
    </div>
    <button
      class="transform-item_edit no-drag"
      v-show="location === 'queue' && schema.conf.args.length > 0"
      @click="onEditClick"
    >
      edit
    </button>
    <button
      class="transform-item_delete no-drag"
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
    argState: Object,
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
          argState: this.argState,
        });
      }
    }
  }
}
</script>

<style lang="scss">
.transform-item {
  position: relative;
  user-select: none;
  padding: 8px 8px 8px 40px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  background-color: #444;
  border-radius: 4px;
  overflow: hidden;

  &_handle {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 36px;
    background-color: grey;

    &::after {
      content: '::';
      color: #444;
      font-size: 48px;
      line-height: 90%;
      margin: 0 0 0 5px;
    }
  }

  &_label {
    display: block;
    flex-grow: 1;
    margin: 8px;
  }

  &_delete,
  &_edit {
    flex-shrink: 0;
    cursor: pointer;
    display: block;
    padding: 8px;
    margin: 0px 4px;
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