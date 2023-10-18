
import { getServerSession } from 'next-auth';

import React from 'react'
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import Chats from '../../components/Chats'
import ChatDialog from '../../components/ChatDialog'
import SessionProvider from '../../components/SessionProvider';
import BtnNav from '../../components/BtnNav';

type Props = {
    params:{
        chatId:string, 
    }
}


export default async function ChatPage({params:{chatId}}:Props) {
  
    
    const session = await getServerSession(authOptions);
  return (
    <div className='h-full p-3'>
     <div className='flex h-[100.3%]'>
        <SessionProvider session={session}>
        <div className="rounded-xl border border-solid border-white backdrop-blur-[28.5px] w-fit" style={{ background: 'rgba(255, 255, 255, 0.57)'}}>
        <div className=' no-scrollbar flex overflow-y-auto' style={{
    height:" -webkit-fill-available;"}}>

        <BtnNav></BtnNav>
        <Chats></Chats>

        </div>
        </div>

        <ChatDialog chatId={chatId}></ChatDialog>

        </SessionProvider>
    </div>
    </div>
  )
}
