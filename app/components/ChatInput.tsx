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
    const [prompt, setPrompt] = useState('');
    const [newprompt, setNewPrompt] = useState<any[]>([]);
  //  const [prePrompt, setprePrompt]=useState<any[]>([]);
    const {data:session}= useSession();


     const [chatTyping,setChatTyping] = useState(false)


    const sendMsg = async(e: React.FormEvent<HTMLFormElement>)=>{
      
      e.preventDefault();

      if(!prompt) return;

  //    const querySnapshot = await getDocs(collection(db,'users',session?.user?.email!, 'chats', chatId, 'messages'));

/*querySnapshot?.forEach((doc) => {
 //doc.data() is never undefined for query doc snapshots
 //console.log('MSG-----------------')
 //console.log(doc.id, " => ", doc.data().prePrompts);
 setNewPrompt([]);
 if(doc.data().prePrompts){

  if(doc.data().prePrompts.length>15){
   let newarray = doc.data().prePrompts.slice(-10)

   console.log('-----------------------prePromptArray-----------------------')
   console.log(newarray)
    if(newprompt.length>15){

  newarray.map((prePromptArray:any)=>{
   
    newprompt.slice(-10).push(prePromptArray)
    
  })
}
   
  }else{
  doc.data().prePrompts.map((prePromptArray:any)=>{
   // console.log('prePromptArray')
    newprompt.push(prePromptArray)
  })
  }
 
//  setprePrompt(prePrompt=>[...prePrompt, doc.data().text])
});}*/


      //setNewPrompt({role:'user',content:prompt})
      const newMsg = {role:'user',content:prompt}
      newprompt.push(newMsg)
      //console.log('newprompt')
     // console.log(newprompt)
      //setNewPrompt(...newMsg)
      let input = prompt.trim();
      setPrompt("");

      let oldinput="";

      //setprePrompt([])
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
{/*get previous MSG */}



//const docRef = doc(db,'users',session?.user?.email!, 'chats', chatId, 'messages');
//const docSnap = await getDoc(docRef);




//console.log(" => prePrompt => ", {prePrompt});

  {<ClientProvider></ClientProvider>}
setChatTyping(true)
await fetch('/api/chatGPT',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        prompt:newprompt,chatId,modal:'gpt-3.5-turbo',session, oldinput
    })
}).then(()=>{
  setChatTyping(false)

})};

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
