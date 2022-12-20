import React, { useState } from 'react'
import { trpc } from "../../../utils/trpc";
import Link from 'next/link';
import { NextPage } from 'next';
import GenreTable from './GenreTable';
import Image from "next/image";
import Pagination from '../../../components/pagination/Pagination'

const GenreComponent:NextPage = () => {
  const [search, setSearch] = useState("");
  const {data,isLoading} = trpc.genre.getAll.useQuery({genre:search});
  const [currentPage, setCurrentPage] = useState(10)
  const [postsPerPage] = useState(10)
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(data?.length as number /postsPerPage);

  return (
    <main className='flex flex-col w-full space-y-3'>
        <h3 className='text-lg border-b pb-2'>GENRE</h3>
        <div className='flex flex-row items-center justify-between space-x-3'>
            <Link href="/administrator/genre/create" className='p-2 text-sm font-light bg-green-700 text-white'>ADD NEW</Link>
            <input 
                type="search" 
                name="search"
                value={search}
                onChange={e => setSearch(e.target.value)} 
                id="search" 
                className='p-2 border focus:border-gray-300 outline-none'
                placeholder='Search Record'
            />
        </div>
        <div className=' overflow-auto'>
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-50 border uppercase bg-gray-700">
                    <tr>
                        <th className="p-2">
                            #
                        </th>
                        <th className="p-2">
                            Genre
                        </th>
                        <th className="p-2">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <GenreTable indexOfFirstPost={indexOfFirstPost} isLoading={isLoading} items={currentPosts}/>
                </tbody>
            </table>
            <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
        </div>
    </main>
  )
}

export default GenreComponent




