import { signOut,useSession } from 'next-auth/react';
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from '@headlessui/react'
// import { RiArrowDownSFill } from "react-icons/ri";
// import { DiDatabase } from "react-icons/di";
// import { FaUserCircle } from 'react-icons/fa';
// import { BsMusicPlayerFill } from "react-icons/bs";
// import router from 'next/router';

function Header() {
    const {data:session} = useSession()
  return (
    <div className='sticky top-0 shadow-md bg-white h-16 flex items-center justify-between px-5'>
        <Link href={'/'}>LOGO</Link>
        <div className='flex items-center justify-center space-x-3'>
            <Link href={'/'} className="hover:text-rose-600">HOME</Link>
            {session? (
            <>
                <Link href={'/new-releases'} className="hover:text-rose-600">NEW RELEASES</Link>
                <Menu as="div" className={' relative font-light  text-left flex flex-row'}>
                {({ open }) => (
                    <>
                    <Menu.Button>
                        <Image
                            src={`https://ui-avatars.com/api/?name=${session?.user?.name}`}
                            alt={`${session?.user?.name}`}
                            width={30}
                            height={30}
                            className="rounded-full hover:cursor-pointer hover:border hover:border-1 hover:text-rose-600 hover:scale-105"
                        />
                    </Menu.Button>
                    <Menu.Items className={'absolute right-0 mt-10 w-56 origin-top-right border shadow-md text-black rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'}>
                        <div className='p-5 space-y-3'>
                        <div className='hover:text-gray-600'>
                            <Link href="/account">Your Account</Link>
                        </div>
                        <div className='hover:text-gray-600'>
                            <Link href="/editor">Editor Section</Link>
                        </div>
                        <div className='hover:text-gray-600'>
                            <Link href="/administrator">Administrator Page</Link>
                        </div>
                        <div className='hover:text-gray-600'>
                            <Link href="/" onClick={()=>{
                                signOut()
                            }}>Logout</Link>
                        </div>
                        </div>
                    </Menu.Items>
                    </>
                )}
                </Menu>
                
            </>
            ):<Link href={'/login'} className="hover:text-rose-600">LOGIN</Link>}
        </div>
    </div>
  )
}

export default Header