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

  const [doneChunck, setdoneChunck]=useState(false)


  return (
    <html lang="he">
      <head/>
      <body>
     <AppContext.Provider value={{AIprompt, setAIprompt,doneChunck,setdoneChunck}}>
        {children}
    </AppContext.Provider>
        </body>
    </html>
  )
}
