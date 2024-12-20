import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <ActivityIndicator size={45} />
    </SafeAreaView>
  );
}
