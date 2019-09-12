<template>
  <div
    :class="['editor', { active }]"
  >
    <div class="editor_overlay" @click="close"></div>
    <div
      class="editor_content-container"
      v-if="active"
    >
      <h2 class="editor_header">
        {{ item.schema.label }}
      </h2>
      <button class="editor_close" @click="close">close</button>
      <div class="editor_body">
        <template v-for="(arg, i) in item.schema.conf.args">
          <component
            :is="arg.input.type"
            :key="i + arg.label"
            :item="item"
            v-bind="arg"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus, events } from '../utils/EventBus';

import Radio from './inputs/Radio.vue';
import Range from './inputs/Range.vue';

export default {
  name: 'editor',
  components: {
    Radio,
    Range,
  },
  data () {
    return {
      item: null,
      active: false,
      opts: {},
    };
  },
  mounted () {
    this.setupEventHandlers();
  },
  methods: {
    setupEventHandlers () {
      EventBus.$on(events.OPEN_EDITOR, this.open);
    },
    open (item) {
      this.active = true;
      this.item = item;
    },
    close () {
      this.active = false;
    },
  }
};
</script>

<style lang="scss">
.editor {
  $this: &;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s;

  &.active {
    pointer-events: all;
    opacity: 1;
  }

  &_overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
  }

  &_content-container {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 300px;
    width: 400px;
    max-height: 90%;
    max-width: 80%;
    padding: 16px;
    background-color: #444;
    transform: translate(-50%, -50%);
  }

  &_close {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 8px;
    margin: 0;
    border: none;
    background-color: transparent;
    color: #DDD;
    cursor: pointer;
  }

  &_body {
    margin-top: 24px;
  }
}
</style>