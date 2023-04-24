'use client'
import '../styles/globals.css'
import './head'
import { AppContext } from '../app/context/store';
import { useState } from 'react';





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [AIprompt, setAIprompt]=useState('')
  return (
    <html lang="he" dir='rtl'>
      <head/>
      <body>
     <AppContext.Provider value={{AIprompt, setAIprompt}}>
        {children}
    </AppContext.Provider>
        </body>
    </html>
  )
}
