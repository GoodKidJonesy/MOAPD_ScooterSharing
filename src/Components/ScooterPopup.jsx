import React, { useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { View, Text, Image } from "react-native";
import { PopUpContext } from "../contexts/PopUpContext";
import DesignIcon from "react-native-vector-icons/AntDesign";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { getAdress } from "../utils/Geolocator";
import { UserContext } from "../contexts/UserContext";
import { ScannerContext } from "../contexts/ScannerContext";
import { getScooterImage } from "../utils/Firebase";

import BarCodeScannerComponent from "./BarCodeScannerComponent";
import { SendImageContext } from "../contexts/SendImageContext";
import SendImageComponent from "./SendImageComponent";
import { ReportContext } from "../contexts/ReportContext";
import ReportComponent from "./ReportComponent";

export default function ScooterPopUp({ scooter }) {
  const { showPopUp, setShowPopUp } = useContext(PopUpContext);
  const [scooterImage, setScooterImage] = useState(
    "https://cdn.discordapp.com/attachments/651377380367007767/1103830353896018010/troll.webp"
  );
  const { user, setUser } = useContext(UserContext);
  const [showScanner, setShowScanner] = useState(false);
  const [showImageComponent, setShowImageComponent] = useState(false);
  const [showReportComponent, setShowReportComponent] = useState(false);

  useEffect(() => {
    getScooterImage(scooter).then((res) => setScooterImage(res));
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

  function handleClick() {
    if (user.currentScooter === 0) {
      setShowScanner(true);
    } else {
      setShowImageComponent(true);
    }
  }

  function handleReportClick() {
    setShowReportComponent(true);
  }

  return showPopUp ? (
    <View
      className={
        showScanner
          ? "absolute top-0 left-0 w-full h-full bg-black"
          : "absolute transform -translate-x-32 -translate-y-72 top-1/2 left-1/2 w-64 h-64 rounded-xl p-4 bg-white"
      }
    >
      <ScannerContext.Provider value={{ showScanner, setShowScanner }}>
        <BarCodeScannerComponent scooter={scooter} />
      </ScannerContext.Provider>
      <SendImageContext.Provider
        value={{ showImageComponent, setShowImageComponent }}
      >
        <SendImageComponent scooter={scooter} />
      </SendImageContext.Provider>
      <ReportContext.Provider
        value={{ showReportComponent, setShowReportComponent }}
      >
        <ReportComponent scooter={scooter} />
      </ReportContext.Provider>
      {!showScanner && (
        <View className="h-full w-full flex">
          <View className="w-full flex flex-row justify-between">
            <Pressable
              pressRetentionOffset={100}
              onPress={() => {
                setShowPopUp(false);
              }}
            >
              <DesignIcon name="close" size={14} />
            </Pressable>
            <Pressable
              pressRetentionOffset={100}
              onPress={() => {
                setShowReportComponent(true);
              }}
            >
              <Text className="underline">Report</Text>
            </Pressable>
          </View>

          <View className="flex items-center pt-2">
            <Text className="text-xl">{`scooter ${scooter.ID}`}</Text>
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
                uri: scooterImage,
              }}
            />
          </View>

          <View className="w-full flex items-center">
            <Pressable
              onPress={() => {
                handleClick(user, scooter);
              }}
              className="border-black border-2 rounded-lg pt-1 pb-1 pr-4 pl-4"
            >
              <Text className={"text-md"}>
                {user.currentScooter === 0 ? "Start Ride!" : "End Ride!"}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  ) : null;
}
