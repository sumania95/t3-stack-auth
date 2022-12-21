import React, { useEffect, useState } from 'react'
import { requireAuth } from "../../server/common/requireAuth";
import HeadCustom from '../../components/HeadCustom';
import Header from '../../components/Header';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/account/Layout'
export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});

const User = () => {
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
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
      utils.user.me.invalidate()
    },
    onSettled:() => {
      utils.user.me.invalidate()
      reloadSession();
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
    <Layout>
       <HeadCustom title="Dashboard"/>
        {/* <GenreComponent/> */}
        <>
        <h3 className='pb-5 text-2xl'>PERSONAL INFORMATION</h3>
        <div  className='flex flex-col space-y-2'>
            <div className='flex flex-col'>
              <label htmlFor="">EMAIL ADDRESS</label>
              <label htmlFor="" className="w-1/3 p-4 border bg-gray-50 cursor-not-allowed border-gray-500">{session?.user?.email as string}</label>
            </div>
            <div className='flex w-1/3 space-x-2'>
              <div className='flex flex-col w-full'>
                <label htmlFor="">First Name</label>
                <input 
                  type="text" 
                  value={form.firstname} 
                  className="p-4 border bg-gray-50 border-gray-500"
                  onChange={(e) => setForm({...form, firstname: e.target.value})}
                />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor="">Last Name</label>
                <input 
                  type="text" 
                  value={form.lastname} 
                  className="p-4 border bg-gray-50 border-gray-500"
                  onChange={(e) => setForm({...form, lastname: e.target.value})}
                />
              </div>
            </div>
            
          </div>
          <h3 className='py-5 text-2xl'>Change Password</h3>
          <div  className='flex flex-col space-y-2'>
            <div className='flex w-1/3 space-x-2'>
              <div className='flex flex-col w-full'>
                <label htmlFor="">Current Password</label>
                <input 
                  type="password" 
                  value={''}
                  className="p-4 border bg-gray-50 border-gray-500"
                  onChange={(e) => setForm({...form, firstname: e.target.value})}
                />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor="">New Password</label>
                <input 
                  type="password" 
                  value={''}
                  className="p-4 border bg-gray-50 border-gray-500"
                  onChange={(e) => setForm({...form, lastname: e.target.value})}
                />
              </div>
            </div>
            
          </div>
          <div className='flex w-1/3 space-x-2 pt-3'>
            <button onClick={(e)=>handleSubmit(e)} type='submit' className='p-2 py-3 w-full bg-gray-800 text-white hover:bg-gray-600 active:bg-gray-500'>Save</button>
          </div>
        </>
    </Layout>
  )
}

export default User