import { setDefaultResultOrder } from "dns";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react"
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'
import { auth } from "../firebase";

interface IAuth {
  user : User | null
  signUp : (email : string , password : string) => Promise<void>
  signIn : (email : string , password : string) => Promise<void>
  logout : () => Promise<void>
  error : string | null
  loading : boolean
}

interface AuthProviderProps{
  children : React.ReactNode
}

const alertModal = withReactContent(Swal)
const Toast = alertModal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const AuthContext = createContext<IAuth>({
  user : null,
  signUp : async () => {},
  signIn :  async () =>{},
  logout : async () =>{},
  error : null,
  loading : false
})

export const AuthProvider = ({children} :  AuthProviderProps ) => {
  const [loading , setLoading] = useState<boolean>(false)
  const [initialLoading , setInitialLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null) 
  const [errors , setErrors] = useState(null)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth , user => {
      if(user){
        setUser(user)
        setLoading(false)
      }else{
        setUser(null)
        setLoading(true)
        router.push('/auth/login')
      }

      setInitialLoading(false)
    })
  } , [auth])

  const signUp = async (email : string , password : string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth , email , password)
          .then(userCredential => {
            setUser(userCredential.user)
            Toast.fire({
              icon: 'success',
              title: 'You are successfully Sign Up'
            })
            router.push('/')
            setLoading(false)
          })
          .catch(error => {
            Toast.fire({
              icon: 'error',
              title: 'Email or password incorect'
            })
          })
          .finally(() => setLoading(false))
  }

  const signIn = async (email : string , password : string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth , email , password)
          .then(userCredential => {
            setUser(userCredential.user)
            Toast.fire({
              icon: 'success',
              title: 'You are successfully logged in'
            })
            router.push('/')
            setLoading(false)
          })
          .catch(error => {
            Toast.fire({
              icon: 'error',
              title: 'Email or password incorect'
            })
          })
          .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth).then(() => {
      setUser(null)
    })
    .catch(error => alert(error.message))
    .finally(() => setLoading(false))
  }

  const memoValue = useMemo(() => {
    return {
      user,
      loading,
      signIn,
      signUp,
      error : errors,
      logout
    }
  },[user,loading])
  
  return <AuthContext.Provider value={memoValue}>
    {!initialLoading && children}
  </AuthContext.Provider>
}

export default function useAuth(){
  return useContext(AuthContext)
}