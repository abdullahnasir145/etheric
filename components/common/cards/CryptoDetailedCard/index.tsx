import Heading2 from "@/components/common/headings/Heading2";
import Heading3 from "@/components/common/headings/Heading3";
import Paragraph from "@/components/common/headings/Paragraph";
import { CoinData } from "@/utils/Types";
import React from "react";
import { Image, View, Text } from "react-native";
import Svg, { Polyline } from "react-native-svg";

type CryptoDetailedCardProps = {
  data: CoinData;
  onPress?: () => void;
};

export default function CryptoDetailedCard({ data, onPress }: CryptoDetailedCardProps) {
  const {
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h,
    sparkline_in_7d,
  } = data;

  const isPositive = price_change_percentage_24h > 0;
  const sparklinePrices = sparkline_in_7d?.price;

  const SparklineChart = ({ prices }: { prices: number[] | undefined }) => {
    if (!prices || prices.length === 0) return null;

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice || 1;

    const points = prices
      .map((p, index) => {
        const x = (index / (prices.length - 1)) * 80;
        const y = 20 - ((p - minPrice) / range) * 20;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <Svg width={80} height={24}>
        <Polyline
          points={points}
          fill="none"
          stroke={isPositive ? "#10b981" : "#ef4444"}
          strokeWidth={1.5}
        />
      </Svg>
    );
  };

  return (
    <View
      className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/10"
      onTouchEnd={onPress}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center flex-1">
          <Image source={{ uri: image }} className="w-12 h-12 rounded-full" />

          <View className="ml-3 flex-1">
            <Heading2 className="text-white text-lg">{name}</Heading2>
            <Paragraph className="text-gray-400 uppercase text-xs mt-1">
              {symbol}
            </Paragraph>
          </View>
        </View>

        <View className="items-end">
          <Heading2 className="text-white text-lg">
            ${current_price.toLocaleString()}
          </Heading2>
          <View className="flex-row items-center mt-1">
            <SparklineChart prices={sparklinePrices} />
          </View>
          <Paragraph
            className={`text-xs mt-1 ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {price_change_percentage_24h.toFixed(2)}%
          </Paragraph>
        </View>
      </View>

      <View className="flex-row justify-between mt-4 pt-3 border-t border-white/5">
        <View className="items-center">
          <Paragraph className="text-gray-500 text-xs mb-1">24h Volume</Paragraph>
          <Text className="text-white font-poppins-semibold text-sm">
            ${(data as any).total_volume?.toLocaleString() || "N/A"}
          </Text>
        </View>

        <View className="items-center">
          <Paragraph className="text-gray-500 text-xs mb-1">Market Cap</Paragraph>
          <Text className="text-white font-poppins-semibold text-sm">
            ${(data as any).market_cap?.toLocaleString() || "N/A"}
          </Text>
        </View>

        <View className="items-center">
          <Paragraph className="text-gray-500 text-xs mb-1">Ranking</Paragraph>
          <Text className="text-white font-poppins-semibold text-sm">
            #{(data as any).market_cap_rank || "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
}