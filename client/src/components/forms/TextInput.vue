<template>
  <div class="input-wrapper">
    <label v-if="label" :for="name">{{ label }}</label>
    <div class="input-container">
      <input
        :type="type"
        :name="name"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        ref="inputRef"
        :class="{
          'valid': valid,
          'invalid': !valid,
          'has-error': showError,
          'focused': focused
        }"
      >
      <span v-if="icon" class="input-icon">
        <img :src="icon" alt="Icon">
      </span>
    </div>
    <small v-if="help">{{ help }}</small>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  help: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  placeholder:{
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  }
});

const inputRef = ref(null);
const focused = ref(false);
const hasError = ref(false);

function handleFocus() {
  focused.value = true;
}

function handleBlur() {
  focused.value = false;

  const isValid = inputRef.value.checkValidity();
  const isEmpty = inputRef.value.value === "";

  hasError.value = !isValid && !isEmpty;
}

  function handleInput() {
    hasError.value = !inputRef.value.checkValidity() && inputRef.value.value !== '';
  }

</script>


<style scoped>
 @import "~/components/forms/text-input.scss";
</style>
