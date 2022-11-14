import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import { db } from '@/js/firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'

export const useStoreNotes = defineStore('storeNotes', () => {

    const notes = ref([])

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

    const getNotes = async () => {
        const unsubscribe = onSnapshot(collection(db, 'notes'), (querySnapshot) => {
            let notesLocal = [];
            querySnapshot.forEach((doc) => {
                notesLocal.push({
                    id: doc.id,
                    content: doc.data().content
                });
            });
            notes.value = notesLocal
        });
    }

    return {
        notes,
        addNote,
        deleteNote,
        updateNote,
        getNotes,
        getNoteContent,
        totalNotesCount,
        totalCharactersCount,
    }
})