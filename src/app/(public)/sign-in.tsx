import { useSignIn } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import SignInGoogle from "../../components/sign-in-google";
import { useAnimatedShake } from "../../hooks/use-animated-shake";
import { useFormStates } from "../../hooks/use-form-states";
import { signInUserSchema, userSignInInput } from "../../types/user-zod";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { hidePassword, setHidePassword, isLoading, setIsLoading } =
    useFormStates();
  const { shake, reanimatedShakeStyle } = useAnimatedShake();
  const { signIn, setActive, isLoaded } = useSignIn();

  const reactHookForm = useForm<userSignInInput>({
    mode: "onSubmit",
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: userSignInInput) => {
      setIsLoading(true);

      if (!isLoaded) return;

      try {
        const signInAttempt = await signIn.create({
          identifier: data.email,
          password: data.password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace("/home");
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    },
    [isLoaded, signIn, setActive, router]
  );

  return (
    <SafeAreaView className="flex-1 landscape:mx-52">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View className="mt-10 flex-1 sm:mt-20 landscape:hidden">
          <Text className="text-center text-3xl font-extrabold sm:text-6xl">
            Easy Stock
          </Text>
        </View>

        <View className="flex-1 landscape:justify-center">
          <Controller
            control={reactHookForm.control}
            render={({ field: { value, onChange } }) => (
              <View className="sm: mx-10 mb-6 sm:mx-44 sm:mb-12">
                <TextInput
                  className="border-b border-black text-lg sm:pb-4 sm:text-2xl"
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                />

                {reactHookForm.formState.errors.email && (
                  <Animated.Text
                    onLayout={shake}
                    style={reanimatedShakeStyle}
                    className="mt-2 color-red-600 sm:text-xl"
                  >
                    {reactHookForm.formState.errors.email.message}
                  </Animated.Text>
                )}
              </View>
            )}
            name="email"
          />

          <Controller
            control={reactHookForm.control}
            render={({ field: { value, onChange } }) => (
              <View className="mx-10 mb-6 sm:mx-44 sm:mb-12">
                <View className="relative flex-row items-center">
                  <TextInput
                    className="flex-1 border-b border-black text-lg sm:pb-4 sm:text-2xl"
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={hidePassword}
                  />
                  <TouchableOpacity
                    className="absolute bottom-1 right-0 sm:pb-4"
                    onPress={() => setHidePassword(!!!hidePassword)}
                  >
                    <Ionicons
                      name={hidePassword ? "eye-off-outline" : "eye-outline"}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                {reactHookForm.formState.errors.password && (
                  <Animated.Text
                    onLayout={shake}
                    style={reanimatedShakeStyle}
                    className="mt-2 color-red-600 sm:text-xl"
                  >
                    {reactHookForm.formState.errors.password.message}
                  </Animated.Text>
                )}
              </View>
            )}
            name="password"
          />

          <View className="mx-8 flex-row gap-4 sm:mx-44">
            <SignInGoogle />

            <TouchableOpacity
              onPress={reactHookForm.handleSubmit(onSubmit, shake)}
              className="flex-1 justify-center rounded-2xl bg-blue-500 px-12 py-4 sm:py-6"
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator size={28} color="#fff" />
              ) : (
                <Text className="text-center text-lg font-bold text-white sm:text-2xl">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.navigate("/sign-up")}
            activeOpacity={0.8}
          >
            <Text className="my-2 self-center p-4 text-center text-lg font-bold sm:text-2xl">
              <Text className="font-normal">First time here?</Text> Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
