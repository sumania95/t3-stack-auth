import React, { useEffect, useState } from 'react'
import HeadCustom from '../../../components/HeadCustom'
import { trpc } from "../../../utils/trpc";
import { NextPage } from 'next'
import Layout from '../../../components/administrator/Layout';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Image from "next/image";
import { isAdmin } from "../../../server/common/requireAuth";

export const getServerSideProps = isAdmin(async () => {
  return { props: {} };
});
interface GenreData {
  id?: string;
  genre?: string;
}

const UpdateGenre:NextPage = () => {
  const utils = trpc.useContext();
  const router = useRouter()
  const GenreId = router.query.id as string;
  const [loading, setLoading] = useState(false);
  const {data, isLoading} = trpc.genre.gedId.useQuery({
    id: GenreId,
  })
  const [form, setForm] = useState<GenreData>({
    id: GenreId,
    genre: '',
  });
  useEffect(() => {
    try{
      setForm({
        id: data?.id,
        genre: data?.genre as string
      })
    }catch(e){
      console.log(e)
      
    }
  }, [data])

  const updateGenre = trpc.genre.update.useMutation({
    onSuccess:()=>{
        setTimeout(()=>{ 
        toast.success("Genre successfully updated")
        setLoading(false);
      }, 400);
    },
    onSettled:()=>{
      utils.genre.getAll.invalidate()
    },
    onError: (error) => {
      setTimeout(()=>{ 
        toast.error(error.message)
        setLoading(false);
      }, 400);
    },
  });
  

  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (loading) return;
    setLoading(true)
    updateGenre.mutate({
      genre: form.genre,
      id: GenreId,
    })
  }
  
  
  return (
    <Layout>
       <HeadCustom title="Add New Genre"/>
       <main className='flex flex-col w-full space-y-3'>
        <h3>ADD NEW GENRE</h3>
        <div className='pb-10'></div>
        <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col w-full'>
          <div className="relative w-full pb-6">
            <input
              id="genre"
              name="genre"
              type="text"
              placeholder=" "
              className="peer w-full text-xl placeholder-transparent outline-none border-b border-gray-300 focus:border-gray-600"
              value={form?.genre}
              onChange={(e) => setForm({...form, genre: e.target.value})}
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
            {loading?
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

export default UpdateGenre