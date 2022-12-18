import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { toast } from 'react-toastify';
import Link from "next/link";
import HeadCustom from "../components/HeadCustom";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

interface UserSign {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

const SignUp: NextPage = () => {
  const [isloading, setLoading] = useState(false)
  const router = useRouter();
  const [data, setData] = useState<UserSign>({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  })
  const { mutateAsync } = trpc.user.signup.useMutation();

  const onSubmit = (event:any) => {
    event.preventDefault();
    if (isloading) return;
    setLoading(true);
    mutateAsync({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
    })
      .then((res) => {
      setTimeout(()=>{ 
        toast.success(res.message);
        setLoading(false);
      }, 400);
      
      setData({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
      })
      router.push("/login")
    })
      .catch((err) =>{
        setTimeout(()=>{ 
          toast.error(err.message)
          setLoading(false);
        }, 400);
      })
  }

  return (
    <div>
      <HeadCustom title="Register"/>
      <main className="relative">
        <div className="hidden md:flex absolute right-0 p-5 items-center justify-center">
          <Link href={'/'}  className="p-3 border bg-gray-50 text-2xl hover:text-gray-700 text-gray-500"><AiOutlineClose></AiOutlineClose></Link>
        </div>
        <form
          className="flex items-center justify-center h-screen w-full"
          onSubmit={(event) => {
            onSubmit(event)
          }}
          >
          <div className="p-2">
            <div className="h-1 bg-rose-500"></div>
            <div className="w-full flex flex-col items-center justify-center space-y-3 border p-10">
            <Link href={'/'} className="w-full border-b pb-2">
                <div className='flex flex-col items-center justify-center'>
                    <h3 className='text-3xl font-bold bg-gradient-to-l text-transparent bg-clip-text  from-rose-600 to-rose-900'>VJ DISTRICT HUB</h3>
                    <p className='ml-2 tracking-[.58em] text-xs font-semibold'>AUDIO VIDEO SOURCE</p>
                </div>
            </Link>
            <h2 className="p-4 m-2 text-2xl mb-5">Create New Account</h2>
              <div className="relative w-full pb-6">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder=" "
                  className="peer w-full text-xl placeholder-transparent outline-none border-b border-gray-300 focus:border-gray-600"
                  value={data.email}
                  onChange={(e) => setData((data) => ({...data, email: e.target.value}))}
                  />
                <label htmlFor="email" 
                  className="absolute left-0 -top-6 text-sm text-gray-900
                  peer-placeholder-shown:text-base
                  peer-placeholder-shown:-top-1
                  transition-all
                  peer-focus:-top-6
                  peer-focus:text-sm
                  ">Email Address
                </label>
              </div>
              <div className="relative w-full pb-6">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder=" "
                  className="peer w-full text-xl placeholder-transparent outline-none border-b border-gray-300 focus:border-gray-600"
                  value={data.firstname}
                  onChange={(e) => setData((data) => ({...data, firstname: e.target.value}))}
                  />
                <label htmlFor="firstname" 
                  className="absolute left-0 -top-6 text-sm text-gray-900
                  peer-placeholder-shown:text-base
                  peer-placeholder-shown:-top-1
                  transition-all
                  peer-focus:-top-6
                  peer-focus:text-sm
                  ">Firstname
                </label>
              </div>
              <div className="relative w-full pb-6">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder=" "
                  className="peer w-full text-xl placeholder-transparent outline-none border-b border-gray-300 focus:border-gray-600"
                  value={data.lastname}
                  onChange={(e) => setData((data) => ({...data, lastname: e.target.value}))}
                  />
                <label htmlFor="lastname" 
                  className="absolute left-0 -top-6 text-sm text-gray-900
                  peer-placeholder-shown:text-base
                  peer-placeholder-shown:-top-1
                  transition-all
                  peer-focus:-top-6
                  peer-focus:text-sm
                  ">Lastname
                </label>
              </div>
              <div className="relative w-full pb-6">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder=" "
                  className="peer w-full text-xl placeholder-transparent outline-none border-b border-gray-300 focus:border-gray-600"
                  value={data.password}
                  onChange={(e) => setData((data) => ({...data, password: e.target.value}))}
                  />
                <label htmlFor="password" 
                  className="absolute left-0 -top-6 text-sm text-gray-900
                  peer-placeholder-shown:text-base
                  peer-placeholder-shown:-top-1
                  transition-all
                  peer-focus:-top-6
                  peer-focus:text-sm
                  ">Password
                </label>
              </div>

              <div className="w-full p-2 space-y-3 flex flex-col text-lg">
                <div>
                  <p>By creating an account you accept our Terms </p>
                  <p>of Service and <Link href="/terms" className="underline underline-offset-2">Privacy Statement</Link></p>
                  
                </div>
                <div className="flex w-full">
                {isloading?
                <button className="flex items-center justify-center bg-blue-800 text-white px-2 py-3 w-full disabled:bg-blue-600" disabled>
                  Register <Image alt="loading" src="/loading.svg" width={30} height={30} className='pl-2'/>
                </button>
                :
                <button className="bg-blue-800 text-white px-2 py-3 w-full hover:bg-blue-600" type="submit">
                  Register
                </button>
                }
                </div>
                <div>
                  <p>Already have an account? <Link href="/login" className="underline underline-offset-2">Login</Link></p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
