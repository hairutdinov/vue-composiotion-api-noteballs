<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
    <label class="label has-text-white" v-if="label">
      {{ label }}
    </label>

    <div class="field">
      <div class="control">
          <textarea
              v-model="modelValue"
              class="textarea"
              :placeholder="placeholderText"
              ref="textareaRef"
              v-autofocus
          />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import { useRoute } from "vue-router";
import { useStoreNotes } from "@/stores/storeNotes.js";

const storeNotes = useStoreNotes()
const route = useRoute()

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholderText: {
    type: String,
    default: 'Type something ...'
  },
  label: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue'])

const newNoteRef = ref(null),
      textareaRef = ref(null)

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})


const focusTextarea = () => {
  textareaRef.value.focus()
}

defineExpose({
  focusTextarea
})

const vAutofocus = {
  mounted: el => el.focus()
}

</script>

<style scoped>

</style>