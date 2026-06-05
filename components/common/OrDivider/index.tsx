import React from "react";
import { View } from "react-native";
import Paragraph from "../headings/Paragraph";

export default function OrDivider() {
  return (
    <View className="flex-row items-center my-6 w-full">
      <View className="flex-1 h-[1px] bg-darkPurple" />
      <Paragraph className="mx-4 text-Gray font-poppins-bold text-xs tracking-widest">
        OR
      </Paragraph>
      <View className="flex-1 h-[1px] bg-darkPurple" />
    </View>
  );
}
