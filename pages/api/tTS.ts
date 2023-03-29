
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {generateSpeech} from '../../util/ttsUtil';
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {text, session}= req.body;

console.log(session)
  if(!text){res.status(400).json(console.log("please type some words :)"))
  return;}


  console.log(text);


  const response = await generateSpeech(text,session);


  console.log('response');
  console.log(response);

 
  const voice:voice={
    text,
    voice: response,
  timeStemp:admin.firestore.Timestamp.now(),
  }
  
  await adminDb.collection("users").doc(session?.user?.email).collection("tts_files").add(voice);


}
