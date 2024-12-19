import { databaseName, expoDrizzle } from "@/database/config";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "drizzle/migrations";
import { router, Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { tokenCache } from "../../cache";
import "../../global.css";

const Layout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/home");
    } else {
      router.replace("/sign-in");
    }
  }, [isSignedIn, isLoaded]);

  return <Slot />;
};

export default function RootLayout() {
  const publishableKey = process.env["EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY"]!;
  const { success, error } = useMigrations(expoDrizzle, migrations);

  if (error) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center">Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    <ActivityIndicator
      className="flex-1 items-center justify-center"
      size={45}
    />;
  }

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SQLiteProvider databaseName={databaseName}>
        <ClerkLoaded>
          <Layout />
          <StatusBar style="auto" translucent />
        </ClerkLoaded>
      </SQLiteProvider>
    </ClerkProvider>
  );
}
