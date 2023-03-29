'use client'
import React from 'react'
import { signIn } from 'next-auth/react';




export default function Login() {
  return (
    <button onClick={()=> signIn()}>
        signIn
        </button>
        
      
  )
}
