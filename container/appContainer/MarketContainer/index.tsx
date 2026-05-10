import HomeScreenCard from "@/components/common/cards/homeScreen/homeScreenCard";
import MarketCapRank from "@/components/common/cards/marketCards/MarketCapRankCard";
import Container from "@/components/common/Container";
import CustomInput from "@/components/common/inputs/CustomInput";
import { View } from "react-native";

export default function MarketContainer() {
  return (
    <View className="bg-appBg flex-1">
      <Container>
        <View className="my-10">
          <CustomInput />
          <View className="my-4">
            <MarketCapRank />
          </View>

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
        </View>
      </Container>
    </View>
  );
}
