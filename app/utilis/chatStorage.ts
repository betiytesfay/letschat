import AsyncStorage from "@react-native-async-storage/async-storage";

export type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
};

export type Chat = {
  connectionId: string;
  messages: Message[];
};

const KEY = "chats";

// get chat
export const getChat = async (connectionId: string): Promise<Chat> => {
  const data = await AsyncStorage.getItem(KEY + ":" + connectionId);
  if (!data) return { connectionId, messages: [] };
  return JSON.parse(data) as Chat;
};

// save chat
export const saveChat = async (chat: Chat): Promise<void> => {
  await AsyncStorage.setItem(
    KEY + ":" + chat.connectionId,
    JSON.stringify(chat)
  );
};