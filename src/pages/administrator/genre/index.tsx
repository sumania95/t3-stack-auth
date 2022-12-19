import React from 'react'
import Layout from '../../../components/administrator/Layout';
import HeadCustom from '../../../components/HeadCustom';
import GenreComponent from '../../../components/administrator/genre/GenreComponents';
import { requireAuth } from "../../../server/common/requireAuth";
import { unstable_getServerSession } from 'next-auth';
import Nextauth from '../../api/auth/[...nextauth]';

export const getServerSideProps = requireAuth(async (ctx) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      Nextauth
    );
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