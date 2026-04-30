import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Connection, getConnections } from "../utilis/storage";
type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time?: string;
};

export default function All() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);



  useEffect(() => {
    const loadData = async () => {
      const data = await getConnections();
      console.log("Connections:", data);
      setConnections(data)
    };

    loadData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        All Chats
      </Text>

      <FlatList
        data={connections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: "gray" }}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}