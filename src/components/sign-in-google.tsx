import { useFormStates } from "@/hooks/use-form-states";
import { useOAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useWarmUpBrowser } from "../hooks/use-warm-up-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignInGoogle() {
  useWarmUpBrowser();

  const { isLoading, setIsLoading } = useFormStates();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onGoogleAuth = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/", { scheme: "easystock" }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      setIsLoading(false);
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={onGoogleAuth}
      className="rounded-2xl bg-zinc-300 px-12 py-4 sm:py-6"
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator size={28} color="#000" />
      ) : (
        <Ionicons name="logo-google" size={28} />
      )}
    </TouchableOpacity>
  );
}
