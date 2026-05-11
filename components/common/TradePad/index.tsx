import { colors } from "@/utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import Paragraph from "../headings/Paragraph";

type TradeDialPadProps = {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
};

export default function TradeDialPad(props: TradeDialPadProps) {
  const { onKeyPress, onDelete } = props;
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"];

  return (
    <View className="flex-row flex-wrap justify-center h-80 w-full px-6">
      {keys.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => (item === "del" ? onDelete() : onKeyPress(item))}
          className="w-[30%] aspect-square items-center justify-center m-1 rounded-full"
          activeOpacity={0.7}
        >
          {item === "del" ? (
            <Ionicons
              name="backspace-outline"
              size={28}
              color={colors.primary}
            />
          ) : (
            <View className="items-center">
              <Paragraph className="text-2xl font-poppins-semiBold text-lightGray">
                {item}
              </Paragraph>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
