import "../../global.css";

import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { tokenCache } from "../../cache";

const Layout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/home");
      return;
    }

    router.replace("/sign-in");
  }, [isSignedIn]);

  return <Slot />;
};

export default function RootLayout() {
  const publishableKey = process.env["EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY"]!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Layout />

        <StatusBar style="auto" translucent />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
