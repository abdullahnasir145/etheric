import { ReactNode } from "react";
import { View } from "react-native";

type ContainerProp = {
  children?: ReactNode;
  className?: any;
};

export default function Container(props: ContainerProp) {
  const { className, children, ...rest } = props;
  return (
    <View className={`mx-5 ${className}`} {...rest}>
      {children}
    </View>
  );
}
