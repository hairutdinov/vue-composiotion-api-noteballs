<template>
  <div class="edit-note">
    <AddEditNote
        v-model="noteContent"
        ref="addEditNoteRef"
        bgColor="link"
        placeholderText="Edit"
        label=""
    >
      <template #buttons>
        <button
            @click="$router.back()"
            class="button is-link is-light mr-2"
        >
          Cancel
        </button>
        <button
            @click="handleSaveClicked"
            class="button is-link has-background-link"
            :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>

  </div>
</template>

<script setup>
import AddEditNote from '@components/Notes/AddEditNote.vue'
import { useStoreNotes } from "@/stores/storeNotes.js";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const storeNotes = useStoreNotes()
const route = useRoute(),
      router = useRouter()

const noteContent = ref(storeNotes.getNoteContent(route.params.id))

const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent.value)
  router.push('/')
}
</script>

<style scoped>

</style>