import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export interface IQuickAccessCards {
  cardTitle: string;
  cardIcon: keyof typeof MaterialIcons.glyphMap;
  borderColor: string;
  backgroundColor: string;
  navigateTo: () => void;
}

const quickAccessCards: IQuickAccessCards[] = [
  {
    cardTitle: "Alimentos",
    cardIcon: "emoji-food-beverage",
    borderColor: "#eab308",
    backgroundColor: "#facc15",
    navigateTo: () => router.navigate("/food"),
  },
  {
    cardTitle: "Pets",
    cardIcon: "pets",
    borderColor: "#f472b6",
    backgroundColor: "#f9a8d4",
    navigateTo: () => router.navigate("/pets"),
  },
];

export default function QuickAccess() {
  return (
    <View className="flex-1 items-center">
      <Text className="my-4 text-xl font-semibold">Acesso rápido:</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-center gap-4">
          {quickAccessCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={{
                borderRightWidth: 3,
                borderBottomWidth: 3,
                borderColor: card.borderColor,
                backgroundColor: card.backgroundColor,
              }}
              activeOpacity={0.6}
              className="elevation-md h-48 w-48 rounded-lg"
              onPress={card.navigateTo}
            >
              <MaterialIcons className="p-4" name={card.cardIcon} size={45} />
              <View className="flex-1 justify-end py-4">
                <Text className="text-center text-xl font-semibold">
                  {card.cardTitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
