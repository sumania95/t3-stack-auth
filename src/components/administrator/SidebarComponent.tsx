import Link from 'next/link'
import React from 'react'

function SidebarComponent() {
  return (
    <div>
        <div className='w-56 flex flex-col border-r h-[calc(100vh-64px)] p-2 space-y-1'>
          <Link href={'/administrator/'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>DASHBOARD</Link>
          <Link href={'/administrator/approved'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>APPROVED</Link>
          <Link href={'/administrator/genre'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>GENRE</Link>
          <Link href={'/administrator/sub-genre'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>SUB GENRE</Link>
          <Link href={'/administrator/subcription'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>SUBSCRIPTION</Link>
          <Link href={'/administrator/users'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>USERS</Link>
        </div>
    </div>
  )
}

export default SidebarComponent