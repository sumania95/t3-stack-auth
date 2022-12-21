import React from 'react'
import { isAdmin } from "../../../server/common/requireAuth";
import Layout from '../../../components/administrator/Layout';
import HeadCustom from '../../../components/HeadCustom';
import ApproveComponent from '../../../components/administrator/approve/ApproveComponents';

export const getServerSideProps = isAdmin(async () => {
    return { props: {} };
});

function Approve() {
  return (
    <Layout>
       <HeadCustom title="Approve"/>
        <ApproveComponent/>
    </Layout>
  )
}

export default Approve