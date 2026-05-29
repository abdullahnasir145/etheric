import { Modal, View, TouchableOpacity } from "react-native";
import Heading3 from "../../headings/Heading3";
import Paragraph from "../../headings/Paragraph";
import { Ionicons } from "@expo/vector-icons";


type LogoutModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({ visible, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/70 px-6">
        <View className="bg-appBg rounded-3xl p-6 w-full border border-white/10">
          <View className="items-center mb-4">
            <View className="w-16 h-16 bg-red-500/20 rounded-full items-center justify-center mb-4">
              <Ionicons name="log-out-outline" size={32} color="#EF4444" />
            </View>
            <Heading3 className="text-white text-xl font-poppins-bold">
              Sign Out
            </Heading3>
            <Paragraph className="text-gray-400 text-center mt-2">
              Are you sure you want to sign out? You'll need to log in again to access your account.
            </Paragraph>
          </View>

          <View className="space-y-3">
            <TouchableOpacity
              onPress={onConfirm}
              className="rounded-2xl overflow-hidden shadow-md bg-red-500 py-4 items-center justify-center"
            >
              <Heading3 className="text-white text-xl font-poppins-semibold">
                Sign Out
              </Heading3>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="items-center py-3"
            >
              <Paragraph className="text-gray-400 font-poppins-semibold">Cancel</Paragraph>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}