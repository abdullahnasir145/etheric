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

// handle navigation for coin detail page

export default function HomeContainer() {
  const router = useRouter();
  const [limitLists, setLimitLists] = useState(4);

  // Fetching Data with explicit CoinData type
  const { data, isLoading, isError } = useGetTrendingCoins();

  // RenderItem using the API type  to map to UI structure
  const renderItem: ListRenderItem<CoinData> = ({ item }) => (
    <HomeScreenCard
      data={{
        id: item.id,
        name: item.name,
        symbol: item.symbol?.toUpperCase(),
        price: item.current_price, // Pass raw number
        change: item.price_change_percentage_24h, // Pass raw number safely
        isPositive: (item.price_change_percentage_24h ?? 0) > 0,
        image: item.image,
        sparklinePrices: item.sparkline_in_7d?.price,
        onPress: () => router.push(`/coindetail?id=${item.id}`),
      }}
    />
  );

  // To see all the lists
  const handleAllLimits = () => {
    setLimitLists((prev) => (prev === 4 ? 14 : 4));
  };

  // Navigation for Trade Tab
  const handleTradeTabNavigation = () => {
    router.navigate(ROUTE_LIST?.TRADE_SCREEN);
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
          btnText={limitLists === 4 ? "See All" : "See Less"}
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
            showsVerticalScrollIndicator={false}
          />
        </DataStateWrapper>
      </Container>
    </View>
  );
}
