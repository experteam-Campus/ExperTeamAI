
import React from 'react'

import TtsText from '../components/TtsText';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import SessionProvider from '../components/SessionProvider';
import BtnNav from '../components/BtnNav';

//import { synthesizeText } from '../../pages/api/tTS';
//import { TextToSpeechClient } from '@google-cloud/text-to-speech';



export default async function page() {

  const session = await getServerSession(authOptions);


   console.log(session);


  return (
    <div className='h-full p-3'>
    <div className=' h-[100.3%] flex'>
 <SessionProvider session={session}>

  <BtnNav></BtnNav>
  <TtsText></TtsText>

 
       
</SessionProvider>
  </div>
  </div>
  );
}


{/*  <div className='h-full p-3'>
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
        </div>*/}