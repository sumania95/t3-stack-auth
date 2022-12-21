import React from 'react'
import HeadCustom from '../../components/HeadCustom'
import Header from '../../components/Header'
import { isEditor } from "../../server/common/requireAuth";
import { NextPage } from 'next';
import MyTrack from '../../components/editor/MyTrack'


export const getServerSideProps = isEditor(async (ctx) => {
    return { props: {} };
});
const Editor:NextPage = () => {
  return (
    <div>
      <HeadCustom title="Remixer Editor"/>
      <Header />
      <main className='w-full'>
        <div className='w-full flex flex-col items-center justify-center px-5'>
          <h3 className='m-5'>REMIXER EDITOR UPLOADER</h3>
          <input type="file" className='hidden'/>
          <input type="button" value="Drag & Drop some files here, or click to select files" className='text-center py-10 bg-gray-50 border w-full'/>
        </div>
        <div className='flex items-center justify-evenly space-x-2 mt-5 mx-5'>
          <button className='px-2 py-1 bg-slate-300 border border-red-600 w-full'>NEEDS EDIT</button>
          <button className='px-2 py-1 border border-red-600 w-full bg-rose-600 text-white'>MY TRACKS</button>
          <button className='px-2 py-1 bg-slate-300 border border-red-600 w-full'>REJECTED</button>
        </div>
        <div>
          <div className='flex items-center justify-evenly font-semibold space-x-2 mt-5 mx-5'>
            <div className='text-left w-full'>TRACK FILENAME</div>
            <div className='text-left w-full'>TRACK TITLE</div>
            <div className='w-32 text-right'>ACTION</div>
          </div>
          <MyTrack/>
          <MyTrack/>
          <MyTrack/>
          <MyTrack/>
          <MyTrack/>
          <MyTrack/>
        </div>
      </main>
    </div>
  )
}

export default Editor