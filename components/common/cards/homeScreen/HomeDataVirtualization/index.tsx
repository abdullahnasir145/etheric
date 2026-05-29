import Paragraph from "@/components/common/headings/Paragraph";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

export default function HomeDataVirtualization() {
  // 1. Initialize Animated Values
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. Create a Parallel animation group that loops
    Animated.loop(
      Animated.parallel([
        // Opacity Pulse
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
        // Floating Movement
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -6, // Move up 6 units
            duration: 1500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0, // Return to base
            duration: 1500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [fadeAnim, floatAnim]);

  return (
    <View>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: floatAnim }],
        }}
        className="bg-primary w-full h-32 mt-6 mb-12 rounded-xl justify-center items-center shadow-lg"
      >
        <Paragraph className="text-white text-center font-poppins-bold text-xl">
          Data Chart Coming Soon
        </Paragraph>
      </Animated.View>
    </View>
  );
}
