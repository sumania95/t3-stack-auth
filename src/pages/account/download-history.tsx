import React, { useEffect, useState } from 'react'
import { requireAuth } from "../../server/common/requireAuth";
import HeadCustom from '../../components/HeadCustom';
import Layout from '../../components/account/Layout'
export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});

const DownloadHistory = () => {
  return (
    <Layout>
       <HeadCustom title="Download History"/>
        {/* <GenreComponent/> */}
        <>
        <form  className='flex flex-col space-y-2'>
            <i>Only downloads for the past year are displayed</i>
        </form>
        </>
    </Layout>
  )
}

export default DownloadHistory