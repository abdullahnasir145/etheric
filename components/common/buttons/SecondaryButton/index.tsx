import { LinearGradient } from "expo-linear-gradient";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Heading3 from "../../headings/Heading3";

type PrimaryButtonProp = {
  title: string;
  className?: string;
  onPress?: () => void;
  Icon?: LucideIcon;
  imageClassName?: string;
};

export default function SecondaryButton(props: PrimaryButtonProp) {
  const { title, className = "", onPress, Icon, imageClassName = "" } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`rounded-2xl overflow-hidden shadow-md ${className}`}
    >
      <LinearGradient
        colors={["#00E5FF", "#78c7d0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="py-4 flex-row items-center justify-center gap-3"
      >
        <Heading3 className="text-white text-xl font-poppins-semibold">
          {title}
        </Heading3>
        {Icon && <Icon size={20} color="#E0E0E0" />}
      </LinearGradient>
    </TouchableOpacity>
  );
}
