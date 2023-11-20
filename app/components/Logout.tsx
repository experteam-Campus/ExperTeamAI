'use client'
import React from 'react'
import { signOut } from 'next-auth/react';
import Link from 'next/link';


export default function Logout() {

  let backtoHome=''
const logout=(()=>{
  signOut({ callbackUrl: '/' });
})

  return (
    <div className='absolute float-left w-full'>
    <Link href={backtoHome} className="logoutBTN float-left m-5 pt-2 pb-2 pl-8 pr-10 flex group" >
        <button className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067] gap-[14px]' onClick={()=> logout()}>
         התנתקות
         <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
        <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
         </div>
        </button>
    </Link>
    </div>
  )
}
