import React, { useContext, useState } from "react";
import { View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SignOut from "./SignOut";
import { SignOutContext } from "../contexts/SignOutContext";

export default function NavBar() {
  const [showSignOutPage, setShowSignOutPage] = useState(false);
  return (
    <View className = {showSignOutPage ? "absolute top-0 w-full h-full" : "absolute bottom-0 w-full h-16"}>
    <SignOutContext.Provider value={{showSignOutPage, setShowSignOutPage}}>
        <SignOut/>
      </SignOutContext.Provider>
    <View className="w-full h-16 bg-white absolute bottom-0 flex justify-evenly flex-row items-center">
      <Pressable onPress={() => {

      }}>
        <Icon name="list-ul" size={30}/>
      </Pressable>

      <Pressable onPress={() => {

      }}>
        <Icon name="qrcode" size={30}/>
      </Pressable>

      <Pressable onPress={() => {
        setShowSignOutPage(showSignOutPage ? false : true)
      }}>
        <Icon name="user-circle-o" size={30}/>
      </Pressable>
    </View>
    </View>
  );
}
