import CardManager from "@/components/card-manager";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as productSchema from "../../../database/schemas/productsSchema";

export default function Food() {
  const [products, setProducts] = useState<any>();

  const sqlite = useSQLiteContext();
  const database = drizzle(sqlite, { schema: productSchema });

  const getProducts = async () => {
    try {
      const response = await database.query.productsSchema.findMany();
      console.log(response);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View className="flex-1 p-2">
      <CardManager />
    </View>
  );
}
