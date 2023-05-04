import React, { useContext, useEffect, useState } from "react";
import UserFlow from "./src/screens/UserFlow";
import StrangerFlow from "./src/screens/StrangerFlow";
import { View } from "react-native";
import { UserContext } from "./src/contexts/UserContext";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <View>
      <UserContext.Provider value={{ user, setUser }}>
        {user !== null ? <UserFlow /> : <StrangerFlow />}
      </UserContext.Provider>
    </View>
  );
}
