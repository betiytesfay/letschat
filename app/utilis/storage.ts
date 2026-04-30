import AsyncStorage from "@react-native-async-storage/async-storage";
export type Connection = {
  id: string;
  name: string;
  time: string;
};
const KEY = "connections";

export const getConnections = async (): Promise<Connection[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const addConnection = async (name: string): Promise<void> => {
  const current = await getConnections();

  const newConnection: Connection = {
    id: Date.now().toString(),
    name,
    time: new Date().toLocaleTimeString(),
  };

  await saveConnections([...current, newConnection]);
};
export const saveConnections = async (
  connections: Connection[]
): Promise<void> => {
  await AsyncStorage.setItem(KEY, JSON.stringify(connections));
};