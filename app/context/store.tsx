/*import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch*/


'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import { values } from "remirror";


type DataType={
  AIprompt:string;
  children:any;
}

interface contextProps{
  AIprompt:string,
  setAIprompt:Dispatch<SetStateAction<string>>
}


//const [AIprompt, setAIprompt]=useState('')
export  const AppContext = createContext<contextProps>({
  AIprompt:'MAY MAY',
  setAIprompt:():string=>'',
});

/*export const ContextProvider = ({children})=>{
  const [AIprompt, setAIprompt]=useState('')

  return(
    <AppContext.Provider value={{AIprompt, setAIprompt}}>
    {children}
    </AppContext.Provider>
  )
}*/

export const useContextProvider =()=>useContext(AppContext)


