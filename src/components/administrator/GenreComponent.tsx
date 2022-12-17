import React, { useEffect, useState } from 'react'
import { trpc } from "../../utils/trpc";
import Link from 'next/link';

function GenreComponent() {
  const [search, setSearch] = useState("");
  const genres = trpc.genre.getAll.useQuery({genre:search});

  return (
    <main className='flex flex-col w-full space-y-3'>
        <div className='flex flex-row items-center justify-between space-x-3'>
            <Link href="/user/administrator/genre/create" className='p-2 bg-green-700 text-white'>ADD NEW</Link>
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
                        <th className=" w-1/12 py-3 px-6">
                            #
                        </th>
                        <th className=" w-10/12 py-3 px-6">
                            Genre
                        </th>
                        <th className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {genres.data?.result?.map((genre, i) => (
                        <tr className="bg-white border-b" key={genre.id}>
                            <th className=" w-1/12 py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {i+1}
                            </th>
                            <td className=" w-10/12 py-4 px-6">
                                {genre.genre}
                            </td>
                            <td className="py-4 px-6">
                                <a href="#" className="font-medium text-blue-600">Edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className='flex flex-col space-y-3 items-center justify-center pt-5'>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    <li>
                    <a href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ">Previous</a>
                    </li>
                    <li>
                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
                    </li>
                    <li>
                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">2</a>
                    </li>
                    <li>
                    <a href="#" aria-current="page" className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
                    </li>
                    <li>
                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">4</a>
                    </li>
                    <li>
                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">5</a>
                    </li>
                    <li>
                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ">Next</a>
                    </li>
                </ul>
            </nav>
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900">10</span> of <span className="font-semibold text-gray-900">100</span> Entries
            </span>
        </div>
    </main>
  )
}

export default GenreComponent




