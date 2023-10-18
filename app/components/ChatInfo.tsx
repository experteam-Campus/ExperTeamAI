import { ChatBubbleOvalLeftEllipsisIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, deleteDoc, orderBy, query, doc, getDoc, updateDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { useEffect } from 'react'
import { text } from 'stream/consumers'

type Props = {
    id: string,
    name:string
}

export default function ChatInfo({id,name}:Props) {

const pathName = usePathname();
const router = useRouter();
const {data:session} = useSession();
const [active, setActive] = useState(false);
const [edit, setEdit] = useState(false);
const [newchatNameTxt, setNewchatNameTxt] = useState('');
const [chatNames, setChatNames] = useState<string[]>([]);

//console.log(name)

const [messages] = useCollection(query(
    collection(db, 'users', session?.user?.email!, 'chats',id, 'messages'),orderBy('timeStamp', 'asc')
));


{/*const [chatInfoData] = useCollection(query(
  collection(db,'users',session?.user?.email!, 'chats',id)
))*/}
//console.log(session?.user?.image) 

useEffect(() => {
  if (!pathName) return;
  //fetchChatNames();
setActive(pathName.includes(id))
}, [pathName])


{/*Delete chat */}

const deleteChat =async () => {
    await deleteDoc(doc(db,'users',session?.user?.email!, 'chats',id))
    console.log('delete')
    router.replace('/chat')
}


let chatField = `צ'אט חדש`;
let chatFieldArray ;
const renameChat =async () => {
  const docRef = doc(db, 'users', session?.user?.email!, 'chats', id);

setEdit(true)
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   chatField = docSnap.data().chatName;
   //chatFieldArray=docRefChats.data()

    console.log('Chats field:', chatField);
    setNewchatNameTxt(chatField)
    console.log('newchatNameTxt:', newchatNameTxt);

  //console.log('chatFieldArray:', chatFieldArray);
  } else {
    console.error('No such document!');
  }
}

const docRef = doc(db, 'users', session?.user?.email!, 'chats', id);


{/*
const updateChatName =async () => {

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   chatField = docSnap.data().chatName;

    console.log('Chats field:', chatField);

  } else {
    console.error('No such document!');
  }
}*/}


async function updateChatFieldName(newName:string) {
  await updateDoc(docRef, {
    chatName: newName  // Assuming chatName is the field you want to update
  });
  setEdit(false);
  //fetchChatNames();
  //reloadPage();
}


async function fetchChatNames() {
  const chatsCollectionRef = collection(db, 'users', session?.user?.email || '', 'chats');
  const q = query(chatsCollectionRef);  // optional, use if you need to apply conditions
  const querySnapshot = await getDocs(q);

  let chatNames:any = querySnapshot.docs.map(doc => doc.data().chatName);
  console.log(chatNames);
  setChatNames(chatNames);
}




  return ( 
   
    <Link href={`/chat/${id}`} className={`group  justify-between chatInfoBTN mb-2 flex p-3 bg-[#FFF] rounded-md text-[#FF3067] hover:bg-[#FF3067]   ${active && `border-2 border-[#FF3067] hover:shadow-none`} ${edit && `pr-1`}`}>
  <div>   

      <p  className={`flex-1 truncate m-0 ${edit && `hidden`}`}>
        {name}
      </p>


<input type="text" className={`${!edit && `hidden`} text-[#FF3067] w-40 pr-2 rounded-sm`} value={newchatNameTxt} onChange={(e)=>setNewchatNameTxt(e.target.value)}/>
</div>


<div className='flex gap-5'>

<button onClick={renameChat} className={`hover:text-[#FF3067] group-hover:text-white ${edit && `hidden`}`}>
<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
<path d="M20.9014 19.3362C20.9014 19.7945 20.5264 20.1695 20.068 20.1695C18.7847 20.1695 18.1597 19.2362 17.7097 18.5446C17.293 17.9197 17.0847 17.6697 16.7347 17.6697C16.3097 17.6697 15.9847 18.0364 15.4764 18.628C14.893 19.3196 14.168 20.1695 12.9514 20.1695C11.7347 20.1695 11.018 19.3112 10.4514 18.6113C9.96803 18.028 9.65137 17.6697 9.2347 17.6697C8.9097 17.6697 8.7097 17.878 8.26803 18.428C7.66803 19.1612 6.84303 20.1695 5.06803 20.1695C2.76803 20.1695 0.901367 18.303 0.901367 16.0032C0.901367 13.7035 2.76803 11.837 5.06803 11.837C5.52637 11.837 5.90137 12.212 5.90137 12.6702C5.90137 13.1285 5.52637 13.5035 5.06803 13.5035C3.69303 13.5035 2.56803 14.6284 2.56803 16.0032C2.56803 17.3781 3.69303 18.503 5.06803 18.503C6.05137 18.503 6.4597 18.003 6.97637 17.3698C7.47637 16.7615 8.09303 16.0032 9.2347 16.0032C10.4597 16.0032 11.168 16.8615 11.7347 17.5614C12.218 18.1447 12.5347 18.503 12.9514 18.503C13.368 18.503 13.7014 18.1363 14.2097 17.5447C14.793 16.8531 15.518 16.0032 16.7347 16.0032C17.9514 16.0032 18.643 16.9365 19.093 17.6281C19.5097 18.253 19.718 18.503 20.068 18.503C20.5264 18.503 20.9014 18.8779 20.9014 19.3362ZM8.39303 13.5035H9.17637C10.0597 13.5035 10.9097 13.1535 11.5347 12.5286L17.968 6.09593L14.9764 3.10458L8.54303 9.53724C7.91803 10.1622 7.56803 11.0121 7.56803 11.8953V12.6786C7.56803 13.1369 7.9347 13.5035 8.39303 13.5035ZM20.2847 3.7795C20.6847 3.37955 20.9014 2.84627 20.9014 2.27966C20.9014 1.71305 20.6847 1.17978 20.2847 0.78815C19.4597 -0.0367644 18.118 -0.0367644 17.293 0.78815L16.1597 1.92136L19.1514 4.91272L20.2847 3.7795Z" fill="currentColor"/>
</svg>
</button>


<button onClick={()=>updateChatFieldName(newchatNameTxt)} className={`hover:text-[#FF3067] group-hover:text-white ${!edit && `hidden`}`}>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
</svg>
</button>


<button onClick={()=>setEdit(false)} className={`hover:text-[#FF3067] group-hover:text-white ${!edit && `hidden`}`}>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M6.4 15L10 11.4L13.6 15L15 13.6L11.4 10L15 6.4L13.6 5L10 8.6L6.4 5L5 6.4L8.6 10L5 13.6L6.4 15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
</svg>
</button>

<button onClick={deleteChat} className={`hover:text-[#FF3067] group-hover:text-white ${edit && `hidden`}`}>
<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none">
<path d="M16.2953 2.09916H11.4375V1.5084C11.4375 0.6768 10.7607 0 9.9291 0H7.76154C6.92958 0 6.25314 0.6768 6.25314 1.5084V2.09916H1.3953C1.0605 2.09916 0.789062 2.38356 0.789062 2.73456V3.4704C0.789062 3.8214 1.0605 4.1058 1.3953 4.1058H16.2953C16.6301 4.1058 16.9016 3.8214 16.9016 3.4704V2.73456C16.9016 2.38356 16.6301 2.09916 16.2953 2.09916ZM7.25646 1.5084C7.25646 1.22976 7.4829 1.00332 7.76154 1.00332H9.9291C10.2077 1.00332 10.4342 1.22976 10.4342 1.5084V2.09916H7.25646V1.5084Z" fill="currentColor"/>
<path d="M16.1551 4.81932H1.53519C1.21119 4.81932 1.04883 5.01732 1.04883 5.26176V5.77404C1.04883 6.01848 1.21119 6.21648 1.53519 6.21648L3.40215 19.5718C3.46479 19.9937 3.84711 20.3389 4.25175 20.3389H13.4379C13.8425 20.3389 14.2248 19.9937 14.2875 19.5718L16.1544 6.21648C16.4784 6.21648 16.6408 6.01848 16.6408 5.77404V5.26176C16.6408 5.01732 16.4784 4.81932 16.1544 4.81932H16.1551ZM6.03843 18.2747C6.02079 18.2761 6.00315 18.2768 5.98551 18.2768C5.63955 18.2768 5.34687 18.0104 5.31951 17.6602L4.59555 7.60392C4.56675 7.23564 4.84179 6.9138 5.21043 6.88464C5.57871 6.85548 5.90055 7.13088 5.92935 7.49952L6.65331 17.5558C6.68211 17.924 6.40707 18.2459 6.03843 18.275V18.2747ZM9.51423 17.6076C9.51423 17.977 9.21471 18.2765 8.84535 18.2765C8.47599 18.2765 8.17647 17.977 8.17647 17.6076V7.55136C8.17647 7.182 8.47599 6.88248 8.84535 6.88248C9.21471 6.88248 9.51423 7.182 9.51423 7.55136V17.6076ZM13.0955 7.60356L12.3715 17.6598C12.3442 18.0104 12.0511 18.2765 11.7052 18.2765C11.6875 18.2765 11.6699 18.2758 11.6523 18.2743C11.284 18.2455 11.0086 17.9237 11.0374 17.555L11.7613 7.4988C11.7901 7.13052 12.1116 6.85512 12.4806 6.88392C12.8489 6.91272 13.1243 7.23456 13.0955 7.6032V7.60356Z" fill="currentColor"/>
</svg>
</button>
</div>

 </Link> 
   )
}
