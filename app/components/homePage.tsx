'use client'
import React from 'react'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Hello from './helloPraragrph';
import BtnNav from './BtnNav';




export default function Homepage() {



  return (
 <>
  

   <Hello></Hello>

 </>
  )
}
