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
  genreId?: string;
  sub_genre?: string;
}

const UpdateSubGenre:NextPage = () => {
  const utils = trpc.useContext();
  const router = useRouter()
  const SubGenreId = router.query.id as string;
  const [loading, setLoading] = useState(false);
  const {data, isLoading} = trpc.subgenre.gedId.useQuery({
    id: SubGenreId,
  })
  const { data:genre } = trpc.genre.getAll.useQuery({genre:""});

  const [form, setForm] = useState<GenreData>({
    id: SubGenreId,
    genreId: "",
    sub_genre: "",
  });
  useEffect(() => {
    try{
      setForm({
        id: data?.id,
        genreId: data?.genreId as string,
        sub_genre: data?.sub_genre as string
      })
    }catch(e){
      console.log(e)
      
    }
  }, [data])

  const updateGenre = trpc.subgenre.update.useMutation({
    onSuccess:()=>{
        setTimeout(()=>{ 
        toast.success("Sub Genre successfully updated")
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
      genreId: form?.genreId,
      sub_genre: form?.sub_genre,
      id: SubGenreId,
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
              id="sub_genre"
              name="sub_genre"
              type="text"
              placeholder=" "
              className="peer w-full text-xl placeholder-transparent outline-none border-b border-gray-300 focus:border-gray-600"
              value={form.sub_genre}
              onChange={(e) => setForm({...form, sub_genre: e.target.value})}
              />
            <label htmlFor="sub_genre" 
              className="absolute left-0 -top-6 text-sm text-gray-900
              peer-placeholder-shown:text-base
              peer-placeholder-shown:-top-1
              transition-all
              peer-focus:-top-6
              peer-focus:text-sm
              ">Sub Genre
            </label>
          </div>
          <div className="relative w-full pb-6">
            <select value={form.genreId} onChange={(e)=>setForm({...form,genreId:e.target.value})} name="genre" id="genre" className='p-2 border'>
              <option>Select Genre</option>
              {genre?.map((item, index) => (
                <option key={item.id} value={item.id}>{item.genre}</option>
              ))}
            </select>
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

export default UpdateSubGenre