import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import Container from "@/components/common/Container";
import TradeDialPad from "@/components/common/TradePad";
import TradePadHeader from "@/components/common/TradePadHeader"; // Import your header
import React, { useState } from "react";
import { Alert, View } from "react-native";

export default function TradTabContainer() {
  const [amount, setAmount] = useState("");

  const handleKeyPress = (key: string) => {
    // Limit to 20 characters
    if (amount.length >= 20)
      return Alert.alert("Can't exceed", "Dont add more than 20 digits");
    //  Prevent multiple decimals
    if (key === "." && amount.includes(".")) return;

    //  Handle initial zero
    if (amount === "0" && key !== ".") {
      setAmount(key);
      return;
    }

    setAmount((prev) => prev + key);
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  return (
    <View className="flex-1 bg-appBg">
      <Container className="flex-1 items-center mt-10">
        {/* Header Section */}
        <TradePadHeader amount={amount} />

        {/* Adjust this margin to control the gap precisely */}
        <View className=" w-full">
          <TradeDialPad onKeyPress={handleKeyPress} onDelete={handleDelete} />
        </View>

        {/* Action Button */}
        <View className="mt-auto w-full pb-6">
          <PrimaryButton title="Review Order" />
        </View>
      </Container>
    </View>
  );
}
