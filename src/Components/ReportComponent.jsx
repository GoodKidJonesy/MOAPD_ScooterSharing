import React, { useContext, useState } from "react";
import { ReportContext } from "../contexts/ReportContext";
import {
  getUser,
  endRide,
  updateScooterImage,
  generateReport,
} from "../utils/Firebase";
import { View, Text, Pressable, TextInput } from "react-native";
import { UserContext } from "../contexts/UserContext";

export default function ReportComponent({ scooter }) {
  const { showReportComponent, setShowReportComponent } =
    useContext(ReportContext);
  const { user, setUser } = useContext(UserContext);
  const [value, setText] = useState("");

  const goBack = () => {
    setShowReportComponent(false);
  };

  const handleClick = () => {
    if (value !== "") {
      generateReport(value, user);
      setShowReportComponent(false);
    } else {
      alert("Please provide text for the report");
    }
  };

  return showReportComponent ? (
    <View className="absolute w-64 h-64 top-0 left-0 z-10 rounded-xl overflow-hidden flex items-center bg-white pb-4 pt-2">
      <View className="w-full h-full items-center justify-evenly p-4">
        <TextInput
          className="w-full h-40 border-2 rounded-lg p-2"
          textAlignVertical="top"
          multiline={true}
          textBreakStrategy="balanced"
          lineBreakStrategyIOS="standard"
          inputMode="text"
          placeholder="Please describe the problem you are experiencing"
          onChangeText={(text) => setText(text)}
        />
        <Pressable
          className="border-2 rounded-lg pr-2 pl-2 mt-5"
          onPress={handleClick}
        >
          <Text>Submit</Text>
        </Pressable>
        <Pressable onPress={goBack} className="transform translate-y-4 p-2">
          <Text className="underline">Back</Text>
        </Pressable>
      </View>
    </View>
  ) : null;
}
