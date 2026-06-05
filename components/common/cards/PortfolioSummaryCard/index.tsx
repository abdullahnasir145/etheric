import { View } from "react-native";
import Heading2 from "../../headings/Heading2";
import Heading3 from "../../headings/Heading3";
import Paragraph from "../../headings/Paragraph";

type PortfolioSummaryCardProps = {
  totalValue: number;
  dailyChange: number;
  holdingsCount: number;
};

export default function PortfolioSummaryCard({
  totalValue = 0,
  dailyChange = 0,
  holdingsCount = 0,
}: PortfolioSummaryCardProps) {
  const isPositive = dailyChange >= 0;

  return (
    <View className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-5 border border-white/10">
      <View className="items-center mb-4">
        <Paragraph className="text-gray-400 text-sm font-poppins-medium mb-1">
          Total Portfolio Value
        </Paragraph>
        <Heading2 className="text-white text-3xl font-poppins-bold">
          ${totalValue.toLocaleString()}
        </Heading2>
      </View>

      <View className="flex-row justify-between">
        <View className="items-center">
          <Paragraph className="text-gray-500 text-xs mb-1">
            24h Change
          </Paragraph>
          <Paragraph
            className={`text-sm font-poppins-semibold ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}{dailyChange.toLocaleString()}%
          </Paragraph>
        </View>

        <View className="items-center">
          <Paragraph className="text-gray-500 text-xs mb-1">
            Holdings
          </Paragraph>
          <Heading3 className="text-white text-base font-poppins-semibold">
            {holdingsCount} Assets
          </Heading3>
        </View>
      </View>
    </View>
  );
}