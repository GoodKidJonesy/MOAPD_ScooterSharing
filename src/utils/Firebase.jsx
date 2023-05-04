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
  updateDoc,
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

// return list of unreserved scooters
export const getUnreservedScooters = async () => {
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

//return list of user rides
export const getUserHistory = async (user) => {
  const getHistoryQuery = query(
    collection(db, "historyOfUser"),
    where("userID", "==", user.ID)
  );
  const historySnapshot = await getDocs(getHistoryQuery);
  const userHistoryArr = [];
  historySnapshot.forEach((doc) => {
    userHistoryArr.push(doc.data());
  });
  return userHistoryArr;
};

//If login is valid return user object else return null
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

//Check if email is already found in database
export const checkUserExistance = async (email) => {
  const userQuery = query(collection(db, "users"), where("email", "==", email));
  const userSnapshot = await getDocs(userQuery);
  const userArr = [];
  userSnapshot.forEach((docs) => {
    userArr.push(docs.data());
  });
  return userArr.length > 0 ? true : false;
};

//Check if scooter is reserved
export const isScooterReserved = async (scooter) => {
  const scooterQuery = query(
    collection(db, "scooters"),
    where("ID", "==", scooter.ID)
  );
  const scooterSnapshot = await getDocs(scooterQuery);
  let response;
  scooterSnapshot.forEach((docs) => {
    response = docs.data();
  });
  return response.isReserved ? true : false;
};

//List of all scooters
export const getScooters = async () => {
  const scooterSnapshot = await getDocs(collection(db, "scooters"));
  const scootersArr = [];
  scooterSnapshot.forEach((doc) => {
    scootersArr.push(doc.data());
  });
  return scootersArr;
};

//Reserve a scooter
const reserveScooter = async (docsID) => {
  updateDoc(doc(db, "scooters", docsID), {
    isReserved: true,
  });
};

//Release a scooter
const releaseScooter = async (docsID) => {
  updateDoc(doc(db, "scooters", docsID), {
    isReserved: false,
  });
};

//Start a ride
export const startRide = async (user, scooter) => {
  isReserved = await isScooterReserved(scooter);
  if (isReserved) {
    return false;
  } else {
    addDoc(collection(db, "historyOfUser"), {
      scooterID: scooter.ID,
      userID: user.ID,
      startTime: Date(),
      endTime: null,
    });
    const scooterSnapshot = await getDocs(collection(db, "scooters"));
    scooterSnapshot.forEach((docs) => {
      if (docs.data().ID === scooter.ID) {
        reserveScooter(docs.id);
      }
    });
    return true;
  }
};

//End a ride
export const endRide = async (user, scooter) => {
  isReserved = await isScooterReserved(scooter);

  if (isReserved) {
    console.log("not reserved");
    return false;
  } else {
    const scooterSnapshot = await getDocs(collection(db, "scooters"));
    const historySnapshot = await getDocs(collection(db, "historyOfUser"));

    historySnapshot.forEach((docs) => {
      if (
        docs.data().endTime === null &&
        docs.data().userID === user.ID &&
        docs.data().scooterID === scooter.ID
      ) {
        scooterSnapshot.forEach((docs) => {
          if (docs.data().ID === scooter.ID) {
            releaseScooter(docs.id);
          }
        });
        updateDoc(doc(db, "historyOfUser", docs.id), {
          endTime: Date(),
        });
      }
    });
  }
};

//Generate a user in databse
export const GenerateUser = async (email, password) => {
  const exists = await checkUserExistance(email);
  if (exists) {
    return false;
  } else {
    addDoc(collection(db, "users"), {
      email: email,
      password: password,
      ID: 1,
    });
    return true;
  }
};