import { signOut,useSession } from 'next-auth/react';
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from '@headlessui/react'
import { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const Header:NextPage = () => {
  const {data:session} = useSession()
  const data = trpc.user.me.useQuery();
  return (
    <div className='sticky top-0 shadow-md h-16 flex items-center justify-between px-5'>
        <Link href={'/'}>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='text-2xl font-black bg-gradient-to-l text-transparent bg-clip-text  from-rose-600 to-rose-900'>AV REMIX STASH</h3>
                <p className='tracking-[.35em] text-xs font-semibold'>AUDIO VIDEO SOURCE</p>
            </div>
        </Link>
        <div className='flex items-center justify-center space-x-3'>
            <Link href={'/'} className="hover:text-rose-600">HOME</Link>
            {session? (
            <>
                <Link href={'/new-releases'} className="hover:text-rose-600">NEW RELEASES</Link>
                <Menu as="div" className={' relative font-light  text-left flex flex-row'}>
                {({ open }) => (
                    <>
                    <Menu.Button className={'flex items-center justify-center'}>
                        {/* <Image
                            src={`https://ui-avatars.com/api/?name=${session?.user?.name}`}
                            alt={`${session?.user?.name}`}
                            width={30}
                            height={30}
                            className="rounded-full hover:cursor-pointer hover:border hover:text-rose-600 hover:scale-110"
                        /> */}
                        <span className={'uppercase hover:text-rose-600 font-normal'}>{data.data?.firstname}</span>
                        
                    </Menu.Button>
                    <Menu.Items className={'absolute right-0 mt-10 w-56 origin-top-right border shadow-md text-black rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'}>
                        <div className='p-5 space-y-3'>
                        <div className='hover:text-gray-600'>
                            <Link href="/user">Your Account</Link>
                        </div>
                        <div className='hover:text-gray-600'>
                            <Link href="/user/remixer">Remixer Editor</Link>
                        </div>
                        <div className='hover:text-gray-600'>
                            <Link href="/administrator">Administrator</Link>
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