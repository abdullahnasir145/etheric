import { TextInput, TextInputProps, View } from "react-native";
import SearchImage from "../../../../assets/images/svgs/search-icon.svg";

// fix input consts
const PLACEHOLDER_COLOR = "#E0E0E0";
const IMAGE_SIZE = 18;

type CustomInputProp = {
  className?: string;
} & TextInputProps;

export default function CustomInput(props: CustomInputProp) {
  const { className } = props;

  return (
    <View
      className={`bg-lightPurple flex-row h-12 px-4 gap-3 rounded-lg items-center ${className}`}
    >
      <View>
        <SearchImage width={IMAGE_SIZE} height={IMAGE_SIZE} />
      </View>
      <TextInput
        placeholder="Search markets..."
        placeholderTextColor={PLACEHOLDER_COLOR}
        className="font-poppins-regular text-base text-lightGray flex-1 p-0 h-full"
        cursorColor={PLACEHOLDER_COLOR}
        textAlignVertical="center"
      />
    </View>
  );
}
