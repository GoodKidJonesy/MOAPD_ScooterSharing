import React, { useState, useContext } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { checkUserLogin, GenerateUser } from "../utils/Firebase";
import { UserContext } from "../contexts/UserContext";

export default function LoginFlow() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPage, setLoginPage] = useState(true);

  const { user, setUser } = useContext(UserContext);

  function loginUser(email, password) {
    checkUserLogin(email, password).then((res) => {
      if (res === null) {
        alert("Invalid email or password!");
      } else {
        setUser(res);
      }
    });
  }

  function registerUser(email, password) {
    GenerateUser(email, password).then((res) => {
      if (res == false) {
        alert("Email has already been taken");
      } else {
        setLoginPage(true);
        alert("Succesfully signed up!");
      }
    });
  }

  return loginPage ? (
    <View className="w-full h-full bg-black flex items-center justify-center">
      <View className="w-2/3">
        <TextInput
          className="text-white w-full border-b-2 border-white p-2 rounded-lg"
          placeholder="Email"
          placeholderTextColor={"#FFFFFF99"}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          className="text-white w-full border-b-2 border-white mt-5 p-2 rounded-lg"
          placeholder="Password"
          placeholderTextColor={"#FFFFFF99"}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Pressable
          className="bg-white flex items-center justify-center rounded-xl mt-5"
          onPress={() => {
            loginUser(email, password);
          }}
        >
          <Text className="text-lg">Login</Text>
        </Pressable>
        <Pressable className="mt-5" onPress={() => setLoginPage(false)}>
          <Text className="text-white underline">Sign up!</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <View className="w-full h-full bg-black flex items-center justify-center">
      <View className="w-2/3">
        <TextInput
          className="text-white w-full border-b-2 border-white p-2 rounded-lg"
          placeholder="Email"
          placeholderTextColor={"#FFFFFF99"}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          className="text-white w-full border-b-2 border-white mt-5 p-2 rounded-lg"
          placeholder="Password"
          placeholderTextColor={"#FFFFFF99"}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Pressable
          className="bg-white flex items-center justify-center rounded-xl mt-5"
          onPress={() => {
            registerUser(email, password);
          }}
        >
          <Text className="text-lg">Sign Up</Text>
        </Pressable>
        <Pressable className="mt-5" onPress={() => setLoginPage(false)}>
          <Text className="text-white underline">Log in!</Text>
        </Pressable>
      </View>
    </View>
  );
}
