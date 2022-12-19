import React, { useEffect, useState } from 'react'
import { requireAuth } from "../../server/common/requireAuth";
import HeadCustom from '../../components/HeadCustom';
import Header from '../../components/Header';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-toastify';

export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});

const User = () => {
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
    <div>
      <HeadCustom title="Account"/>
      <Header />
      <main>
        <div className='px-10 pt-10 pb-5'>
          <h1 className=' text-2xl font-medium'>ACCOUNT</h1>
        </div>
        <div className='border-b border-rose-600 mx-10'></div>
        <div className='mx-10 pt-5'>
          <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col space-y-2'>
            <div className='flex flex-col'>
              <label htmlFor="">EMAIL ADDRESS</label>
              <label htmlFor="" className="w-1/3 p-4 border bg-gray-50 cursor-not-allowed border-gray-500">{session?.user?.email as string}</label>
            </div>
            <div className='flex w-1/3 space-x-2'>
              <div className='flex flex-col w-full'>
                <label htmlFor="">First Name</label>
                <input 
                  type="text" 
                  value={form?.firstname} 
                  className="p-4 border bg-gray-50 border-gray-500"
                  onChange={(e) => setForm({...form, firstname: e.target.value})}
                />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor="">Last Name</label>
                <input 
                  type="text" 
                  value={form?.lastname} 
                  className="p-4 border bg-gray-50 border-gray-500"
                  onChange={(e) => setForm({...form, lastname: e.target.value})}
                />
              </div>
            </div>
            <div className='flex w-1/3 space-x-2 pt-3'>
              <button className='p-2 py-4 w-full bg-blue-600 text-white'>Save</button>
              <button className='p-2 py-4 w-full bg-rose-600 text-white'>Change Password</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default User