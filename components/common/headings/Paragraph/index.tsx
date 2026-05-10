import { ReactNode } from "react";
import { Text } from "react-native";

type ParagraphProps = {
  className?: any;
  children?: ReactNode;
};

export default function Paragraph(props: ParagraphProps) {
  const { className, children, ...rest } = props;
  return (
    <Text className={`text-black font-poppins-regular ${className}`} {...rest}>
      {children}
    </Text>
  );
}
