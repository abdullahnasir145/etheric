import Heading2 from "@/components/common/headings/Heading2";
import Heading3 from "@/components/common/headings/Heading3";
import Paragraph from "@/components/common/headings/Paragraph";
import { LinearGradient } from "expo-linear-gradient";
import { Gauge } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

const FearGreedCard = () => {
  // Hardcoded for now - will be replaced by React Query
  const data = {
    value: 80,
    classification: "Greed",
    lastUpdated: "2h 15m ago",
  };

  // Logic for dynamic coloring
  const getStatusColor = (val: number) => {
    if (val <= 25) return "text-red-500";
    if (val <= 45) return "text-orange-400";
    if (val <= 55) return "text-yellow-400";
    if (val <= 75) return "text-green-400";
    return "text-emerald-500";
  };

  const getBarColor = (val: number) => {
    if (val <= 25) return "bg-red-500";
    if (val <= 45) return "bg-orange-400";
    if (val <= 55) return "bg-yellow-400";
    if (val <= 75) return "bg-green-400";
    return "bg-emerald-500";
  };

  // className=""
  return (
    <LinearGradient
      colors={["#283044", "#4e586e", "#232a3e"]}
      className="overflow-hidden p-5 rounded-lg"
    >
      {/* Your content */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center">
          <View className="bg-zinc-800 p-2 rounded-lg mr-3">
            <Gauge size={20} color="#a1a1aa" />
          </View>
          <Paragraph className="text-zinc-100 text-sm">
            Fear & Greed Index
          </Paragraph>
        </View>
        <Paragraph className="text-zinc-400 text-xs">
          {data.lastUpdated}
        </Paragraph>
      </View>

      <View className="items-center mb-6">
        <Heading2
          className={`text-4xl font-bold ${getStatusColor(data.value)}`}
        >
          {data.value}
        </Heading2>
        <Heading3 className="text-white  mt-1 tracking-tight">
          {data.classification}
        </Heading3>
      </View>

      <View className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden flex-row">
        <View
          style={{ width: `${data.value}%` }}
          className={`h-full rounded-full ${
            data.value < 40
              ? "bg-terniary"
              : data.value > 60
                ? "bg-secondary"
                : "bg-primary"
          }`}
        />
      </View>

      <View className="flex-row justify-between mt-3">
        <Paragraph className="text-terniary text-xs font-poppins-semibold uppercase tracking-widest">
          Fear
        </Paragraph>
        <Paragraph className="text-primary text-xs  uppercase tracking-widest">
          Neutral
        </Paragraph>
        <Paragraph className="text-secondary text-xs  uppercase tracking-widest">
          Greed
        </Paragraph>
      </View>
    </LinearGradient>
  );
};

export default FearGreedCard;
