import HomeScreenCard from "@/components/common/cards/homeScreen/homeScreenCard";
import Container from "@/components/common/Container";
import DataStateWrapper from "@/components/common/DataStateWrapper";
import CustomInput from "@/components/common/inputs/CustomInput";
import { useGetTrendingCoins } from "@/hooks/useQueryHook";
import { CoinData } from "@/utils/Types";
import React, { useMemo, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

export default function MarketContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useGetTrendingCoins();
  console.log("Status:", { isLoading, isError, hasData: !!data });

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .slice(0, 100);
  }, [data, searchQuery]);
  // console.log(filteredData);

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
  return (
    <View className="bg-appBg flex-1">
      <Container className="flex-1">
        <View className="my-10">
          <CustomInput
            value={searchQuery}
            onChangeText={(text: string) => setSearchQuery(text)}
            placeholder="Search coins..."
          />
          {/* <View className="my-4">
            <MarketCapRank />
          </View> */}

          {/* Rendering the List of Coins */}
        </View>

        <View className="mb-4 flex-1">
          <DataStateWrapper isLoading={isLoading} isError={isError}>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </DataStateWrapper>
        </View>
      </Container>
    </View>
  );
}
