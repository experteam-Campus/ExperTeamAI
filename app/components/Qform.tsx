'use client'

import React, { useState } from 'react'


export default function Qform() {
    const [promptSubject, setPromptSubject] = useState("");
    const [promptTarget, setPromptTarget] = useState("");
    const [promptAudience, setAudience] = useState("");
    const [promptFoucs, setFoucs] = useState("");

const sendPrompt = (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  console.log("hello")
}

  

  return (
    <div>
    <form className='flex flex-col m-4 w-1/4' onSubmit={sendPrompt}> 
    <label htmlFor='subject'>נושא הקורס
    <input value={promptSubject} onChange={(e)=>setPromptSubject(e.target.value)} type="text" id='subject' placeholder='Please type the subject of the lesson' name='subject' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>מטרת השיעור
    <input value={promptTarget} onChange={(e)=>setPromptTarget(e.target.value)} type="text" id='target' placeholder='Please type the target of the lesson' name='target' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>קהל היעד
    <input value={promptAudience} onChange={(e)=>setAudience(e.target.value)} type="text" id='audience' placeholder='Please type the target audience of the lesson' name='audience' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='focus'>במה תרצו שהשאלות יתמקדו? (Optional)
    <input value={promptFoucs} onChange={(e)=>setFoucs(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <button  className='flex items-center bg-[#E1539E] p-3 rounded-md text-white hover:bg-[#f25aab] transition-all ease-in'>הצג שאלות ללומד</button>

</form>
</div>
  )
}
