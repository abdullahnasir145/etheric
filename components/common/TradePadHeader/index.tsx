import { View } from "react-native";
import Heading2 from "../headings/Heading2";
import Paragraph from "../headings/Paragraph";

type TradePadHeaderProp = {
  amount?: string | number;
};

export default function TradePadHeader(props: TradePadHeaderProp) {
  const { amount } = props;
  return (
    <View className="flex-1 justify-between ">
      {/* Display Area */}
      <View className="items-center px-6">
        <Paragraph className="text-lightPrimary text-lg font-medium mb-2">
          Amount to Buy
        </Paragraph>
        <View className="flex-row gap-3">
          <Heading2 className="text-2xl text-blue-500">$</Heading2>
          <Heading2 className="text-2xl tracking-widest text-lightGray">
            {amount || "0"}
          </Heading2>
        </View>
      </View>
    </View>
  );
}
