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
    <Link href={backtoHome}>
        <button className='font-medium' onClick={()=> logout()}>
         SignOut
        </button>
    </Link>
  )
}
