'use client'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import {  useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { db } from '../../firebase';


export default function Qform() {
  const router = useRouter();
  const {data:session} = useSession();



  const createNewDoc=async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const doc = await addDoc(collection(db, "users", session?.user?.email!, "WriteFile"),{ userId:session?.user?.email!, timeStamp:serverTimestamp()});
    router.push(`/create/file/${doc.id}`);
    //router.push(`/create/file/${doc.id}`,  undefined,  {shallow: true} );
   
  }


  return (

   <div className='m-5'>
    


   <form className='' onSubmit={createNewDoc}> 
   
    <button  className=' bg-[#E1539E] p-3 rounded-md text-white hover:bg-[#f25aab] transition-all ease-in'>מסמך חדש</button>
   </form>
<div className=''>אין מסמכים קיימים</div>

</div>

  )
  
}
