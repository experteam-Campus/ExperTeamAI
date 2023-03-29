
import React from 'react'

import TtsText from '../components/TtsText';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import SessionProvider from '../components/SessionProvider';

//import { synthesizeText } from '../../pages/api/tTS';
//import { TextToSpeechClient } from '@google-cloud/text-to-speech';



export default async function page() {

  const session = await getServerSession(authOptions);


   console.log(session);


  return (
  <div>
 <SessionProvider session={session}>
<TtsText></TtsText>
</SessionProvider>
  </div>
  );
}
