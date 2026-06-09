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
      {/* ── Logo Icon Block ── */}
      <View className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0a0e1a] border-[1.5px] border-[#00E5FF] items-center justify-center mb-4">
        <View className="items-center">
          {/* Top Diamond Piece */}
          <View className="w-0 h-0 border-l-[13px] border-r-[13px] border-b-[20px] border-l-transparent border-r-transparent border-b-[#00E5FF]" />
          {/* Bottom Diamond Piece */}
          <View className="w-0 h-0 border-l-[13px] border-r-[13px] border-t-[14px] border-l-transparent border-r-transparent border-t-[#00E5FF] opacity-50 mt-0.5" />
        </View>
      </View>

      {/* ── Brand App Name ── */}
      <Heading2 className="text-3xl sm:text-4xl tracking-widest font-poppins-bold text-center">
        <Heading2 className="text-[#00E5FF]">e</Heading2>
        <Heading2 className="text-white">theric</Heading2>
      </Heading2>

      {/* ── Dynamic Screen Action Title ── */}
      <Heading2 className="text-base sm:text-lg text-white mt-2 uppercase tracking-[3px] font-poppins-medium text-center">
        {title}
      </Heading2>

      {/* ── Dynamic Screen Subheading Description ── */}
      <Paragraph className="text-lightGray text-xs sm:text-sm mt-1 font-poppins-light text-center max-w-[85%]">
        {description}
      </Paragraph>
    </View>
  );
}
