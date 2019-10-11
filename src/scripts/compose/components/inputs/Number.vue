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
    <div class="number-input_stepper">
      <button
        class="number-input_stepper-button number-input_stepper-button--incrementor"
        ref="incrementor"
        @click="onIncrement"
      > &gt; </button>
      <button
        class="number-input_stepper-button number-input_stepper-button--decrementor"
        ref="decrementor"
        @click="onDecrement"
      > &lt; </button>
    </div>
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
  methods: {
    valueIsInRange (value) {
      return (
        (typeof this.input.min === 'number') ? value >= this.input.min : true
        && (typeof this.input.max === 'number') ? value <= this.input.max : true
      );
    },
    onIncrement (e) {
      const newValue = this.value + (this.input.step || 1);
      if (this.valueIsInRange(newValue)) {
        this.value = newValue; 
      }
    },
    onDecrement (e) {
      const newValue = this.value - (this.input.step || 1);
      if (this.valueIsInRange(newValue)) {
        this.value = newValue; 
      }
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

  &_stepper {
    display: inline-block;

    &-button {
      cursor: pointer;
      transform: rotate(-90deg);
      font-weight: 800;
    }
  }
}
</style>