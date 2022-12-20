import React, { useEffect, useState } from 'react'
import Header from '../Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
type AdministratorLayoutProps = {
    children: React.ReactNode,
};

function Layout({children}: AdministratorLayoutProps) {
  const router = useRouter();
  const utils = trpc.useContext();
  const {data:session} = useSession();
  const {data:user} = trpc.user.me.useQuery()
  const [form,setForm] = useState({
    firstname:"",
    lastname:""
  });
  useEffect(() => {
    setForm({
      firstname:user?.firstname as string,
      lastname:user?.lastname as string
    })
  }, [user])
  const [isloading, setIsloading] = useState(false)

  const updateUser = trpc.user.update.useMutation({
    onSuccess: (data) => {
      setTimeout(()=>{ 
        toast.success("User successfully changed")
        setIsloading(false);
      }, 400);
    },
    onSettled:() => {
      utils.user.me.invalidate()
    },
    onError: (error) => {
      console.log(error)
      setIsloading(false);
    }
  })

  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (isloading) return;
    setIsloading(true)
    updateUser.mutate({
      firstname:form.firstname,
      lastname:form.lastname      
    })
  }
  return (
    <>
       <Header/>
      <main>
        <div className='px-10 pt-10 pb-5'>
          <h1 className=' text-2xl font-medium'>ACCOUNT</h1>
        </div>
        <div className='border-b border-gray-300 mx-10 mb-2'></div>
        <div className='flex mx-10 space-x-2 pt-2'>
            <Link href="/account" className={router.pathname=="/account"?"px-2 font-medium border bg-rose-600 text-white border-rose-600":"px-2 font-medium border border-rose-600"}>Account</Link>
            <Link href="/account/billing-history" className={router.pathname=="/account/billing-history"?"px-2 font-medium border bg-rose-600 text-white border-rose-600":"px-2 font-medium border border-rose-600"}>Billing History</Link>
            <Link href="/account/download-history" className={router.pathname=="/account/download-history"?"px-2 font-medium border bg-rose-600 text-white border-rose-600":"px-2 font-medium border border-rose-600"}>Download History</Link>
            <Link href="/account/audit-log" className={router.pathname=="/account/audit-log"?"px-2 font-medium border bg-rose-600 text-white border-rose-600":"px-2 font-medium border border-rose-600"}>Audit Logs</Link>
        </div>
        <div className='mx-10 pt-10'>
          {children}
        </div>
      </main>
    </>
    
  )
}

export default Layout