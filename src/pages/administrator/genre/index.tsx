import React from 'react'
import Layout from '../../../components/Administrator/Layout'
import HeadCustom from '../../../components/HeadCustom'
import GenreComponent from '../../../components/Administrator/Genre/GenreComponent'
import { requireAuth } from "../../../server/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});
function Genre() {
  return (
    <Layout>
       <HeadCustom title="Genre"/>
        <GenreComponent/>
    </Layout>
  )
}

export default Genre