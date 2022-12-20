import React from 'react'
import Layout from '../../../components/administrator/Layout';
import HeadCustom from '../../../components/HeadCustom';
import GenreComponent from '../../../components/administrator/genre/GenreComponents';
import { isAdmin } from "../../../server/common/requireAuth";

export const getServerSideProps = isAdmin(async (ctx) => {
    return { props: {} };
});
function Genre () {
  return (
    <Layout>
       <HeadCustom title="Genre"/>
        <GenreComponent/>
    </Layout>
  )
}

export default Genre