

import React from 'react'
import Image from 'next/image';
import LogoPic from '../public/assets/logoAI.png';



import { getServerSession } from 'next-auth';
import SessionProvider from './components/SessionProvider';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from './components/login';
import Logout from './components/Logout';
import BtnNav from './components/BtnNav';
//import { useRouter } from 'next/navigation';




export default async function HomePage() {
//const router = useRouter()
    const session = await getServerSession(authOptions);





  return (
    <div className=''>
    
  <SessionProvider session={session}>
{!session?(
   <Login></Login>
):(
    <div>
   <BtnNav></BtnNav>
    </div>
    )}  
     </SessionProvider> 
    </div>
  )
}
