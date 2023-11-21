'use client'
import React from 'react'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { CarouselProvider } from '../context/carouselContext';
import Carousel from './Carousel';




export default function Hello() {



  return (
 
    <div className='   flex justify-center flex-col relative top-[-43rem]'>
    <p className='HomeParagrph m-auto' >"ברוכים הבאים לעתיד של זרימת עבודה יצירתית! הפלטפורמה שלנו המופעלת באמצעות AI,  אשר תשפר את עבודתינו ותספק כלים חכמים שמשפרים את היעילות ותשחרר את יצירתיות."</p>
 
            {/*כפתור לרובוט */}
        <Link href={'/chat'} className="logoutBTN w-fit  m-auto pt-2 pb-2 pl-8 pr-10 flex group mt-10 mb-10" >
        <button className='font-normal text-white flex justify-center items-center hover:text-[#FF3067] group-hover:text-[#FF3067]'>
         צריך עזרה?
         <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
        <path d="M17.2278 3.27684L9.72688 10.7778C8.84103 11.6636 8.84103 13.1132 9.72688 13.999L17.2278 21.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
         </div>
        </button>
      
    </Link>

    {/*carousl*/}

    <CarouselProvider>
    <Carousel />
  </CarouselProvider>
    </div>
  
  )
}
