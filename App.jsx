import React, { useEffect } from "react";
import MapComponent from "./src/Components/MapComponent";
import { SafeAreaView, View } from "react-native";
import { getScooters, addUser, scooterRegistered, getHistoryOfUser, getUnreservedScootersIds, getRentUserHistory } from "./src/utils/Firebase";


export default function App() {
//   useEffect(() => {
//     getScooters().then((res)=>{console.log(res)});
// }, []);

  useEffect(() => {
    getRentUserHistory(123);
    // getUnreservedScootersIds()
  })
  
  return (
    <SafeAreaView className="w-full h-full bg-black">
      <MapComponent />
    </SafeAreaView>
  );
}
