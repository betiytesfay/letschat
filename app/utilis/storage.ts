import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveChat } from "./chatStorage"; // you will create this
export type Connection = {
  id: string;
  name: string;
  createdAt: string;
};
const KEY = "connections";

export const getConnections = async (): Promise<Connection[]> => {
  const data = await AsyncStorage.getItem(KEY);
  if (!data) return [];
  try {
    const parsed: Connection[] = JSON.parse(data);
    return parsed.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
};

export const addConnection = async (userId: string, name: string)
  : Promise<void> => {

  const current = await getConnections();

  const exists = current.find(u => u.id === userId);
  if (exists) return;

  const newConnection: Connection = {
    id: userId,
    name,
    createdAt: new Date().toISOString(),
  };

  await saveConnections([...current, newConnection]);

  // 🔥 THIS IS WHAT YOU ARE MISSING
  await saveChat({
    connectionId: userId,
    messages: []
  });
};
export const saveConnections = async (
  connections: Connection[]
): Promise<void> => {
  await AsyncStorage.setItem(KEY, JSON.stringify(connections));
};