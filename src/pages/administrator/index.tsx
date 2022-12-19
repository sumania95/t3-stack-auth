import React from 'react'
import Layout from '../../components/administrator/Layout'
import HeadCustom from '../../components/HeadCustom'

import { requireAuth } from "../../server/common/requireAuth";

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
function Administrator() {
  return (
    <Layout>
       <HeadCustom title="Dashboard"/>
        {/* <GenreComponent/> */}
        <main>hello</main>
    </Layout>
  )
}

export default Administrator