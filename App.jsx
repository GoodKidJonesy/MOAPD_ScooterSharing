import React from "react";
import MapComponent from "./src/Components/MapComponent";
import { SafeAreaView, View } from "react-native";

export default function App() {
  console.log(user);
  return (
    <SafeAreaView className="w-full h-full bg-black">
      <MapComponent />
    </SafeAreaView>
  );
}
