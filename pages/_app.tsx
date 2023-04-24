
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { useState } from 'react';
//import { store } from '../app/store/store'
//import { Provider } from 'react-redux'
import {AppContext} from '../app/context/store'

function MyApp({ Component, pageProps }: AppProps) {
 const [AIprompt, setAIprompt]=useState('')


  return (
 
     <Component {...pageProps} />
   
)}

export default MyApp;
