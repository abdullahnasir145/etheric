import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import Heading3 from "@/components/common/headings/Heading3";
import Paragraph from "@/components/common/headings/Paragraph";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { Dimensions, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const { width, height } = Dimensions.get("window");

// ✅ Local JSON files — never break, no network needed, load instantly
const cryptoAnimation = require("@/assets/animations/crypto.json");
const communityAnimation = require("@/assets/animations/community.json");
const learningAnimation = require("@/assets/animations/learning.json");

const slides = [
  {
    key: "1",
    title: "Track Live Updates",
    text: "Monitor real-time market data, live price movements, and precise US rounding crypto values instantly.",
    animation: cryptoAnimation,
  },
  {
    key: "2",
    title: "Collaborate with Community",
    text: "Connect with thousands of global traders, share strategies, and grow your Web3 network.",
    animation: communityAnimation,
  },
  {
    key: "3",
    title: "Learn Through Forums",
    text: "Access crowd-sourced educational threads, analytical breakdowns, and master crypto trading step-by-step.",
    animation: learningAnimation,
  },
];

export default function OnboardingScreens() {
  const renderItem = ({ item }: { item: (typeof slides)[0] }) => {
    return (
      <View className="flex-1 bg-appBg items-center justify-center px-6">
        <View
          style={{ width: width * 0.8, height: height * 0.4, marginBottom: 40 }}
        >
          <LottieView
            source={item.animation}
            autoPlay
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text className="text-white text-3xl font-poppins-bold text-center mb-4">
          {item.title}
        </Text>
        <Paragraph className="text-lightGray text-lg  text-center px-4">
          {item.text}
        </Paragraph>
      </View>
    );
  };

  // function to execute next screen swipper
  const renderNextButton = () => (
    <View className="rounded-2xl overflow-hidden">
      <LinearGradient
        colors={["#78c7d0", "#2ab5c4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="py-4 items-center justify-center"
      >
        <Heading3 className="text-white text-xl font-poppins-semibold">
          Next
        </Heading3>
      </LinearGradient>
    </View>
  );

  const renderDoneButton = () => (
    <View className="">
      <PrimaryButton
        title="Get Started"
        onPress={() => router.replace("/(auth)/login")}
      />
    </View>
  );

  const renderPrevButton = () => (
    <View className="ml-4">
      <Text className="text-primary text-lg font-poppins-medium">Previous</Text>
    </View>
  );

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      dotStyle={{
        backgroundColor: "#5C5C5C",
        width: 16,
        height: 8,
        borderRadius: 2,
      }}
      activeDotStyle={{
        backgroundColor: "#00E5FF",
        width: 32,
        height: 8,
        borderRadius: 2,
        shadowColor: "#00E5FF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 5,
      }}
      bottomButton
    />
  );
}
