import React from 'react'
import Head from "next/head";

interface HeadTitle {
  src:string
}

const HeadCustom = ({src}:HeadTitle) => {
  const headtitle = `${src} | AV Remix Stash` 
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