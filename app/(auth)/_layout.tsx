import { ROUTE_LIST } from "@/constants";
import { Stack } from "expo-router";

const activeColor = "#00E5FF";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: "",
        headerTitleStyle: {
          fontFamily: "Poppins_700Bold",
          color: activeColor,
          fontSize: 18,
        },
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: "#1A1D23",
        },
      }}
    >
      <Stack.Screen name={ROUTE_LIST.LOGIN_SCREEN} />
      <Stack.Screen name={ROUTE_LIST.SIGNUP_SCREEN} />
    </Stack>
  );
}
