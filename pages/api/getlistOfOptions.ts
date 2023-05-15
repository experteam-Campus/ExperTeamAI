
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {listOfOptions} from '../../util/listOfOptionsTTS';
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin';
import { ref, uploadBytes, getDownloadURL,getStorage,uploadBytesResumable  } from 'firebase/storage';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  



  const response = await listOfOptions();


  console.log('response');  
  console.log(response);

  res.json({ message: 'Voice Name successfully!', voiceName: response });

  return response;

 
}
