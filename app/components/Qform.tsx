'use client'

import { addDoc, collection, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import {  useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore'
import DocInfo from './DocInfo';


export default function Qform() {
  const router = useRouter();
  const {data:session} = useSession();



  const createNewDoc=async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const doc = await addDoc(collection(db, "users", session?.user?.email!, "WriteFile"),{ userId:session?.user?.email!, timeStamp:serverTimestamp()});
    router.push(`/create/file/${doc.id}`);
    //router.push(`/create/file/${doc.id}`,  undefined,  {shallow: true} );
   
  }



  const [docsFils] = useCollection(session&&query(collection(db,"users",session?.user?.email!,"WriteFile")))
  console.log(docsFils)

  //const [messagas] = useCollection(session&&query(collection(db,"users",session?.user?.email!,"chats",chatId,"messages"),orderBy("timeStemp","asc")))

  return (

   <div className='m-5'>
   



   <form className='' onSubmit={createNewDoc}> 
   
    <button  className=' bg-[#E1539E] p-3 rounded-md text-white hover:bg-[#f25aab] transition-all ease-in'>יצירת מסמך חדש</button>
   </form>
   {!docsFils?(
   <div className=''>אין מסמכים קיימים</div>):
   (
    docsFils?.docs.map((docsFile)=>
   <DocInfo key={docsFile.id} info={docsFile}></DocInfo>
   )
   )}


</div>

  )
  
}
