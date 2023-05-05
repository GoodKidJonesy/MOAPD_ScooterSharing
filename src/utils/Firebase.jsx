// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

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

//Return user
export const getUser = async (user) => {
  const userQuery = query(collection(db, "users"), where("ID", "==", user.ID));
  const userSnapshot = await getDocs(userQuery);
  const userArr = [];
  userSnapshot.forEach((docs) => {
    userArr.push(docs.data());
  });
  return userArr[0];
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

//Get scooter from ID
export const getScooter = async (scooterID) => {
  const scooterQuery = query(
    collection(db, "scooters"),
    where("ID", "==", scooterID)
  );
  const scooterSnapshot = await getDocs(scooterQuery);
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

//Set Current Scooter
const setCurrentScooter = async (docsID, scooterID) => {
  updateDoc(doc(db, "users", docsID), {
    currentScooter: scooterID,
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
    const userSnapshot = await getDocs(collection(db, "users"));
    scooterSnapshot.forEach((docs) => {
      if (docs.data().ID === scooter.ID) {
        reserveScooter(docs.id);
      }
    });
    userSnapshot.forEach((docs) => {
      if (docs.data().ID === user.ID) {
        setCurrentScooter(docs.id, scooter.ID);
      }
    });
    return true;
  }
};

//End a ride
export const endRide = async (user, scooter) => {
  isReserved = await isScooterReserved(scooter);

  if (!isReserved) {
    console.log("not reserved");
    return false;
  } else {
    const scooterSnapshot = await getDocs(collection(db, "scooters"));
    const historySnapshot = await getDocs(collection(db, "historyOfUser"));
    const userSnapshot = await getDocs(collection(db, "users"));

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
        userSnapshot.forEach((docs) => {
          if (docs.data().ID === user.ID) {
            setCurrentScooter(docs.id, 0);
          }
        });

        const timeStarted = new Date(docs.data().startTime);
        const timeEnded = new Date();

        const diffInSeconds =
          (timeEnded.getTime() - timeStarted.getTime()) / 1000;

        const price = diffInSeconds * (5 / 60);

        updateDoc(doc(db, "historyOfUser", docs.id), {
          endTime: Date(),
          timeSpentInSeconds: diffInSeconds.toFixed(0),
          pricePaid: price.toFixed(2),
        });
      }
    });
  }
};

//Generate a user in database
export const GenerateUser = async (email, password) => {
  const exists = await checkUserExistance(email);
  if (exists) {
    return false;
  } else {
    addDoc(collection(db, "users"), {
      email: email,
      password: password,
      ID: 1,
      currentScooter: 0,
    });
    return true;
  }
};

export const getScooterImage = async (scooter) => {
  const imageRef = ref(storage, `images/${scooter.ID}.png`);
  return await getDownloadURL(imageRef);
};

export const updateScooterImage = async (scooterID, uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  try {
    const imageRef = ref(storage, `images/${scooterID}.png`);
    const result = await uploadBytes(imageRef, blob);
  } catch (error) {
    alert(error);
  }

  blob.close();
};

//Generate report in database
export const generateReport = async (message, scooter) => {
  addDoc(collection(db, "reports"), {
    message: message,
    scooterID: scooter.ID,
  });
};
