import { defineStore } from 'pinia'
import {computed, ref} from "vue";

export const useStoreNotes = defineStore('storeNotes', () => {

    const notes = ref([
        {
            id: 'id1',
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ipsa commodi sint ut ullam culpa nulla molestiae sunt quia qui maxime, enim quasi officiis aperiam fugit, corrupti omnis, eaque animi.'
        },
        {
            id: 'id2',
            content: 'This is a shorter note! Woo!'
        },
    ])

    const addNote = (newNote) => {
        let currentDate = new Date().getTime(),
            id = currentDate.toString()

        let note = {
            id,
            content: newNote.value
        }

        notes.value.unshift(note)
    }

    const deleteNote = idToDelete => {
        notes.value = notes.value.filter(note => note.id !== idToDelete)
    }

    const updateNote = (id, content) => {
        let index = notes.value.findIndex(note => note.id === id);
        notes.value[index].content = content;
    }

    const getNoteContent = computed(() => (id) => notes.value.filter(note => note.id === id)[0].content)
    const totalNotesCount = computed(() => notes.value.length)
    const totalCharactersCount = computed(() => {
        return notes.value.reduce(
            (sum, curr) => curr.content.length + sum,
            0
        )
    })

    return {
        notes,
        addNote,
        deleteNote,
        updateNote,
        getNoteContent,
        totalNotesCount,
        totalCharactersCount,
    }
})