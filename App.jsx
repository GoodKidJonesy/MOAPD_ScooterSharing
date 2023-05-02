import React from "react";
import { Dimensions, View } from "react-native";
import user from "./src/utils/firebase"

export default function App() {
  console.log(user);
  return (
    <View
      className="h-full w-full"
    />
  );
}
