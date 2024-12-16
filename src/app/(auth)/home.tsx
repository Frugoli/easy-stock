import { useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1">
      <Text>{user?.username}</Text>
    </SafeAreaView>
  );
}
