import CryptoDetailedCard from "@/components/common/cards/CryptoDetailedCard";
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

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .slice(0, 100);
  }, [data, searchQuery]);

  const renderItem: ListRenderItem<CoinData> = ({ item }) => (
    <CryptoDetailedCard data={item} />
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