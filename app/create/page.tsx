
import { authOptions } from '../../pages/api/auth/[...nextauth]';

import { getServerSession } from 'next-auth';
import SessionProvider from '../components/SessionProvider';


import React from 'react'
import Editor from '../components/Editor'
import Qform from '../components/Qform'



export default async function page() {


  
{/*
    const state = EditorState.create({ schema: mySchema });


    const opts = {
        getImageBuffer(src: string) {
          return anImageBuffer;
        },
      };


      const wordDocument = defaultDocxSerializer.serialize(state.doc, opts);

await writeDocx(wordDocument, (buffer) => {
  writeFileSync('HelloWorld.docx', buffer);
});
*/}

const session = await getServerSession(authOptions);
  return (
<div className='flex justify-end'>
<SessionProvider session={session}>
<Qform></Qform>
</SessionProvider>
 {/*<Editor></Editor>*/}
</div>

  )
}
