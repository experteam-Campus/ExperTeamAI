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
    const {session,fileID}= req.body;
    
   // const [generatedBios, setGeneratedBios] = useState<String>("");

  /* const { AIprompt,session,chatId } = (await req.json()) as {
    AIprompt?: string;
    session?:string;
    chatId?:String;
  };*/

  console.log('session');
  console.log(session);
  console.log('chatId');
  console.log(fileID);

    //console.log('response');
    //console.log(typeof(chatId));
    
  
const writePromptres:WritePrompt={
  text: { role: 'assistant', content: `` } ,
  timeStemp:admin.firestore.Timestamp.now(),
  }

 //return messagas;
await adminDb.collection("users").doc(session?.user?.email).collection("WriteFile").doc(fileID).collection("promptRes").add(writePromptres);
  res.status(200).json({ answer: writePromptres.text });
}
