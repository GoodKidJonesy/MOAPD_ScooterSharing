import { View, Pressable, Text, FlatList, ScrollView } from "react-native";
import { HistoryOfUserContext } from "../contexts/HistoryOfUserContext";
import React, { useContext, useEffect, useState } from "react";
import DesignIcon from "react-native-vector-icons/AntDesign";
import { getUserHistory } from "../utils/Firebase";
import { UserContext } from "../contexts/UserContext";

export default function HistoryOfUser() {
  const { showHistoryOfUserPage, setShowHistoryOfUserPage } =
    useContext(HistoryOfUserContext);
  const { user, setUser } = useContext(UserContext);
  const [userHistory, setUserHistory] = useState();

  useEffect(() => {
    getUserHistory(user).then((res) => {
      setUserHistory(res);
    });
  });

  return showHistoryOfUserPage ? (
    <View className="w-full h-full bg-white flex items-center justify-center">
      <Pressable
        className="absolute top-10 left-4"
        pressRetentionOffset={100}
        onPress={() => {
          getUserHistory(user);
          setShowHistoryOfUserPage(false);
        }}
      >
        <DesignIcon name="close" size={30} />
      </Pressable>
      <Text className="text-4xl mt-20 mb-2">Ride History</Text>
      <ScrollView className="mb-20 w-full">
        {userHistory.map((entry, index) => (
          <View className="w-full p-4" key={index}>
            <View className="w-full h-28 bg-gray-200 justify-evenly p-4 rounded-3xl">
              <Text>{`Scooter: scooter${entry.scooterID}`}</Text>
              <Text>{`Time spent: ${entry.timeSpentInSeconds} seconds`}</Text>
              <Text>{`Price paid: ${entry.pricePaid} DKK`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  ) : null;
}
