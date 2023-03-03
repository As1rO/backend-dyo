<template>
    <div class="select-wrapper">
      <label v-if="label" :for="name">{{ label }}</label>
      <v-select
        v-model="selectedValue"
        :options="options"
        :clearable="clearable"
        :searchable="searchable"
        :multiple="multiple"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{
          'valid': valid,
          'invalid': !valid,
          'has-error': showError,
          'focused': focused
        }"
        @search="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        ref="selectRef"
      />
      <small v-if="help">{{ help }}</small>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import vSelect from 'vue-select';


const props = defineProps({
options: {
    type: Array,
    required: true
},
clearable: {
    type: Boolean,
    default: true
},
searchable: {
    type: Boolean,
    default: true
},
multiple: {
    type: Boolean,
    default: false
},
placeholder: {
    type: String,
    default: 'Select an option'
},
label: {
    type: String,
    default: ''
},
name: {
    type: String,
    default: ''
},
disabled: {
    type: Boolean,
    default: false
},
help: {
    type: String,
    default: ''
},
readonly: {
    type: Boolean,
    default: false
}
})

const selectRef = ref(null)
const focused = ref(false)
const hasError = ref(false)
const selectedValue = ref(null)

function handleInput() {
    hasError.value = !selectRef.value.$el.checkValidity()
}

function handleFocus() {
    focused.value = true
}

function handleBlur() {
    focused.value = false
    const isValid = selectRef.value.$el.checkValidity()
    hasError.value = !isValid && selectedValue.value !== null
}

</script>
  <style scoped>
   @import "../../assets/scss/components/forms/select.scss";
  </style>