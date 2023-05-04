import React, { useContext, useState } from "react";
import { View } from "react-native";
import MapComponent from "../components/MapComponent";
import NavBar from "../components/NavBar";

export default function UserFlow() {
  return (
    <View className="w-full h-full bg-black">
      <MapComponent />
      <NavBar />
    </View>
  );
}
