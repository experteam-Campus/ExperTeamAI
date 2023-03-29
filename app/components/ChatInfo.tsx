import { ChatBubbleOvalLeftEllipsisIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, deleteDoc, orderBy, query, doc} from 'firebase/firestore'
import { db } from '../../firebase'
import { useEffect } from 'react'

type Props = {
    id: string
}

export default function ChatInfo({id}:Props) {

const pathName = usePathname();
const router = useRouter();
const {data:session} = useSession();
const [active, setActive] = useState(false);

const [messages] = useCollection(query(

    collection(db, 'users', session?.user?.email!, 'chats',id, 'messages'),orderBy('timeStamp', 'asc')
))

useEffect(() => {
  if (!pathName) return;

setActive(pathName.includes(id))
}, [pathName])


{/*Delete chat */}

const deleteChat =async () => {
    await deleteDoc(doc(db,'users',session?.user?.email!, 'chats',id))
    console.log('delete')
    router.replace('/chat')
}

  return (
    <Link href={`/chat/${id}`} className={`flex p-3   border border-b-neutral-400 hover:bg-slate-300 ${active && `bg-slate-300`}`}>
     <ChatBubbleOvalLeftEllipsisIcon className='w-6 h-6 mr-2'></ChatBubbleOvalLeftEllipsisIcon>
    <p className='flex-1 truncate'>
        {messages?.docs[messages?.docs.length-1]?.data().text || 'New Chat'}
    </p>
    <TrashIcon onClick={deleteChat} className='w-6 h-6 mr-2  hover:text-red-700' ></TrashIcon>
    </Link>
  )
}
