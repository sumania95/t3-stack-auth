import React, { useState } from 'react'
import Image from "next/image";
import { trpc } from "../../../utils/trpc";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { requireAuth } from "../../../server/common/requireAuth";
import Layout from '../../../components/administrator/Layout';
import HeadCustom from '../../../components/HeadCustom';

export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});
interface Genre {
  genre: string;
}

function Create() {
  const router = useRouter();

  const utils = trpc.useContext();
  const [data, setData] = useState<Genre>({
    genre: "",
  })
  const [isloading, setIsloading] = useState(false)
  const createGenre = trpc.genre.create.useMutation({
    onSuccess:(res)=>{
        setTimeout(()=>{ 
        toast.success("Genre successfully created")
        setIsloading(false);
      }, 400);
      
      setData({
        genre: "",
      })
      router.push("/administrator/sub-genre")
    },
    onSettled:(res)=>{
      utils.genre.getAll.invalidate()
    },
    onError: (error) => {
      setTimeout(()=>{ 
        toast.error(error.message)
        setIsloading(false);
      }, 400);
    },
  });
  

  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (isloading) return;
    setIsloading(true)
    createGenre.mutate({
      genre: data.genre,
      
    })
  }

  return (
    <Layout>
       <HeadCustom title="Add New Genre"/>
       <main className='flex flex-col w-full space-y-3'>
        <h3>ADD NEW GENRE</h3>
        <div className='pb-10'></div>
        <form onSubmit={(e)=>{handleSubmit(e)}} className='flex flex-col w-full'>
          <div className="relative w-full pb-6">
            <input
              id="genre"
              name="genre"
              type="text"
              placeholder=" "
              className="peer w-full text-xl placeholder-transparent outline-none border-b border-gray-300 focus:border-gray-600"
              value={data.genre}
              onChange={(e) => setData({...data, genre: e.target.value})}
              />
            <label htmlFor="genre" 
              className="absolute left-0 -top-6 text-sm text-gray-900
              peer-placeholder-shown:text-base
              peer-placeholder-shown:-top-1
              transition-all
              peer-focus:-top-6
              peer-focus:text-sm
              ">Genre
            </label>
          </div>
          <div className="flex items-start justify-start">
            {isloading?
            <button className="flex items-center justify-center bg-green-800 text-white px-10 py-2 disabled:bg-green-600" disabled>
              Submit <Image alt="loading" src="/loading.svg" width={30} height={30} className='pl-2'/>
            </button>
            :
            <button className="flex items-center justify-center bg-green-800 text-white px-10 py-2 hover:bg-green-600" type="submit">
              Submit
            </button>
            }
                
              </div>
        </form>
        </main>
    </Layout>
  )
}

export default Create