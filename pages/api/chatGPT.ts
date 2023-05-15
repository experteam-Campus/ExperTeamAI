// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../util/queryApi';
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin';
import { OpenAIStream, OpenAIStreamPayload } from "../../util/OpenAIStream";


export const config = {
  runtime: "edge",
};


type Data = {
  answer: string,
}

export default async function handler(
  req: Request,
 // res: NextApiResponse<Data>
): Promise<Response> {
   // const {prompt, chatId,model,session}= req.body;
   // const [generatedBios, setGeneratedBios] = useState<String>("");

   const { prompt,model } = (await req.json()) as {
    prompt?: any;
    model?: any;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }


   console.log(model)
   console.log(prompt)
     const payload: OpenAIStreamPayload = {
    model,
    messages: prompt,
    temperature: 0.7,
    stream: true,
  };
  
  
  
  console.log(payload);
  const stream = await OpenAIStream(payload);
  console.log('stream');
  console.log(stream);

  return new Response(stream);


/*
    //console.log('response');
    //console.log(typeof(chatId));
    
const messagas:Messages={
  text: { role: 'assistant', content: `Oops I didnt' find an answer` } ||   { role: 'assistant', content: `Oops I didnt' find an answer` },
  prePrompts:'',
  timeStemp:admin.firestore.Timestamp.now(),
  user:{
  _id:"chatGPT",
  name:"ExperTeamAI",
  userImg:"/assets/LOGO_CIRCLE.png",
  }}*/

//  return new Response messagas;
//await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(messagas);
 // res.status(200).json({ answer: messagas.text })
}
