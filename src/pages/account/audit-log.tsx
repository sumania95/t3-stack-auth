import React, { useEffect, useState } from 'react'
import { requireAuth } from "../../server/common/requireAuth";
import HeadCustom from '../../components/HeadCustom';
import Layout from '../../components/account/Layout'
export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});

const AuditLogs = () => {
  return (
    <Layout>
       <HeadCustom title="Audit Logs"/>
        {/* <GenreComponent/> */}
        <>
        <form  className='flex flex-col space-y-2'>
            audit logs
        </form>
        </>
    </Layout>
  )
}

export default AuditLogs