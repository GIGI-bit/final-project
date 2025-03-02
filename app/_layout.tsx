import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await localStorage.getItem("onboarded");
      const signedIn = await localStorage.getItem("signedIn");
      setIsOnboarded(!!onboarded);
      setIsSignedIn(!!signedIn);
    };
    checkOnboarding();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack>
          <Stack.Screen name="signin" options={{ headerShown: false }} />

          <Stack.Screen name="tabs" options={{ headerShown: false }} />
        </Stack>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
