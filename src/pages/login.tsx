import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface FormData {
    email: string;
    password: string;
}

const Home: NextPage = () => {
  // const login = ;
  
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  })
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Next App - Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          className="flex items-center justify-center h-screen w-full"
          onSubmit={(event)=>{
            event.preventDefault();
            signIn("credentials", { ...data, redirect: false })
            .then((result) => {
              console.log(result);
              if (result?.error === "CredentialsSignin") {
                toast.error("Invalid Email and Password");
                return;
              }
              setTimeout(()=>{ 
                toast.success("Successfully signed in");
              },400);
              router.push("/")
            }).catch((error) => {
              toast.error(error.message)
            })
          }}>
          <div className="p-2">
            <div className="flex flex-col items-center justify-center space-y-3 border p-2">
              <h2 className="p-2 border">Welcome back!</h2>
              <input
                type="email"
                placeholder="Type your email..."
                className="p-2 border"
                value={data.email}
                onChange={(e) => setData((data) => ({...data, email: e.target.value}))}
                />

                <input
                type="text"
                placeholder="Type your email..."
                className="p-2 border"
                value={data.password}
                onChange={(e) => setData((data) => ({...data, password: e.target.value}))}
                />
              <div className="w-full flex items-center justify-center p-2">
                <button className="bg-blue-800 text-white p-2 w-full" type="submit">
                  Login
                </button>
              </div>
              <div className="w-full p-2">
                <Link href="/register">
                  <button className="p-2 bg-blue-800 text-white w-full" type="submit">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
