import React from 'react'
import Layout from '../../../../components/administrator/Layout'
import HeadCustom from '../../../../components/HeadCustom'
import GenreComponent from '../../../../components/administrator/GenreComponent'
function Genre() {
  return (
    <Layout>
       <HeadCustom title="Genre"/>
        <GenreComponent/>
    </Layout>
  )
}

export default Genre