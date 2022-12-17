import React from 'react'
import Head from "next/head";

function HeadCustom({title}) {
  return (
    <div>
        <Head>
            <title>{title} | COMPANY</title>
            <meta name="description" content="Record Pool" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    </div>
  )
}

export default HeadCustom