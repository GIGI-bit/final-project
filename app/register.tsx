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
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({});

  const handleSignUp = async () => {
    try {
      console.log(email);
      console.log(password);
      console.log(username);
      const response = await fetch(
        "http://192.168.1.5:5001/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );
      if (response.ok) {
        router.push("/signin");
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
        Sign Up
      </Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="gray"
        style={{
          width: "80%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#fff",
          color: "#fff",
          marginBottom: 10,
        }}
        value={username}
        onChangeText={setUsername}
      />
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
        onPress={handleSignUp}
        style={{
          backgroundColor: "red",
          padding: 10,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/signin")}>
        <Text style={{ color: "gray", fontSize: 16 }}>
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}

RegisterScreen.options = {
  headerShown: false,
};
