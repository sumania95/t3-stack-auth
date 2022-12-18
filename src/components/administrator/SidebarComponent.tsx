import Link from 'next/link'
import React from 'react'

function SidebarComponent() {
  return (
    <div>
        <div className='w-56 flex flex-col border-r h-[calc(100vh-h-16)] p-2 space-y-1'>
          <Link href={'/user/administrator/'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>DASHBOARD</Link>
          <Link href={'/user/administrator/approved'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>APPROVED</Link>
          <Link href={'/user/administrator/genre'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>GENRE</Link>
          <Link href={'/user/administrator/sub-genre'} className='w-full hover:bg-gray-200 p-2 hover:cursor-pointer'>SUB GENRE</Link>
        </div>
    </div>
  )
}

export default SidebarComponent