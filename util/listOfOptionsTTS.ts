
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as fs from 'fs';
import * as util from 'util';
import {
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  QuerySnapshot,
  QueryDocumentSnapshot,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, storage } from '../firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from 'firebase/storage';
import { adminDb } from '../firebaseAdmin';
import { useState } from 'react';


export const config = {
  runtime: "edge",
};




export async function listOfOptions() {
  //console.log(session);

  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS as string);

  const client = new TextToSpeechClient({
    credentials,
  });

  const [result] = await client.listVoices({});
  const voices = result.voices;

  const voiceToPersonMapping:any = {
    'af-ZA-Standard-A': { name: 'Alice', image: '/images/alice.jpg', voiceCode:'af-ZA-Standard-A' },
    'id-ID-Standard-A': { name: 'Indah', image: '/images/indah.jpg', voiceCode:'id-ID-Standard-A' },
    'ar-XA-Wavenet-A':{ name: 'Indah', image: '/images/indah.jpg', voiceCode:'ar-XA-Wavenet-A' },
    'ar-XA-Wavenet-B':{ name: 'Indah', image: '/images/indah.jpg', voiceCode:'ar-XA-Wavenet-B' },
    'ar-XA-Wavenet-C':{ name: 'Indah', image: '/images/indah.jpg', voiceCode:'ar-XA-Wavenet-C' },
    'ar-XA-Wavenet-D':{ name: 'Indah', image: '/images/indah.jpg' , voiceCode:'ar-XA-Wavenet-D'},
    'ar-XA-Standard-A':{ name: 'Indah', image: '/images/indah.jpg' , voiceCode:'ar-XA-Standard-A'},
    'ar-XA-Standard-B':{ name: 'Indah', image: '/images/indah.jpg', voiceCode:'ar-XA-Standard-B'},
    'ar-XA-Standard-C':{ name: 'Indah', image: '/images/indah.jpg' , voiceCode:'ar-XA-Standard-C'},
    'ar-XA-Standard-D':{ name: 'Indah', image: '/images/indah.jpg' , voiceCode:'ar-XA-Standard-D'},
   //'ar-XA-Standard-D':{ name: 'Indah', image: '/images/indah.jpg' },

    // ... add more mappings
  };


  const lang = {lang:[
    'Afrikaans (Suid-Afrika)',
    'Arabic, multi-region',
    'Bahasa Indonesia (Indonesia)',
   ' Bahasa Melayu (Malaysia)',
    'Català (Espanya)',
    'Dansk (Danmark)',
    'Deutsch (Deutschland)',
    'English (Australia)',
   ' English (Great Britain)',
   ' English (India)',
    'English (United States)',
    'Español (España)',
   ' Español (Estados Unidos)',
    'Euskara (Espainia)',
    'Filipino (Pilipinas)',
    'Français (Canada)',
    'Français (France)',
    'Galego (España)',
    'Italiano (Italia)',
    'Latviešu (latviešu)',
    'Lietuvių (Lietuva)',
    'Magyar (Magyarország)',
    'Nederlands (Nederland)',
    'Norsk bokmål (Norge)',
    'Polski (Polska)',
    'Português (Brasil)',
    'Português (Portugal)',
    'Română (România)',
    'Slovenčina (Slovensko)',
    'Suomi (Suomi)',
    'Svenska (Sverige)',
    'Tiếng Việt (Việt Nam)',
    'Türkçe (Türkiye)',
    'Íslenska (Ísland)',
    'Čeština (Česká republika)',
    'Ελληνικά (Greek)',
   ' Български (Bulgarian)',
    'Русский (Russian)',
    'Српски (Serbian)',
    'Українська (Ukraine)',
   ' עברית (ישראל)',
    'Marathi (India)',
    'Hindi (India)',
    'Bangla (India)',
    'Gujarati (India)',
    'Tamil (India)',
    'Telugu (India)',
    'Kannada (India)',
    'Malayalam (India)',
    'Thailand (Thailand)',
   ' Mandarin (Taiwan)',
    'Cantonese (Hong Kong)',
   ' Japanese (Japan)',
    'Mandarin (Mainland China)',
    'Korean (Korea)']}


let listNameAF =<any>[];
let listNameAR =<any>[];
let listNameID =<any>[];
let listNameMS =<any>[];
let listNameCA =<any>[];
let listNameDA =<any>[];
let listNameDE =<any>[];
let listNameENGB =<any>[];
let listNameENAU =<any>[];
let listNameENIN =<any>[];
let listNameENUS =<any>[];
let listNameENES =<any>[];
let listNameESUS =<any>[];
let listNameEUES =<any>[];
let listNameFILPH =<any>[];
let listNameFRCA =<any>[];
let listNameFRFR =<any>[];
let listNameGLES =<any>[];
let listNameIT =<any>[];
let listNameLV =<any>[];
let listNameITLT =<any>[];
let listNameHU =<any>[];
let listNameNL =<any>[];
let listNameNBNO =<any>[];
let listNamePLPL =<any>[];
let listNamePTBR =<any>[];
let listNamePTPT =<any>[];
let listNameRORO =<any>[];
let listNameSKSK =<any>[];
let listNameFIFI =<any>[];
let listNameSVSE =<any>[];
let listNameVIVN =<any>[];
let listNameTRTR =<any>[];
let listNameISIS =<any>[];
let listNameCSCZ =<any>[];
let listNameELGR =<any>[];
let listNameBGBG =<any>[];
let listNameRURU =<any>[];
let listNameSRRS =<any>[];
let listNameUKUA =<any>[];
let listNameHEIL =<any>[];
let listNameMRIN =<any>[];
let listNameHIIN =<any>[];
let listNameBNIN =<any>[];
let listNameGUIN =<any>[];
let listNameTAIN =<any>[];
let listNameTEIN =<any>[];
let listNameKNIN =<any>[];
let listNameMLIN =<any>[];
let listNameTHTH =<any>[];
let listNameCMNTW =<any>[];
let listNameYUEHK =<any>[];
let listNameJAJP =<any>[];
let listNameCMNCN =<any>[];
let listNameKOKR =<any>[];
let languageCodesArray =<any>[];
let CountryCodesArray =<any>[];

let listGender =<any>['FEMALE','MALE'];

let Optionslist= [listNameAF,listNameAR,listNameID,listNameMS,listNameCA,listNameDA,listNameDE,listNameENAU,listNameENGB,listNameENIN,listNameENUS,listNameENES,listNameESUS,listNameEUES,listNameFILPH,listNameFRCA,listNameFRFR,listNameGLES,listNameIT,listNameLV,listNameITLT,listNameHU,listNameNL,listNameNBNO,listNamePLPL,listNamePTBR,listNamePTPT,listNameRORO,listNameSKSK,listNameFIFI,listNameSVSE,listNameVIVN,listNameTRTR,listNameISIS,listNameCSCZ,listNameELGR,listNameBGBG,listNameRURU,listNameSRRS,listNameUKUA,listNameHEIL,listNameMRIN,listNameHIIN,listNameBNIN,listNameGUIN,listNameTAIN,listNameTEIN,listNameKNIN,listNameMLIN,listNameTHTH,listNameCMNTW,listNameYUEHK,listNameJAJP,listNameCMNCN,listNameKOKR]

  if (voices) {
    console.log('Voices:');
    voices.forEach((voice) => {
    console.log( "voice");
    console.log( voice);

     console.log('voice.name?.slice(0, 5)');
     console.log(voice.name?.slice(0, 5));
      //  console.log(`  Supported language codes: ${languageCodes.join(', ')}`);
      if(voice.name?.slice(0, 5)=='af-ZA'){
       // const personInfo = voiceToPersonMapping[voice.name];
        //if (personInfo) {
     //     listNameAF.push(personInfo.name);  // Use the mapped person name
       // ... you can also use personInfo.image wherever you need the image ...
     // }

       // listNameAF.push(lang.lang[0]);
        listNameAF.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5));
       // listNameAF.push(voice.name?.slice(0, 5));
        //console.log( `-------------------${languageCodes}---------------------`);
      }
      
      if(voice.name?.slice(0, 5)=='ar-XA'){
       // listNameAR.push(lang.lang[1]);
        listNameAR.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
       //listNameAR.push(voice.name?.slice(0, 5));
      }
      if(voice.name?.slice(0, 5)=='id-ID'){
      //  listNameID.push(lang.lang[2]);
        listNameID.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      //  listNameID.push(voice.name?.slice(0, 5));
      }
      if(voice.name?.slice(0, 5)=='ms-MY'){
      //  listNameMS.push(lang.lang[3]);
        listNameMS.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='ca-ES'){
       // listNameCA.push(lang.lang[4]);
        listNameCA.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='da-DK'){
       // listNameDA.push(lang.lang[5]);
        listNameDA.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='de-DE'){
       // listNameDE.push(lang.lang[6]);
        listNameDE.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='en-AU'){
       // listNameENAU.push(lang.lang[7]);
        listNameENAU.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='en-GB'){
       // listNameENGB.push(lang.lang[8]);
        listNameENGB.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='en-IN'){
      //  listNameENIN.push(lang.lang[9]);
        listNameENIN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='en-US'){
       // listNameENUS.push(lang.lang[10]);
        listNameENUS.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='es-ES'){
      //  listNameENES.push(lang.lang[11]);
        listNameENES.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='es-US'){
       // listNameESUS.push(lang.lang[12]);
        listNameESUS.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='eu-ES'){
       // listNameEUES.push(lang.lang[13]);
        listNameEUES.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 6)=='fil-PH'){
       // listNameFILPH.push(lang.lang[14]);
        listNameFILPH.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 6))
      }
      if(voice.name?.slice(0, 5)=='fr-CA'){
        // listNameFILPH.push(lang.lang[15]);
       // console.log(voice.name);
         listNameFRCA.push(voice.name);
         CountryCodesArray.push(voice.name?.slice(0, 5))
       }
      if(voice.name?.slice(0, 5)=='fr-FR'){
       // listNameFILPH.push(lang.lang[15]);
        listNameFRFR.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='gl-ES'){
      //  listNameFRCA.push(lang.lang[16]);
        listNameGLES.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='it-IT'){
       // listNameFRFR.push(lang.lang[17]);
        listNameIT.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='gl-ES'){
       // listNameGLES.push(lang.lang[18]);
        listNameGLES.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }

      if(voice.name?.slice(0, 5)=='lv-LV'){
       // listNameLV.push(lang.lang[20]);
        listNameLV.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }

      if(voice.name?.slice(0, 5)=='lt-LT'){
       // listNameITLT.push(lang.lang[22]);
        listNameITLT.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='hu-HU'){
       // listNameHU.push(lang.lang[23]);
        listNameHU.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='nl-NL'){
       // listNameNL.push(lang.lang[24]);
        listNameNL.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='nb-NO'){
       // listNameNBNO.push(lang.lang[25]);
        listNameNBNO.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='pl-PL'){
      //  listNamePLPL.push(lang.lang[26]);
        listNamePLPL.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='pt-BR'){
      //  listNamePTBR.push(lang.lang[27]);
        listNamePTBR.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='pt-PT'){
      //  listNamePTPT.push(lang.lang[28]);
        listNamePTPT.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='ro-RO'){
       // listNameRORO.push(lang.lang[29]);
        listNameRORO.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='sk-SK'){
       // listNameSKSK.push(lang.lang[30]);
        listNameSKSK.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='fi-FI'){
      //  listNameFIFI.push(lang.lang[31]);
        listNameFIFI.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='sv-SE'){
      //  listNameSVSE.push(lang.lang[32]);
        listNameSVSE.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='vi-VN'){
     //   listNameVIVN.push(lang.lang[33]);
        listNameVIVN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='tr-TR'){
      //  listNameTRTR.push(lang.lang[34]);
        listNameTRTR.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='is-IS'){
      //  listNameISIS.push(lang.lang[35]);
        listNameISIS.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='cs-CZ'){
      //  listNameCSCZ.push(lang.lang[36]);
        listNameCSCZ.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      } 
      if(voice.name?.slice(0, 5)=='el-GR'){
        //listNameELGR.push(lang.lang[37]);
        listNameELGR.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='bg-BG'){
        //listNameBGBG.push(lang.lang[38]);
        listNameBGBG.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }

      if(voice.name?.slice(0, 5)=='ru-RU'){
        //listNameRURU.push(lang.lang[40]);
        listNameRURU.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='sr-RS'){
        //listNameSRRS.push(lang.lang[41]);
        listNameSRRS.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='uk-UA'){
        //listNameUKUA.push(lang.lang[42]);
        listNameUKUA.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='he-IL'){
        //listNameHEIL.push(lang.lang[43]);
        listNameHEIL.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='mr-IN'){
        //listNameMRIN.push(lang.lang[44]);
        listNameMRIN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='hi-IN'){
        //listNameHIIN.push(lang.lang[45]);
        listNameHIIN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='bn-IN'){
        //listNameBNIN.push(lang.lang[46]);
        listNameBNIN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='gu-IN'){
        //listNameGUIN.push(lang.lang[47]);
        listNameGUIN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='ta-IN'){
        //listNameTAIN.push(lang.lang[48]);
        listNameTAIN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='te-IN'){
        //listNameTEIN.push(lang.lang[49]);
        listNameTEIN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='kn-IN'){
        //listNameKNIN.push(lang.lang[50]);
        listNameKNIN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='ml-IN'){
        //listNameMLIN.push(lang.lang[51]);
        listNameMLIN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 5)=='th-TH'){
        //listNameTHTH.push(lang.lang[52]);
        listNameTHTH.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 6)=='cmn-TW'){
        //listNameCMNTW.push(lang.lang[53]);
        listNameCMNTW.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 6))
      }
      if(voice.name?.slice(0, 6)=='yue-HK'){
        //listNameYUEHK.push(lang.lang[54]);
        listNameYUEHK.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 6))
      }
      if(voice.name?.slice(0, 5)=='ja-JP'){
        //listNameJAJP.push(lang.lang[55]);
        listNameJAJP.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }
      if(voice.name?.slice(0, 6)=='cmn-CN'){
        //listNameCMNCN.push(lang.lang[56]);
        listNameCMNCN.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 6))
      }
      if(voice.name?.slice(0, 5)=='ko-KR'){
        //listNameKOKR.push(lang.lang[57]);
        listNameKOKR.push(voice.name);
        CountryCodesArray.push(voice.name?.slice(0, 5))
      }

     // listName.push(voice.name);

      //console.log(`SSML Voice Gender: ${voice.ssmlGender}`);
      //listGender.push(voice.ssmlGender);
      
      //console.log(`Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
      const languageCodes = voice.languageCodes;
      if (languageCodes) {
        languageCodesArray.push(languageCodes)
      }});

      let CountryCodesArrayUniq = [...new Set(CountryCodesArray)];

        return {Optionslist, listGender, lang, languageCodesArray,CountryCodesArrayUniq,CountryCodesArray, voiceToPersonMapping};

  } else {
    console.log('No voices found.');
  }



}
