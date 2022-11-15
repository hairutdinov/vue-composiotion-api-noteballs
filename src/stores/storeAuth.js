import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from '@firebase/auth'
import { ref } from "vue";

export const useStoreAuth = defineStore('storeAuth', () => {

    const register = credentials => {
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

    const login = credentials => {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('error', errorMessage)
            });

    }

    const logout = () => {
        signOut(auth)
            .then(() => console.log('User signed out'))
            .catch((error) => console.error);
    }

    return {
        register,
        login,
        logout,
    }
})