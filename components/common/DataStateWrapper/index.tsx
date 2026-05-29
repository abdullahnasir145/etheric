import { ActivityIndicator, Text, View } from "react-native";

type DataStateWrapperProps = {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
};

export default function DataStateWrapper(props: DataStateWrapperProps) {
  const { children, isLoading, isError } = props;
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00E5FF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text className="text-red-500">
          Something went wrong. Please try again.
        </Text>
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{children}</View>;
}
