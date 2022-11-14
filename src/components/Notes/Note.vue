<template>
  <div
    class="card mb-4"
  >
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/edit/${note.id}`" class="card-footer-item">Edit</RouterLink>
      <a
        @click.prevent="handleDeleteClicked"
        class="card-footer-item"
        href="#"
      >
        Delete
      </a>
    </footer>
    <ModalDeleteNote
        v-if="modals.deleteNote"
        v-model="modals.deleteNote"
        :noteId="note.id"
    />
  </div>
</template>

<script setup>

import { computed, reactive, ref } from 'vue'
import { useStoreNotes } from "@/stores/storeNotes.js";
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
import { useDateFormat } from '@vueuse/core'

const storeNotes = useStoreNotes()

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const characterLength = computed(() => {
  let length = props.note.content.length
  let description = length > 1 ? 'characters' : 'character'
  return `${length} ${description}`
})


const handleDeleteClicked = () => {
  modals.deleteNote = true;
  // storeNotes.deleteNote(props.note.id)
}

const modals = reactive({
  deleteNote: false
})

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date))
  return useDateFormat(date, 'DD.MM.YYYY HH:mm').value
})
</script>