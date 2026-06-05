import AccountStatusCard from "@/components/common/cards/AccountStatusCard";
import SettingsCard from "@/components/common/cards/SettingsCard";
import Container from "@/components/common/Container";
import { SETTING_CARD_DATA } from "@/data/settingsCard.ts";
import { ScrollView, View } from "react-native";
import { useState } from "react";
import SecurityModal from "@/components/common/modals/SecurityModal";
import SupportModal from "@/components/common/modals/SupportModal";
import LogoutModal from "@/components/common/modals/LogoutModal";

type ModalState = "security" | "support" | "logout" | null;

export default function SettingContainer() {
  const [modalState, setModalState] = useState<ModalState>(null);

  const handleCardPress = (key: string) => {
    setModalState(key as ModalState);
  };

  const handleCloseModal = () => {
    setModalState(null);
  };

  const handleLogout = () => {
    console.log("User signed out");
    setModalState(null);
  };

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
              onPress={() => handleCardPress(item.key)}
            />
          ))}
        </Container>
      </ScrollView>

      {/* Modals */}
      <SecurityModal
        visible={modalState === "security"}
        onClose={handleCloseModal}
      />
      <SupportModal
        visible={modalState === "support"}
        onClose={handleCloseModal}
      />
      <LogoutModal
        visible={modalState === "logout"}
        onClose={handleCloseModal}
        onConfirm={handleLogout}
      />
    </View>
  );
}