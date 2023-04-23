import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContext } from '../app/context/store';
import { useState } from 'react';
//import { store } from '../app/store/store'
//import { Provider } from 'react-redux'


function MyApp({ Component, pageProps }: AppProps) {
  const [AIprompt, setAIprompt]=useState('')


  return (
   <AppContext.Provider value={{AIprompt, setAIprompt}}>
     <Component {...pageProps} />
     </AppContext.Provider>
)}

export default MyApp;
