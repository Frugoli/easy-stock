import QuickAccess from "@/components/quick-access";
import { View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1">
      {/* Cartões de acesso rápido */}
      <QuickAccess />
    </View>
  );
}
