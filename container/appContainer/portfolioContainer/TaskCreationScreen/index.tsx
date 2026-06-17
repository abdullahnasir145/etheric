import Paragraph from "@/components/common/headings/Paragraph";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function TaskCreationContainer() {
  const { data: coins, isLoading, isError } = useGetTrendingCoins();
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<any>(null);

  const handleSetLimits = () => {
    if (!selectedCoin || !buyPrice || !sellPrice) return;

    const newTask = {
      id: Date.now().toString(),
      coinName: selectedCoin.name,
      symbol: selectedCoin.symbol,
      buyTarget: buyPrice,
      sellTarget: sellPrice,
      initialPrice: selectedCoin.price,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "active",
    };

    // Pass data back via router params and navigate back
    router.navigate({
      pathname: "/portfolio", // Adjust to match your exact Portfolio path
      params: { newTask: JSON.stringify(newTask) },
    });
  };

  const renderCoinItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className={`flex-row justify-between items-center p-4 mb-3 rounded-xl ${selectedCoin?.id === item.id ? "bg-[#4b556d] border border-[#00E5FF]" : "bg-[#283044]"}`}
      onPress={() => {
        setSelectedCoin(item);
        setBuyPrice((item.price * 0.95).toFixed(2)); // Autofill safe defaults
        setSellPrice((item.price * 1.05).toFixed(2));
      }}
    >
      <View>
        <Text className="text-white font-bold text-base">{item.name}</Text>
        <Text className="text-[#E0E0E0] text-xs uppercase">{item.symbol}</Text>
      </View>
      <Text className="text-[#00E5FF] font-semibold">
        ${item.price?.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#0F172A] px-4 pt-12">
      <Paragraph className="text-white text-2xl font-bold mb-6">
        Set Price Alert
      </Paragraph>

      <View className="space-y-4 mb-6">
        <TextInput
          className="bg-[#283044] text-white p-4 rounded-xl border border-[#4b556d]"
          placeholder="Buy Target Price ($)"
          placeholderTextColor="#5C5C5C"
          keyboardType="numeric"
          value={buyPrice}
          onChangeText={setBuyPrice}
        />
        <TextInput
          className="bg-[#283044] text-white p-4 rounded-xl border border-[#4b556d]"
          placeholder="Sell Target Price ($)"
          placeholderTextColor="#5C5C5C"
          keyboardType="numeric"
          value={sellPrice}
          onChangeText={setSellPrice}
        />
        <TouchableOpacity
          onPress={handleSetLimits}
          className="bg-[#00E5FF] p-4 rounded-xl items-center mt-2"
        >
          <Text className="text-[#0F172A] font-bold text-base">Set Limits</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-white text-lg font-semibold mb-3">
        Select Crypto Asset
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00E5FF" />
      ) : (
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          renderItem={renderCoinItem}
        />
      )}
    </View>
  );
}

// Temporary Mock Hook
function useGetTrendingCoins() {
  return {
    data: [
      { id: "1", name: "Bitcoin", symbol: "btc", price: 67250.5 },
      { id: "2", name: "Ethereum", symbol: "eth", price: 3520.15 },
    ],
    isLoading: false,
    isError: false,
  };
}
