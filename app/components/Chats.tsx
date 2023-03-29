'use client'

import React from 'react'
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, orderBy, query, serverTimestamp} from 'firebase/firestore';
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
  const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"),{ userId:session?.user?.email!, timeStamp:serverTimestamp()});
  router.push(`/chat/${doc.id}`);
}

  return (
    <div className='p-3 w-[300px] bg-slate-200 flex flex-col h-screen'>
<button onClick={createNewChat} className='flex items-center bg-[#E1539E] p-3 rounded-md text-white hover:bg-[#f25aab] transition-all ease-in'>
  <PlusIcon className='w-7 h-7 mr-2'/>
  New Chat</button>
{/*list of chats */}
{chats?.docs.map(chat=>(
   error ? <strong>Error: {JSON.stringify(error)}</strong> : <ChatInfo key={chat.id} id={chat.id} />
))}

</div>
  )
}
