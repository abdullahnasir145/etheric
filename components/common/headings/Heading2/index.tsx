import { ReactNode } from "react";
import { Text } from "react-native";

type Heading2Prop = {
  className?: any;
  children?: ReactNode;
};

export default function Heading2(props: Heading2Prop) {
  const { className, children, ...rest } = props;
  return (
    <Text className={`text-black font-poppins-regular ${className}`} {...rest}>
      {children}
    </Text>
  );
}
