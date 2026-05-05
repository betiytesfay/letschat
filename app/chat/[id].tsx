import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getChat, saveChat } from "../utilis/chatStorage";

type Chat = {
  connectionId: string;
  messages: {
    id: string;
    text: string;
    senderId: string;
    createdAt: string;
  }[];
};

export default function ChatScreen() {
  const { id, name } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Chat | null>(null);
  useFocusEffect(
    useCallback(() => {
      const loadChat = async () => {
        const data = await getChat(id as string);
        setChat(data);
      };

      loadChat();
      console.log("CHAT:", chat);
    }, [])
  );
  const sendMessage = async () => {
    if (!message.trim() || !chat) return;

    const newMsg = {
      id: Date.now().toString(),
      text: message,
      senderId: "me",
      createdAt: new Date().toISOString(),
    };

    const updatedChat = {
      ...chat,
      messages: [...chat.messages, newMsg],
    };

    await saveChat(updatedChat);
    setChat(updatedChat);
    setMessage("");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#f7f2ff" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <StatusBar style="light" translucent />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#6b086e",
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderBottomLeftRadius: 18,
            borderBottomEndRadius: 18,
            paddingStart: 20,

          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            {name}
          </Text>
          <Ionicons name="menu" size={24} color="white" />
        </View>

        {/* MESSAGES AREA */}
        <FlatList data={chat?.messages ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}

          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <View style={{

              alignSelf: item.senderId === "me" ? "flex-end" : "flex-start",
              backgroundColor: item.senderId === "me" ? "#6b086e" : "#ddd",
              padding: 10,
              marginVertical: 5,
              borderRadius: 10,
              maxWidth: "80%",
              marginHorizontal: 10,
            }} >
              <Text style={{ color: "white" }}>{item.text}</Text>
            </View>
          )
          }>

        </FlatList>

        {/* INPUT AREA */}
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            borderTopWidth: 1,
            borderColor: "#ddd",
            backgroundColor: "white",
            alignItems: "center",

          }}
        >

          <TextInput

            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."

            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 20,
              paddingHorizontal: 15,
              paddingVertical: 8,
              backgroundColor: "#f9f9f9",
              elevation: 0,
            }}
          />
          <Pressable onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#6b086e" style={{ marginInline: 5 }} />
          </Pressable>
        </View>
      </KeyboardAvoidingView >
    </SafeAreaView>
  );
}