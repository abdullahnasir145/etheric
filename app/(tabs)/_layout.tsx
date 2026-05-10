import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
// import { IconSymbol } from "@/components/ui/icon-symbol";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Define colors for easy maintenance
  const activeColor = "#00E5FF";
  const inactiveColor = "gray";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: true,
        headerTitle: "Etheric",
        headerTitleStyle: {
          fontFamily: "Poppins_700Bold",
          color: activeColor,
        },
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontFamily: "Poppins_500Medium",
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              className={`p-2 rounded-xl ${focused ? "bg-primary" : "bg-transparent"}`}
            >
              <IconSymbol
                size={24}
                name="chart.bar.fill"
                color={focused ? activeColor : inactiveColor}
              />
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <Text
              className={`text-xs font-medium ${focused ? "text-primary" : "text-slate-400"}`}
            >
              {children}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="markets"
        options={{
          title: "Markets",
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={24}
              name="chart.bar.fill"
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trade"
        options={{
          title: "Trade",
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={24}
              name="arrow.left.arrow.right"
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: "Portfolio",
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={24}
              name="briefcase.fill"
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={24}
              name="gearshape.fill"
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tabs>
  );
}
