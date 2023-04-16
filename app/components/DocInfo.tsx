import React from 'react'
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';



type Props = {
    info:DocumentData,
   
}


export default function DocInfo({info}:Props) {
   let DocInfo = info.data()
  return (
    <Link href={`/create/file/${info.id}`} >
{/*console.log(new Date(info.timeStamp.seconds*1000))*/}
{/*new Date(info.data().timeStamp.seconds*1000).toDateString()*/}
    </Link>
  )
}


