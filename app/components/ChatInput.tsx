'use client'

import { async } from '@firebase/util'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp,doc, getDoc, QuerySnapshot, QueryDocumentSnapshot, getDocs, query, orderBy } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState, useReducer, useContext,useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import ClientProvider from './ClientProvider'
import {useContextProvider} from '../context/store'
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin';
//import { AppContext } from '../context/store'

type Props={
    chatId:string
}



export default  function ChatInput({chatId}:Props) {
 //const [state, dispatch]= useReducer(reducer,{Airesponse:''});
const {AIprompt, setAIprompt} = useContextProvider()

 console.log(AIprompt);

    const [prompt, setPrompt] = useState('');
    const [newprompt, setNewPrompt] = useState<any[]>([]);
    //******const [AIprompt, setAIprompt] =  useState<String>('');
    

    //const [prePrompt, setprePrompt]=useState<any[]>([]);
    const {data:session}= useSession();


     const [chatTyping,setChatTyping] = useState(false)


    const sendMsg = async(e: React.FormEvent<HTMLFormElement>)=>
    {
      e.preventDefault();
      if(!prompt) return;

      const newMsg = {role:'user',content:prompt}
      newprompt.push(newMsg);

      //console.log('newprompt');
     // console.log(newprompt);
      //setNewPrompt(...newMsg);

      let input = prompt.trim();
      setPrompt("");

      let oldinput="";

      //setprePrompt([]);
      const messagas:Messages={
        text:newMsg,
        prePrompts:newprompt,
        timeStemp:serverTimestamp(),
        user:{
            _id:session?.user?.email!,
            name:session?.user?.name!,
            userImg: "/assets/Avatar.png"
        }
      }

    
await addDoc(collection(db,'users',session?.user?.email!, 'chats', chatId, 'messages'),messagas)


  {<ClientProvider></ClientProvider>}
  setChatTyping(true)

const response = await fetch('/api/chatGPT',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        prompt:newprompt,chatId,model:'gpt-3.5-turbo',session, oldinput
    })
});


  console.log("response____");
  console.log(response);


  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // This data is a ReadableStream
  const data = response.body;
  
  console.log(data);
  if (!data) {
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {

    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    const chunkValue = decoder.decode(value);
    console.log("chunkValue");
    console.log(chunkValue);
   
    setAIprompt((prev) => prev + chunkValue);
    console.log('AIprompt');
    console.log(AIprompt);

    


  
     // await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(messagas);
     
  }
  const Airesponse = await fetch('/api/AiresponseAPI',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      AIprompt,session,chatId
    })
});
  //await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(messagas);
  setChatTyping(false);

  }


  return (
    <div className=' '>
      <div className={`${!chatTyping && "hidden"} col-3`}  >
        <div className="snippet flex  pl-5 space-x-5 justify-items-center" data-title="dot-flashing">
          <div>GPT is Thinking</div>
          <div className="stage mt-2">
            <div className="dot-flashing"></div>
          </div>
        </div>
      </div>
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
