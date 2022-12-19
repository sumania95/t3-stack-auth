import React from 'react'
import Layout from '../../../components/administrator/Layout';
import HeadCustom from '../../../components/HeadCustom';
import GenreComponent from '../../../components/administrator/genre/GenreComponents';
import { isAdmin } from "../../../server/common/requireAuth";

export const getServerSideProps = isAdmin(async (ctx) => {
    return { props: {} };
});
function Genre () {
  // const router = useRouter()
  // const {data} = trpc.user.me.useQuery();
  // if(!data) return router.push('/error/')
  return (
    <Layout>
       <HeadCustom title="Genre"/>
        <GenreComponent/>
    </Layout>
  )
}

export default Genre