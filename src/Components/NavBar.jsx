import React from "react";
import { View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function NavBar() {
  return (
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

      }}>
        <Icon name="user-circle-o" size={30}/>
      </Pressable>
    </View>
  );
}
