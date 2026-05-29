import { Pressable, View } from "react-native";
import Paragraph from "../headings/Paragraph";

type HomeOperationsProp = {
  title: string;
  image?: any;
  onPress: () => void;
};

const ICON_SIZE = 24;

export default function HomeExchangeOperations(props: HomeOperationsProp) {
  const { title, image, onPress } = props;
  const Icon = image;

  return (
    <Pressable onPress={onPress} className="items-center justify-center">
      {({ pressed }) => (
        <>
          <View
            className={`py-3 px-3 rounded-xl mb-2 items-center justify-center ${
              pressed ? "bg-darkPurple" : "bg-lightPurple"
            }`}
          >
            {image && <Icon width={ICON_SIZE} height={ICON_SIZE} />}
          </View>
          <Paragraph className="text-white uppercase">{title}</Paragraph>
        </>
      )}
    </Pressable>
  );
}
