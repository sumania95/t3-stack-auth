import React from 'react'
import Layout from '../../../components/Administrator/Layout'
import HeadCustom from '../../../components/HeadCustom'
import SubGenreComponent from '../../../components/Administrator/SubGenre/SubGenreComponent'
import { requireAuth } from "../../../server/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});

function SubGenre() {
  return (
    <Layout>
       <HeadCustom title="Sub Genre"/>
        <SubGenreComponent/>
    </Layout>
  )
}

export default SubGenre