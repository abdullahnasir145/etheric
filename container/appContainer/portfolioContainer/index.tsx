import Container from "@/components/common/Container";
import Heading2 from "@/components/common/headings/Heading2";
import TabSwitcher from "@/components/common/taskTabs";
import { ROUTE_LIST } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function PortfolioContainer() {
  const [currentTab, setCurrentTab] = useState<"active" | "history">("active");

  // navigate to task creation screen to make new task

  const handleTaskCreationScreenNav = () => {
    router.push(ROUTE_LIST.TASKCREATION_SCREEN);
  };

  return (
    <View className="bg-appBg flex-1 relative">
      <Container>
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
      </Container>

      {/* Bottom New task button */}
      <View className="absolute bottom-6 right-6 z-50">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleTaskCreationScreenNav}
          className="rounded-full overflow-hidden shadow-md w-20"
        >
          <LinearGradient
            colors={["#78c7d0", "#2ab5c4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="py-4 items-center justify-center"
          >
            <PlusIcon size={30} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
