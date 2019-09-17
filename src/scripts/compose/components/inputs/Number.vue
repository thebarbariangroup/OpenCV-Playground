<template>
  <div class="editor-input number-input">
    <div
      v-if="optional"
      class="number-input_toggle"
    >
      <input
        type="checkbox"
        name="active"
        v-model="active"
      >
    </div>
    <label :for="name">{{ label }}</label>
    <input
      class="number-input_input"
      type="number"
      :name="name"
      :max="input.max"
      :min="input.min"
      :step="input.step"
      v-model="value"
    >
  </div>
</template>

<script>
import InputBase from './InputBase.vue';

export default {
  name: 'number',
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
.number-input {
  &_toggle {
    display: inline-block;
    margin-right: 10px;
  }

  &_input {
    margin-left: 10px;
    display: inline-block;
    width: 50px;
  }
}
</style>