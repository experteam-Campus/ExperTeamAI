
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection, getDocs, orderBy, serverTimestamp} from 'firebase/firestore';
import openai from "./chatgpt";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import { useState } from "react";


export const config = {
  runtime: "edge",
};

  

const query =async (prompt:any,model:string) => {


/*console.log(prompt)
console.log(model)*/
    const completion  = await openai.createChatCompletion({
        model,
        messages:prompt,
        stream:true,
    })
    .then((completion)=>{
        console.log("completion")
        console.log(completion.data.choices[0].message)
      //  console.log( completion.data.choices[0].message?.content.split('/n'))
       return completion.data.choices[0].message
       // return completion.data
      // return completion.data.choices[0].message
            
    }).catch((error)=>{`Somthing want worng, please try again - Error num: ${error.message}`});

//setprePrompt([])
   return completion;
}

export default query;