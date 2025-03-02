import { useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function OnboardScreen() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../assets/images/onbording.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* <Image
        style={styles.logo}
        src={require("../assets/images/Logonetflix.png")}
      ></Image> */}
      <View className="flex-1 justify-center items-center h-full">
        <Text className="text-white font-bold text-3xl">How do I watch?</Text>
        <Text
          style={styles.welcomeText}
          className="text-white text-center text-xl"
        >
          Members that subscribe to Netflix can watch here in the app
        </Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/signin")}
          >
            <Text className="text-white text-lg font-bold">NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logo: {
    width: 150,
    height: 150,
    // marginBottom: 20,
  },
  welcomeText: {
    color: "rgba(184, 184, 184, 1)",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 12,
    // width: 100,
    // flex: 1,
    paddingHorizontal: 40,
    width: width - 20,
    alignItems: "center",
    borderRadius: 8,
  },
});
