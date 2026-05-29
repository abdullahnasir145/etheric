import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TradeDialPad from "@/components/common/TradePad";
import { useGetCoinSimplePrice } from "@/data/coins";
import React, { useMemo, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

type ConversionMode = "buy" | "sell";

export default function TradTabContainer() {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<ConversionMode>("buy");

  const { data: conversionData } = useGetCoinSimplePrice("bitcoin", "usd");
  const pricePerBTC = conversionData?.bitcoin?.usd || 0;

  const convertedAmount = useMemo(() => {
    if (!pricePerBTC || !amount) return undefined;
    const numAmount = parseFloat(amount) || 0;
    if (mode === "buy") {
      return (numAmount / pricePerBTC).toFixed(8);
    } else {
      return (numAmount * pricePerBTC).toFixed(2);
    }
  }, [amount, pricePerBTC, mode]);

  const handleKeyPress = (key: string) => {
    if (amount.length >= 12)
      return Alert.alert("Can't exceed", "Dont add more than 12 digits");
    if (key === "." && amount.includes(".")) return;

    if (amount === "0" && key !== ".") {
      setAmount(key);
      return;
    }

    setAmount((prev) => prev + key);
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "buy" ? "sell" : "buy"));
    setAmount("");
  };

  return (
    <View className="flex-1 bg-appBg px-4">
      <View className="pt-12 pb-6">
        <View className="flex-row items-center justify-center mb-6">
          <Text
            className={`text-lg font-poppins-semibold mx-4 ${
              mode === "buy" ? "text-white" : "text-gray-500"
            }`}
          >
            Buy Crypto
          </Text>
          <TouchableOpacity
            onPress={toggleMode}
            className="w-14 h-8 bg-slate-800 rounded-full justify-center"
          >
            <View
              className={`w-6 h-6 rounded-full bg-emerald-500 ml-1 ${
                mode === "sell" ? "ml-auto mr-1" : ""
              }`}
            />
          </TouchableOpacity>
          <Text
            className={`text-lg font-poppins-semibold mx-4 ${
              mode === "sell" ? "text-white" : "text-gray-500"
            }`}
          >
            Sell Crypto
          </Text>
        </View>

        <View className="items-center">
          <Text className="text-gray-400 text-sm font-poppins-medium mb-2">
            {mode === "buy" ? "USD Amount" : "BTC Amount"}
          </Text>
          <View className="flex-row items-baseline gap-2">
            {mode === "buy" ? (
              <Text className="text-4xl text-blue-500 font-poppins-bold">
                $
              </Text>
            ) : (
              <Text className="text-4xl text-orange-500 font-poppins-bold">
                ฿
              </Text>
            )}
            <Text className="text-4xl font-poppins-bold text-lightGray">
              {amount || "0"}
            </Text>
          </View>

          {convertedAmount && (
            <View className="flex-row items-baseline gap-1 mt-3">
              <Text className="text-emerald-400 text-xl font-poppins-semibold">
                ≈ {convertedAmount}
              </Text>
              <Text className="text-gray-500 text-base font-poppins-medium">
                {mode === "buy" ? "BTC" : "USD"}
              </Text>
            </View>
          )}

          <View className="bg-white/5 rounded-xl px-3 py-1 mt-3">
            <Text className="text-gray-400 text-xs">
              1 BTC = ${pricePerBTC.toLocaleString()} USD
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-1 justify-center">
        <TradeDialPad onKeyPress={handleKeyPress} onDelete={handleDelete} />
      </View>

      <View className="pb-8">
        <PrimaryButton
          title={mode === "buy" ? "Buy Bitcoin" : "Sell Bitcoin"}
        />
      </View>
    </View>
  );
}
