import Paragraph from "@/components/common/headings/Paragraph";
import { View } from "react-native";
import { CRYPTO_TIPS, getCategoryColor } from "@/utils/portfolio";

export default function PortfolioContainer() {
  return (
    <View className="bg-appBg flex-1 p-4">
      {CRYPTO_TIPS.map(tip => (
        <View key={tip.id} className="mb-4 p-3 border rounded" style={{ borderLeftWidth: 4, borderLeftColor: getCategoryColor(tip.category) }}>
          <Paragraph className="font-bold" style={{ color: getCategoryColor(tip.category) }}>{tip.title}</Paragraph>
          <Paragraph style={{ color: getCategoryColor(tip.category) }}>{tip.content}</Paragraph>
        </View>
      ))}
    </View>
  );
}
