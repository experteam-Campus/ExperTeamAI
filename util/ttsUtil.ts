 import { TextToSpeechClient } from '@google-cloud/text-to-speech';
 import * as fs from 'fs';
 import * as util from 'util';
 import { setDoc,addDoc, collection, serverTimestamp,doc, getDoc, QuerySnapshot, QueryDocumentSnapshot, getDocs, query, orderBy } from 'firebase/firestore'
 import { useCollection } from 'react-firebase-hooks/firestore'
 import { db, storage } from '../firebase'
 import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
 import { adminDb } from '../firebaseAdmin';


 const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS as string);

  const client = new TextToSpeechClient({
  credentials,
  });

        export async function generateSpeech(text:string, session:any) {

      console.log(session)

        const [response] = await client.synthesizeSpeech({
          input: { text },
          voice: { languageCode: 'he-IL', ssmlGender: 'FEMALE' },
          audioConfig: { audioEncoding: 'MP3', pitch:0,speakingRate: 1},
        });
      


        const outputFile = 'public/output.mp3';
        const fileContent = response.audioContent;
        const writeFile = util.promisify(fs.writeFile);
        console.log(fileContent);


        const storageBase = storage as any
        const storageRef = ref(storage, 'output.mp3');



       //return fileContent;
       if (fileContent) {
        await util.promisify(fs.writeFile)(outputFile, fileContent, 'binary');
        //const cityRef = doc(db, 'cities', 'BJ');
       // setDoc(cityRef, { capital: true }, { merge: true });


        const storageRef = ref(storage, `output.mp3`);
        console.log(storageRef)
        const textEncoder = new TextEncoder();


        let fileContentUint8Array: Uint8Array;

      if (typeof fileContent === 'string') {
         fileContentUint8Array = textEncoder.encode(fileContent);

    return fileContentUint8Array
  
      }
       
       else {
        fileContentUint8Array = fileContent;
      
       }
  
       // const uploadTask = uploadBytes(storageRef, fileContentUint8Array);
       // console.log(uploadTask)



       // await uploadTask.then(async () => {
         // const downloadURL = await getDownloadURL(storageRef);
         // console.log('File available at', downloadURL);
    

          //const doc = await addDoc(collection(db, "users", session?.user?.email!, "tts_files"),{ userId:session?.user?.email!,   url: downloadURL, timeStamp:serverTimestamp(),text:text});

          // Save the download URL to your database using Firebase Firestore

        /* await adminDb.collection("users").doc(session?.user?.email).collection("TTS").doc('123').collection("Tts_files").add({
            url: downloadURL,
            timestamp: serverTimestamp(),
            user: session.user.email,
          });*/



       /*   const docRef = await addDoc(collection(db, 'tts_files'), {
            url: downloadURL,
            timestamp: serverTimestamp(),
            user: session.user.email,
          });*/
       // });
    
       return fileContent;
      } else {
        console.log('Error: response audioContent is undefined or null');
      }


      }




     


