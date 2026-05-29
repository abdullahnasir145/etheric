import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Switch, TextInput, TouchableOpacity, View } from "react-native";
import Heading3 from "../../headings/Heading3";
import Paragraph from "../../headings/Paragraph";

type SecurityModalProps = {
  visible: boolean;
  onClose: () => void;
};

// Reusable input component with appropriate spacing
type LabeledInputProps = {
  label: string;
  placeholder: string;
};

// named function for text field
function LabeledInput({ label, placeholder }: LabeledInputProps) {
  return (
    <View className="mb-4">
      <Paragraph className="text-gray-400 mb-2">{label}</Paragraph>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        secureTextEntry
        className="bg-white/5 rounded-2xl px-4 py-3 text-white border border-white/10"
      />
    </View>
  );
}

export default function SecurityModal(props: SecurityModalProps) {
  // swich components props
  const { visible, onClose } = props;
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-appBg rounded-t-3xl p-6 h-5/6">
          <View className="flex-row justify-between items-center mb-6">
            <Heading3 className="text-white text-xl font-poppins-bold">
              Security & Privacy
            </Heading3>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View>
            <LabeledInput
              label="Current Password"
              placeholder="Enter current password"
            />
            <LabeledInput
              label="New Password"
              placeholder="Enter new password"
            />
            <LabeledInput
              label="Confirm New Password"
              placeholder="Confirm new password"
            />

            <View className="flex-row items-center justify-between bg-white/5 rounded-2xl px-4 py-4 border border-white/10 mt-2">
              <View>
                <Paragraph className="text-white">Two-Factor Auth</Paragraph>
                <Paragraph className="text-gray-400 text-xs mt-1">
                  Add extra security
                </Paragraph>
              </View>
              <Switch
                value={is2FAEnabled}
                onValueChange={setIs2FAEnabled}
                trackColor={{ false: "#3e3e3e", true: "#10B981" }}
                thumbColor={is2FAEnabled ? "#fff" : "#f4f3f4"}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
