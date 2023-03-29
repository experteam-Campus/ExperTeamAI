// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../util/queryApi';
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin';


type Data = {
  answer: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt, chatId,modal,session}= req.body;

    if(!prompt){res.status(400).json({answer:"please ask me anything :)"})
    return;}

    if(!chatId){res.status(400).json({answer:"please provied a valid chat ID :)"})
     return;}

    const response = await query(prompt,chatId,modal,session);

    console.log(response);

const messagas:Messages={
  text: response || `Oops I didnt' find a answer` ,
  timeStemp:admin.firestore.Timestamp.now(),
  user:{
  _id:"chatGPT",
  name:"ExperTeamAI",
  userImg:"/assets/LOGO_CIRCLE.png",
  }}

await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(messagas);
  res.status(200).json({ answer: messagas.text })
}
