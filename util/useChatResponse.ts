

import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
//import admin from 'firebase-admin'
//import { adminDb } from '../firebaseAdmin';


type Props={
    chatId:string,
    session:any,
    newprompt:any,
    setPrompt:any,
    prompt:string,
    AIprompt:any,
    setAIprompt:any,
    listOfPrompts:any,
}

type Props2={
  chatId:string,
  session:any,
  res:any,
}

export const useChatResponse =(()=>{
  let msgHistory:any=[{role:'system',content:'you are a Professional Instructional Designer with 30 years of experience, your name is Expy'}];


    const  handleMessageSubmit=  (async({prompt,setPrompt,newprompt,session,chatId,AIprompt,setAIprompt}:Props)=>{
      
        if(!prompt) return;
     

        const newMsg = {role:'user',content:prompt};

        msgHistory.push(newMsg)



        newprompt.push(newMsg);
    
        console.log('newprompt');
        console.log(newprompt);
        //setNewPrompt(...newMsg);
    
        let input = prompt.trim();

        let oldinput="";
    
        //setprePrompt([]);
        const messagas:Messages={
          text:newMsg,
          prePrompts:newprompt,
          timeStemp:serverTimestamp(),
          user:{
              _id:session?.user?.email!,
              name:session?.user?.name!,
              userImg: session?.user?.image
          }
        }
    
      
    await addDoc(collection(db,'users',session?.user?.email!, 'chats', chatId, 'messages'),messagas);
    
     setPrompt("");

    return newprompt;
    //setChatTyping(true);
    

    /*------------------------------------------------------------------------------------
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
    
    
    
    
    });

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
    });


    const saveTEMP=(async({res,session,chatId}:Props2)=>{
      console.log(session);
     const response = await fetch('/api/useAddEmptyDB',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            session,chatId
        })
      }).then((res)=>{
        console.log('--------------------saved-----------------------------')
        return 'saved'
      })

  })



  const getAiRes=(async({prompt,setPrompt,newprompt,session,chatId,AIprompt,setAIprompt,listOfPrompts}:Props)=>{
    let msg:any =[];

   /* const responseToDB = await fetch('/api/useAddEmptyDB',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
          session,chatId
      })
    })*/
      console.log('--------------------saved-----------------------------')
      //return 'saved'




   /*   let articlesSnapshot = await getDocs(query(collection(db,"users",session?.user?.email!,"chats",chatId,"messages"), orderBy('timestamp')));

    let q = query(collection(db,"users",session?.user?.email!,"chats",chatId,"messages"), orderBy("timestamp", "asc"));
    console.log(q)
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(JSON.stringify(doc.data())); 

        msg.push({...doc.data(),id:doc.id});
        console.log(msg); 
      });
    });

**********************************************************/
const myTimeout = setTimeout(createAresponseAndUpdateDB, 3000);

async function createAresponseAndUpdateDB () {
 // clearTimeout(myTimeout); 
let id ='';

    const test = await getDocs(query(collection(db,"users",session?.user?.email!,"chats",chatId,"messages"), orderBy('timeStemp', "asc"))).then((snapshot)=>{
    
      snapshot.docs.forEach((doc)=>{
      msg.push({...doc.data(),id:doc.id});
      id=doc.id;
      //console.log(msg);
      });

      console.log(msg);
      console.log(msg[msg.length-1]);
      console.log(msg[msg.length-1].id);

    }).catch((err)=>{console.log(err.message)});


    console.log('****************************************msgHistory******************************')
console.log(msgHistory)
console.log('****************************************msgHistory******************************')
      const response = await fetch('/api/chatGPT',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            prompt:msgHistory,chatId,model:'gpt-4',session
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
        let text='';
      
       while (!done) {

        const { value, done: doneReading } = await reader.read();
        done = doneReading;
      
        const chunkValue = decoder.decode(value);
       // console.log("chunkValue");
        //console.log(chunkValue);


        console.log('---------------------------msg------------------------');

        console.log(msg);
       // console.log(id);
       console.log('---------------------------msg------------------------');
       const  docRef=doc(db,"users",session?.user?.email!,"chats",chatId,"messages",msg[msg.length-1].id);
  
       updateDoc(docRef,{
         text:{content: text+=chunkValue,
         role : "assistant"}
       });
  
  
  //text+=chunkValue;
  //setAIprompt((prev:any) => prev + chunkValue);
  console.log('AIprompt');
 // console.log(AIprompt='MAY');
  console.log(text);
  
  //alert(text)
  
        //await collection(db,"users",session?.user?.email!,"chats",chatId,"messages").get().docs.last.id;
        //saveResToDB(chunkValue,session,chatId)
         // await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(messagas);
         
      }
  
      if(done==true){
        setAIprompt('');
        msgHistory.push({ role : "assistant",content: text})

       // console.log('AIprompt');
      //  console.log(AIprompt);
      return done;
      }

}
  /************************************************ */



  })
    return {handleMessageSubmit, saveResToDB,saveTEMP,getAiRes}
})

 