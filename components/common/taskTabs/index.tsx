import Paragraph from "@/components/common/headings/Paragraph";
import { Pressable, View } from "react-native";

interface TabSwitcherProps {
  currentTab: "active" | "history";
  onTabChange: (tab: "active" | "history") => void;
}

export default function TabSwitcher({
  currentTab,
  onTabChange,
}: TabSwitcherProps) {
  return (
    <View className="bg-lightPurple p-1 flex-row justify-between items-center rounded-2xl">
      {/* Active Tab */}
      <Pressable
        onPress={() => onTabChange("active")}
        className={`flex-1 items-center py-3 rounded-xl transition-all ${
          currentTab === "active" ? "bg-appBg" : "bg-transparent"
        }`}
      >
        <Paragraph
          className={
            currentTab === "active"
              ? "text-primary font-poppins-semibold"
              : "text-gray-400"
          }
        >
          Active
        </Paragraph>
      </Pressable>

      {/* History Tab */}
      <Pressable
        onPress={() => onTabChange("history")}
        className={`flex-1 items-center py-3 rounded-xl transition-all ${
          currentTab === "history" ? "bg-appBg" : "bg-transparent"
        }`}
      >
        <Paragraph
          className={
            currentTab === "history"
              ? "text-primary font-poppins-semibold"
              : "text-gray-400"
          }
        >
          History
        </Paragraph>
      </Pressable>
    </View>
  );
}
