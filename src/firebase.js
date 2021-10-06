import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBBSspZP0AbASmq_zFWeii7EL3iavnv1Oc",
    authDomain: "spellbook-e9e65.firebaseapp.com",
    projectId: "spellbook-e9e65",
    storageBucket: "spellbook-e9e65.appspot.com",
    messagingSenderId: "338164606660",
    appId: "1:338164606660:web:db8b881402717291020b91",
    measurementId: "G-T71PZPXQSN"
})

export const auth = app.auth()
export const database = app.database()
export default app