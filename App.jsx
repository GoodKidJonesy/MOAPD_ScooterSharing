import React from "react";
import MapComponent from "./src/Components/MapComponent";
import { SafeAreaView, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView className="w-full h-full bg-black">
      <MapComponent />
    </SafeAreaView>
  );
}
