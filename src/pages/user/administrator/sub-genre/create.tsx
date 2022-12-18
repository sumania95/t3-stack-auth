import React, { useState } from 'react'
import Layout from '../../../../components/administrator/Layout'
import HeadCustom from '../../../../components/HeadCustom'
import Image from "next/image";
import { trpc } from "../../../../utils/trpc";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

interface Genre {
  genreId: string;
  sub_genre: string;
}

function Create() {
  const [form, setForm] = useState<Genre>({
    sub_genre: "",
    genreId: "",
  })
  const [isloading, setIsloading] = useState(false)
  const { mutateAsync } = trpc.subgenre.create.useMutation();
  const {data, isLoading} = trpc.genre.getAll.useQuery({genre:""});
  const router = useRouter();
  

  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (isloading) return;
    setIsloading(true)
    mutateAsync({
      genreId: form.genreId,
      sub_genre: form.sub_genre,
      
    })
    .then((res:any) => {
      setTimeout(()=>{ 
        toast.success(res.message);
        setIsloading(false);
      }, 400);
      
      setForm({
        sub_genre: "",
        genreId: form.genreId,
      })
    })
    .catch((error:any) =>{
      setTimeout(()=>{ 
        toast.error(error.message)
        setIsloading(false);
      }, 400);
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
            <select onChange={(e)=>setForm({...form,genreId:e.target.value})} name="genre" id="genre" className='p-2 border'>
              <option>Select Genre</option>
              {data?.result.map((item, index) => (
                <option key={item.id} value={item.id}>{item.genre}</option>
              ))}
            </select>
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