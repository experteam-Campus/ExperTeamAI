
import { getServerSession } from 'next-auth';

import React from 'react'
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import Chats from '../../components/Chats'
import ChatDialog from '../../components/ChatDialog'
import SessionProvider from '../../components/SessionProvider';

type Props = {
    params:{
        chatId:string, 
    }
}


export default async function ChatPage({params:{chatId}}:Props) {
  
    
    const session = await getServerSession(authOptions);
  return (
    <div className='flex h-[94vh]'>
     
        <SessionProvider session={session}>
        
        <Chats></Chats>
        <ChatDialog chatId={chatId}></ChatDialog>

        </SessionProvider>
    </div>
  )
}
