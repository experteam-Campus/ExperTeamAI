'use client'

import { async } from '@firebase/util'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp,doc, getDoc, QuerySnapshot, QueryDocumentSnapshot, getDocs, query, orderBy } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import ClientProvider from './ClientProvider'


type Props={
    chatId:string
}



export default  function ChatInput({chatId}:Props) {
    const [prompt, setPrompt] = useState("");
    const [prePrompt, setprePrompt]=useState<any[]>([]);
    const {data:session}= useSession();

    const sendMsg = async(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      if(!prompt) return;

      let input = prompt.trim();
      setPrompt("");

      let oldinput="";
      if(prePrompt.length!=0){
        for (let index = 0; index < prePrompt.length; index++) {
            const oldPrompt = prePrompt[index]+'.';
            oldinput  = oldPrompt + ' ' +   prompt
        }
         
         console.log('input ' + input)
      }
      setprePrompt([])
      const messagas:Messages={
        text:input,
        timeStemp:serverTimestamp(),
        user:{
            _id:session?.user?.email!,
            name:session?.user?.name!,
            userImg: "/assets/Avatar.png"
        }
      }

    
await addDoc(collection(db,'users',session?.user?.email!, 'chats', chatId, 'messages'),messagas)
{/*get previous MSG */}



//const docRef = doc(db,'users',session?.user?.email!, 'chats', chatId, 'messages');
//const docSnap = await getDoc(docRef);

const querySnapshot = await getDocs(collection(db,'users',session?.user?.email!, 'chats', chatId, 'messages'));
querySnapshot.forEach((doc) => {
 //doc.data() is never undefined for query doc snapshots


 //console.log(doc.id, " => ", doc.data());
  setprePrompt(prePrompt=>[...prePrompt, doc.data().text])






});


console.log(" => prePrompt => ", {prePrompt});

  {<ClientProvider></ClientProvider>}

await fetch('/api/chatGPT',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        prompt:input,chatId,modal:'text-davinci-003',session, oldinput
    })
}).then(()=>{

})

    };

  return (
    <div className=' '>
        <form className='flex p-5 space-x-5   inset-x-0  bottom-0  focus:outline-none ' onSubmit={sendMsg}>
            <input 
            value={prompt}
            onChange={(e)=>setPrompt(e.target.value)}
            className=' flex-1 rounded-md p-3 focus:outline-none text-gray-500' type="text" placeholder='What do you want to chat about?'/>
            <button type='submit' disabled={!prompt} className=" disabled:text-gray-400 disabled:cursor-default transition-all ease-in">
            <PaperAirplaneIcon className='h-5 w-5 -rotate-45 hover:h-6 hover:w-6 hover:-rotate-90 transition-all ease-in'/>
            </button>
        </form>
    </div>
  )
}
