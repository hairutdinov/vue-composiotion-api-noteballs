import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut } from '@firebase/auth'
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

    const logout = () => {
        signOut(auth)
            .then(() => console.log('User signed out'))
            .catch((error) => console.error);
    }

    return {
        registerUser,
        logout,
    }
})