import React from "react";
import { Text, View } from "react-native";

export default function OrDivider({ title }: { title: string }) {
  return (
    <View className="flex-row items-center my-6 w-full">
      <View className="flex-1 h-[1px] bg-darkPurple" />
      <Text className="mx-4 text-white font-poppins-semibold text-xs tracking-widest uppercase">
        {title}
      </Text>
      <View className="flex-1 h-[1px] bg-darkPurple" />
    </View>
  );
}
