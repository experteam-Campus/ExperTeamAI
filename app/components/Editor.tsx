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


  const [view, setView] = useState<EditorView | null>(null);
  const {data:session}=useSession();
  useEffect(() => {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks
    });

    const editorRoot = document.getElementById("editor-root");
    if (!editorRoot) {
      return;
    }

    const editorContainer = document.createElement("div");

    // Add the editor container to the component's root element
    editorRoot.appendChild(editorContainer);

    const contentEl = document.getElementById("content");
    if (!contentEl) {
      return;
    }

    const newView = new EditorView(editorContainer, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(contentEl),
        plugins: exampleSetup({ schema: mySchema })
      }) 
    });

    setView(newView);

    // Cleanup function
    return () => {
      newView.destroy();
      editorRoot.removeChild(editorContainer);
    };
  }, []);


  const updateEditorContent = useCallback((text: string) => {
    if (!view) {
      return;
    }
  
    const { state, dispatch } = view;
    const tr = state.tr.insertText(text);
    dispatch(tr);
  }, [view]);
  


  const [messagas] = useCollection(session&&query(collection(db,"users",session?.user?.email!,"WriteFile",fileID,"promptRes"),orderBy("timeStemp","asc")))
  
  {messagas?.docs.map((message)=>
     //console.log(message.data())
  {   if(message.data().prompt.role == "assistant"){
     updateEditorContent(` \n\n ---------------- \n \n`+ message.data().prompt.content)
    }}
  //  msg.push(message.text.content)
    )}

  // Call this function to update the editor content


  return (
    <div className="border-gray-400 border-2 w-3/4 m-4"> 
      <div style={{ whiteSpace: "pre-line" }} id="editor-root"/>
      <div id="content" />
    </div>
  );
}
