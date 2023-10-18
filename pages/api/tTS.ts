
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {generateSpeech} from '../../util/ttsUtil';
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin';
import { ref, uploadBytes, getDownloadURL,getStorage,uploadBytesResumable  } from 'firebase/storage';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {text, session,selectedLangCode,ssmlGender,countrycodeArr}= req.body;

console.log(session)
  if(!text){res.status(400).json(console.log("please type some words :)"));
  return;}


  console.log(text);
  const response = await generateSpeech(text,session,selectedLangCode,ssmlGender,countrycodeArr );

  console.log('response');  
  console.log(response);

  res.json({ message: 'Speech generated successfully!', url: response });

  return response;
}
