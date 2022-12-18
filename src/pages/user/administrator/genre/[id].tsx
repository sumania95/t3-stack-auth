import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../../../components/administrator/Layout'
import HeadCustom from '../../../../components/HeadCustom'
import Image from "next/image";
import { trpc } from "../../../../utils/trpc";
import { toast } from 'react-toastify';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

type Data = {
  id:string
}

function Update({id}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(id)
  const {data, isLoading} = trpc.genre.gedId.useQuery({id})
  const [genre, setGenre] = useState("")
  if(isLoading){
    return (
    <Layout>
       <HeadCustom title="Add New Genre"/>
       <main className='flex flex-col w-full space-y-3'>
        Loading ....
      </main>
      </Layout>
      )
  }
  return (
    <Layout>
       <HeadCustom title="Add New Genre"/>
       <main className='flex flex-col w-full space-y-3'>
        <h3>ADD NEW GENRE</h3>
        <div className='pb-10'></div>
        <form onSubmit={(e)=>{}} className='flex flex-col w-full'>
          <div className="relative w-full pb-6">
            <input
              id="genre"
              name="genre"
              type="text"
              placeholder=" "
              className="peer w-full text-xl placeholder-transparent outline-none border-b border-gray-300 focus:border-gray-600"
              value={genre}
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
            <button className="flex items-center justify-center bg-green-800 text-white px-10 py-2 hover:bg-green-600" type="submit">
              Submit
            </button>
                
              </div>
        </form>
        </main>
    </Layout>
  )
}

export default Update

export const getServerSideProps = async (params:any) => {
  const id = params?.query?.id;
  return {
    props: {
      id,
    },
  }
}