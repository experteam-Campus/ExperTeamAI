

import React from 'react'
import Image from 'next/image';
import LogoPic from '../public/assets/logoAI.png';



import { getServerSession } from 'next-auth';
import SessionProvider from './components/SessionProvider';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from './components/login';
import Head from './head';
import Logout from './components/Logout';
import BtnNav from './components/BtnNav';
import Hello from './components/helloPraragrph';
import HomepageElements from './components/homePage';
//import { useRouter } from 'next/navigation';




export default async function HomePage() {
//const router = useRouter()
    const session = await getServerSession(authOptions);

  return (
    <div className='h-full p-3'>
  <SessionProvider session={session}>
{!session?(
   <Login ></Login>
):(
  <>
  <div className=''>
    <BtnNav></BtnNav>
   <HomepageElements></HomepageElements>
   </div>
  </>
    )}  
     </SessionProvider> 
    </div>
  )
}
