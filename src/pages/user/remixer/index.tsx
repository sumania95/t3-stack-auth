import React from 'react'
import HeadCustom from '../../../components/HeadCustom'
import Header from '../../../components/Header'
import { requireAuth } from "../../../server/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
    return { props: {} };
});
function Editor() {
  return (
    <div>
      <HeadCustom title="Remixer Editor"/>
      <Header />
      <main>Editor</main>
    </div>
  )
}

export default Editor