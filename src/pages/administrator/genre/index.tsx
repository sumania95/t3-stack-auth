import React from 'react'
import { requireAuth } from "../../../server/common/requireAuth";
import Layout from '../../../components/administrator/Layout';
import HeadCustom from '../../../components/HeadCustom';

export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});
function Genre() {
  return (
    <Layout>
       <HeadCustom title="Genre"/>
        {/* <GenreComponent/> */}
    </Layout>
  )
}

export default Genre