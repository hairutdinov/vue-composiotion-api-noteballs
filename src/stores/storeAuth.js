import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged  } from '@firebase/auth'
import { reactive, ref } from "vue";

export const useStoreAuth = defineStore('storeAuth', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        init() {
            onAuthStateChanged(auth, (u) => {
                if (u) {
                    this.user = {
                        id: u.uid,
                        email: u.email,
                    }
                    console.log('user logged in', u)
                } else {
                    this.user = {}
                    console.log('user logged out', u)
                }
            });
        },
        register(credentials) {
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
        },
        login(credentials) {
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
        },
        logout() {
            signOut(auth)
                .then(() => console.log('User signed out'))
                .catch((error) => console.error);
        },
    }
})