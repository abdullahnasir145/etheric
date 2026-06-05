import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Paragraph from "../../headings/Paragraph";

type CryptoTipCardProps = {
  title: string;
  content: string;
  category: string;
  icon: string;
};

export default function CryptoTipCard({ title, content, category, icon }: CryptoTipCardProps) {
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      security: "#10B981",
      defi: "#8B5CF6",
      nft: "#EC4899",
      blockchain: "#3B82F6",
      trading: "#F59E0B",
    };
    return colors[cat] || "#6B7280";
  };

  return (
    <View className="bg-white/5 rounded-2xl p-4 mb-3 border border-white/10">
      <View className="flex-row items-center mb-2">
        <View
          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: `${getCategoryColor(category)}20` }}
        >
          <Ionicons
            name={icon as any}
            size={22}
            color={getCategoryColor(category)}
          />
        </View>
        <Paragraph className="text-white font-poppins-semibold flex-1">
          {title}
        </Paragraph>
      </View>
      <Paragraph className="text-gray-400 text-sm ml-12">
        {content}
      </Paragraph>
    </View>
  );
}