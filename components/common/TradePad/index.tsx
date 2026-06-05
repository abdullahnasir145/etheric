import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import { colors } from "@/utils/Colors";

type TradeDialPadProps = {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
};

export default function TradeDialPad(props: TradeDialPadProps) {
  const { onKeyPress, onDelete } = props;

  const mainKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const bottomKeys = [".", "0", "⌫"];

  return (
    <View className="w-full px-2">
      <View className="flex-row flex-wrap justify-center">
        {mainKeys.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => onKeyPress(item)}
            className={`w-16 h-16 rounded-2xl mx-2 mb-3 items-center justify-center border ${
              Platform.OS === "ios" ? "border-white/20" : "border-white/10"
            }`}
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            activeOpacity={0.5}
          >
            <Text className="text-2xl font-poppins-semiBold text-white">
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-center px-2">
        {bottomKeys.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => (item === "⌫" ? onDelete() : onKeyPress(item))}
            className="w-16 h-16 rounded-2xl mx-2 items-center justify-center border border-white/10"
            style={{
              backgroundColor:
                item === "⌫" ? "rgba(76, 102, 159, 0.2)" : "rgba(255,255,255,0.08)",
            }}
            activeOpacity={0.5}
          >
            {item === "⌫" ? (
              <Ionicons name="backspace-outline" size={22} color={colors.primary} />
            ) : (
              <Text className="text-xl font-poppins-semiBold text-white">
                {item === "." ? "." : item}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}