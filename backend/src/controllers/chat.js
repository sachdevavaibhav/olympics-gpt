import { db } from "../utils/firebase/firebase.js";

export const queryModel = async (chain, query) => {
    const response = await chain.call({ question: query });
    console.log(response);
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
    createdAt: new Date(),
  })
  await messageRef.set(message)
  return chatId
}

export const getChatHistory = async (chatId) => {
  // get messages from messages subcollection
  const chatRef = await db.collection("chats").doc(chatId)
  const messagesRef = await chatRef.collection("messages").orderBy("createdAt").get()
  const messages = []
  messagesRef.forEach((message) => {
    messages.push(message.data())
  })
  return messages
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
  // get all chats of user
  const chatsRef = await db.collection("chats").where("userId", "==", userId).get()
  const chats = []
  chatsRef.forEach((chat) => {
    chats.push(chat.data())
  })
  return chats
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