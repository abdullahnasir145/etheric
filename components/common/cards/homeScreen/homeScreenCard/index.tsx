import Heading2 from "@/components/common/headings/Heading2";
import Paragraph from "@/components/common/headings/Paragraph";
import { HomeScreenCardProps } from "@/utils/Types";
import React from "react";
import { Image, Pressable, View } from "react-native";
import Svg, { Polyline } from "react-native-svg";

export default function HomeScreenCard({ data }: HomeScreenCardProps) {
  const { image, name, symbol, price, change, isPositive, sparklinePrices } =
    data || {};

  const SparklineChart = ({ prices }: { prices: number[] | undefined }) => {
    if (!prices || prices.length === 0) return null;

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice || 1;

    const points = prices
      .map((p, index) => {
        const x = (index / (prices.length - 1)) * 60;
        const y = 20 - ((p - minPrice) / range) * 20;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <Svg width={40} height={20} viewBox="0 0 60 20" fill="none">
        <Polyline
          points={points}
          fill="none"
          stroke={isPositive ? "#10b981" : "#ef4444"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };

  return (
    <Pressable className="flex-row items-center justify-between p-4 mb-3 rounded-lg bg-white/5">
      {/* Column 1: Identity (Fixed width / flex-1) */}
      <View className="flex-row items-center flex-1 mr-2">
        <Image source={{ uri: image }} className="w-10 h-10 rounded-full" />
        <View className="ml-3 flex-1">
          <Paragraph className="text-white">{name}</Paragraph>
          <Paragraph className="text-gray-400 uppercase text-xs mt-0.5">
            {symbol}
          </Paragraph>
        </View>
      </View>

      {/* Centered Chart */}
      <View className="items-end mr-12">
        <SparklineChart prices={sparklinePrices} />
      </View>
      {/* Column 3: Price Metrics (Aligned right) */}
      <View className="items-end justify-center ">
        <Heading2 className="text-white text-base">${price}</Heading2>
        <Paragraph
          className={`text-xs mt-0.5 ${isPositive ? "text-emerald-400" : "text-red-400"}`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </Paragraph>
      </View>
    </Pressable>
  );
}
