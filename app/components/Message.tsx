import React from 'react'
import { DocumentData } from 'firebase/firestore';
import { useContextProvider } from '../context/store';
import { useSession } from 'next-auth/react'


type Props = {
    message:DocumentData,
   
    //sessionparameter:any,
}
export default function  Message({message}:Props,) {
  console.log(message)
const isItAI = message.user.name==="ExperTeamAI";
const {data:session}=useSession();



//const {AIprompt, setAIprompt,doneChunck,setdoneChunck} = useContextProvider();
//console.log('HERE');
//console.log(chatId);

//setAIprompt('');


  return (
    
    <div style={{
      direction: isItAI ? 'ltr' : 'rtl',  
    }}>
    <div className={`flex  p-3 `} >
        <img  className='h-12 w-12 border rounded-3xl' src={message.user.userImg}/>

       {/*(message.text).map((txt:string)=>{<p> {txt}</p>  console.log(txt)})*/}
      {isItAI?
      <p style={{ whiteSpace: "pre-line", borderRadius: "0px 30px 30px 30px", boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.15)", direction:'rtl' }} className="bg-white bg-opacity-70	 p-4 ml-5 mt-0 mb-6"> {message.text.content}</p> :<p style={{ whiteSpace: "pre-line", borderRadius: "30px 0px 30px 30px", boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.15)" }} className="bg-white bg-opacity-70	 p-4 mr-5 mt-0 mb-6"> {message.text.content}</p> 
      }

  </div> 
    </div>
  )
}
