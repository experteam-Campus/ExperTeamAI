'use client'
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { addDoc, collection, orderBy, query, serverTimestamp, getDocs} from 'firebase/firestore';
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../firebase';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { async } from '@firebase/util';
import { uniqueId } from 'remirror';


interface MyData {
  prevArray: number;
  newVal: string;
}

export default function  TtsText () {
   // let audio = new Audio('output.mp3');

    const [speechLink, setspeechLink] = useState("");
    const [langArray, setlangArray] = useState<any>([]);
    const [selectedLang, setSelectedLang] = useState('0');
    const [selectedLangCode, setSelectedlangCode] = useState('af-ZA-Standard-A');
    const [ssmlGender, setSsmlGender] = useState('FEMALE');
    const [codeLangArr, setCodeLangArr] = useState<any>([]);
    const [countrycodeArr, setCountrycodeArr] = useState('af-ZA');
    const [text, setText] = useState('');
    const {data:session}= useSession();

     
//let langArray:any = [];
  useEffect(() => {
    const listOfOptions=async()=>{
      await fetch('/api/getlistOfOptions',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
           
        })
      }).then((res)=>{
        console.log(res);
       //console.log(res.json());
      res.json().then((data)=>{
      let newVal:any = data.voiceName.lang.lang;
        setlangArray([ ...newVal]);
        langArray.push(data.voiceName);
        //data.voiceName.optionslist;
        //data.voiceName.Optionslist;
        setCodeLangArr([...data.voiceName.Optionslist]);
        console.log(data.voiceName);
        console.log(data.voiceName.voiceToPersonMapping);
     })}
      )}

      listOfOptions();

  }, [])
  

     let count=0;
     const sendText = async(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

   /*
      
      for(var i=0;i<=selectedLangCode.length;i++){
       let str = selectedLangCode;

     if(str[i] ==='-'){
       count++;
     if(count === 2){
       setCountrycodeArr(str.slice(0, i));
     }};

   //  alert(countrycodeArr);
    }
       */   
       
   
      
    
   

      
    setspeechLink("");

  await fetch('/api/tTS',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        text,
      session,
      selectedLangCode,
      ssmlGender,
      countrycodeArr
    })
  }).then((res)=>{
    res.json().then((data)=>{
      setspeechLink(data.url);
    })
  })}


  return (
    <div className='flex flex-col flex-wrap pl-28 pr-40'>
    <form onSubmit={sendText} className=''>


<div className='flex gap-6 w-fit relative'>

<label className='flex flex-col ' htmlFor="lang">
  <span>בחר שפה:</span>
<select id="lang" value={selectedLang} onChange={(e)=> setSelectedLang(e.target.value)}>
  {langArray.map((lang:any,index:any) => (
    <option key={lang} value={index}>{lang}</option>
  ))}
</select>
</label>


<label className='flex flex-col' htmlFor="langCode">בחר קול:
<select id="langCode" value={selectedLangCode} onChange={(e)=> setSelectedlangCode(e.target.value)}>
  {codeLangArr[Number(selectedLang)]?.map((langCode:any,index:any) => (
    <option key={uniqueId()} value={langCode}>{langCode}</option>
  ))}
</select>
</label>
</div>

<hr className='text-[#C1C1C1]'></hr>
<div className='flex flex-col h-[270px]'>

<textarea
    value={text}
    onChange={(e)=>setText(e.target.value)}
    className='flex-1  p-3 focus:outline-none text-gray-500 h-[18em]   border-b-2  rounded-xl border border-solid border-white backdrop-blur-[28.5px]' style={{ background: 'rgba(255, 255, 255, 0.80)'}}  placeholder='Write the sentences'>
</textarea>

{/*<select id="ssmlGender" value={ssmlGender} onChange={(e)=> setSsmlGender(e.target.value)}>
    <option  value='Female'>Female</option>
    <option  value='Men'>Men</option>
  </select>*/}

    <button className='logoutBTN float-left m-5 pt-2 pb-2  pr-10 flex group w-fit mt-8 m-auto gap-[14px] pl-8'>
     <span className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067]'>צור שמע</span> 
      <span className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067]'>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" viewBox="0 0 12 18" fill="none">
      <path d="M4 18C2.9 18 1.95833 17.6083 1.175 16.825C0.391667 16.0417 0 15.1 0 14C0 12.9 0.391667 11.9583 1.175 11.175C1.95833 10.3917 2.9 10 4 10C4.38333 10 4.7375 10.0458 5.0625 10.1375C5.3875 10.2292 5.7 10.3667 6 10.55V0H12V4H8V14C8 15.1 7.60833 16.0417 6.825 16.825C6.04167 17.6083 5.1 18 4 18Z" fill="currentColor"/>
      </svg>
      </span>
      </button>
    </div>
   </form>


  {/*list of chats */}

{speechLink && (
    <audio controls className='w-auto mt-[50px]'>
    <source src={speechLink} type="audio/mp3" />
    </audio>
  )}

</div>
  )
}


