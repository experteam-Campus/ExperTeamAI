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

   <div className='z-50'>
   
   <form className='' onSubmit={createNewDoc}> 
   
   <div  className="logoutBTN float-left m-5 pt-2 pb-2 pl-8 pr-10 flex group " >
        <button className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067] gap-[14px]' >
         יצירת מסמך חדש
         <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
        <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
         </div>
        </button>
    </div>


   </form>
   {/*!docsFils?(
   <div className=''>אין מסמכים קיימים</div>):
   (
    docsFils?.docs.map((docsFile)=>
   <DocInfo key={docsFile.id} info={docsFile}></DocInfo>
   )
   )*/}


</div>

  )
  
}
