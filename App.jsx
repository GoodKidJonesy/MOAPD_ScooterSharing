import React from "react";
import MapComponent from "./src/Components/MapComponent";
import NavBar from "./src/Components/NavBar";
import ScooterPopup from "./src/Components/ScooterPopup";
import { View } from "react-native";

export default function App() {
  return (
    <View className="w-full h-full bg-black">
      <MapComponent />
      <NavBar />
      <ScooterPopup />
    </View>
  );
}
