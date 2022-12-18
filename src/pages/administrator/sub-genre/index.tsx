import React from 'react'

import { requireAuth } from "../../../server/common/requireAuth";
import Layout from '../../../components/administrator/Layout';
import HeadCustom from '../../../components/HeadCustom';
import SubGenreComponent from '../../../components/administrator/subgenre/SubGenreComponents';

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