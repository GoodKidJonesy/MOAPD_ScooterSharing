import React, { useState } from "react";
import {
  getScooters,
  addUser,
  scooterRegistered,
  getHistoryOfUser,
  getUnreservedScootersIds,
  getUserHistory,
  getUser,
} from "./src/utils/Firebase";
import UserScreen from "./src/screens/UserScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { View } from "react-native";
import { UserContext } from "./src/contexts/UserContext";

export default function App() {
  const [user, setUser] = useState(null);
  
  return (
    <View>
      <UserContext.Provider value={{ user, setUser }}>
        {user !== null ? <UserScreen /> : <LoginScreen />}
      </UserContext.Provider>
    </View>
  );
}
