import Paragraph from "@/components/common/headings/Paragraph";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { colors } from "../../../../../utils/Colors/index";

export default function MarketCapRank() {
  return (
    <View className="rounded-md">
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="rounded-lg p-5"
      >
        <View className="flex-row justify-between items-center mb-4">
          <Paragraph className="text-white/80 text-sm font-medium uppercase tracking-wider">
            Market Cap Rank
          </Paragraph>

          {/* Market Cap Rank */}
          <View className="bg-lightGray px-3 py-0.5 rounded-full">
            <Text className="text-gray font-medium">1</Text>
          </View>
        </View>

        {/* chart */}
        {/* used in future */}
        {/* <View></View> */}

        <View>
          <Paragraph className="text-white text-3xl font-bold tracking-tight">
            $2,450,120,443
          </Paragraph>
          <Paragraph className="text-secondary poppins-semibold text-xs mt-1">
            ▲ +5.2% Today
          </Paragraph>
        </View>
      </LinearGradient>
    </View>
  );
}
