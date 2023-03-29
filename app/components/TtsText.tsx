'use client'
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { addDoc, collection, orderBy, query, serverTimestamp, getDocs} from 'firebase/firestore';
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../firebase';

export default function TtsText() {
   // let audio = new Audio('output.mp3');

    const [speech, setSpeech] = useState('output.mp3');
    const [text, setText] = useState('');
  
     const {data:session}= useSession();
    /* const [tts_files, loading, error]= useCollection(
        session && query(collection(db,'users', session.user?.email!, 'tts_files'),orderBy('timeStamp', 'desc'))
        );
        const [chats, loading, error]= useCollection(
            session && query(collection(db,'users', session.user?.email!, 'chats'),orderBy('timeStamp', 'desc'))
            );*/




     const sendText = async(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
 
  await fetch('/api/tTS',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        text,
      session,
  
    })

  }).then(()=>{
    setSpeech('output.mp3')
  })





  }


  return (
    <div>
    <form onSubmit={sendText}>
      
    <input
    value={text}
    onChange={(e)=>setText(e.target.value)}
    className=' flex-1 rounded-md p-3 focus:outline-none text-gray-500' type="text" placeholder='Write the sentences'/>
    <button>SPEECH</button>
   </form>

  {/*list of chats */}



{speech && (
    <audio controls>
    <source src={speech} type="audio/mp3" />
    </audio>
)}

</div>
  )
}


/**<audio controls><source src={tts_file.voice} type="audio/mp3" /></audio> */