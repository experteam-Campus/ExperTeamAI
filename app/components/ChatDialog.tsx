'use client'

import React, { useState } from 'react'

//import ChatInput from './ChatInput'
import CurrentChat from './CurrentChat'
import { useChatResponse } from '../../util/useChatResponse'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useContextProvider } from '../context/store';
import { collection, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import { adminDb } from '../../firebaseAdmin'
import admin from 'firebase-admin'


type Props={
    chatId:string
}


export default function ChatDialog({chatId}:Props) {
  const {data:session}= useSession();
  const {AImsg, setAIprompt} = useContextProvider();
  const { handleMessageSubmit,saveResToDB,saveTEMP,getAiRes } = useChatResponse();


//console.log(session)
  const [chatTyping,setChatTyping] = useState(false);


  const [prompt, setPrompt] = useState('');
  const [newprompt, setNewPrompt] = useState<any[]>([]);


const sendMSG=(async(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  console.log(session);
  setChatTyping(true);

  handleMessageSubmit({prompt,setPrompt,newprompt,session,chatId,AIprompt:AImsg,setAIprompt,listOfPrompts:''}).then((listOfPrompts)=>{
    console.log('list of prompts');
    saveTEMP({res:'', session, chatId}).then(()=>{
      getAiRes({prompt,setPrompt,newprompt,session,chatId,AIprompt:AImsg,setAIprompt,listOfPrompts}).then((res)=>{
    
        console.log(res);
        setChatTyping(false);
      
      })
    }).then(()=>{
  
    });
    })
  


 
});







  return (
    <div className='flex flex-col p-3 flex-1 bg-slate-100'>

    <CurrentChat chatId={chatId}></CurrentChat>

   { /*<ChatInput chatId={chatId} onSubmit={handleMessageSubmit}></ChatInput>*/}



    <div className=' '>
      <div className={`${!chatTyping && "hidden"} col-3`}  >
        <div className="snippet flex  pl-5 space-x-5 justify-items-center" data-title="dot-flashing">
          <div>GPT is Thinking</div>
          <div className="stage mt-2">
            <div className="dot-flashing"></div>
          </div>
        </div>
      </div>
        <form className='flex p-5 space-x-5   inset-x-0  bottom-0  focus:outline-none relative' onSubmit={sendMSG}>
            <input 
            value={prompt}
            onChange={(e)=>setPrompt(e.target.value)}
            className=' flex-1 rounded-md p-3 focus:outline-none text-gray-500' type="text" placeholder='What do you want to chat about?'/>
            <button type='submit' disabled={!prompt} className=" disabled:text-gray-400 disabled:cursor-default transition-all ease-in">
            <PaperAirplaneIcon className='h-5 w-5 -rotate-45 hover:h-6 hover:w-6 hover:-rotate-90 transition-all ease-in'/>
            </button>
        </form>
    </div>
    </div>
  )
}
