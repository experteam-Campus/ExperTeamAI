'use client'
import '../styles/globals.css';
import Head from 'next/head'; // Importing the Next.js Head component
import BG_Elements from '../public/assets/BG_Elements.png';
import { AppContext } from '../app/context/store';
import { useState } from 'react';
import './head'
import BtnNav from './components/BtnNav';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [AImsg, setAIprompt] = useState('');
  const [doneChunck, setdoneChunck] = useState(false);

  return (
    <>
    <html lang='he'>
      <body
      dir='rtl'
      className='pt-6 pb-6 pr-6 pl-6 h-[calc(100vh-2rem)]'
        style={{
          backgroundImage: `url(${BG_Elements.src})`,
          backgroundSize: 'cover',  // Cover the entire viewport
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', // Do not repeat the image
          minHeight: '100vh' // Ensure it covers the entire height of the viewport
        }}
        >   
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <title>Your Page Title</title>
        {/* Any other meta tags or styles you want to include */}
      </Head>

        <div className="rounded-xl border border-solid border-white bg-gradient-custom shadow-custom backdrop-blur-[72.5px] h-full ">
        
        <AppContext.Provider value={{ AImsg, setAIprompt, doneChunck, setdoneChunck }}>
         {children}
        </AppContext.Provider>
      </div>
     
      </body>
      </html>
    </>
  );
}
