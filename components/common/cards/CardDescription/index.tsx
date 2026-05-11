import { Pressable, View } from "react-native";
import Heading2 from "../../headings/Heading3";
import Paragraph from "../../headings/Paragraph";

type CardDesProp = {
  title: string;
  btnText?: string;
  className?: any;
  onPress?: () => void;
};

export default function CardDescription(props: CardDesProp) {
  const { title, btnText, className, onPress } = props;
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      <Heading2 className="text-white text-lg ">{title}</Heading2>
      <Pressable onPress={onPress} className="active:opacity-70">
        <Paragraph className="text-primary uppercase underline">
          {btnText}
        </Paragraph>
      </Pressable>
    </View>
  );
}
