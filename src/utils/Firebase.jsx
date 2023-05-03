// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, query, where, onSnapshot, QuerySnapshot } from "firebase/firestore";
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


// query

// gets the ids of the unreserved scooters
export const getUnreservedScootersIds = async() => {

  const getUnReservedScooters = query(collection(db, 'scooters'), where('isReserved', '==', false))
  const isReservedSnapshot = onSnapshot(getUnReservedScooters, (querySnapshot) =>{
    const unReservedScooters = [];
    querySnapshot.forEach((doc) => {
        unReservedScooters.push(doc.data())
    });
    // console.log("scooterId: ", unReservedScooters.join(', '))
    return unReservedScooters;
   
  }) 
  return isReservedSnapshot
}

export const getRentUserHistory = async(userName) => {

  const getHistoryQuery = query(collection(db, 'historyOfUser'), where('userID', '==', userName))
  const getUserHistory = onSnapshot(getHistoryQuery, (querySnapshot) => {
    const userHistoryArr = [];
    querySnapshot.forEach((doc) => {
      userHistoryArr.push(doc.data())
    })
    // console.log('user: ', userHistoryArr.join(', '))
    return userHistoryArr;
  })
  // console.log(getUserHistory)
  return getUserHistory;
}


// fetch from db

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

export const getHistoryOfUser = async(userName) => {
  const historySnapshot = await getDocs(collection(db, "historyOfUser"));
  historySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};

//inserts to db

export const addScooterToHistory = async(scooterName, userName) => {
  const docRef = await addDoc(collection(db, "historyOfUser"), {
    scooterName: scooterName,
    userName: userName,
    date: Date().toString(),  
  });
};

export const addUser = async(username, password, email) => {
  const docRef = await addDoc(collection(db, "users"), {
    username: username,
    password: password,
    email: email,
  });
};

//update