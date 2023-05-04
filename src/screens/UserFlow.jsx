import React, { useContext, useState } from "react";
import { View } from "react-native";
import MapComponent from "../components/MapComponent";
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";

export default function UserFlow() {
  const { user, setUser } = useContext(UserContext);

  return (
    <View className="w-full h-full bg-black">
      <MapComponent />
      <NavBar />
    </View>
  );
}
