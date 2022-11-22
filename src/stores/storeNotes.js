import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { db } from '@/js/firebase'
import {
    collection,
    onSnapshot, doc, deleteDoc, updateDoc, addDoc,
    query, orderBy
} from 'firebase/firestore'
import { useStoreAuth } from "@/stores/storeAuth.js";

let notesCollectionRef = null,
    notesCollectionQuery = null

export const useStoreNotes = defineStore('storeNotes', () => {

    const notes = ref([]),
        notesLoaded = ref(false)

    const init = () => {
        const storeAuth = useStoreAuth()
        notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
        notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"))
        getNotes()
    }

    const addNote = async (newNote) => {
        let currentDate = new Date().getTime(),
            date = currentDate.toString()
        
        const docRef = await addDoc(notesCollectionRef, {
            content: newNote.value,
            date,
        })
    }

    const deleteNote = async idToDelete => await deleteDoc(doc(notesCollectionRef, idToDelete))

    const updateNote = async (id, content) => {
        await updateDoc(doc(notesCollectionRef, id), {
            content
        })
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
        notesLoaded.value = true;
        const unsubscribe = onSnapshot(notesCollectionQuery, (querySnapshot) => {
            let notesLocal = []
            querySnapshot.forEach((doc) => {
                notesLocal.push({
                    id: doc.id,
                    content: doc.data().content,
                    date: doc.data().date,
                })
            })

            notes.value = notesLocal
            notesLoaded.value = false;
        })
    }

    return {
        notes,
        notesLoaded,
        init,
        addNote,
        deleteNote,
        updateNote,
        getNotes,
        getNoteContent,
        totalNotesCount,
        totalCharactersCount,
    }
})