import React from 'react'
import { isAdmin } from "../../../server/common/requireAuth";
import Layout from '../../../components/administrator/Layout';
import HeadCustom from '../../../components/HeadCustom';
import UsersComponent from '../../../components/administrator/users/UsersComponents';

export const getServerSideProps = isAdmin(async () => {
    return { props: {} };
});

function Users() {
  return (
    <Layout>
       <HeadCustom title="Users"/>
        <UsersComponent/>
    </Layout>
  )
}

export default Users