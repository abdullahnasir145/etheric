import AuthFooter from "@/components/common/AuthPagesRedirect";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import SecondaryButton from "@/components/common/buttons/SecondaryButton";
import Container from "@/components/common/Container";
import AuthHeader from "@/components/common/header/AuthHeader";
import OrDivider from "@/components/common/OrDivider";
import { ROUTE_LIST } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { ArrowRight, Lock, Mail, User } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import FormInput from "../../../components/common/inputs/FormInput";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const registerUser = async (credentials: SignUpFormData) => {
  const res = await fetch("https://api.example.com/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

export default function SignUpContainer() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => console.log("Registered Successfully:", data),
  });

  const handleSignInScreenNav = () => {
    router.replace(ROUTE_LIST.LOGIN_SCREEN);
  };

  return (
    <View className="flex-1 justify-center bg-appBg">
      <Container>
        {/* Header Block */}
        <AuthHeader
          title="Create Account"
          description="Sign up to get started tracking crypto with Etheric."
        />

        {/* Input Fields Block */}
        <View className="gap-y-4 w-full">
          <FormInput
            Icon={User}
            control={control}
            name="name"
            placeholder="Full Name..."
            autoCapitalize="words"
            error={errors.name?.message}
          />

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
            Connection to server is next phase, stay tuned!
          </Text>
        )}

        {/* Primary Action Button */}
        <SecondaryButton
          title={mutation.isPending ? "Creating Account..." : "Sign Up"}
          Icon={mutation.isPending ? undefined : ArrowRight}
          onPress={handleSubmit((data) => mutation.mutate(data))}
          className="mt-8 w-full"
        />

        {/* Divider Separation Block */}
        <OrDivider />

        {/* Secondary Authentication Block */}
        <PrimaryButton
          title="Sign up with Google"
          className="w-full"
          onPress={() => console.log("Google Auth Signup")}
        />

        {/* Redirect Footer */}
        <AuthFooter
          onPress={handleSignInScreenNav}
          message="Already have an account?"
          actionText="Log In"
        />
      </Container>
    </View>
  );
}
