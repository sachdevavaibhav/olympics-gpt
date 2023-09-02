import { db } from "../utils/firebase/firebase.js";
import { AIMessage, HumanMessage } from "langchain/schema";

export const mapToMemory = (messages) => {
  if (!messages) {
    return []
  }
  const memoryMessages = []
  messages.forEach((message) => {
    if (message.role === "user") {
      memoryMessages.push(new HumanMessage(message.text))
    }
    else {
      memoryMessages.push(new AIMessage(message.text))
    }
  })
  return memoryMessages
}


export const queryModel = async (chain, query, chatId) => {
  const recentMessages = await getRecentChatHistory(chatId, 6)
  const memoryMessages = mapToMemory(recentMessages)
  const response = await chain.call(
    { question: query, chat_history: memoryMessages }
  );
  return {role:"assistant", text: response.text};
}

export const createChat = async (userId, chatId, message) => {
  // create chat document in firebase with messages as subcollection
  // add message to messages subcollection
  const chatRef = await db.collection("chats").doc(chatId)
  const messageRef = await chatRef.collection("messages").doc()
  message.createdAt = new Date()
  await chatRef.set({
    chatId: chatId,
    userId: userId,
    title: message.text,
    createdAt: new Date(),
  })
  await messageRef.set(message)
  return {chatId, title: message.text}
}

export const getChatHistory = async (chatId) => {
  // get messages from messages subcollection
  const chatRef = await db.collection("chats").doc(chatId)
  const messagesRef = await chatRef.collection("messages").orderBy("createdAt").get()
  const messages = []
  messagesRef.forEach((message) => {
    const {role, text} = message.data()
    messages.push({role, text})
  })
  return {chatId, messages}
}

export const getRecentChatHistory = async (chatId, k) => {
  // get messages from messages subcollection
  const chatRef = await db.collection("chats").doc(chatId)
  const messagesRef = await chatRef.collection("messages").orderBy("createdAt", "desc").limit(k).get()
  const messages = []
  messagesRef.forEach((message) => {
    const {role, text} = message.data()
    messages.push({role, text})
  })
  return messages.reverse()
}

export const getAllUserChats = async (userId) => {
  // get all chats of user from chats collection ordered by createdAt
  const chatsRef = await db.collection("chats").where("userId", "==", userId).orderBy("createdAt").get()
  const chats = []
  chatsRef.forEach((chat) => {
    chats.push(chat.data())
  })
  return chats.reverse()
}

export const updateChatHistory = async (chatId, message) => {
  // add message to messages subcollection
  const chatRef = await db.collection("chats").doc(chatId)
  const messageRef = await chatRef.collection("messages").doc()
  message.createdAt = new Date()
  await messageRef.set(message)
  return chatId
}

/* chats = {
  *  chatId: string,
  *  userId: string,
  *  createdAt: timestamp,
  *  messages: [
      *  {
      *  role: string,
      *  text: string,
      *  createdAt: timestamp,
      * },
      * {
      *  role: string,
      *  text: string,
      *  createdAt: timestamp,
      * }
  * ]
* }
*/

/*
Functions to be created:
        1. getRecentChatHistory /api/chat/recent
        2. getChatHistory /api/chat/history (done)
        3. createChat /api/chat/create (done)
        4. getAllUserChats /api/chat/all (done)
        5. UpdateChatHistory /api/chat/message (done)
*/