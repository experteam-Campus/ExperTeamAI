import React from 'react'
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';



type Props = {
    info:DocumentData,
   
}


export default function DocInfo({info}:Props) {
   let DocInfo = info.data()
   console.log(info)

  return (
    <Link href={`/create/file/${info.id}`} className="flex">
     
<p>
      {/*new Date(info.data().timeStamp.seconds*1000).toDateString()*/}
</p>
     <p>  מסמך</p>
{/*console.log(new Date(info.timeStamp.seconds*1000))*/}

    </Link>
  )
}


