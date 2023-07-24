import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import dotenv from "dotenv";
dotenv.config();

export const createQueryChain = async (pineconeClient, k=1, returnSourceDocs=false) => {
    const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX);
    
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );
    
    /* Search the vector DB independently with meta filters */
    // const results = await vectorStore.similaritySearch(query, k);
    
    /* Use as part of a chain (currently no metadata filters) */
    const model = new OpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.2,
    });
    console.log(model.modelName)
    const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
      memory: new BufferMemory({
        memoryKey: "chat_history", // Must be set to "chat_history"
        k,
        returnSourceDocs,
      }),
    });
    return chain;
}

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
  const messagesRef = await chatRef.collection("messages").orderBy("createdAt").limit(k).get()
  const messages = []
  messagesRef.forEach((message) => {
    messages.push(message.data())
  })
  return messages
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
        1. getRecentChatHistory
        2. getChatHistory
        3. createChat
        4. getAllUserChats
        5. UpdateChatHistory
*/