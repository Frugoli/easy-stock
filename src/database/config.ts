import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export const databaseName = "sqlite.db";

// Drizzle com banco de dados expo-sqlite
const expoDatabase = openDatabaseSync(databaseName);
export const expoDrizzle = drizzle(expoDatabase);
