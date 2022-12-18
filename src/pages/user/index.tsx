import React from 'react'
import { requireAuth } from "../../server/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});
function User() {
  return (
    <div>User</div>
  )
}

export default User