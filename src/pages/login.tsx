import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { AiOutlineClose } from "react-icons/ai";
import HeadCustom from "../components/HeadCustom";
import Image from "next/image";
interface FormData {
    email: string;
    password: string;
}

const Home: NextPage = () => {
  // const login = ;
  const [isloading, setLoading] = useState(false)
  const router = useRouter()

  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  })

  const onSubmit = (event:any) =>{
    event.preventDefault();
    if (isloading) return;
    setLoading(true);
    signIn("credentials", { ...data, redirect: false })
    .then((result) => {
      if (result?.error === "CredentialsSignin") {
        setTimeout(()=>{ 
          toast.error("Invalid Email and Password");
          setLoading(false);
        }, 400);
        return;
      }
      setTimeout(()=>{ 
          toast.success("Successfully signed in");
          setLoading(false);
      }, 400);
      router.push("/")
    }).catch((error) => {
      toast.error(error.message)
      setLoading(false);
    })
  }
  
  return (
    <>
      <HeadCustom title="Login"/>
      <main className="relative">
        <div className="absolute right-0 p-5 flex items-center justify-center">
          <Link href={'/'}  className="p-3 border bg-gray-50 text-2xl hover:text-gray-700 text-gray-500"><AiOutlineClose></AiOutlineClose></Link>
        </div>
        <form
          className="flex items-center justify-center h-screen w-full"
          onSubmit={(event)=>{
            onSubmit(event)
          }}>
          <div className="p-2">
            <div className="h-1 bg-rose-500"></div>
            <div className="w-full flex flex-col items-center justify-center space-y-3 border p-10">
              <h2 className="p-4 m-2 text-3xl mb-5">Welcome back!</h2>
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
              <div className="relative w-full">
                <input
                    id="password"
                    name="password"
                    placeholder=" "
                    type="password"
                    className="peer w-full text-2xl placeholder-transparent outline-none border-b border-gray-300 focus:border-gray-600"
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
              <div className="w-full flex items-center justify-center pt-3">
                {isloading?
                <button className="flex items-center justify-center bg-blue-800 text-white px-2 py-3 w-full disabled:bg-blue-600" disabled>
                  Login <Image alt="loading" src="/loading.svg" width={30} height={30} className='pl-2'/>
                </button>
                :
                <button className="bg-blue-800 text-white px-2 py-3 w-full hover:bg-blue-600" type="submit">
                  Login
                </button>
                }
                
              </div>
              <div className="w-full p-2 flex flex-col text-lg">
                <div className="flex space-x-1">
                  <p>Don't have an account yet?</p>
                  <Link href="/register" className="underline underline-offset-2">Register here.</Link>
                </div>
                <div className="flex">
                  <Link href="/register" className="underline underline-offset-2">Forgot your password?.</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default Home;
