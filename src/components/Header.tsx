import { signOut,useSession } from 'next-auth/react';
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from '@headlessui/react'
import { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { AiOutlineUser } from 'react-icons/ai';

const Header:NextPage = () => {
  const {data:session} = useSession()
  const {data} = trpc.user.me.useQuery();
  return (
    <div className='sticky top-0 z-999 bg-white shadow-md h-16 flex items-center justify-between px-5'>
        <Link href={'/'}>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='text-md md:text-2xl font-black bg-gradient-to-l text-transparent bg-clip-text  from-rose-600 to-rose-900'>AV REMIX STASH</h3>
                <p className='text-xs font-thin tracking-[.10em] md:tracking-[.35em] md:font-semibold'>AUDIO VIDEO SOURCE</p>
            </div>
        </Link>
        <div className='flex items-center justify-center space-x-3'>
            <Link href={'/'} className="hover:text-rose-600">Home</Link>
            <Link href={'/new-releases'} className="hover:text-rose-600">Record Pool</Link>
            <Link href={'/pricing'} className="hover:text-rose-600">Pricing</Link>
            {session? (
            <>
                <Menu as="div" className={' relative font-light text-left flex flex-row'}>
                {({ open }) => (
                    <>
                    <Menu.Button className={'flex items-center justify-center hover:border-rose-600 hover:text-rose-600'}>
                        <AiOutlineUser className='w-5 h-5'/>
                        {/* <Image
                            src={`https://ui-avatars.com/api/?name=${session?.user?.name}`}
                            alt={`${session?.user?.name}`}
                            width={25}
                            height={25}
                            className="rounded-full hover:cursor-pointer hover:border hover:text-rose-600 hover:scale-110"
                        /> */}
                        <span className={' normal-case font-normal'}>{data?.firstname?data?.firstname:"User"}</span>
                        
                    </Menu.Button>
                    <Menu.Items className={'absolute right-0 mt-10 w-56 origin-top-right border shadow-md text-black rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'}>
                        <div className='p-5 space-y-3'>
                        <div className='hover:text-gray-600'>
                            <Link href="/account">Your Account</Link>
                        </div>
                        {data?.is_editor?
                        <div className='hover:text-gray-600'>
                            <Link href="/remixer">Remixer Editor</Link>
                        </div>
                        :<></>
                        }
                        {data?.is_admin?
                        <div className='hover:text-gray-600'>
                            <Link href="/administrator">Administrator</Link>
                        </div>
                        :<></>
                        }
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
            ):
            <>
                <Link href={'/login'} className="hover:text-rose-600">Login</Link>
                <Link href={'/register'} className="hover:text-gray-200 px-2 font-thin py-1 border bg-gradient-to-r transition hover:scale-105 from-rose-600 to-rose-900 text-white">Get Started</Link>
            </>
            }
        </div>
    </div>
  )
}

export default Header