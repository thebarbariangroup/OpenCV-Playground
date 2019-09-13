<template>
  <div class="editor-input range-input">
    <div
      v-if="optional"
      class="range-input_toggle"
    >
      <input
        type="checkbox"
        name="active"
        v-model="active"
      >
    </div>
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
  data () {
    return {
      value: this.item.argState[this.name].value,
    };
  },
  watch: {
    active (newVal) {
      this.onChange({
        [this.name]: {
          value: parseFloat(this.value),
          active: newVal,
        }
      });
    },
    value (newVal) {
      this.onChange({
        [this.name]: {
          value: parseFloat(newVal),
          active: this.active,
        }
      });
    },
  },
};
</script>

<style lang="scss">
.range-input {
  &_value {
    display: inline-block;
  }

  &_toggle {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>