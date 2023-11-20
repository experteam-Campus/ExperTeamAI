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
    <div className='flex '>
    <SessionProvider session={session}>
     <div >
    
    <div className='flex'>
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
