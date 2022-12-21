import React from 'react'
import { isAdmin } from "../../../server/common/requireAuth";
import Layout from '../../../components/administrator/Layout';
import HeadCustom from '../../../components/HeadCustom';
import SubscriptionComponent from '../../../components/administrator/subscription/SubscriptionComponents';

export const getServerSideProps = isAdmin(async () => {
    return { props: {} };
});

function Subscription() {
  return (
    <Layout>
       <HeadCustom title="Subscription"/>
        <SubscriptionComponent/>
    </Layout>
  )
}

export default Subscription