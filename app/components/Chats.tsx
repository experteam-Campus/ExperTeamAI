'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp} from 'firebase/firestore';
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../firebase';
import ChatInfo from './ChatInfo';




export default function Chats() {
  const router = useRouter();
const {data:session} = useSession();





const [chats, loading, error]= useCollection(
session && query(collection(db,'users', session.user?.email!, 'chats'),orderBy('timeStamp', 'desc'))
);




const createNewChat=async () => {
  const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"),{ userId:session?.user?.email!, chatName:`צ'אט חדש`, timeStamp:serverTimestamp()});
  router.push(`/chat/${doc.id}`);
}

  return (
<div className='p-3 w-[300px]  flex flex-col mr-20' >
<h1 className='m-auto mt-1 mb-1 p-3'>עוזר אישי</h1>
<button onClick={createNewChat} className='group newChatBTN flex justify-between items-center bg-[#FFF] p-3 rounded-md text-[#FF3067] hover:bg-[#FF3067] transition-all ease-in mb-2'>
יצירת צ'אט חדש
<span className='hover:text-[#FF3067]  group-hover:text-white '>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
</svg>
</span>
</button>

<div className=' ChatsNavContainer no-scrollbar  overflow-y-auto' >
{/*list of chats */}
{chats?.docs.map(chat => {
   const chatData = chat.data();
   const chatName = chatData.chatName;
   const chatId = chat.id;

   return (
      error 
      ? <strong>Error: {JSON.stringify(error)}</strong> 
      : <ChatInfo key={chatId} id={chatId} name={chatName}/>
   );
})}
</div>
</div>
  )
}
