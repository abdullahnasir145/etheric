import React from "react";
import { View } from "react-native";
import Heading2 from "../../headings/Heading2";
import Paragraph from "../../headings/Paragraph";

interface AuthHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export default function AuthHeader(props: AuthHeaderProps) {
  const { title, description, className = "" } = props;
  return (
    <View className={`items-center mb-8 w-full ${className}`}>
      <Heading2 className="text-4xl font-poppins-bold text-primary uppercase text-center tracking-wider">
        {title}
      </Heading2>
      <Paragraph className="text-lightGray text-sm mt-2 font-poppins-light text-center max-w-[85%]">
        {description}
      </Paragraph>
    </View>
  );
}
