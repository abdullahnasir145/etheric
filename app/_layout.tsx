import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import { useColorScheme } from "@/hooks/use-color-scheme";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTitle: "ETHERIC",
            headerTitleStyle: {
              fontFamily: "Poppins_700Bold",
              fontSize: 18,
            },
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: "#1A1D23",
            },
            // To show the logged in person
            // headerLeft: () => (
            //   <View className="ml-3 border-2 border-primary py-1.5 px-2 rounded-full">
            //     <CharacterImage width={24} height={24} />
            //   </View>
            // ),

            // For recent notifications
            // headerRight: () => (
            //   <View style={{ marginRight: 16 }}>
            //     <BellImage width={TAB_SIZE} height={TAB_SIZE} />
            //   </View>
            // ),

            //Tab bar background styling

            // tabBarItemStyle: {
            //   marginVertical: 8,
            //   marginHorizontal: 8,
            //   height: 50,
            //   borderRadius: 10,
            //   overflow: "hidden",
            // },

            // tabBarStyle: {
            //   backgroundColor: "#1A1D23",
            //   borderTopWidth: 0,
            //   height: 70,
            // },

            // tabBarActiveBackgroundColor: inactiveColor,
            // tabBarActiveBackgroundColor: "#283044",
          }}
        >
          {/* <Stack.Screen name="onboarding" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
