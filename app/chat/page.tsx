import React from 'react'

import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import SessionProvider from '../components/SessionProvider';
import Chats from '../components/Chats';

export default async function chatHomePage() {
    const session = await getServerSession(authOptions);

  return (
    <div className='  flex flex-row  '>

        <SessionProvider session={session}>
        <Chats></Chats>
        <div className='flex-1 flex items-center justify-center'><p className=''>Get started and Chat with me</p></div>
        </SessionProvider>
    </div>
  )
}
