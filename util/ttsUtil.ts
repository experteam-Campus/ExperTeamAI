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
  input: {ssml: `<speak>${text} </speak>`},
  voice: { languageCode: countrycodeArr, name:selectedLangCode/*, ssmlGender:'FEMALE'*/ },
  audioConfig: { audioEncoding: 'MP3', pitch: 0, speakingRate: 0.90 },
});





  
  const outputFile = 'output.mp3';
  const fileContent = response.audioContent;
  ///const writeFile = util.promisify(fs.writeFile);


if (fileContent) {
  await util.promisify(fs.writeFile)(outputFile, fileContent, 'binary');
  let fileContentUint8Array: Uint8Array;

  if (typeof fileContent === 'string') {
    const textEncoder = new TextEncoder();
    fileContentUint8Array = textEncoder.encode(fileContent);
  } else {
    fileContentUint8Array = fileContent;
  }

  const storageRef = ref(storage, `audioFiles/output.mp3`);
  await uploadBytes(storageRef, fileContentUint8Array);
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
  console.log('Error: response audioContent is undefined or null');
}

}
