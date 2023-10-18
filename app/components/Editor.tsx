'use client'

import { useState, useEffect,useCallback  } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from "../../firebase";
import { DocumentData } from 'firebase/firestore';


type Props={
  fileID:string,   
}


export default function Editor({fileID}:Props) {

console.log('EDITOR FUNC')
  const [view, setView] = useState<EditorView | null>(null);
  const {data:session}=useSession();
 
  


  const [messagas] = useCollection(session&&query(collection(db,"users",session?.user?.email!,"WriteFile",fileID,"promptRes"),orderBy("timeStemp","asc")))
   // Call this function to update the editor content
  {messagas?.docs.map((message)=>
   
  { 
   
    if(message.data().text.role == "assistant"){
      console.log(message.data())
     //updateEditorContent(` \n\n ---------------- \n \n`+ message.data().text.content)
    }}
  //  msg.push(message.text.content)
    )}

 


  return (
    <div className="border-gray-400 border-2 w-3/4 m-4"> 
      <div style={{ whiteSpace: "pre-line" }} id="editor-root"/>
      
    </div>
  );
}
