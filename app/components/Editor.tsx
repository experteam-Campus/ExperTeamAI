'use client'
import React from 'react'
import dynamic from 'next/dynamic';



import {  ImageExtension, ItalicExtension, CalloutExtension,DropCursorExtension } from 'remirror/extensions';
//import { Remirror, useRemirror } from '@remirror/react';

import { EditorComponent, Remirror, useRemirror,ThemeProvider, Toolbar } from '@remirror/react';
//import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';





export default function Editor() {

    //const imageSrc = 'https://dummyimage.com/2000x800/479e0c/fafafa';
   const RemirrorEditor = dynamic(() => import('@remirror/react').then((mod) => mod.Remirror), {
      ssr: false,
    });

    const remirrorJsonFromStorage = {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Hello world' }] },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Hello ' },
              { type: 'text', marks: [{ type: 'italic' }], text: 'word' },
            
            ],
          },
        ],
      };


    const { manager, state} = useRemirror({
        extensions: () => [
         // new BoldExtension(),
          new ItalicExtension(),
          new CalloutExtension({ defaultType: 'warn' }),
          //new DocExtension({ content: 'text*' }),
          new ImageExtension({ enableResizing: true }),
           new DropCursorExtension()
        ],
      
        // Set the initial content.
        content: '',
      
        // Place the cursor at the start of the document. This can also be set to
        // `end`, `all` or a numbered position.
        selection: 'start',
      
        // Set the string handler which means the content provided will be
        // automatically handled as html.
        // `markdown` is also available when the `MarkdownExtension`
        // is added to the editor.
        stringHandler: 'html',
      });
      
  return (
    <div className='remirror-theme'>
      <Remirror manager={manager} initialContent={state}>
        {/* The text editor is placed above the menu to make the zIndex easier to manage for popups */}
        <EditorComponent />
        <Toolbar />
      </Remirror>
    </div>
  )
}
