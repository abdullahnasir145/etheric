import Heading2 from "@/components/common/headings/Heading2";
import Paragraph from "@/components/common/headings/Paragraph";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";

interface CoinNestedCardProps {
  title: string;
  value: string;
  percentage: number;
  Icon?: any;
}

export default function CoinNestedCard(props: CoinNestedCardProps) {
  const { title, value, percentage, Icon } = props;

  // state to handle the percentage
  const [isPositive, setIsPositive] = useState(false);

  return (
    <View className="rounded-xl px-3  mt-4 border border-Gray pt-4 pb-2 shadow-xl">
      <View className="">
        <Heading2 className="text-lightGray text-sm font-poppins-medium uppercase tracking-wider">
          {title}
        </Heading2>
        <View className="flex-row items-center gap-3 mt-2">
          <View className="bg-gray-800 p-3 rounded-2xl">
            {Icon && <Icon color="#9ca3af" />}
          </View>
          <View>
            <Paragraph className="text-white text-2xl">{value}</Paragraph>
          </View>
        </View>

        <View
          className={`${isPositive ? "bg-secondary/20" : "bg-terniary/20"} px-3 py-1 rounded-xl flex-row items-center mt-4`}
        >
          <Ionicons
            name={isPositive ? "trending-up" : "trending-down"}
            size={12}
            color={isPositive ? "#10b981" : "#f43f5e"}
          />
          <Paragraph
            className={`${isPositive ? "text-sescondary" : "text-terniary"}  ml-1 text-sm font-poppins-semibold`}
          >
            {Math.abs(percentage)} %
          </Paragraph>
        </View>
      </View>
    </View>
  );
}
