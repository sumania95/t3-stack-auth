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
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(3)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(data?.length as number /postsPerPage);

  console.log(howManyPages);


  return (
    <main className='flex flex-col w-full space-y-3'>
        <div className='flex flex-row items-center justify-between space-x-3'>
            <Link href="/administrator/genre/create" className='p-2 bg-green-700 text-white'>ADD NEW</Link>
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
        <div>
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-50 border uppercase bg-gray-700">
                    <tr>
                        <th colSpan={10} className="py-2 px-6">
                            Genre
                        </th>
                        <th colSpan={2} className="flex space-x-2">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <GenreTable isLoading={isLoading} items={currentPosts}/>
                </tbody>
            </table>
            <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
        </div>
    </main>
  )
}

export default GenreComponent




