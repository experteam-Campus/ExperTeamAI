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
    })});







  return (
    <div className='flex flex-col p-3 flex-1 pt-20 ' dir='trl'>

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
        <form className='flex p-5 inset-x-0  bottom-0  focus:outline-none relative pb-0' onSubmit={sendMSG}>
            <textarea 
            value={prompt}
            onChange={(e)=>setPrompt(e.target.value)}
            className='flex-1 rounded-md p-3 focus:outline-none text-gray-500' style={{ whiteSpace: "pre-line", borderRadius: "70px", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.12)", background:"rgba(255, 255, 255, 0.80)", height:"56px" }}  placeholder='מה תרצה לשאול?'/>
           
            <button type='submit' disabled={!prompt} className="group sendBTN  disabled:bg-slate-300 disabled:text-gray-400 disabled:cursor-default transition-all ease-in font-normal text-white flex justify-center items-center hover:text-[#FF3067]  group-hover:text-white">
              <p className='pl-2 m-0'>שלח</p>

              <span className=' '>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none">
<g clip-path="url(#clip0_122_1877)">
<path d="M14.6938 20.8517V25.491C14.6938 25.7731 14.4748 26.0011 14.2038 26.0011C14.0704 26.0011 13.9502 25.9459 13.8615 25.8558L10.6809 22.3798L14.6938 20.8517Z" fill="currentColor"/>
<path d="M18.4092 24.1719L16.9412 22.6439C16.7639 22.4593 16.6539 22.2038 16.6539 21.9217C16.6539 21.3586 17.092 20.9016 17.6339 20.9016C17.9049 20.9016 18.1494 21.0161 18.3267 21.2006L19.7947 22.7287C19.972 22.9132 20.082 23.1688 20.082 23.4508C20.082 24.0139 19.6429 24.4709 19.102 24.4709C18.831 24.4709 18.5855 24.3564 18.4082 24.1719H18.4092Z" fill="currentColor"/>
<path d="M21.3472 21.1126L20.3692 20.0946C20.1919 19.9101 20.0819 19.6545 20.0819 19.3725C20.0819 18.8094 20.52 18.3524 21.062 18.3524C21.3329 18.3524 21.5775 18.4669 21.7547 18.6514L22.7327 19.6694C22.91 19.8539 23.02 20.1094 23.02 20.3915C23.02 20.9546 22.5809 21.4116 22.04 21.4116C21.769 21.4116 21.5235 21.2971 21.3462 21.1126H21.3472Z" fill="currentColor"/>
<path d="M16.9186 18.3471L5.66941 6.34863C5.53595 6.20653 5.34952 6.11746 5.14373 6.11746C4.73826 6.11746 4.4092 6.45997 4.4092 6.88201C4.4092 7.07288 4.47644 7.24679 4.58749 7.3804L14.6956 19.189L3.59317 23.4158C3.54224 23.4349 3.48824 23.4497 3.43017 23.4497C3.18974 23.4497 2.99822 23.2652 2.95747 23.0277L0.0163002 1.17917C0.0081501 1.12721 0.00101852 1.07419 0.00101852 1.02011C0.00101852 0.457033 0.440105 0 0.981068 0C1.17565 0 1.35699 0.0593825 1.50981 0.161181L23.7738 14.8753C23.9073 14.9665 24 15.116 24 15.2942C24 15.5137 23.8655 15.6961 23.6791 15.7682L16.9186 18.3471Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_122_1877">
<rect width="24" height="26" fill="white" transform="matrix(-1 0 0 1 24 0)"/>
</clipPath>
</defs>
</svg>
              </span>
            
            </button>
        </form>
    </div>
    </div>
  )
}
