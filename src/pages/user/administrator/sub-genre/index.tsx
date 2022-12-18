import React from 'react'
import Layout from '../../../../components/administrator/Layout'
import HeadCustom from '../../../../components/HeadCustom'
import SubGenreComponent from '../../../../components/administrator/SubGenreComponent'
function SubGenre() {
  return (
    <Layout>
       <HeadCustom title="Sub Genre"/>
        <SubGenreComponent/>
    </Layout>
  )
}

export default SubGenre