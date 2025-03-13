import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      console.log(email);
      console.log(password);
      const response = await fetch("http://localhost:5001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        saveToken(data.token);
        router.push("/dashboard");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
        Sign In
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        style={{
          width: "80%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#fff",
          color: "#fff",
          marginBottom: 10,
        }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        style={{
          width: "80%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#fff",
          color: "#fff",
          marginBottom: 10,
        }}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        // onPress={handleSignIn}
        onPress={() => handleSignIn()}
        style={{
          backgroundColor: "red",
          padding: 10,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={{ color: "gray", fontSize: 16 }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
SignInScreen.options = {
  headerShown: false,
};
