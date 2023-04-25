// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../util/queryApi';
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin';
import { OpenAIStream, OpenAIStreamPayload } from "../../util/OpenAIStream";




type Data = {
  answer: string,
}

export default async function handler(
    req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {res:AIprompt,session,chatId}= req.body;
    
   // const [generatedBios, setGeneratedBios] = useState<String>("");

  /* const { AIprompt,session,chatId } = (await req.json()) as {
    AIprompt?: string;
    session?:string;
    chatId?:String;
  };*/

  console.log('AIprompt');
  console.log(session);
  console.log(AIprompt);

    //console.log('response');
    //console.log(typeof(chatId));
    
  
const messagas:Messages={
  text: AIprompt != '' ? { role: 'assistant', content: AIprompt } :   { role: 'assistant', content: `Oops I didnt' find an answer` },
  prePrompts:'',
  timeStemp:admin.firestore.Timestamp.now(),
  user:{
  _id:"chatGPT",
  name:"ExperTeamAI",
  userImg:"/assets/LOGO_CIRCLE.png",
  }}

 //return messagas;
await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(messagas);
  res.status(200).json({ answer: messagas.text });
}
