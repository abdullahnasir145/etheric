import { ReactNode } from "react";
import { Text } from "react-native";

type Heading3Prop = {
  className?: any;
  children?: ReactNode;
};

export default function Heading3(props: Heading3Prop) {
  const { className, children, ...rest } = props;
  return (
    <Text className={`text-black font-poppins-regular ${className}`} {...rest}>
      {children}
    </Text>
  );
}
