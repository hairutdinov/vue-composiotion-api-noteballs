import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { ref } from "vue";

export const useStoreAuth = defineStore('storeAuth', () => {

    const registerUser = credentials => {
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.error('error', errorMessage)
            })
    }

    return {
        registerUser,
    }
})