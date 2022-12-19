import React from 'react'
import Head from "next/head";

const HeadCustom = ({title}) => {
  const headtitle = `${title} | AV Remix Stash` 
  return (
    <div>
        <Head>
            <title>{headtitle}</title>
            <meta name="description" content="Record Pool" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    </div>
  )
}

export default HeadCustom