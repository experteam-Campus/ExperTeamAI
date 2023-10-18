import React from 'react'

import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import SessionProvider from '../components/SessionProvider';
import Chats from '../components/Chats';
import BtnNav from '../components/BtnNav';

export default async function chatHomePage() {
    const session = await getServerSession(authOptions);

  return (
    <div className='h-full p-3'>
    <div className='flex h-[100.3%]'>

        <SessionProvider session={session}>
          <div className="rounded-xl  border border-solid border-white backdrop-blur-[28.5px]   w-fit" style={{ 
      background: 'rgba(255, 255, 255, 0.57)'
  }}>
    
    <div className='flex '>
    <BtnNav></BtnNav>
        <Chats></Chats>
        </div>
        </div>
        <div className='flex-1 flex items-center justify-center'><p className=''>Get started and Chat with me</p></div>
        </SessionProvider>
    </div>
    </div>
  )
}
