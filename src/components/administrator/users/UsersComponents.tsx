import React, { useState } from 'react'
import { trpc } from "../../../utils/trpc";
import Link from 'next/link';
import { NextPage } from 'next';
import UserTable from './UserTable';
import Image from "next/image";
import Record from '../../../pages/records.json'
import Pagination from '../../pagination/Pagination'

const UsersComponent:NextPage = () => {
  const [search, setSearch] = useState("");
//   const {data,isLoading} = trpc.genre.getAll.useQuery({genre:search});
  {/* @ts-ignore */}
  const result = Record.Tracks.results
  console.log(result)
  const [currentPage, setCurrentPage] = useState(10)
  const [postsPerPage] = useState(10)
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = result?.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(result?.length as number /postsPerPage);

  return (
    <main className='flex flex-col w-full space-y-3'>
        <h3 className='text-lg border-b pb-2'>USERS</h3>
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
                    <UserTable indexOfFirstPost={indexOfFirstPost} items={currentPosts}/>
                </tbody>
            </table>
            <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
        </div>
    </main>
  )
}

export default UsersComponent




