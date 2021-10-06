import React, {useState, useContext, useEffect} from 'react'
import {auth, database} from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] =  useState()
    const [loading, setLoading] =  useState(true)

    function register(email, senha){
        return auth.createUserWithEmailAndPassword(email, senha).then(() => {
            database.ref(`/users/${auth.currentUser.uid}`).set({
                email: email,
                senha: senha,
                adm: false,
              })
        })
    }

    function login(email, senha){
        return auth.signInWithEmailAndPassword(email, senha)
    }

    function logout(){
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        register,
        login,
        logout
    }
 
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
