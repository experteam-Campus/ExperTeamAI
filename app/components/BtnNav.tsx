'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <button  className=' h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>Chat with me</button>
   </Link>

   <Link href={'/TTS'}>
    <button  className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>TTS</button>
   </Link>

   <Link href={'/questions'}>
    <button  className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>Question for Interview stackholder</button>
   </Link>

    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>Question for Learner</button>


    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>Summerize</button>
    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>Extract KeyWords</button>
    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium' >create Analoge</button>
    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>Extract the porpuse of the text</button>
    <button className='h-[200px] w-[200px] m-5 border-2 border-[#70499C] p-3 rounded-md drop-shadow-xl	hover:bg-[#70499C] transition-all ease-in hover:text-white font-medium'>Create Lesson Stracture</button>
    </div>
  )
}
