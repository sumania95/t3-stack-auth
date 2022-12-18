import React from 'react'
import Header from '../Header';
import SidebarComponent from './SidebarComponent';
type AdministratorLayoutProps = {
    children: React.ReactNode,
};

function Layout({children}: AdministratorLayoutProps) {
  return (
    <>
      <Header />
      <main className='flex'>
        <SidebarComponent />
        <div className='flex flex-col items-start justify-start p-5 w-full'>
          {children}
        </div>
      </main>
    </>
    
  )
}

export default Layout