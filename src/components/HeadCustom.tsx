import React from 'react'
import Head from "next/head";

interface HeadTitle {
  title:string
}

const HeadCustom = ({title}:HeadTitle) => {
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