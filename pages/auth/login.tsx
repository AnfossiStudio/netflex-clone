import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth"

interface Inputs{
  email : string
  password : string
}

const Login : NextPage = () => {
  const [login , setLogin] = useState<boolean>(false)
  const {signIn , signUp} = useAuth()

  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm<Inputs>()

  const onSubmit : SubmitHandler<Inputs> = async ({email ,password}) => {
      if(login){
         await signIn(email , password)
      }else{
        await signUp(email , password)
      }
  }
  
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix - Login</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Image src="https://rb.gy/p2hphi" layout="fill" className="-z-10 !hidden opacity-60 sm:!inline object-cover"  />
      <img src="https://rb.gy/ulxxee" alt="Logo" className="absolute cursor-pointer object-contain left-10 top-6" width={150} height={150} />
      <form onSubmit={handleSubmit(onSubmit)} className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
        <h1 className="text-4xl text-center">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input type="email" autoComplete="off" placeholder="E-mail Address" className={`${errors.email && 'input-error'} input`} {...register('email' , {required : true})} />
            {errors.email && <p className="text-red-400 mt-2 text-sm">Please enter a valid email</p>}
          </label>
          <label className="inline-block w-full">
            <input type="password" placeholder="Password" className={`${errors.email && 'input-error'} input`} {...register('password' , {required : true})} />
            {errors.password && <p className="text-red-400 mt-2 text-sm">Your password must contain between 4 & 30 characters</p>}
          </label>
        </div>
        <button onClick={() => setLogin(true)} className="w-full rounded bg-[#e50914] py-3 font-semibold hover:bg-[#bc1f27] transition" >Sign In</button>
        <div className="flex justify-between text-[gray]">
          New to Netflix ?
          <button className="text-white hover:underline"  onClick={() => setLogin(false)}>Signup</button>
        </div>
      </form>
    </div>
  )
}

export default Login