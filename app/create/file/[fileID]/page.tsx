

import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import Docfile from '../../../components/Docfile'

import Editor from '../../../components/Editor';
import SessionProvider from '../../../components/SessionProvider'


type Props = {
    params:{
        fileID:string, 
    }
}

export default async function page({params:{fileID}}:Props) {
    const session = await getServerSession(authOptions);






  return (
<div className='flex justify-center'>
<SessionProvider session={session}>

<Docfile fileID={fileID}></Docfile>
 {<Editor fileID={fileID}></Editor>}
 </SessionProvider>
</div>
  )
  
}
