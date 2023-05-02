import { initializeApp, } from "firebase/app";
import firestore from '@react-native-firebase/firestore';


// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_APIKEY,
//     authDomain: process.env.FIREBASE_AUTHDOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECTID,
//     storageBucket: process.env.FIREBASE_STORAGEBUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAING_SENDER_ID,
//     appId: process.env.FIREBASE_APPID
// };

const firebaseConfig = {
    apiKey: "AIzaSyC9D_mvijKjsgeB563KJrk4cjBDvHu_iPc",
    authDomain: "scootersharing-24093.firebaseapp.com",
    databaseURL: "https://scootersharing-24093-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "scootersharing-24093",
    storageBucket: "scootersharing-24093.appspot.com",
    messagingSenderId: "173872272122",
    appId: "1:173872272122:web:fb92f71a7078c3272d2f43"
  };


const firebase = initializeApp(firebaseConfig);

export const user = await firestore().collection('users').doc('6IsXLQa3IUEIwpcCcpJn').get();