import React, { useContext, useState } from "react";
import { View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SignOut from "./SignOut";
import { SignOutContext } from "../contexts/SignOutContext";
import HistoryOfUser from "./HistoryOfUser";
import { HistoryOfUserContext } from "../contexts/HistoryOfUserContext";

export default function NavBar() {
  const [showSignOutPage, setShowSignOutPage] = useState(false);
  const [showHistoryOfUserPage, setShowHistoryOfUserPage] = useState(false);
  return (
    <View
      className={
        showSignOutPage || showHistoryOfUserPage
          ? "absolute top-0 w-full h-full"
          : "absolute bottom-0 w-full h-16"
      }
    >
      <SignOutContext.Provider value={{ showSignOutPage, setShowSignOutPage }}>
        <SignOut />
      </SignOutContext.Provider>
      <HistoryOfUserContext.Provider
        value={{ showHistoryOfUserPage, setShowHistoryOfUserPage }}
      >
        <HistoryOfUser />
      </HistoryOfUserContext.Provider>
      <View className="w-full h-16 bg-white absolute bottom-0 flex justify-evenly flex-row items-center">
        <Pressable
          onPress={() => {
            setShowHistoryOfUserPage(showHistoryOfUserPage ? false : true);
            setShowSignOutPage(false);
          }}
        >
          <Icon name="list-ul" size={30} />
        </Pressable>

        <Pressable onPress={() => {}}>
          <Icon name="qrcode" size={30} />
        </Pressable>

        <Pressable
          onPress={() => {
            setShowSignOutPage(showSignOutPage ? false : true);
            setShowHistoryOfUserPage(false);
          }}
        >
          <Icon name="user-circle-o" size={30} />
        </Pressable>
      </View>
    </View>
  );
}
