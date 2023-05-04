import React, { useContext, useState } from "react";
import { View } from "react-native";
import MapComponent from "../Components/MapComponent";
import NavBar from "../Components/NavBar";

export default function UserFlow() {
  return (
    <View className="w-full h-full bg-black">
      <MapComponent />
      <NavBar />
    </View>
  );
}
