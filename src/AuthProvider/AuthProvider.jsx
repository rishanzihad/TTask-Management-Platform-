import { createContext, useEffect, useState } from "react";
import {   GoogleAuthProvider, createUserWithEmailAndPassword,  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,  } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import app from "../../firebase.config";

export const AuthContext =createContext(null)
const auth = getAuth(app)
const googleProvider =new GoogleAuthProvider
const AuthProvider = ({children}) => {
    const[user,setUser] =useState()
    const axiosPublic =useAxiosPublic()
    const [loading,setLoading] =useState(true)

    const googleLogin=()=>{
        setLoading(true)
       return signInWithPopup(auth,googleProvider)
    }
    const register =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const  login =(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut =()=>{
        setLoading(true)
        signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            if(currentUser){
                const userInfo={
                   email:currentUser.email 
                }
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
        })
        return ()=>{
            return unsubscribe
        }
    },[])
    const authInfo={
        googleLogin,register,login,user,logOut,loading,
    }
    return (
        <AuthContext.Provider value={authInfo}>
         {children}
        </AuthContext.Provider>
     );
};

export default AuthProvider;