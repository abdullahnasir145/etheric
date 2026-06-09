import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface OAuthButtonsProps {
  onGooglePress?: () => void;
  onApplePress?: () => void;
  onGitHubPress?: () => void;
}

export default function OAuthButtons({
  onGooglePress,
  onApplePress,
  onGitHubPress,
}: OAuthButtonsProps) {
  return (
    <View className="flex-row gap-x-3 w-full">
      {/* Google */}
      <TouchableOpacity
        onPress={onGooglePress}
        className="flex-1 flex-row items-center justify-center gap-x-2 py-3 sm:py-4 rounded-xl bg-[#0a0e1a] border border-[#1e2a3a]"
      >
        <View className="w-5 h-5 rounded-full bg-white items-center justify-center">
          <Text className="text-xs font-bold text-[#4285F4]">G</Text>
        </View>
        <Text
          aria-role="paragraph"
          className="text-white text-xs sm:text-sm font-poppins-regular"
        >
          Google
        </Text>
      </TouchableOpacity>

      {/* Apple */}
      <TouchableOpacity
        onPress={onApplePress}
        className="flex-1 flex-row items-center justify-center gap-x-2 py-3 sm:py-4 rounded-xl bg-[#0a0e1a] border border-[#1e2a3a]"
      >
        <Text className="text-lg text-white leading-5" />
        <Text
          aria-role="paragraph"
          className="text-white text-xs sm:text-sm font-poppins-regular"
        >
          Apple
        </Text>
      </TouchableOpacity>

      {/* GitHub */}
      <TouchableOpacity
        onPress={onGitHubPress}
        className="flex-1 flex-row items-center justify-center gap-x-2 py-3 sm:py-4 rounded-xl bg-[#0a0e1a] border border-[#1e2a3a]"
      >
        <View className="w-5 h-5 rounded-full bg-white items-center justify-center">
          <Text className="text-xs font-bold text-[#24292e]">GH</Text>
        </View>
        <Text
          aria-role="paragraph"
          className="text-white text-xs sm:text-sm font-poppins-regular"
        >
          GitHub
        </Text>
      </TouchableOpacity>
    </View>
  );
}
