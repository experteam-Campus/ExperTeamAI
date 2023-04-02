// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../util/queryApi';
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';



type Data = {
  answer: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt,modal,session,fileID}= req.body;

    if(!prompt){res.status(400).json({answer:"please provide some text :)"})
    return;}



    const response = await query(prompt,modal);
   // console.log('response');
    //console.log(typeof(fileID));
    console.log(session?.user?.email);
 

    


const writePromptres:WritePrompt={
  prompt: response ||  { role: 'assistant', content: `Oops I didnt' find an answer` } ,
  timeStemp:admin.firestore.Timestamp.now(),
  }
console.log(writePromptres)


await adminDb.collection("users").doc(session?.user?.email).collection("WriteFile").doc(fileID).collection("promptRes").add(writePromptres);
  res.status(200).json({ answer: writePromptres.prompt })
}
