'use client'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {  useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { db } from '../../firebase';

type Props={
  fileID:string
}

export default function Docfile({fileID}:Props) {
  const router = useRouter();
  const {data:session} = useSession();
  const [chatTyping,setChatTyping] = useState(false)
  const [prompt, setPrompt] = useState("");
  const [newprompt, setNewPrompt] = useState<any[]>([]);
    const [promptSubject, setPromptSubject] = useState("");
    const [promptTarget, setPromptTarget] = useState("");
    const [promptAudience, setAudience] = useState("");
    const [promptFoucs, setFoucs] = useState("");
    const [selectedItem, setSelectedItem] = useState("option");
    const [promptSummarize, setPromptSummarize] = useState("");
    const [promptKeywords, setPromptKeywords] = useState("");
    const [promptOutline, setPromptOutline] = useState("");
    let optionalParameter = `focus questions on ${promptFoucs}`;


    
    /* questions for a stackholder*/

  const sendPrompt = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

 if(selectedItem=='QuestionForStackHolder'){

  if(promptFoucs!=''){
    setPrompt(`[Act as Instarctional Designer] Define stakeholder interview questions based on the parameters: Course Topic: [${promptSubject}], Purpose of the Lessons: [${promptTarget}],Target Audience:[${promptAudience}],${optionalParameter}`)
  }else{
    setPrompt(`[Act as Instarctional Designer] Define stakeholder interview questions based on the parameters: Course Topic: [${promptSubject}], Purpose of the Lessons: [${promptTarget}],Target Audience:[${promptAudience}]`)
  }
   

  console.log(promptSubject);
  console.log(promptTarget);
  console.log(promptAudience);
  console.log(promptFoucs);
}else if(selectedItem=='QuestionForLLearner'){
  if(promptFoucs!=''){
    setPrompt(`[Act as Instarctional Designer] Define questions for training product based on the parameters: Course Topic: [${promptSubject}], Purpose of the Lessons: [${promptTarget}],Target Audience:[${promptAudience}],${optionalParameter}`)
  }else{
    setPrompt(`[Act as Instarctional Designer] Define questions for training product based on the parameters: Course Topic: [${promptSubject}], Purpose of the Lessons: [${promptTarget}],Target Audience:[${promptAudience}]`)
  }

}else if(selectedItem=='SummarizeText'){
  setPrompt(`Summeraize the following text: [${promptSummarize}]`)


}else if(selectedItem=='Keywords'){
  setPrompt(`Exctract keywords from the following text: [${promptKeywords}]`)
}
else if(selectedItem=='outline'){
  setPrompt(`Define outline from the following text: [${promptOutline}]`)
}
  


if(prompt !=''){
  sendtoGPT();
}


  }



  const  sendtoGPT= async () => {
    const newMsg = {role:'user',content:prompt}
newprompt.push(newMsg)

  const writePrompt:WritePrompt={
    prompt:newMsg,
    timeStemp:serverTimestamp(),
  }


  await addDoc(collection(db,'users',session?.user?.email!, 'WriteFile', fileID, 'promptRes'),writePrompt)


  //console.log(prompt);
  setChatTyping(true)
await fetch('/api/promptGPT',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        prompt:newprompt,modal:'gpt-3.5-turbo',session,fileID
    })
}).then(()=>{
  setChatTyping(false)
 setNewPrompt([])
})
  }
  return (

   <div>
    <select name="ChoosenPrompt" id="ChoosenPrompt" onChange={(e)=>{setSelectedItem(e.target.value)}} defaultValue={selectedItem}>
    <option value="option">במה אפשר לעזור?</option>
    <option value="QuestionForStackHolder">שאלות לתחקור ראשוני</option>
    <option value="QuestionForLLearner">שאלות ללומד</option>
    <option value="SummarizeText">סיכום טקסט</option>
    <option value="Keywords">הוצאת מילות מפתח מקסט</option>
    <option value="VyondScript">יצירת תסריט לויאונד</option>
    <option value="outline">יצירת מתווה </option>
    </select>

{selectedItem == "QuestionForStackHolder" ? 
   <form className='flex flex-col m-4 w-1/4' onSubmit={sendPrompt}> 
    <label htmlFor='subject'>נושא הקורס
    <input value={promptSubject} onChange={(e)=>setPromptSubject(e.target.value)} type="text" id='subject' placeholder='Please type the subject of the lesson' name='subject' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>מטרת השיעור
    <input value={promptTarget} onChange={(e)=>setPromptTarget(e.target.value)} type="text" id='target' placeholder='Please type the target of the lesson' name='target' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>קהל היעד
    <input value={promptAudience} onChange={(e)=>setAudience(e.target.value)} type="text" id='audience' placeholder='Please type the target audience of the lesson' name='audience' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='focus'>במה תרצו שהשאלות יתמקדו? (Optional)
    <input value={promptFoucs} onChange={(e)=>setFoucs(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <button disabled={!promptSubject || !promptTarget || !promptAudience} className='flex items-center bg-[#E1539E] p-3 rounded-md text-white hover:bg-[#f25aab] transition-all ease-in'>הצג שאלות לראיון</button>
   </form>
:
selectedItem == "QuestionForLLearner"? 
<form className='flex flex-col m-4 w-1/4' onSubmit={sendPrompt}> 
    <label htmlFor='subject'>נושא הקורס
    <input value={promptSubject} onChange={(e)=>setPromptSubject(e.target.value)} type="text" id='subject' placeholder='Please type the subject of the lesson' name='subject' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>מטרת השיעור
    <input value={promptTarget} onChange={(e)=>setPromptTarget(e.target.value)} type="text" id='target' placeholder='Please type the target of the lesson' name='target' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>קהל היעד
    <input value={promptAudience} onChange={(e)=>setAudience(e.target.value)} type="text" id='audience' placeholder='Please type the target audience of the lesson' name='audience' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='focus'>במה תרצו שהשאלות יתמקדו? (Optional)
    <input value={promptFoucs} onChange={(e)=>setFoucs(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <button disabled={!promptSubject || !promptTarget || !promptAudience} className='flex items-center bg-[#E1539E] p-3 rounded-md text-white hover:bg-[#f25aab] transition-all ease-in'>הצג שאלות ללומד</button>
   </form>:
selectedItem == "option"? 
null:
selectedItem == "SummarizeText"? 
<form onSubmit={sendPrompt}> 
  <label htmlFor='focus'>איזה טקסט לסכם?
    <input value={promptSummarize} onChange={(e)=>setPromptSummarize(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <button disabled={!promptSummarize } className='flex items-center bg-[#E1539E] p-3 rounded-md text-white hover:bg-[#f25aab] transition-all ease-in'>סכם את הטקסט</button>
    <Link href={'https://www.humata.ai/'} target={'_blank'} className="underline mt-2 text-blue-600">
    רוצה לסכם PDF?
    </Link>
   </form>:
selectedItem == "Keywords"? 
<form onSubmit={sendPrompt}> 
  <label htmlFor='focus'>הכנס טקסט להוצאת מילות מפתח
    <input value={promptKeywords} onChange={(e)=>setPromptKeywords(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <button disabled={!promptKeywords } className='flex items-center bg-[#E1539E] p-3 rounded-md text-white hover:bg-[#f25aab] transition-all ease-in'> הוצא מילות מפתח </button>
   </form>:
selectedItem == "VyondScript"? 
<div>VyondScript</div>:
selectedItem == "outline"? 
<form onSubmit={sendPrompt}> 
  <label htmlFor='focus'>הכנס טקסט:
    <input value={promptOutline} onChange={(e)=>setPromptOutline(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <button disabled={!promptOutline } className='flex items-center bg-[#E1539E] p-3 rounded-md text-white hover:bg-[#f25aab] transition-all ease-in'> יצירת מתווה</button>
   </form>:
null
}
<div className={`${!chatTyping && "hidden"} col-3`}  >
        <div className="snippet flex  pl-5 space-x-5 justify-items-center" data-title="dot-flashing">
          <div>GPT is Thinking</div>
          <div className="stage mt-2">
            <div className="dot-flashing"></div>
          </div>
        </div>
      </div>
</div>

  )
  
}
