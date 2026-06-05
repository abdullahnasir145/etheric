import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Heading3 from "../../headings/Heading3";
import Paragraph from "../../headings/Paragraph";

type SupportModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function SupportModal({ visible, onClose }: SupportModalProps) {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to Security settings and follow the password reset flow.",
    },
    {
      question: "How to contact support?",
      answer: "Use the live chat below or email support@ethicapp.com",
    },
    {
      question: "What is the response time?",
      answer: "Our team responds within 24 hours during business days.",
    },
  ];

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
              Help & Support
            </Heading3>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="space-y-4"
            showsVerticalScrollIndicator={false}
          >
            <View className="mb-4">
              <Paragraph className="text-gray-400 mb-2">Message us</Paragraph>
              <TextInput
                placeholder="Type your message..."
                placeholderTextColor="#6B7280"
                multiline
                numberOfLines={4}
                className="bg-white/5 rounded-2xl px-4 py-3 text-white border border-white/10 h-32"
              />
            </View>

            <View className="space-y-3">
              <Paragraph className="text-white font-poppins-semibold mb-2">
                Frequently Asked Questions
              </Paragraph>
              {faqs.map((faq, index) => (
                <View
                  key={index}
                  className="bg-white/5 rounded-2xl p-4 border gap-2 border-white/10 mb-2"
                >
                  <Paragraph className="text-white font-poppins-semibold mb-1">
                    {faq.question}
                  </Paragraph>
                  <Paragraph className="text-gray-400 text-xs">
                    {faq.answer}
                  </Paragraph>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity className="bg-pink-500 rounded-2xl py-4 items-center mt-4">
            <Paragraph className="text-white font-poppins-semibold">
              Send Message
            </Paragraph>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
