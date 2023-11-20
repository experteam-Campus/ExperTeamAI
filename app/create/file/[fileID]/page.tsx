

import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import BtnNav from '../../../components/BtnNav';
import Docfile from '../../../components/Docfile'

import Editor from '../../../components/Editor';
import SessionProvider from '../../../components/SessionProvider'


type Props = {
    params:{
        fileID:string, 
    }
}

export default async function page({params:{fileID}}:Props) {
    const session = await getServerSession(authOptions);


  return (
    <div className='h-full p-3'>
    <div className='h-[100.3%] flex'>
<SessionProvider session={session}>


<BtnNav></BtnNav>
<div className='w-full'>
<Docfile fileID={fileID}></Docfile>

</div>

 {/*<Editor fileID={fileID}></Editor>*/}
 </SessionProvider>
</div>
</div>
  )
  
}


{/**
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
*/}