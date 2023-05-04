import { BarCodeScanner } from "expo-barcode-scanner";
import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { ScannerContext } from "../contexts/ScannerContext";
import { startRide, getUser } from "../utils/Firebase";
import { UserContext } from "../contexts/UserContext";
import { PopUpContext } from "../contexts/PopUpContext";

export default function BarCodeScannerComponent({ scooter }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const { showScanner, setShowScanner } = useContext(ScannerContext);
  const { user, setUser } = useContext(UserContext);
  const { showPopUp, setShowPopUp } = useContext(PopUpContext);

  const askForPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askForPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanData(data);
    if (parseInt(data) === scooter.ID) {
      startRide(user, scooter).then((x) => {
        getUser(user).then((res) => {
          setUser(res);
        });
      });
      setShowScanner(false);
      setScanData(undefined);
      setShowPopUp(false);
      alert("Ride Started!");
    } else {
      setShowScanner(false);
      setScanData(undefined);
      alert("Wrong QR Code!");
    }
  };

  if (!hasPermission && showScanner) {
    return (
      <View className="w-full h-full bg-black flex items-center justify-evenly">
        <Text className="text-white text-lg text-center">
          Please grant permission to use your camera
        </Text>
        <Pressable
          className="border-2 border-white p-2 rounded-md"
          onPress={() => {
            askForPermission();
          }}
        >
          <Text className="text-white text-md underline">Grant Access</Text>
        </Pressable>
      </View>
    );
  }

  return showScanner ? (
    <View className="absolute w-64 h-64 top-0 left-0 z-10 rounded-xl overflow-hidden flex items-center">
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        className="w-full h-full"
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
      />
      <Text className="absolute text-white text-lg pt-2">
        Please Scan The QR-Code
      </Text>
      <View className="absolute border-2 border-white rounded-2xl w-40 h-40 top-1/2 left-1/2 transform -translate-x-20 -translate-y-20" />
    </View>
  ) : null;
}
