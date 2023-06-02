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
import { v4 as uuidv4 } from 'uuid';




export async function generateSpeech(text: string, session: any,selectedLangCode:any,ssmlGender:any,countrycodeArr:any) {
  console.log(session);

   
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS as string);

  const client = new TextToSpeechClient({
    credentials,
  });

  const [result] = await client.listVoices({});
  const voices = result.voices;
/*
  if (voices) {
    console.log('Voices:');
    voices.forEach((voice) => {
      console.log(`Name: ${voice.name}`);
      console.log(`SSML Voice Gender: ${voice.ssmlGender}`);
      console.log(`Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
      const languageCodes = voice.languageCodes;
      if (languageCodes) {
        console.log(`  Supported language codes: ${languageCodes.join(', ')}`);
      }
    });
  } else {
    console.log('No voices found.');
  }*/
let count = 0;

console.log(selectedLangCode);
console.log(ssmlGender);



for(var i=0;i<=selectedLangCode.length;i++){
  let str = selectedLangCode;

if(str[i] ==='-'){
  count++;
if(count === 2){
  countrycodeArr = str.slice(0, i);
}};
//  alert(countrycodeArr);
}
console.log(countrycodeArr);

if(ssmlGender=='Men'){
  ssmlGender=='MALE'
}
if(ssmlGender=='Female'){
  ssmlGender=='FEMALE'
}

const [response] = await client.synthesizeSpeech({
  input: { ssml: `<speak>${text} </speak>` },
  voice: { languageCode: countrycodeArr, name: selectedLangCode },
  audioConfig: { audioEncoding: 'MP3', pitch: 0, speakingRate: 0.90 },
});

const fileContent = response.audioContent; // this could be a string or a Buffer/Uint8Array

if (fileContent instanceof Uint8Array) { // checks if it's a Buffer/Uint8Array
  const storageRef = ref(storage, `audioFiles/output+${uuidv4()}+.mp3`);

  // Convert the Node.js Buffer to a Uint8Array
  const uint8Array = new Uint8Array(fileContent.buffer, fileContent.byteOffset, fileContent.byteLength);

  // Upload the Uint8Array data directly to Firebase Storage
  await uploadBytes(storageRef, uint8Array);

  const downloadURL = await getDownloadURL(storageRef);

  // Save the download URL to your database using Firebase Firestore
  const docRef = await addDoc(collection(db, 'tts_files'), {
    url: downloadURL,
    timestamp: serverTimestamp(),
    user: session.user.email,
  });

  console.log('File available at', downloadURL);
  return downloadURL;
} else {
  console.log('Error: response.audioContent is not a Buffer/Uint8Array');
}


}
