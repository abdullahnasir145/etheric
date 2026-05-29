import Heading2 from "@/components/common/headings/Heading2";
import Paragraph from "@/components/common/headings/Paragraph";
import { HomeScreenCardProps } from "@/utils/Types";
import React from "react";
import { Image, Pressable, View } from "react-native";

export default function HomeScreenCard({ data }: HomeScreenCardProps) {
  const { image, name, symbol, price, change, isPositive, priceChange } =
    data || {};

  return (
    <Pressable
      // onPress={onPress}
      className="flex-row items-center justify-between p-4 mb-3 rounded-lg bg-lightPurple"
    >
      <View className="flex-row items-center flex-1 mr-2">
        <Image source={{ uri: image }} className="w-10 h-10" />

        <View className="ml-3 flex-1">
          <Paragraph
            className="text-white"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Paragraph>
          <View className="flex-row items-center">
            <Paragraph className="text-gray-400 uppercase text-xs">
              {symbol}
            </Paragraph>
            <Paragraph className="text-red-500 text-xs ml-2" numberOfLines={1}>
              {priceChange}
            </Paragraph>
          </View>
        </View>
      </View>

      {/* Price and percentage of coin */}
      <View className="items-end">
        <Heading2 className="text-white">${price}</Heading2>
        <Paragraph className={isPositive ? "text-secondary" : "text-terniary"}>
          {isPositive ? "+" : ""}
          {change}%
        </Paragraph>
      </View>
    </Pressable>
  );
}
