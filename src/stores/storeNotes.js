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

export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return {
            notes: [],
            notesLoaded: false,
        }
    },
    actions: {
        init() {
            const storeAuth = useStoreAuth()

            notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
            notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"))

            this.getNotes()
        },
        async addNote(newNote) {
            let currentDate = new Date().getTime(),
                date = currentDate.toString()

            const docRef = await addDoc(notesCollectionRef, {
                content: newNote.value,
                date,
            })
        },
        async deleteNote(idToDelete) {
            await deleteDoc(doc(notesCollectionRef, idToDelete))
        },
        async updateNote(id, content) {
            await updateDoc(doc(notesCollectionRef, id), {
                content
            })
        },
        async getNotes() {
            this.notesLoaded = true;
            const unsubscribe = onSnapshot(notesCollectionQuery, (querySnapshot) => {
                let notesLocal = []
                querySnapshot.forEach((doc) => {
                    notesLocal.push({
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date,
                    })
                })

                this.notes = notesLocal
                this.notesLoaded = false;
            })
        },
        clearNotes() {
            this.notes = []
        },
    },
    getters: {
        getNoteContent() {
            return (id) => this.notes.filter(note => note.id === id)[0].content
        },
        totalNotesCount() {
            return this.notes.length
        },
        totalCharactersCount() {
            return this.notes.reduce(
                (sum, curr) => curr.content.length + sum,
                0
            )
        },
    }
})