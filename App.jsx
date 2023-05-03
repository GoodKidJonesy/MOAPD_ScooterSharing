import React, { useEffect } from "react";
import MapComponent from "./src/Components/MapComponent";
import NavBar from "./src/Components/NavBar";
import { View } from "react-native";
import { getScooters, addUser, scooterRegistered, getHistoryOfUser, getUnreservedScootersIds, getRentUserHistory } from "./src/utils/Firebase";

export default function App() {
  useEffect(() => {
    getRentUserHistory(123);
    // getUnreservedScootersIds()
  })
  
  return (
    <View className="w-full h-full bg-black">
      <MapComponent />
      <NavBar />
    </View>
  );
}
