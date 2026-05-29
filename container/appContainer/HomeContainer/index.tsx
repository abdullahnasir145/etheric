import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

// Components
import CardDescription from "@/components/common/cards/CardDescription";
import HomeScreenCard from "@/components/common/cards/homeScreen/homeScreenCard";
import Container from "@/components/common/Container";
import DataStateWrapper from "@/components/common/DataStateWrapper";
import HomeExchangeOperations from "@/components/common/exchangeOperations";

// Constants & Types
import HomeDataVirtualization from "@/components/common/cards/homeScreen/HomeDataVirtualization";
import { ROUTE_LIST } from "@/constants";
import { HOME_OPERATION_DATA } from "@/data/home";
import { useGetTrendingCoins } from "@/hooks/useQueryHook";
import { CoinData } from "@/utils/Types";

// api to get the coin details
const COIN_API = process.env.EXPO_PUBLIC_COINGECKO_API;

export default function HomeContainer() {
  const router = useRouter();
  // limit
  const [limitLists, setLimitLists] = useState(4);

  // Fetching Data with explicit CoinData type
  const { data, isLoading, isError } = useGetTrendingCoins();

  // RenderItem using the API type (CoinData) to map to UI structure
  const renderItem: ListRenderItem<CoinData> = ({ item }) => (
    <HomeScreenCard
      id={item.id}
      data={{
        name: item.name,
        symbol: item.symbol.toUpperCase(),
        price: item.current_price.toLocaleString(),
        change: item.price_change_percentage_24h?.toFixed(2) || "0.00",
        isPositive: item.price_change_percentage_24h > 0,
        image: item.image,
      }}
    />
  );

  // To see all the lists
  const handleAllLimits = () => {
    setLimitLists(14);
  };

  // Route navigation for the HomeOperation
  // Navigation for Trade Tab
  const handleTradeTabNavigation = () => {
    router.replace(ROUTE_LIST?.TRADE_SCREEN);
  };

  return (
    <View className="bg-appBg flex-1">
      <Container className="flex-1">
        {/* Header Visual */}
        <HomeDataVirtualization />

        {/* Action Buttons */}
        <View className="flex-row items-center justify-between mb-8">
          {HOME_OPERATION_DATA.map((item) => (
            <HomeExchangeOperations
              key={item.id}
              title={item.name}
              onPress={handleTradeTabNavigation}
              image={item.image}
            />
          ))}
        </View>

        {/* List Header */}
        <CardDescription
          title="Trending Assets"
          btnText="See all"
          className="mb-5"
          onPress={handleAllLimits}
        />

        {/* Dynamic Coin List */}
        <DataStateWrapper isLoading={isLoading} isError={isError}>
          <FlatList
            data={data?.slice(0, limitLists)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </DataStateWrapper>
      </Container>
    </View>
  );
}
