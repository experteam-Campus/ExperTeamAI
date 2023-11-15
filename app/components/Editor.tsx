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
    const tr = state.tr.delete(1, state.doc.content.size) // Delete existing content from start to end
    .insert(1, state.schema.text(text)); // Insert new text at the beginning
    dispatch(tr);
  }, [view]);
  

  const [messagas] = useCollection(session&&query(collection(db,"users",session?.user?.email!,"WriteFile",fileID,"promptRes"),orderBy("timeStemp","asc")));
  // Call this function to update the editor content;


  {messagas?.docs.map((message)=>
  { 
    if(message.data().text.role == "assistant"){
     console.log(message.data());
     updateEditorContent(` \n\n ---------------- \n \n`+ message.data().text.content);
    }}
  // msg.push(message.text.content);
  )}

  return (
    <div className=" w-3/4 m-4 editor-container rounded-xl  border border-solid border-white backdrop-blur-[28.5px]   z-50" style={{ 
      background: 'rgba(255, 255, 255, 0.57)'
  }}> 

      <div style={{ whiteSpace: "pre-line" }} id="editor-root" />
      <div id="content" />
    </div>
  );
}