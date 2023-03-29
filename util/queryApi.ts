
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection, getDocs, orderBy, serverTimestamp} from 'firebase/firestore';
import openai from "./chatgpt";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import { useState } from "react";



const query =async (prompt:string,chatId:string,model:string,session:any) => {
  //  const {prompt, chatId,modal,session}= req.body;
  //const [prePrompt, setprePrompt]=useState<any[]>([]);

//let newPrompt = "";
{/*get prevease masseges for the prompt */}
//const querySnapshot = await getDocs(collection(db,'users',session?.user?.email!, 'chats', chatId, 'messages'));
//querySnapshot.forEach((doc) => {
 //doc.data() is never undefined for query doc snapshots

//console.log(doc.data())


 //console.log(doc.id, " => ", doc.data().text);
 //setprePrompt(prePrompt=>[...prePrompt, doc.data().text])

//console.log(prompt)

    const res = await openai.createCompletion({
        model,
        prompt,
        max_tokens:1000,
        top_p:1,
        temperature:0.7,
        frequency_penalty:0,
        presence_penalty:0,
        stop:["/n"],
    })
    .then((res)=>{
        console.log(res)
        console.log(res.data.choices[0])
       return res.data.choices[0].text
            
    }).catch((error)=>{`Somthing want worng, please try again - Error num: ${error.message}`})


//setprePrompt([])
    return res;
}

export default query;