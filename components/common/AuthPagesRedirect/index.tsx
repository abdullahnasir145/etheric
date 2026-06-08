import React from "react";
import { Pressable, View } from "react-native";
import Heading2 from "../headings/Heading2";
import Paragraph from "../headings/Paragraph";

interface AuthFooterProps {
  onPress: () => void;
  message?: string;
  actionText?: string;
}

export default function AuthFooter(props: AuthFooterProps) {
  const { onPress, message, actionText } = props;
  return (
    <View className="flex-row justify-center items-center mt-8 gap-x-1">
      <Paragraph className="text-lightGray font-poppins-regular text-sm">
        {message}
      </Paragraph>
      <Pressable onPress={onPress} hitSlop={12} className="active:opacity-70">
        <Heading2 className="text-primary font-poppins-semibold text-sm">
          {actionText}
        </Heading2>
      </Pressable>
    </View>
  );
}
