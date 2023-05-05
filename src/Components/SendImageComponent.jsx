import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SendImageContext } from "../contexts/SendImageContext";
import { PopUpContext } from "../contexts/PopUpContext";
import { getUser, endRide, updateScooterImage } from "../utils/Firebase";
import { View, Text, Pressable } from "react-native";
import { UserContext } from "../contexts/UserContext";

export default function SendImageComponent({ scooter }) {
  const [image, setImage] = useState(null);
  const { showImageComponent, setShowImageComponent } =
    useContext(SendImageContext);
  const { showPopUp, setShowPopUp } = useContext(PopUpContext);
  const { user, setUser } = useContext(UserContext);

  const goBack = () => {
    setShowImageComponent(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    console.log(result);

    if (!result.canceled) {
      updateScooterImage(scooter.ID, result.assets[0].uri);
      endRide(user, scooter).then((x) => {
        getUser(user).then((res) => {
          res.currentScooter = 0;
          setUser(res);
        });
      });
      setShowImageComponent(false);
      setShowPopUp(false);
      alert("Ride Ended!");
    }
  };

  return showImageComponent ? (
    <View className="absolute w-64 h-64 top-0 left-0 z-10 rounded-xl overflow-hidden flex items-center bg-white">
      <View className="w-full h-full items-center justify-evenly">
        <Text className="text-2xl mb-5">Submit a picture</Text>
        <Pressable onPress={pickImage} className="border-2 rounded-xl p-2">
          <Text className="text-xl">Submit</Text>
        </Pressable>
        <Pressable onPress={goBack} className="transform translate-y-4 p-2">
          <Text className="underline">Back</Text>
        </Pressable>
      </View>
    </View>
  ) : null;
}
