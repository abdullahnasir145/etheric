import AuthFooter from "@/components/common/AuthPagesRedirect";
import SecondaryButton from "@/components/common/buttons/SecondaryButton";
import Container from "@/components/common/Container";
import AuthHeader from "@/components/common/header/AuthHeader";
import OAuthButtons from "@/components/common/OAuth";
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
        {/* Header */}
        <AuthHeader
          title="create account"
          description="sign up to get started tracking crypto with etheric."
        />

        {/*  Input Fields  */}
        <View className="gap-y-4 w-full">
          <FormInput
            Icon={User}
            control={control}
            name="name"
            placeholder="full name"
            autoCapitalize="words"
            error={errors.name?.message}
          />

          <FormInput
            Icon={Mail}
            control={control}
            name="email"
            placeholder="email address"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />

          <FormInput
            Icon={Lock}
            control={control}
            name="password"
            placeholder="password"
            secureTextEntry
            error={errors.password?.message}
          />
        </View>

        {/*  Error Message  */}
        {mutation.isError && (
          <Text
            aria-role="paragraph"
            className="text-terniary text-sm mt-3 text-center font-poppins-medium"
          >
            Connection to server is next phase, stay tuned!
          </Text>
        )}

        {/* ── Primary Action Button ── */}
        <SecondaryButton
          title={mutation.isPending ? "creating account..." : "sign up"}
          Icon={mutation.isPending ? undefined : ArrowRight}
          onPress={handleSubmit((data) => mutation.mutate(data))}
          className="mt-8 w-full"
        />

        {/* ── OAuth Divider ── */}
        <OrDivider title="or connect with" />

        {/* ── OAuth Buttons Row ── */}
        <OAuthButtons
          onGooglePress={() => console.log("Google Auth")}
          onApplePress={() => console.log("Apple Auth")}
          onGitHubPress={() => console.log("GitHub Auth")}
        />

        {/* ── Redirect Footer ── */}
        <AuthFooter
          onPress={handleSignInScreenNav}
          message="already have an account?"
          actionText="log in"
        />
      </Container>
    </View>
  );
}
