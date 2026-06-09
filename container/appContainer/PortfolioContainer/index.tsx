import Container from "@/components/common/Container";
import Heading2 from "@/components/common/headings/Heading2";
import TabSwitcher from "@/components/common/taskTabs";
import { LinearGradient } from "expo-linear-gradient";
import { PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function PortfolioContainer() {
  const [currentTab, setCurrentTab] = useState<"active" | "history">("active");

  return (
    <View className="bg-appBg flex-1">
      <Container>
        {/* Swapped inline tabs with the unified component */}
        <TabSwitcher currentTab={currentTab} onTabChange={setCurrentTab} />

        {currentTab === "active" ? (
          <View className="bg-red-500 p-4 mt-4 rounded-2xl overflow-hidden">
            <Heading2 className="text-white text-2xl">
              Active Cards View
            </Heading2>
          </View>
        ) : (
          <View className="bg-blue-700 p-4 mt-4 rounded-2xl overflow-hidden">
            <Heading2 className="text-white text-2xl">
              History Tab View
            </Heading2>
          </View>
        )}

        {/* Add Bew Card button */}
        <View className="absolute bottom-0">
          <TouchableOpacity
            // onPress={onPress}
            activeOpacity={0.8}
            className={`rounded-md overflow-hidden shadow-md self-end w-16`}
          >
            <LinearGradient
              colors={["#78c7d0", "#2ab5c4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="py-2 items-center justify-center"
            >
              <PlusIcon size={30} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  );
}
