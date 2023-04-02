'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DocumentTextIcon, LifebuoyIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

export default function BtnNav() {
const router = useRouter()
  const NavToChat=async () => {
    //   const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"),{ userId:session?.user?.email!, timeStamp:serverTimestamp()});
       router.push(`/chat`);
     }

     const NavToQ=async () => {
      //   const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"),{ userId:session?.user?.email!, timeStamp:serverTimestamp()});
         router.push(`/questions`);
       }


  return (
    <div className='flex justify-evenly flex-wrap '>
      
   <Link href={'/chat'}>
    <button  className=' h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium flex items-center justify-evenly flex-col-reverse' > עוזר אישי<LifebuoyIcon className='h-8'/></button>
   </Link>

   <Link href={'/TTS'}>
    <button  className=' h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium flex items-center justify-evenly flex-col-reverse'>TTS <SpeakerWaveIcon className='h-8'/></button>
   </Link>

   <Link href={'/create'} >
    <button  className=' h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium flex items-center justify-evenly flex-col-reverse'>כתיבה<DocumentTextIcon className='h-8'/></button>
   </Link>
<div>

  <Link href={'https://sonix.ai/'} target={'_blank'}>
    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>עריכת כתוביות</button>
</Link>

<Link href={'https://www.midjourney.com/home/?callbackUrl=%2Fapp%2F'} target={'_blank'}>
    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>מחולל תמונות</button>
    </Link>

<Link href={'https://openai.com/'} target={'_blank'}>
    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>GPT</button>
    </Link>

<Link href={'https://www.videoindexer.ai/media/library'} target={'_blank'}>
    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium' >תמלול תחקור</button>
    </Link>
    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium cursor-not-allowed'>בנק פרומפטים</button>
</div>
    </div>
  )
}
