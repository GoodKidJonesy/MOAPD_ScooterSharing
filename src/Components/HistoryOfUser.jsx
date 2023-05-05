import { View, Pressable, Text, FlatList } from "react-native";
import { HistoryOfUserContext } from "../contexts/HistoryOfUserContext";
import React, { useContext, useEffect, useState } from "react";
import DesignIcon from "react-native-vector-icons/AntDesign";
import { getUserHistory } from "../utils/Firebase";
import { UserContext } from "../contexts/UserContext";

export default function HistoryOfUser() {
  const { showHistoryOfUserPage, setShowHistoryOfUserPage } = useContext(HistoryOfUserContext);
  const { user, setUser } = useContext(UserContext);
  const [userHistory, setUserHistory] = useState(); 

  useEffect(()=>{
    getUserHistory(user).then((res) => {
      setUserHistory(res);
    });
  });

  return showHistoryOfUserPage ? (
    <View className="w-full h-full bg-white flex items-center justify-center">
      <Pressable
        className="absolute top-10 left-10"
        pressRetentionOffset={100}
        onPress={() => {
          getUserHistory(user);
          setShowHistoryOfUserPage(false);
        }}
      >
        <DesignIcon name="close" size={30} />
      </Pressable>
      <View> 
        {
          userHistory.map((entry) => (
            <View>
              <Text>
                Scooter:  (
                {
                  entry.scooterID
                })
                Time:   (
                {
                  10 //entry.pricePaid
                })
                Price:  (
                {
                  123 //entry.timeUsed
                })
              </Text>
            </View>
          ))
        }
      </View>
    </View>
  ) : null;
}
