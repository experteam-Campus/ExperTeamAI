
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection, getDocs, orderBy, serverTimestamp} from 'firebase/firestore';
import openai from "./chatgpt";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import { useState } from "react";
import { OpenAIStream, OpenAIStreamPayload } from "../util/OpenAIStream";


export const config = {
  runtime: "edge",
};


const query =async (prompt:any,model:string) => {



  const payload: OpenAIStreamPayload = {
    model,
    messages: prompt,
    temperature: 0.7,
    stream: true,
  
  };
  
  console.log(payload)
  const stream = await OpenAIStream(payload);
  console.log(stream)
  return new Response(stream);


/*
console.log(prompt)
console.log(model)
    const completion  = await openai.createChatCompletion({
        model,
        stream: true,
        messages:prompt,
    })


    
    .then((completion)=>{

     // const json = JSON.parse(completion.data);
    // completion.data.choices[0].message;

        console.log(completion)
        console.log(completion.data.choices[0].message)

       return completion.data.choices[0].message

            
    }).catch((error)=>{`Somthing want worng, please try again - Error num: ${error.message}`});

   return completion;*/
}

export default query;