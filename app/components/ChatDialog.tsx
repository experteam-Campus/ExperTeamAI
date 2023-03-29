import React from 'react'

import ChatInput from './ChatInput'
import CurrentChat from './CurrentChat'

type Props={
    chatId:string
}


export default function ChatDialog({chatId}:Props) {
   
  return (
    <div className='flex flex-col p-3 flex-1 bg-slate-100'>

    <CurrentChat chatId={chatId}></CurrentChat>
    <ChatInput chatId={chatId}></ChatInput>
    </div>
  )
}
