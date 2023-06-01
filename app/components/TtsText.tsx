'use client'
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { addDoc, collection, orderBy, query, serverTimestamp, getDocs} from 'firebase/firestore';
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../firebase';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { async } from '@firebase/util';


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
    <div className='flex flex-col flex-wrap items-center'>
    <form onSubmit={sendText} className='flex flex-col'>

    <textarea
    value={text}
    onChange={(e)=>setText(e.target.value)}
    className='flex-1 rounded-md p-3 focus:outline-none text-gray-500 h-[18em] w-96 border border-b-2 border-[#de53a6] resize-none'  placeholder='Write the sentences'>
    </textarea>


<label htmlFor="lang">Choose a Language:
<select id="lang" value={selectedLang} onChange={(e)=> setSelectedLang(e.target.value)}>
  {langArray.map((lang:any,index:any) => (
    <option key={lang} value={index}>{lang}</option>
  ))}
</select>
</label>


<label htmlFor="langCode">Choose a Voice:
<select id="langCode" value={selectedLangCode} onChange={(e)=> setSelectedlangCode(e.target.value)}>
  {codeLangArr[Number(selectedLang)]?.map((langCode:any,index:any) => (
    <option key={langCode} value={langCode}>{langCode}</option>
  ))}
</select>
</label>


{/*<select id="ssmlGender" value={ssmlGender} onChange={(e)=> setSsmlGender(e.target.value)}>
    <option  value='Female'>Female</option>
    <option  value='Men'>Men</option>
  </select>*/}

    <button>SPEECH</button>
   </form>


  {/*list of chats */}

{speechLink && (
    <audio controls>
    <source src={speechLink} type="audio/mp3" />
    </audio>
  )}

</div>
  )
}


