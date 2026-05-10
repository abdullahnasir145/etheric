import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import Heading3 from "../../headings/Heading3";
import Paragraph from "../../headings/Paragraph";

type AccountStatusProps = {
  name: string;
  email: string;
  isVerified: boolean;
  balances: number[];
};

export default function AccountStatusCard(props: AccountStatusProps) {
  const { name, email, isVerified, balances } = props;
  // Logic: Calculate total balance from the balances array
  const totalBalance = balances.reduce((acc, curr) => acc + curr, 0);

  return (
    <View className="w-full rounded-3xl overflow-hidden shadow-lg mb-6">
      <LinearGradient colors={["#1E1E2E", "#252538"]} className="p-5">
        {/* Top Section: User Info */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {/* Character Image / Avatar placeholder */}
            <View className="w-12 h-12 rounded-full bg-primary/30 items-center justify-center border border-primary/50">
              <Ionicons name="person" size={24} color="#8B5CF6" />
            </View>

            <View className="ml-3 flex-1">
              <Heading3 className="text-white text-lg font-poppins-semibold leading-tight">
                {name}
              </Heading3>
              <View className="flex-row items-center mt-1">
                <Ionicons name="mail-outline" size={12} color="#9CA3AF" />
                <Paragraph className="text-gray-400 text-xs ml-1 italic">
                  {email}
                </Paragraph>
              </View>
            </View>
          </View>

          {/* Dynamic Status Badge */}
          <View
            className={`px-3 py-1 rounded-full flex-row items-center border ${
              isVerified
                ? "bg-green-500/20 border-green-500/40"
                : "bg-orange-500/20 border-orange-500/40"
            }`}
          >
            <Ionicons
              name={isVerified ? "checkmark-circle" : "alert-circle"}
              size={14}
              color={isVerified ? "#22C55E" : "#F97316"}
            />
            <Paragraph
              className={`text-[10px] font-poppins-bold ml-1 uppercase ${
                isVerified ? "text-green-500" : "text-orange-500"
              }`}
            >
              {isVerified ? "Verified" : "Pending"}
            </Paragraph>
          </View>
        </View>

        {/* Bottom Section: Calculated Balance */}
        <View className="mt-6 bg-white/5 p-4 rounded-2xl border border-white/5">
          <Paragraph className="text-gray-400 text-xs font-poppins-medium">
            Calculated Portfolio Value
          </Paragraph>
          <View className="flex-row items-baseline mt-1">
            <Heading3 className="text-white text-3xl font-poppins-bold">
              $
              {totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </Heading3>
            <Paragraph className="text-primary text-xs ml-2 font-poppins-medium">
              USD
            </Paragraph>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
