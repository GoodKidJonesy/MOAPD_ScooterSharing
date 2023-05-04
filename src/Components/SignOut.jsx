import { View, Pressable, Text } from "react-native";
import { SignOutContext } from "../contexts/SignOutContext";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import DesignIcon from "react-native-vector-icons/AntDesign";

export default function SignOut() {
  const { showSignOutPage, setShowSignOutPage } = useContext(SignOutContext);
  const { user, setUser } = useContext(UserContext);
  return showSignOutPage ? (
    <View className="w-full h-full bg-white flex items-center justify-center">
      <Pressable
        className="absolute top-10 left-10"
        pressRetentionOffset={100}
        onPress={() => {
            setShowSignOutPage(false);
        }}
      >
        <DesignIcon name="close" size={30} />
      </Pressable>
      <View className="w-2/3">
        <Pressable
          className="bg-black flex items-center justify-center rounded-xl p-5"
          onPress={() => setUser(null)}
        >
          <Text className="text-white underline">Sign out</Text>
        </Pressable>
      </View>
    </View>
  ) : null;
}
