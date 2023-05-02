import React from "react";
import { Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import database from '@react-native-firebase/database';
import {ref, set} from "@react-native-firebase/database";


const { width, height } = Dimensions.get("window");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function create(){
  set(ref(database, 'users/' + "hej"), {
    username: "hej",
    email: "hejemail",
  });
}

const reference = firebase
  .app()
  .database('https://scootersharing-24093-default-rtdb.europe-west1.firebasedatabase.app/')
  .ref('/users/123');


const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 55.660893,
  longitude: 12.591242,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function App() {
  return (
    <MapView
      className="h-full w-full"
    />
  );
}
