// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc } from "firebase/firestore";
import {ref, set} from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9D_mvijKjsgeB563KJrk4cjBDvHu_iPc",
  authDomain: "scootersharing-24093.firebaseapp.com",
  databaseURL: "https://scootersharing-24093-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scootersharing-24093",
  storageBucket: "scootersharing-24093.appspot.com",
  messagingSenderId: "173872272122",
  appId: "1:173872272122:web:fb92f71a7078c3272d2f43"
};

// const firebaseConfig = {
//     apiKey: FIREBASE_APIKEY,
//     authDomain: FIREBASE_AUTHDOMAIN,
//     databaseURL: FIREBASE_DATABASE_URL,
//     projectId: FIREBASE_PROJECTID,
//     storageBucket: FIREBASE_STORAGEBUCKET,
//     messagingSenderId: FIREBASE_MESSAING_SENDER_ID,
//     appId: FIREBASE_APPID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addUser = async(username, password, email) => {
  const docRef = await addDoc(collection(db, "users"), {
    username: username,
    password: password,
    email: email,
  });
};

export const getScooters = async() => {
  const scooterSnapshot = await getDocs(collection(db, "scooters"));
  scooterSnapshot.forEach((doc) => {
    return doc.data();
  });
};

export const getUser = async(user) => {
  const userDocument = await getDoc(doc(db, "users", user));
  return userDocument.data();
};

export const addScooterToHistory = async(scooterName, userName) => {
  const docRef = await addDoc(collection(db, "historyOfUser"), {
    scooterName: scooterName,
    userName: userName,
    date: Date().toString(),  
  });
};

export const getHistoryOfUser = async(userName) => {
   const querySnapshot = await getDocs(collection(db, "historyOfUser"));
   querySnapshot.forEach((doc) => {
     console.log(doc.data());
   });
};


