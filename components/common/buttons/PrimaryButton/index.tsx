import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import Heading3 from "../../headings/Heading3";

type PrimaryButtonProp = {
  title: string;
  className?: string;
  onPress?: () => void;
};

export default function PrimaryButton(props: PrimaryButtonProp) {
  const { title, className, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`rounded-2xl overflow-hidden shadow-md ${className}`}
    >
      <LinearGradient
        colors={["#78c7d0", "#2ab5c4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="py-4 items-center justify-center"
      >
        <Heading3 className="text-white text-xl font-poppins-semibold">
          {title}
        </Heading3>
      </LinearGradient>
    </TouchableOpacity>
  );
}
