import { LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextInput, TextInputProps, View } from "react-native";
import Paragraph from "../../headings/Paragraph";

interface FormInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  error?: string;
  Icon?: LucideIcon; // Accepts any dynamically imported Lucide icon
}

export default function FormInput<T extends FieldValues>(
  props: FormInputProps<T>,
) {
  const { control, name, error, Icon, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mt-4 w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            className={`h-12 border rounded-xl px-4 flex-row items-center bg-lightPurple ${
              isFocused ? "border-primary border" : "border-[#4b556d]"
            }`}
          >
            {Icon && (
              <View className="mr-3">
                <Icon size={20} color={isFocused ? "#00E5FF" : "#E0E0E0"} />
              </View>
            )}
            <TextInput
              className="flex-1 h-full text-base text-white font-poppins-regular py-0"
              style={{ includeFontPadding: false, textAlignVertical: "center" }}
              value={value}
              onChangeText={onChange}
              onFocus={() => setIsFocused(true)}
              placeholderTextColor="#E0E0E0"
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              {...rest}
            />
          </View>
        )}
      />
      {error && (
        <Paragraph className="text-terniary text-xs mt-1 ml-1">
          {error}
        </Paragraph>
      )}
    </View>
  );
}
