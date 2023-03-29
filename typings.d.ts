interface Messages{
    text:string;
    timeStemp:OfflineAudioCompletionEventInit.firestore.timeStemp;
    user:{
        _id:string;
        name:string;
        userImg:string;
    }
}



interface RequestTTS {
    input: {
        text: string;
    };
    voice: {
        languageCode: any;
        ssmlGender: string;
    };
    audioConfig: {
        audioEncoding: string;

    }; 

}


interface voice{
    text:string,
    voice:any  ,
    timeStemp:OfflineAudioCompletionEventInit.firestore.timeStemp,
  }