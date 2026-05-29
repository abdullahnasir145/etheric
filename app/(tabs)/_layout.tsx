import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

import BellImage from "../../assets/images/svgs/bell-icon.svg";
import CharacterImage from "../../assets/images/svgs/character-image.svg";

// Tab Images for both ac tive and inactive state
import Paragraph from "@/components/common/headings/Paragraph";
import HomeGrayImage from "../../assets/images/tab-icons/home-gary-tab.svg";
import HomePrimaryImage from "../../assets/images/tab-icons/home-tab-primary.svg";
import MarketsGrayImage from "../../assets/images/tab-icons/market-tab-gray.svg";
import MarketsPrimaryImage from "../../assets/images/tab-icons/market-tab-primary.svg";
import PortfolioGrayImage from "../../assets/images/tab-icons/portfoli-tab-gray.svg";
import PortfolioPrimaryImage from "../../assets/images/tab-icons/portfolio-tab-primary.svg";
import SettingsGrayImage from "../../assets/images/tab-icons/setting-gary-tab.svg";
import SettingsPrimaryImage from "../../assets/images/tab-icons/setting-tab-primary.svg";
import TradeGrayImage from "../../assets/images/tab-icons/trade-tab-gray.svg";
import TradePrimaryImage from "../../assets/images/tab-icons/trade-tab-primary.svg";

// default colors for tab and size
const activeColor = "#00E5FF";
const inactiveColor = "#283044";
const TAB_SIZE = 20;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: "ETHERIC",
        headerTitleStyle: {
          fontFamily: "Poppins_700Bold",
          color: activeColor,
          fontSize: 18,
          marginLeft: 16,
          marginTop: 6,
          alignItems: "center",
        },
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: "#1A1D23",
          borderBottomWidth: 0,
        },
        // To show the logged in person
        headerLeft: () => (
          <View className="ml-3 border-2 border-primary py-1.5 px-2 rounded-full">
            <CharacterImage width={24} height={24} />
          </View>
        ),

        // For recent notifications
        headerRight: () => (
          <View style={{ marginRight: 16 }}>
            <BellImage width={TAB_SIZE} height={TAB_SIZE} />
          </View>
        ),

        //Tab bar background styling

        tabBarItemStyle: {
          marginVertical: 8,
          marginHorizontal: 8,
          height: 50,
          borderRadius: 10,
          overflow: "hidden",
        },

        tabBarStyle: {
          backgroundColor: "#1A1D23",
          borderTopWidth: 0,
          height: 70,
        },

        // tabBarActiveBackgroundColor: inactiveColor,
        tabBarActiveBackgroundColor: "#283044",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <HomePrimaryImage width={TAB_SIZE} height={TAB_SIZE} />
              ) : (
                <HomeGrayImage width={TAB_SIZE} height={TAB_SIZE} />
              )}
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Paragraph
              className={`${focused ? "text-primary" : "text-lightGray"} text-xs`}
            >
              Home
            </Paragraph>
          ),
        }}
      />
      <Tabs.Screen
        name="markets"
        options={{
          title: "Markets",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <MarketsPrimaryImage width={TAB_SIZE} height={TAB_SIZE} />
              ) : (
                <MarketsGrayImage width={TAB_SIZE} height={TAB_SIZE} />
              )}
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Paragraph
              className={`${focused ? "text-primary" : "text-lightGray"} text-xs`}
            >
              Market
            </Paragraph>
          ),
        }}
      />
      <Tabs.Screen
        name="trade"
        options={{
          title: "Trade",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <TradePrimaryImage width={TAB_SIZE} height={TAB_SIZE} />
              ) : (
                <TradeGrayImage width={TAB_SIZE} height={TAB_SIZE} />
              )}
            </View>
          ),

          tabBarLabel: ({ focused }) => (
            <Paragraph
              className={`${focused ? "text-primary" : "text-lightGray"} text-xs`}
            >
              Trade
            </Paragraph>
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: "Portfolio",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <PortfolioPrimaryImage width={TAB_SIZE} height={TAB_SIZE} />
              ) : (
                <PortfolioGrayImage width={TAB_SIZE} height={TAB_SIZE} />
              )}
            </View>
          ),

          tabBarLabel: ({ focused }) => (
            <Paragraph
              className={`${focused ? "text-primary" : "text-lightGray"} text-xs`}
            >
              Portfolio
            </Paragraph>
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <SettingsPrimaryImage width={TAB_SIZE} height={TAB_SIZE} />
              ) : (
                <SettingsGrayImage width={TAB_SIZE} height={TAB_SIZE} />
              )}
            </View>
          ),

          tabBarLabel: ({ focused }) => (
            <Paragraph
              className={`${focused ? "text-primary" : "text-lightGray"} text-xs`}
            >
              Settings
            </Paragraph>
          ),
        }}
      />
    </Tabs>
  );
}
