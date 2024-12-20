import { useSignUp } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAnimatedShake } from "../../hooks/use-animated-shake";
import { useFormStates } from "../../hooks/use-form-states";
import { signUpUserSchema, userSignUpInput } from "../../types/user-zod";

export default function SignUp() {
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const {
    hidePassword,
    setHidePassword,
    hideConfirmPassword,
    setHideConfirmPassword,
    genericError,
    setGenericError,
  } = useFormStates();

  const { isLoaded, signUp, setActive } = useSignUp();
  const { shake, reanimatedShakeStyle } = useAnimatedShake();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userSignUpInput>({
    resolver: zodResolver(signUpUserSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: userSignUpInput) => {
    if (!isLoaded) return;

    console.log(data);

    try {
      await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      setGenericError(true);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/home");
      }
    } catch (err) {
      setGenericError(true);
      console.log(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      {!pendingVerification && (
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="mt-10 flex-1 landscape:hidden">
              <Text className="text-center text-3xl font-extrabold sm:text-6xl landscape:hidden">
                Easy Stock
              </Text>
            </View>

            <View className="flex-1 landscape:mx-44 landscape:justify-center">
              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <View className="mx-10 mb-6 sm:mx-44 sm:mb-12">
                    <TextInput
                      className="border-b border-black text-lg sm:pb-4 sm:text-2xl"
                      placeholder="First Name"
                      value={value}
                      onChangeText={onChange}
                    />

                    {errors.firstName && (
                      <Animated.Text
                        onLayout={shake}
                        style={reanimatedShakeStyle}
                        className="mt-2 color-red-600 sm:text-xl"
                      >
                        {errors.firstName.message}
                      </Animated.Text>
                    )}
                  </View>
                )}
                name="firstName"
              />

              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <View className="mx-10 mb-6 sm:mx-44 sm:mb-12">
                    <TextInput
                      className="border-b border-black text-lg sm:pb-4 sm:text-2xl"
                      placeholder="Last Name"
                      value={value}
                      onChangeText={onChange}
                    />

                    {errors.lastName && (
                      <Animated.Text
                        onLayout={shake}
                        style={reanimatedShakeStyle}
                        className="mt-2 color-red-600 sm:text-xl"
                      >
                        {errors.lastName.message}
                      </Animated.Text>
                    )}
                  </View>
                )}
                name="lastName"
              />

              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <View className="mx-10 mb-6 sm:mx-44 sm:mb-12">
                    <TextInput
                      className="border-b border-black text-lg sm:pb-4 sm:text-2xl"
                      placeholder="Email"
                      value={value}
                      onChangeText={onChange}
                    />

                    {errors.email && (
                      <Animated.Text
                        onLayout={shake}
                        style={reanimatedShakeStyle}
                        className="mt-2 color-red-600 sm:text-xl"
                      >
                        {errors.email.message}
                      </Animated.Text>
                    )}
                  </View>
                )}
                name="email"
              />

              <View>
                <Controller
                  control={control}
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
                            name={
                              hidePassword ? "eye-off-outline" : "eye-outline"
                            }
                            size={30}
                          />
                        </TouchableOpacity>
                      </View>
                      {errors.password && (
                        <Animated.Text
                          onLayout={shake}
                          style={reanimatedShakeStyle}
                          className="mt-2 color-red-600 sm:text-xl"
                        >
                          {errors.password.message}
                        </Animated.Text>
                      )}
                    </View>
                  )}
                  name="password"
                />
              </View>

              <View>
                <Controller
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <View className="mx-10 mb-6 sm:mx-44 sm:mb-12">
                      <View className="relative flex-row items-center">
                        <TextInput
                          className="flex-1 border-b border-black text-lg sm:pb-4 sm:text-2xl"
                          placeholder="Confirm Password"
                          value={value}
                          onChangeText={onChange}
                          secureTextEntry={hideConfirmPassword}
                        />
                        <TouchableOpacity
                          className="absolute bottom-1 right-0 sm:pb-4"
                          onPress={() =>
                            setHideConfirmPassword(!!!hideConfirmPassword)
                          }
                        >
                          <Ionicons
                            name={
                              hideConfirmPassword
                                ? "eye-off-outline"
                                : "eye-outline"
                            }
                            size={30}
                          />
                        </TouchableOpacity>
                      </View>
                      {errors.confirmPassword && (
                        <Animated.Text
                          onLayout={shake}
                          style={reanimatedShakeStyle}
                          className="mt-2 color-red-600 sm:text-xl"
                        >
                          {errors.confirmPassword.message}
                        </Animated.Text>
                      )}
                    </View>
                  )}
                  name="confirmPassword"
                />
              </View>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit, shake)}
                className="mx-10 rounded-2xl bg-blue-500 p-4 sm:mx-44 sm:p-5"
                activeOpacity={0.8}
              >
                <Text className="text-center text-lg font-bold text-white sm:text-2xl">
                  Sign Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  reset(), router.navigate("/sign-in");
                }}
                activeOpacity={0.8}
              >
                <Text className="self-center p-4 text-center text-lg font-bold sm:text-2xl">
                  <Text className="font-normal">Already have an account? </Text>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      {pendingVerification && (
        <View className="mx-10 mb-6 flex-1 justify-center gap-6 sm:mx-44 sm:mb-12">
          <Text className="mx-10 text-center text-xl font-semibold sm:mx-44">
            Verify your email
          </Text>
          <TextInput
            value={code}
            placeholder="Enter your verification code"
            keyboardType="numeric"
            onChangeText={(code) => setCode(code)}
            className="mx-10 border-b border-black text-center text-lg sm:mx-16 sm:pb-4 sm:text-2xl"
          />

          {genericError && (
            <View className="my-2 self-center rounded-md">
              <Animated.Text
                onLayout={shake}
                style={reanimatedShakeStyle}
                className="color-red-600 sm:text-xl"
              >
                Oops! The verification code is incorrect. Please try again!
              </Animated.Text>
            </View>
          )}

          <View className="flex-row justify-around">
            <TouchableOpacity
              className="rounded-2xl bg-blue-500 px-12 py-4"
              onPress={onVerifyPress}
            >
              <Text className="text-center text-lg font-bold text-white sm:text-2xl">
                Verify
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-2xl bg-red-500 px-12 py-4"
              onPress={() => router.replace("/sign-up")}
            >
              <Text className="text-center text-lg font-bold text-white sm:text-2xl">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
