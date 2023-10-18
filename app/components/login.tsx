'use client'
import React from 'react'
import { signIn } from 'next-auth/react';
import LogoPic from '../../public/assets/fullLogo.png';
import Image from 'next/image';


export default function Login() {
  return (
    <div>
      <div className='relative'>
     <Image src={LogoPic} alt="Experteam AI logo" className='m-auto w-[204px] fixed left-8 top-6'/>
     </div>
    <div className='flex justify-around mt-[10%]'>
<div>
  <h1 className='welcomeH1'>Welcome</h1>
 
  <p className='welcomeP'>
  <span className='meetBinaP'>
  תכירו את <span className='Bina'>בינה</span>
  </span>
  <br/>
  פלטפורמת ה-AI שלנו,
  <br/>
  כאן מתחיל המסע שלכם.
  </p>
</div>


<div className=''>
  <p className='WelcomeSecP'>
  "ברוכים הבאים לעתיד של זרימת עבודה
  <br/>
  יצירתית! הפלטפורמה שלנו המופעלת
  <br/>
  באמצעות AI,  אשר תשפר את עבודתינו 
  <br/>
  ותספק כלים חכמים שמשפרים את היעילות
  <br/>
  ותשחרר את יצירתיות." 
  </p>

   

  <div className='flex flex-col'>
    <button className='logoutBTN float-left m-5 pt-2 pb-2 pl-8 pr-10 flex group w-44 mr-0 mb-1'  onClick={()=> signIn()}>
  <div className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067] gap-[14px] pl-2'>
התחברות

        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
        <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
         </div>
  </div>
   </button>

  </div>
   <p>*חיבור באמצעות המייל האישי יאפשר לכם לנהל את התוכן שלכם בקלות</p>
   </div>     
  </div>
  </div>
  )
}


{/**

<div className='absolute float-left w-full'>
    <Link href={backtoHome} className="logoutBTN float-left m-5 pt-2 pb-2 pl-8 pr-10 flex group" >
        <button className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067] gap-[14px]' onClick={()=> logout()}>
         התנתקות
         <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
        <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
         </div>
        </button>
      
    </Link></div>

*/}