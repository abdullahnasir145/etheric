import Paragraph from "@/components/common/headings/Paragraph";
import React from "react";
import { Image, View } from "react-native";
import Heading3 from "../../../headings/Heading3";

export default function HomeScreenCard({ coin }: { coin: any }) {
  const { image, name, symbol, price, change, isPositive } = coin || {};

  return (
    <View className="flex-row items-center justify-between bg-lightPurple p-4 rounded-lg mb-3 border border-white/5">
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center">
          <Image
            source={{
              uri: image || "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
            }}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </View>
        <View className="ml-3">
          <Heading3 className="text-white text-base">{name}</Heading3>
          <Paragraph className=" text-lightGray text-xs uppercase">
            {symbol}
          </Paragraph>
        </View>
      </View>

      {/* Middle Section: Simplified Sparkline Chart */}
      <View className="flex-1 items-center justify-center h-10 px-2">
        {/* Replace this View with your actual Chart component */}
        <View
          className={`h-[2px] w-full ${isPositive ? "bg-emerald-500" : "bg-rose-500"} opacity-50`}
        />
      </View>

      {/* Right Section: Price and Percentage */}
      <View className="items-end flex-1">
        <Paragraph className="text-white font-poppins-bold text-base">
          ${price}
        </Paragraph>
        <View
          className={`mt-1 px-2 py-1 rounded-lg ${isPositive ? "bg-emerald-500/10" : "bg-rose-500/10"}`}
        >
          <Paragraph
            className={`font-poppins-semibold text-xs ${isPositive ? "text-emerald-500" : "text-rose-500"}`}
          >
            {isPositive ? "▲" : "▼"} {change}%
          </Paragraph>
        </View>
      </View>
    </View>
  );
}
