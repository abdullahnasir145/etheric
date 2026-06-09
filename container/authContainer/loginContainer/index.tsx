import AuthFooter from "@/components/common/AuthPagesRedirect";
import SecondaryButton from "@/components/common/buttons/SecondaryButton";
import Container from "@/components/common/Container";
import AuthHeader from "@/components/common/header/AuthHeader";
import Heading2 from "@/components/common/headings/Heading2";
import Heading3 from "@/components/common/headings/Heading3";
import Paragraph from "@/components/common/headings/Paragraph";
import OAuthButtons from "@/components/common/OAuth";
import OrDivider from "@/components/common/OrDivider";
import { ROUTE_LIST } from "@/constants";
import { loginSchema } from "@/utils/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { ArrowRight, Fingerprint, Lock, Mail } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { z } from "zod";
import FormInput from "../../../components/common/inputs/FormInput";

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

  // function to signup on home screen

  const handleHomeScreenNav = () => {
    return (
      handleSubmit((data) => mutation.mutate(data)),
      router.replace(ROUTE_LIST.HOME_SCREEN)
    );
  };

  // function to navigate for auth pages
  const handleSignUpScreenNav = () => {
    router.replace(ROUTE_LIST.SIGNUP_SCREEN);
  };

  return (
    <View className="flex-1 justify-center bg-appBg">
      <Container>
        {/*  Login Header */}
        <AuthHeader
          title="welcome back"
          description="sign in to your secure workspace and resume tracking with etheric."
        />
        {/*  Input Fields  */}
        <View className="gap-y-4 w-full">
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

        {/*  Forgot Password  */}
        <TouchableOpacity
          className="self-end mt-2"
          onPress={() => console.log("Forgot password")}
        >
          <Paragraph className="text-sm text-primary">
            forgot password?
          </Paragraph>
        </TouchableOpacity>

        {/*  Error Message  */}
        {mutation.isError && (
          <Heading3 className="text-terniary text-sm mt-3 text-center">
            Connection to server is next phase, stay tuned!
          </Heading3>
        )}

        {/*  Sign In Button  */}
        <SecondaryButton
          title={mutation.isPending ? "signing in..." : "sign in"}
          Icon={mutation.isPending ? undefined : ArrowRight}
          onPress={handleHomeScreenNav}
          className="mt-6 w-full"
        />

        {/* Spacer */}
        <View className="h-2" />

        {/*  Passkey Button  */}
        <TouchableOpacity
          onPress={() => console.log("Passkey Auth")}
          className="w-full flex-row items-center justify-center gap-x-2 py-4 rounded-xl border border-primary bg-transparent active:bg-[#00E5FF]/10"
        >
          <Fingerprint size={20} color="#00E5FF" />
          <Heading2 className="text-primary text-base  uppercase tracking-wider">
            continue with passkey
          </Heading2>
        </TouchableOpacity>

        {/* ── OAuth Divider ── */}
        <OrDivider title="or connect with" />

        {/* ── OAuth Buttons Row ── */}
        <OAuthButtons
          onGooglePress={() => console.log("Google Auth")}
          onApplePress={() => console.log("Apple Auth")}
          onGitHubPress={() => console.log("GitHub Auth")}
        />

        {/* ── Footer ── */}
        <AuthFooter
          onPress={handleSignUpScreenNav}
          message="don't have an account?"
          actionText="sign up"
        />
      </Container>
    </View>
  );
}
