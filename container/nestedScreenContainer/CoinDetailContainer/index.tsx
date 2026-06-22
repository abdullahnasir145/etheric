import Container from "@/components/common/Container";
import Heading2 from "@/components/common/headings/Heading2";
import Heading3 from "@/components/common/headings/Heading3";
import Paragraph from "@/components/common/headings/Paragraph";
import CoinNestedCard from "@/components/nestedCoin/nestedCoinCard";
import PriceChartSection from "@/components/nestedCoin/NestedCoinChart";
import { useExchangeRate, useGetTrendingCoins } from "@/hooks/useQueryHook";
import { formatCurrency } from "@/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";

import { ChartPieIcon } from "lucide-react-native";
// vaariable for testing image on card
let FinalIcon = ChartPieIcon;
// images
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CoinDetailContainer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Pull local memory state references from the centralized TanStack Query cache
  const { data: coins, isLoading } = useGetTrendingCoins();
  const { data: exchangeRate } = useExchangeRate("EUR");
  const coin = coins?.find((c) => c.id === id);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#0B0F19] justify-center items-center">
        <ActivityIndicator size="small" color="#00E5FF" />
      </View>
    );
  }

  if (!coin) {
    return (
      <View className="flex-1 bg-[#0B0F19] justify-center items-center p-6">
        <Paragraph className="text-white text-base mb-4">
          Asset configuration profile missing.
        </Paragraph>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-appBg px-6 py-2 rounded-xl"
        >
          <Text className="text-white text-xs font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isPositive = (coin.price_change_percentage_24h ?? 0) > 0;
  const chartProps = useMemo(
    () => ({
      coinId: coin.id,
      currentPrice: coin.current_price,
      priceChangePercentage24h: coin.price_change_percentage_24h,
      sparklinePrices: coin.sparkline_in_7d?.price ?? coin.sparkline?.price,
    }),
    [coin],
  );

  return (
    <View className="flex-1 bg-appBg">
      <Container>
        {/* Header */}
        <View className="flex-row items-center justify-between gap-4 mt-4">
          <View className="flex-row items-center gap-4">
            {coin.image && (
              <Image
                source={{ uri: coin.image }}
                className="w-12 h-12 rounded-full"
              />
            )}
            <View>
              <Heading2 className="text-lightGray">{coin?.name}</Heading2>
              <Paragraph className="text-lightGray">
                {coin?.symbol.toUpperCase()}/USDT
              </Paragraph>
            </View>
          </View>

          <View
            className={`${isPositive ? "bg-secondary/10" : "bg-terniary/20"} rounded-xl`}
          >
            <Heading3
              className={` text-poppins-semiBold py-1 px-3 ${isPositive ? "text-secondary" : "text-terniary"}`}
            >
              {coin.price_change_percentage_24h?.toFixed(2) ?? "0.00"}%
            </Heading3>
          </View>
        </View>

        {/* Current Price  */}
        <View className="mt-6 flex-row items-center gap-2">
          <Heading2 className="text-primary text-2xl">
            ${formatCurrency(coin?.current_price)}
          </Heading2>
          <Paragraph className="text-lightGray">/</Paragraph>

          <View>
            <Heading2 className="text-white text-sm">
              {isLoading
                ? "Loading..."
                : `Є ${formatCurrency(coin?.current_price * (exchangeRate ?? 1))}`}
            </Heading2>
          </View>
        </View>

        {/* Chart Prices Tab  and Chart  Temporary */}
        <View>
          <PriceChartSection {...chartProps} />
        </View>

        <View className="flex-wrap flex-row gap-2">
          <View className="w-[48%]">
            <CoinNestedCard
              title="Market Cap"
              value="$12T"
              percentage={12}
              Icon={FinalIcon}
            />
          </View>
        </View>
      </Container>
    </View>
  );
}

const StatCard = ({ label, value }: { label: string; value: any }) => (
  <View className="w-[45%] bg-gray-800 p-3 rounded-lg mb-4">
    <Text className="text-gray-400 text-xs">{label}</Text>
    <Text className="text-white font-bold mt-1">{formatCurrency(value)}</Text>
  </View>
);
