import React from 'react'
import HeadCustom from '../../components/HeadCustom'
import Header from '../../components/Header'
import { isEditor } from "../../server/common/requireAuth";
import { NextPage } from 'next';

export const getServerSideProps = isEditor(async (ctx) => {
    return { props: {} };
});
const Editor:NextPage = () => {
  return (
    <div>
      <HeadCustom title="Remixer Editor"/>
      <Header />
      <main>Editor</main>
    </div>
  )
}

export default Editor