import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AuthRootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer
        screenOptions={{
          headerTitle: "",
          drawerActiveTintColor: "#000",
          drawerItemStyle: {
            marginVertical: 4,
          },
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            headerStyle: {
              backgroundColor: "#f1f5f9",
            },
            drawerActiveBackgroundColor: "#cbd5e1",
            drawerStyle: {
              backgroundColor: "#f1f5f9",
            },
            drawerIcon: ({ size, color }) => {
              return <AntDesign name="home" size={size} color={color} />;
            },
          }}
        />

        <Drawer.Screen
          name="food"
          options={{
            drawerLabel: "Alimentos",
            headerStyle: {
              backgroundColor: "#fefce8",
            },
            drawerActiveBackgroundColor: "#facc15",
            drawerStyle: {
              backgroundColor: "#fefce8",
            },
            drawerIcon: ({ size, color }) => {
              return (
                <MaterialIcons
                  name="emoji-food-beverage"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />

        <Drawer.Screen
          name="pets"
          options={{
            drawerLabel: "Pets",
            headerStyle: {
              backgroundColor: "#fdf2f8",
            },
            drawerActiveBackgroundColor: "#f9a8d4",
            drawerStyle: {
              backgroundColor: "#fdf2f8",
            },
            drawerIcon: ({ size, color }) => {
              return <MaterialIcons name="pets" size={size} color={color} />;
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
