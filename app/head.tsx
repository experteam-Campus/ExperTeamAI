import React from 'react'
import LogoPic from '../public/assets/logoAI.png';
import Image from 'next/image';




import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Logout from './components/Logout';






export default async function head() {

  const session = await getServerSession(authOptions);


  return (
    <div className='p-3 bg-slate-50  flex justify-between text-center'>
    <h1>

    <Image src={LogoPic} alt="Experteam AI logo"/>

   </h1>

   {!session?(''):(<Logout></Logout>)}
   </div>
  )
}
