import { ReactNode } from "react";
import { View } from "react-native";

type AuthContainerProps = {
  children?: ReactNode;
  className?: string;
};

export default function AuthContainer({ children, className = "" }: AuthContainerProps) {
  return (
    <View className={`flex-1 bg-appBg ${className}`}>
      {children}
    </View>
  );
}