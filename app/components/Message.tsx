import React from 'react'
import { DocumentData } from 'firebase/firestore';
import { useContextProvider } from '../context/store';
import { useSession } from 'next-auth/react'


type Props = {
    message:DocumentData,
    chatId:any, 
    //sessionparameter:any,
}
export default function  Message({message,chatId}:Props,) {
const isItAI = message.user.name==="ExperTeamAI";
const {data:session}=useSession();

console.log('HERE')
console.log(chatId)
const {AIprompt, setAIprompt} = useContextProvider()
console.log(message)
//let msg=message.text.content.split("\n").join("<br/>")

console.log(AIprompt)

const reciveMsg = async()=>{
if(AIprompt !=''){

  const Airesponse =  await fetch('/api/AiresponseAPI',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      AIprompt, session,chatId
    })
   });
 }

}

reciveMsg();



  return (
    
    <div className={`${isItAI&& "bg-slate-200"}`}>
    <div className='flex space-x-5 p-3'>
        <img  className='h-12 w-12' src={message.user.userImg}/>


       {/*(message.text).map((txt:string)=>{
        <p> {txt}</p> 
 console.log(txt)
})*/}
{{isItAI}?
<p style={{ whiteSpace: "pre-line" }}> {message.text.content}</p> :<p style={{ whiteSpace: "pre-line" }}> {message.text.content}</p> 
}


   
  </div> 
  
    </div>
  )
}
