import AuthFooter from "@/components/common/AuthPagesRedirect";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import SecondaryButton from "@/components/common/buttons/SecondaryButton";
import Container from "@/components/common/Container";
import AuthHeader from "@/components/common/header/AuthHeader";
import OrDivider from "@/components/common/OrDivider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Lock, Mail } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import FormInput from "../../../components/common/inputs/FormInput";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const loginUser = async (credentials: LoginFormData) => {
  const res = await fetch("https://api.example.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Authentication failed");
  return res.json();
};

export default function LoginContainer() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => console.log("Logged In:", data),
  });

  return (
    <View className="flex-1 justify-center bg-appBg">
      <Container>
        {/* Header Block */}
        <AuthHeader
          title="Etheric"
          description="Log in to manage your account and settings."
        />

        {/* Input Fields Block with structural vertical spacing */}
        <View className="gap-y-4 w-full">
          <FormInput
            Icon={Mail}
            control={control}
            name="email"
            placeholder="Email Address..."
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />

          <FormInput
            Icon={Lock}
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry
            error={errors.password?.message}
          />
        </View>

        {mutation.isError && (
          <Text className="text-terniary text-sm mt-3 text-center font-poppins-medium">
            {mutation.error.message}
          </Text>
        )}

        {/* Primary Action Button (Linked up to Form Submit) */}
        <SecondaryButton
          title={mutation.isPending ? "Signing In..." : "Sign In"}
          Icon={mutation.isPending ? undefined : ArrowRight}
          onPress={handleSubmit((data) => mutation.mutate(data))}
          className="mt-8 w-full"
        />

        {/* Divider Separation Block */}
        <OrDivider />

        {/* Secondary Authentication Block */}
        <PrimaryButton
          title="Sign in with Google"
          className="w-full"
          onPress={() => console.log("Google Auth")}
        />

        {/* Create Account Link Footer */}

        <AuthFooter
          onPress={() => console.log("Navigate to Sign Up")}
          message="Don't have an account?"
          actionText="Sign In"
        />
      </Container>
    </View>
  );
}
