<template>
  <div class="editor-input range-input">
    <label :for="name">{{ label }}</label>
    <input
      type="range"
      :name="name"
      :max="input.max"
      :min="input.min"
      v-model="value"
    >
    <span class="range-input_value"> {{ value }} </span>
  </div>
</template>

<script>
import InputBase from './InputBase.vue';

export default {
  name: 'range',
  extends: InputBase,
  props: {
    name: String,
    label: String,
    defaultValue: Number,
    input: Object,
  },
  data () {
    return {
      value: this.item.opts[this.name] || this.defaultValue,
    };
  },
  watch: {
    value (newVal) {
      this.onChange({
        [this.name]: parseFloat(newVal),
      });
    }
  },
};
</script>

<style lang="scss">
.range-input {
  &_value {
    display: inline-block;
  }
}
</style>