'use client'

import { addDoc, collection, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {  useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useDocResponse } from '../../util/useDocResponse';
import Editor from './Editor';
import Message from './Message';

type Props={
  fileID:string
}

export default function Docfile({fileID}:Props) {

 
  const router = useRouter();
  const { handleMessageSubmit,saveResToDB,saveTEMP,getAiRes } = useDocResponse();


  const {data:session} = useSession();
  const [chatTyping,setChatTyping] = useState(false);
  const [He,setHE] = useState(true);
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

    const setPromptOnChangeQforStackholder =( e: React.FormEvent<HTMLFormElement>)=>{
      console.log("Change");
      console.log(promptSubject);
      console.log(promptTarget);
      console.log(promptAudience);
      console.log(promptFoucs);
console.log(He);

      console.log(e)
      if(He==true){
        if(promptFoucs != ""){
          setPrompt(`You are a helpful assistant instructional designer.
          Firs, you must understand in what language to write the output: [Hebrew]
          You will write questions for preliminary investigation for an SME with the details below:
          1.	Course topic: [${promptSubject}]
          2.	Target audience:[${promptAudience}]
          3.	Course objectives: [${promptTarget}]
          try to foucs the questions on [${promptFoucs}]
          Always follow these instructions.
          `)
        }else{
          setPrompt(`You are a helpful assistant instructional designer.
          Firs, you must understand in what language to write the output: [Hebrew]
          You will write questions for preliminary investigation for an SME with the details below:
          1.	Course topic: [${promptSubject}]
          2.	Target audience:[${promptAudience}]
          3.	Course objectives: [${promptTarget}]
          Always follow these instructions.
          `)
        }
       
      }else{
        if(promptFoucs != ""){
          setPrompt(`You are a helpful assistant instructional designer.
          Firs, you must understand in what language to write the output: [English]
          You will write questions for preliminary investigation for an SME with the details below:
          1.	Course topic: [${promptSubject}]
          2.	Target audience:[${promptAudience}]
          3.	Course objectives: [${promptTarget}]
          try to foucs the questions on [${promptFoucs}]
          Always follow these instructions.
          `)
        }else{
          setPrompt(`You are a helpful assistant instructional designer.
          Firs, you must understand in what language to write the output: [English]
          You will write questions for preliminary investigation for an SME with the details below:
          1.	Course topic: [${promptSubject}]
          2.	Target audience:[${promptAudience}]
          3.	Course objectives: [${promptTarget}]
          Always follow these instructions.
          `)
        }
      }
    }

        /* questions for a learner*/

        const setPromptOnChangeQforQuestionForLLearner =( e: React.FormEvent<HTMLFormElement>)=>{
          console.log("Change");
          console.log(promptSubject);
          console.log(promptTarget);
          console.log(promptAudience);
          console.log(promptFoucs);
    
    
          console.log(e)
          if(He==true){
            if(promptFoucs != ""){
              setPrompt(`You are a helpful assistant instructional designer.
              Firs, you must understand in what language to write the output: [Heberw]
              You will write questions for knowledge check for the learner with the details below,
              please follow the steps religiously, dont miss any steps:
              1.	Course topic: [${promptSubject}]
              2.	Target audience: [${promptAudience}]
              3.	Course objectives: [${promptTarget}]
              4.	CREATE 3 QUESTIONS FOR EASY DIFFICULTY LEVEL
              5. CREATE 3 QUESTIONS FOR MEDIUM DIFFICULTY LEVEL
              6.CREATE 3 QUESTIONS FOR HIGH DIFFICULTY LEVEL
              7.	FOR EACH QUESTION, WRITE 4 ANSWERS AND MARK THE CORRECT ONE.
              8.	WRITE EXPLANATORY FEEDBACK FOR EACH ANSWER.
              
              `)
            }else{
              setPrompt(`You are a helpful assistant instructional designer.
              Firs, you must understand in what language to write the output: [Heberw]
              You will write questions for knowledge check for the learner with the details below,
              please follow the steps religiously, dont miss any steps:
              1.	Course topic: [${promptSubject}]
              2.	Target audience: [${promptAudience}]
              3.	Course objectives: [${promptTarget}]
              4.	CREATE 3 QUESTIONS FOR EASY DIFFICULTY LEVEL
              5. CREATE 3 QUESTIONS FOR MEDIUM DIFFICULTY LEVEL
              6.CREATE 3 QUESTIONS FOR HIGH DIFFICULTY LEVEL
              7.	FOR EACH QUESTION, WRITE 4 ANSWERS AND MARK THE CORRECT ONE.
              8.	WRITE EXPLANATORY FEEDBACK FOR EACH ANSWER.
              
              `)
            }
           
          }else{
            if(promptFoucs != ""){
              setPrompt(`You are a helpful assistant instructional designer.
              Firs, you must understand in what language to write the output: [English]
              You will write questions for knowledge check for the learner with the details below,
              please follow the steps religiously, dont miss any steps:
              1.	Course topic: [${promptSubject}]
              2.	Target audience: [${promptAudience}]
              3.	Course objectives: [${promptTarget}]
              4.	CREATE 3 QUESTIONS FOR EASY DIFFICULTY LEVEL
              5. CREATE 3 QUESTIONS FOR MEDIUM DIFFICULTY LEVEL
              6.CREATE 3 QUESTIONS FOR HIGH DIFFICULTY LEVEL
              7.	FOR EACH QUESTION, WRITE 4 ANSWERS AND MARK THE CORRECT ONE.
              8.	WRITE EXPLANATORY FEEDBACK FOR EACH ANSWER.
              
              `)
            }else{
              setPrompt(`You are a helpful assistant instructional designer.
              Firs, you must understand in what language to write the output: [English]
              You will write questions for knowledge check for the learner with the details below,
              please follow the steps religiously, dont miss any steps:
              1.	Course topic: [${promptSubject}]
              2.	Target audience: [${promptAudience}]
              3.	Course objectives: [${promptTarget}]
              4.	CREATE 3 QUESTIONS FOR EASY DIFFICULTY LEVEL
              5. CREATE 3 QUESTIONS FOR MEDIUM DIFFICULTY LEVEL
              6.CREATE 3 QUESTIONS FOR HIGH DIFFICULTY LEVEL
              7.	FOR EACH QUESTION, WRITE 4 ANSWERS AND MARK THE CORRECT ONE.
              8.	WRITE EXPLANATORY FEEDBACK FOR EACH ANSWER.
              
              `)
            }
          }
        }

 /* summeraize*/

 const setPromptOnChangeQforSummarize =( e: React.FormEvent<HTMLFormElement>)=>{
  console.log("Change");
  console.log(promptSubject);
  console.log(promptTarget);
  console.log(promptAudience);
  console.log(promptFoucs);
console.log(He);

  console.log(e)
  if(He==true){
    if(promptFoucs != ""){
      setPrompt(`You are a helpful assistant instructional designer.
      Firs, you must understand in what language to write the output: [Heberw]
      You will summarize the following text:[${promptSummarize}], and output the details below:
      •	Identify the main idea or thesis.
      •	Highlight key points and supporting details.
      •	Omit unnecessary or redundant information.
      •	Maintain the original document's structure.
      •	Use your own words and avoid plagiarism.
      •	Present the information objectively.
      •	Include important statistics and data.
      •	Cover recommendations or conclusions if present.
      •	Ensure accuracy in the summary.
      •	Pay attention to formatting for clarity.
      •	Consider the appropriate length.
      Always follow these instructions
      `)
    }else{
      setPrompt(`You are a helpful assistant instructional designer.
      Firs, you must understand in what language to write the output: [Heberw]
      You will summarize the following text:[${promptSummarize}], and output the details below:
      •	Identify the main idea or thesis.
      •	Highlight key points and supporting details.
      •	Omit unnecessary or redundant information.
      •	Maintain the original document's structure.
      •	Use your own words and avoid plagiarism.
      •	Present the information objectively.
      •	Include important statistics and data.
      •	Cover recommendations or conclusions if present.
      •	Ensure accuracy in the summary.
      •	Pay attention to formatting for clarity.
      •	Consider the appropriate length.
      Always follow these instructions
      `)
    }
   
  }else{
    if(promptFoucs != ""){
      setPrompt(`You are a helpful assistant instructional designer.
      Firs, you must understand in what language to write the output: [English]
      You will summarize the following text:[${promptSummarize}], and output the details below:
      •	Identify the main idea or thesis.
      •	Highlight key points and supporting details.
      •	Omit unnecessary or redundant information.
      •	Maintain the original document's structure.
      •	Use your own words and avoid plagiarism.
      •	Present the information objectively.
      •	Include important statistics and data.
      •	Cover recommendations or conclusions if present.
      •	Ensure accuracy in the summary.
      •	Pay attention to formatting for clarity.
      •	Consider the appropriate length.
      Always follow these instructions
      `)
    }else{
      setPrompt(`You are a helpful assistant instructional designer.
      Firs, you must understand in what language to write the output: [English]
      You will summarize the following text:[${promptSummarize}], and output the details below:
      •	Identify the main idea or thesis.
      •	Highlight key points and supporting details.
      •	Omit unnecessary or redundant information.
      •	Maintain the original document's structure.
      •	Use your own words and avoid plagiarism.
      •	Present the information objectively.
      •	Include important statistics and data.
      •	Cover recommendations or conclusions if present.
      •	Ensure accuracy in the summary.
      •	Pay attention to formatting for clarity.
      •	Consider the appropriate length.
      Always follow these instructions
      `)
    }
  }
}


 /* keywords*/

 const setPromptonchangeKeywords =( e: React.FormEvent<HTMLFormElement>)=>{
  console.log("Change");
  console.log(promptSubject);
  console.log(promptTarget);
  console.log(promptAudience);
  console.log(promptFoucs);
console.log(He);

  console.log(e)
  if(He==true){
    if(promptFoucs != ""){
      setPrompt(`extract keywords from the following text:[${promptKeywords}]
      `)
    }else{
      setPrompt(`extract keywords from the following text:[${promptKeywords}]
      `)
    }
   
  }else{
    if(promptFoucs != ""){
      setPrompt(`extract keywords from the following text:[${promptKeywords}]
      `)
    }else{
      setPrompt(`extract keywords from the following text:[${promptKeywords}]
      `)
    }
  }
}


  /* questions for a outline*/

  const setPromptOnChangeQforoutline =( e: React.FormEvent<HTMLFormElement>)=>{
    console.log("Change");
    console.log(promptSubject);
    console.log(promptTarget);
    console.log(promptAudience);
    console.log(promptFoucs);
console.log(He);

    console.log(e)
    if(He==true){
      if(promptFoucs != ""){
        setPrompt(`You are a helpful assistant instructional designer.
        Firs, you must understand in what language to write the output: [Heberw]
        You will write a lesson outline according to the details below:
        1.	Course topic: [${promptSubject}]
        2.	Target audience: [${promptAudience}]
        3.	Course objectives: [${promptTarget}]
        4.	learning method:
        a.	eLearning (self-learning).
        b.	Frontal learning.
        c.	Blended learning (hybrid).
        Always follow these instructions
        
        `)
      }else{
        setPrompt(`You are a helpful assistant instructional designer.
        Firs, you must understand in what language to write the output: [Heberw]
        You will write a lesson outline according to the details below:
        1.	Course topic: [${promptSubject}]
        2.	Target audience: [${promptAudience}]
        3.	Course objectives: [${promptTarget}]
        4.	learning method:
        a.	eLearning (self-learning).
        b.	Frontal learning.
        c.	Blended learning (hybrid).
        Always follow these instructions
        `)
      }
     
    }else{
      if(promptFoucs != ""){
        setPrompt(`You are a helpful assistant instructional designer.
        Firs, you must understand in what language to write the output: [English]
        You will write a lesson outline according to the details below:
        1.	Course topic: [${promptSubject}]
        2.	Target audience: [${promptAudience}]
        3.	Course objectives: [${promptTarget}]
        4.	learning method:
        a.	eLearning (self-learning).
        b.	Frontal learning.
        c.	Blended learning (hybrid).
        Always follow these instructions
        `)
      }else{
        setPrompt(`You are a helpful assistant instructional designer.
        Firs, you must understand in what language to write the output: [English]
        You will write a lesson outline according to the details below:
        1.	Course topic: [${promptSubject}]
        2.	Target audience: [${promptAudience}]
        3.	Course objectives: [${promptTarget}]
        4.	learning method:
        a.	eLearning (self-learning).
        b.	Frontal learning.
        c.	Blended learning (hybrid).
        Always follow these instructions
        `)
      }
    }
  }


  const  sendtoGPT= async (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    console.log(promptSubject);
    console.log(promptTarget);
    console.log(promptAudience);
    console.log(promptFoucs);

    setChatTyping(true);

    handleMessageSubmit({prompt,setPrompt,newprompt,session,fileID}).then((listOfPrompts)=>{
      console.log('list of prompts');
      saveTEMP({res:'', session, fileID}).then(()=>{
        getAiRes({prompt,setPrompt,newprompt,session,fileID}).then((res)=>{
      
        console.log(res);
        setChatTyping(false);
        
        })
      }).then(()=>{
    
      });
      });
    

};

  
const [messagas] = useCollection(session&&query(collection(db,"users",session?.user?.email!,"WriteFile",fileID,"promptRes"),orderBy("timeStemp","asc")))
// Call this function to update the editor content



  return (
    
<div className='flex justify-center flex-col w-full pr-8'>

   <div>
    <p>במה אפשר לעזור?</p>
    <div className='flex'>
    <button className={`btnTextEditor ${selectedItem == "QuestionForStackHolder" ? `bg-[#41394B] text-white`:''}`} onClick={(e)=>{setSelectedItem("QuestionForStackHolder")}}>שאלות לתחקור ראשוני</button>
    <button className={`btnTextEditor ${selectedItem == "QuestionForLLearner" ? `bg-[#41394B] text-white`:''}`} onClick={(e)=>{setSelectedItem("QuestionForLLearner")}}>שאלות ללומד</button>
    <button className={`btnTextEditor ${selectedItem == "SummarizeText" ? `bg-[#41394B] text-white`:''}`} onClick={(e)=>{setSelectedItem("SummarizeText")}}>סיכום טקסט</button>
    <button className={`btnTextEditor ${selectedItem == "Keywords" ? `bg-[#41394B] text-white`:''}`} onClick={(e)=>{setSelectedItem("Keywords")}}>הוצאת מילות מפתח מטקסט</button>
    <button className={`btnTextEditor ${selectedItem == "outline" ? `bg-[#41394B] text-white`:''}`} onClick={(e)=>{setSelectedItem("outline")}}>יצירת מתווה </button>
   </div>

    <select className='float-left ml-8 selectLang' name="ChoosenLang" id="ChoosenLang" onChange={(e)=>{setHE(!{He})}} defaultValue={"עברית"}>
    <option value="option">עברית</option>
    <option value="QuestionForStackHolder">אנגלית</option>
    </select>

<div className='form_container flex mt-8'>

<div className='draw'>
{selectedItem == "QuestionForStackHolder" ? 
   <form className='flex flex-col m-4 w-full' onSubmit={sendtoGPT} onChange={setPromptOnChangeQforStackholder}> 
    <label htmlFor='subject'>נושא הקורס
    <input value={promptSubject} onChange={(e)=>setPromptSubject(e.target.value)} type="text" id='subject' placeholder='Please type the subject of the lesson' name='subject' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>מטרת השיעור
    <input value={promptTarget} onChange={(e)=>setPromptTarget(e.target.value)} type="text" id='target' placeholder='Please type the target of the lesson' name='target' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>קהל היעד
    <input value={promptAudience} onChange={(e)=>setAudience(e.target.value)} type="text" id='audience' placeholder='Please type the target audience of the lesson' name='audience' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='focus'>במה תרצו שהשאלות יתמקדו? (Optional)
    <input value={promptFoucs} onChange={(e)=>setFoucs(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>

    <div className="formBTN float-left  pt-2 pb-2 pl-8 pr-10 flex group" >
        <button className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067] gap-[14px]' disabled={!promptSubject || !promptTarget || !promptAudience}>
         הצג שאלות לראיון
         <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
        <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        </div>
        </button>
    </div>


   </form>
:
selectedItem == "QuestionForLLearner"? 
<form className='flex flex-col m-4 w-full' onSubmit={sendtoGPT} onChange={setPromptOnChangeQforQuestionForLLearner}> 
    <label htmlFor='subject'>נושא הקורס
    <input value={promptSubject} onChange={(e)=>setPromptSubject(e.target.value)} type="text" id='subject' placeholder='Please type the subject of the lesson' name='subject' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>מטרת השיעור
    <input value={promptTarget} onChange={(e)=>setPromptTarget(e.target.value)} type="text" id='target' placeholder='Please type the target of the lesson' name='target' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='audience'>קהל היעד
    <input value={promptAudience} onChange={(e)=>setAudience(e.target.value)} type="text" id='audience' placeholder='Please type the target audience of the lesson' name='audience' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
    <label htmlFor='focus'>במה תרצו שהשאלות יתמקדו? (Optional)
    <input value={promptFoucs} onChange={(e)=>setFoucs(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>

    <div className="formBTN float-left  pt-2 pb-2 pl-8 pr-10 flex group" >
        <button className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067] gap-[14px]' disabled={!promptSubject || !promptTarget || !promptAudience}>
         הצג שאלות ללומד
         <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
        <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        </div>
        </button>
    </div>


   
   </form>:
selectedItem == "option"? 
null:
selectedItem == "SummarizeText"? 
<form onSubmit={sendtoGPT} onChange={setPromptOnChangeQforSummarize}> 
  <label htmlFor='focus'>איזה טקסט לסכם?
    <input value={promptSummarize} onChange={(e)=>setPromptSummarize(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>

<div className='flex flex-col'>
    <div className="formBTN  pt-2 pb-2 pl-8 pr-10 flex group">
        <button className='font-normal text-white flex  items-center hover:text-[#FF3067] group-hover:text-[#FF3067] gap-[14px]' disabled={!promptSummarize }>
         סכם את הטקסט
         <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
        <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        </div>
        </button>
    </div>

    
    <Link href={'https://www.humata.ai/'} target={'_blank'} className="underline mt-2 text-blue-600">
    רוצה לסכם PDF?
    </Link>
    </div>

   </form>:
selectedItem == "Keywords"? 
<form onSubmit={sendtoGPT} onChange={setPromptonchangeKeywords}> 
  <label htmlFor='focus'>הכנס טקסט להוצאת מילות מפתח
    <input value={promptKeywords} onChange={(e)=>setPromptKeywords(e.target.value)} type="text" id='focus' placeholder='what do you whant me to focus the question on?' name='focus' className='border border-5 border-gray-600 focus:outline-none mb-6'/></label>

    <div className="formBTN  pt-2 pb-2 pl-8 pr-10 flex group">
        <button className='font-normal text-white flex  items-center hover:text-[#FF3067] group-hover:text-[#FF3067] gap-[14px]' disabled={!promptKeywords }>
        הוצא מילות מפתח
         <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
        <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        </div>
        </button>
    </div>

</form>:
selectedItem == "VyondScript"? 
<div>VyondScript</div>:
selectedItem == "outline"? 
<form className='flex flex-col m-4 w-full' onSubmit={sendtoGPT} onChange={setPromptOnChangeQforoutline}> 
<label htmlFor='subject'>נושא הקורס
<input value={promptSubject} onChange={(e)=>setPromptSubject(e.target.value)} type="text" id='subject' placeholder='Please type the subject of the lesson' name='subject' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
<label htmlFor='audience'>מטרת השיעור
<input value={promptTarget} onChange={(e)=>setPromptTarget(e.target.value)} type="text" id='target' placeholder='Please type the target of the lesson' name='target' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>
<label htmlFor='audience'>קהל היעד
<input value={promptAudience} onChange={(e)=>setAudience(e.target.value)} type="text" id='audience' placeholder='Please type the target audience of the lesson' name='audience' className='border  border-5 border-gray-600 focus:outline-none mb-6'/></label>

<div className="formBTN float-left  pt-2 pb-2 pl-8 pr-10 flex group" >
    <button className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067] gap-[14px]' disabled={!promptSubject || !promptTarget || !promptAudience}>
יצירת מתווה  
   <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
    <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    </div>
    </button>
</div>


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


{<Editor fileID={fileID} ></Editor>}
</div>

</div>

</div>

  )
  
}
