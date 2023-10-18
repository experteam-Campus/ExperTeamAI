'use client'
import { timeStamp } from 'console'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'

import ClientProvider from './ClientProvider'
import Message from './Message'
import Spinner from './Spinner'
import { useContextProvider } from '../context/store';

type Props={
    chatId:string, 

}



export default function CurrentChat({chatId}:Props) {
const {data:session}=useSession();
/*const {AIprompt, setAIprompt} = useContextProvider()

console.log('AIprompt- Current chat')
console.log(AIprompt)*/



const [messagas] = useCollection(session&&query(collection(db,"users",session?.user?.email!,"chats",chatId,"messages"),orderBy("timeStemp","asc")))


  return (
<div className='flex flex-col p-3  h-screen   overflow-y-auto ' dir='ltr'>
{messagas?.docs.map((massege)=>
<Message key={massege.id} message={massege.data()}></Message>
)}
  </div>
  )
}
