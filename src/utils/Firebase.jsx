// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9D_mvijKjsgeB563KJrk4cjBDvHu_iPc",
  authDomain: "scootersharing-24093.firebaseapp.com",
  databaseURL:
    "https://scootersharing-24093-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scootersharing-24093",
  storageBucket: "scootersharing-24093.appspot.com",
  messagingSenderId: "173872272122",
  appId: "1:173872272122:web:fb92f71a7078c3272d2f43",
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
export const getUnreservedScootersIds = async () => {
  const getUnReservedScooters = query(
    collection(db, "scooters"),
    where("isReserved", "==", false)
  );

  const scooterSnapshot = await getDocs(getUnReservedScooters);
  const unReservedScootersArr = [];
  scooterSnapshot.forEach((doc) => {
    unReservedScootersArr.push(doc.data());
  });
  return unReservedScootersArr;
};

export const getUserHistory = async (userName) => {
  const getHistoryQuery = query(
    collection(db, "historyOfUser"),
    where("userID", "==", userName)
  );
  const historySnapshot = await getDocs(getHistoryQuery);
  const userHistoryArr = [];
  historySnapshot.forEach((doc) => {
    userHistoryArr.push(doc.data());
  });
  return userHistoryArr;
};

export const checkUserLogin = async (email, password) => {
  const userQuery = query(
    collection(db, "users"),
    where("email", "==", email),
    where("password", "==", password)
  );
  const userSnapshot = await getDocs(userQuery);
  const userArr = [];
  userSnapshot.forEach((docs) => {
    userArr.push(docs.data());
  });
  return userArr.length > 0 ? userArr[0] : null;
};

export const checkUserExistance = async (email) => {
  const userQuery = query(collection(db, "users"), where("email", "==", email));
  const userSnapshot = await getDocs(userQuery);
  const userArr = [];
  userSnapshot.forEach((docs) => {
    userArr.push(docs.data());
  });
  return userArr.length > 0 ? true : false;
};

export const GenerateUser = async (email, password) => {
  const exists = await checkUserExistance(email);
  if (exists) {
    return false;
  } else {
    addDoc(collection(db, "users"), {
      email: email,
      password: password,
    });
    return true;
  }
};

// fetch from db

export const getScooters = async () => {
  const scooterSnapshot = await getDocs(collection(db, "scooters"));
  const scootersArr = [];
  scooterSnapshot.forEach((doc) => {
    scootersArr.push(doc.data());
  });
  return scootersArr;
};

export const getUser = async (user) => {
  const userDocument = await getDoc(doc(db, "users", user));
  return userDocument.data();
};

export const getHistoryOfUser = async (userName) => {
  const historySnapshot = await getDocs(collection(db, "historyOfUser"));
  historySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};

//inserts to db

export const addScooterToHistory = async (scooterName, userName) => {
  const docRef = await addDoc(collection(db, "historyOfUser"), {
    scooterName: scooterName,
    userName: userName,
    date: Date().toString(),
  });
};

export const addUser = async (username, password, email) => {
  const docRef = await addDoc(collection(db, "users"), {
    username: username,
    password: password,
    email: email,
  });
};

//update
