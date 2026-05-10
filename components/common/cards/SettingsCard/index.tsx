import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import Heading3 from "../../headings/Heading3";
import Paragraph from "../../headings/Paragraph";

type SettingsCardProps = {
  title: string;
  description: string;
  image: any;
  bgColor: string;
  onPress?: () => void;
};

export default function SettingsCard({
  title,
  description,
  image,
  bgColor,
  onPress,
}: SettingsCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center bg-white/5 p-4 rounded-3xl mb-4 border border-white/10"
    >
      {/* Icon Container with dynamic background */}
      <View
        style={{ backgroundColor: `${bgColor}20` }} // Adding 20 at the end for 12% opacity
        className="w-14 h-14 rounded-2xl items-center justify-center border border-white/5"
      >
        <Ionicons name={image} size={26} color={bgColor} />
      </View>

      {/* Text Content */}
      <View className="flex-1 ml-4">
        <Heading3 className="text-white text-base font-poppins-semibold">
          {title}
        </Heading3>
        <Paragraph className="text-gray-400 text-xs mt-1 leading-4">
          {description}
        </Paragraph>
      </View>

      {/* Right Arrow */}
      <View className="ml-2">
        <Ionicons name="chevron-forward" size={20} color="#4B5563" />
      </View>
    </TouchableOpacity>
  );
}
