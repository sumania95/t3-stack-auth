import React from 'react'
import Layout from '../../components/administrator/Layout'
import HeadCustom from '../../components/HeadCustom'

import { NextPage } from 'next';

import { isAdmin } from "../../server/common/requireAuth";
export const getServerSideProps = isAdmin(async () => {
  return { props: {} };
});
const Administrator:NextPage = () => {
  return (
    <Layout>
       <HeadCustom title="Dashboard"/>
        {/* <GenreComponent/> */}
        <main>hello</main>
    </Layout>
  )
}

export default Administrator