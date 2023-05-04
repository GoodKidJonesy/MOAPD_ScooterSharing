import React, { useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { View, Text, Image } from "react-native";
import { PopUpContext } from "../contexts/PopUpContext";
import DesignIcon from "react-native-vector-icons/AntDesign";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { getAdress } from "../utils/Geolocator";
import { UserContext } from "../contexts/UserContext";
import { startRide, endRide } from "../utils/Firebase";
import { getUser } from "../utils/Firebase";

export default function ScooterPopUp({ scooter }) {
  const { showPopUp, setShowPopUp } = useContext(PopUpContext);
  const [address, setAddress] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getAdress(scooter.coordinates).then((res) => setAddress(res));
  }, [scooter]);

  function defineBattery(battery) {
    if (battery === 100) {
      return "battery-full";
    } else if (battery > 75) {
      return "battery-three-quarters";
    } else if (battery > 25) {
      return "battery-half";
    } else if (battery > 0) {
      return "battery-quarter";
    } else {
      return "battery-empty";
    }
  }
  const battery = defineBattery(scooter.battery);

  function handleClick(user, scooter) {
    if (user.currentScooter === 0) {
      startRide(user, scooter).then((x) => {
        getUser(user).then((res) => {
          setUser(res);
        });
      });
    } else {
      endRide(user, scooter).then((x) => {
        getUser(user).then((res) => {
          setUser(res);
        });
      });
    }
  }

  return showPopUp ? (
    <View className="absolute -translate-x-32 -translate-y-72 top-1/2 left-1/2 w-64 h-64 bg-white transform rounded-xl p-4">
      <View className="h-full w-full flex">
        <Pressable
          pressRetentionOffset={100}
          onPress={() => {
            setShowPopUp(false);
          }}
        >
          <DesignIcon name="close" size={14} />
        </Pressable>

        <View className="flex items-center pt-2">
          <Text className="text-xl">{scooter.name}</Text>
        </View>

        <View className="flex justify-between flex-row pt-2">
          <View className="flex flex-row items-center">
            <Text className="pl-1 text-md">{`${scooter.battery}%`}</Text>
            <AwesomeIcon className=" text-md" name={battery} />
          </View>
          <View className="flex flex-row items-center">
            <AwesomeIcon className=" text-md" name="money" />
            <Text className="pl-1 text-md">{"5 DKK"}</Text>
          </View>
        </View>

        <View className="flex-1 mt-2 mb-2 w-full flex items-center">
          <Image
            className="h-24 w-24"
            source={{
              uri: scooter.image,
            }}
          />
        </View>

        <View className="w-full flex items-center">
          <Pressable
            onPress={() => {
              handleClick(user, scooter);
            }}
            className="border-black border-2 rounded-lg p-1"
          >
            <Text className={"text-lg"}>
              {user.currentScooter === 0 ? "Start Ride!" : "End Ride!"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  ) : null;
}
