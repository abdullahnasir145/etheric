import AccountStatusCard from "@/components/common/cards/AccountStatusCard";
import SettingsCard from "@/components/common/cards/SettingsCard";
import Container from "@/components/common/Container";
import { SETTING_CARD_DATA } from "@/data/settingsCard.ts";
import { ScrollView, View } from "react-native";

export default function SettingContainer() {
  return (
    <View className="bg-appBg flex-1">
      <ScrollView>
        <Container className="mt-10">
          <AccountStatusCard
            name="Abdullah"
            email="abdullahnasir111145@gmail.com"
            isVerified={true}
            balances={[1000, 2000, 3000]}
          />

          {/* Setting cards */}
          {SETTING_CARD_DATA.map((item) => (
            <SettingsCard
              key={item.key}
              title={item.title}
              description={item.description}
              image={item.image}
              bgColor={item.bgColor}
              onPress={() => console.log(`${item.title} pressed`)}
            />
          ))}
        </Container>
      </ScrollView>
    </View>
  );
}
