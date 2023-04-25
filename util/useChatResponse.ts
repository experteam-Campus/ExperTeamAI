

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";


type Props={
    chatId:string,
    session:any,
    newprompt:any,
    setPrompt:any,
    prompt:string,
    AIprompt:string,
    setAIprompt:any,
  
}

type Props2={
  chatId:string,
  session:any,
  res:any,
}

export const useChatResponse =(()=>{

    const  handleMessageSubmit=  (async({prompt,setPrompt,newprompt,session,chatId,AIprompt,setAIprompt}:Props)=>{
      


        if(!prompt) return;
    
        const newMsg = {role:'user',content:prompt}
        newprompt.push(newMsg);
    
        //console.log('newprompt');
       // console.log(newprompt);
        //setNewPrompt(...newMsg);
    
        let input = prompt.trim();
        setPrompt("");
    
        let oldinput="";
    
        //setprePrompt([]);
        const messagas:Messages={
          text:newMsg,
          prePrompts:newprompt,
          timeStemp:serverTimestamp(),
          user:{
              _id:session?.user?.email!,
              name:session?.user?.name!,
              userImg: "/assets/Avatar.png"
          }
        }
    
      
    await addDoc(collection(db,'users',session?.user?.email!, 'chats', chatId, 'messages'),messagas)
    
    
    
    //setChatTyping(true)
    
    const response = await fetch('/api/chatGPT',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
          prompt:newprompt,chatId,model:'gpt-3.5-turbo',session, oldinput
      })
    });
    
    
    console.log("response____");
    console.log(response);
    
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    
    // This data is a ReadableStream
    const data = response.body;
    
    console.log(data);
    if (!data) {
      return;
    }
    
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
    let text=''
    
     while (!done) {
     //alert(done)
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
    
      const chunkValue = decoder.decode(value);
      console.log("chunkValue");
      console.log(chunkValue);
      text+=chunkValue;
      setAIprompt((prev:any) => prev + chunkValue);
      console.log('AIprompt');
      console.log(AIprompt);
     
    
       // await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(messagas);
    }
    if(done==true){
      console.log('AIprompt');
      console.log(AIprompt);
    return text;
    }
    /*
    if(done==true){
    console.log(AIprompt)
      console.log('------------------------');
      alert('DONE!! ' + AIprompt);
    
      await fetch('/api/AiresponseAPI',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          AIprompt,session,chatId
        })
       }).then(() => {
       // setAIprompt(''); 
      });;
     }
    */
    
    //console.log(AIprompt);
    
    /*const Airesponse = await fetch('/api/AiresponseAPI',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        AIprompt,session,chatId
      })
     });*/
    
    
    //await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(messagas);
    //setChatTyping(false);
    /* //setAIprompt('')*/
    
    
    
    
    })

    const saveResToDB=(async({res,session,chatId}:Props2)=>{
      console.log(res)
      console.log(session)
      console.log(chatId)
      await fetch('/api/AiresponseAPI',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          res,session,chatId
        })
       })
    })

    return {handleMessageSubmit, saveResToDB}
})

 