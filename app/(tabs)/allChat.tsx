import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getChat } from "../utilis/chatStorage";
import { Connection, getConnections } from "../utilis/storage";
type ChatItem = {
  id: string;
  name: string;
  lastMessage: string;
  createdAt: string;
};

export default function All() {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  useFocusEffect(useCallback(() => {
    const loadData = async () => {
      const conns = await getConnections();
      const enriched = await Promise.all(conns.map(async (conn) => {
        const chat = await getChat(conn.id);
        const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : "No messasge yet";
        return {
          id: conn.id,
          name: conn.name,
          createdAt: conn.createdAt,
          lastMessage
        }
      })
      )
      setChats(enriched);
    };
    loadData();
  }, [])
  );



  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        All Chats
      </Text>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push(`/chat/${item.id}?name=${item.name}`);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            {/* Avatar */}
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 25,
                backgroundColor: "#6b086e",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {item.name[0]}
              </Text>
            </View>

            {/* Middle content */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {item.name}
              </Text>

              <Text style={{ color: "gray", marginTop: 2 }}>
                {item.lastMessage || "No messages yet"}
              </Text>
            </View>

            {/* Time */}
            <Text style={{ fontSize: 12, color: "gray" }}>
              {item.createdAt}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView >
  );
}