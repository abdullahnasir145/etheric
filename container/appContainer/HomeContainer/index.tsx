import CardDescription from "@/components/common/cards/CardDescription";
import FearGreedCard from "@/components/common/cards/homeScreen/ExchangeIndex";
import HomeScreenCard from "@/components/common/cards/homeScreen/homeScreenCard";
import Container from "@/components/common/Container";
import HomeExchangeOperations from "@/components/common/exchangeOperations";
import { ROUTE_LIST } from "@/constants";
import { HOME_OPERATION_DATA } from "@/data/home";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeContainer() {
  const router = useRouter();

  // function to hnndle the navigation for market tab
  const handleMarketTabNavigation = () => {
    router.replace(ROUTE_LIST?.MARKETS_SCREEN);
  };

  // function to hnndle the navigation for trade tab

  const handleTradeTabNavigation = () => {
    router.replace(ROUTE_LIST?.TRADE_SCREEN);
  };

  return (
    <View className="bg-appBg flex-1">
      <Container>
        {/* Dummy chart */}
        <View className="bg-primary w-full h-20 mt-10 mb-12 rounded-2xl"></View>

        {/* Operation Row */}
        <View className="flex-row items-center justify-between mb-8">
          {HOME_OPERATION_DATA.map((item) => (
            <HomeExchangeOperations
              key={item.id}
              title={item.name}
              onPress={handleTradeTabNavigation}
              image={item.image}
            />
          ))}
        </View>

        {/* Card overview description */}
        <CardDescription
          title="Trending Assets"
          btnText="See all"
          className="mb-5"
          onPress={handleMarketTabNavigation}
        />

        {/* Market List */}
        <HomeScreenCard
          coin={{
            name: "Bitcoin",
            symbol: "BTC",
            price: "64,231.50",
            change: "2.45",
            isPositive: true,
            image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
          }}
        />

        {/* Fear and Greed Index */}
        <FearGreedCard />
      </Container>
    </View>
  );
}
