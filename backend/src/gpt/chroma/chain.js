import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { config } from "../../config.js";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { getOrCreateCollection } from "./chroma.js";

export const createQueryChain = async (k = 1) => {
  // Get or create ChromaDB collection
  const vectorStore = await getOrCreateCollection();

  const model = new ChatOpenAI({
    model: config.OPENAI_MODEL,
    temperature: 0.2,
  });

  // Contextualize question
  const contextualizeQSystemPrompt = `
  Given a chat history and the latest user question
  which might reference context in the chat history,
  formulate a standalone question which can be understood
  without the chat history. Do NOT answer the question, just
  reformulate it if needed and otherwise return it as is.`;

  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", contextualizeQSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  // Create history-aware retriever
  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm: model,
    retriever: vectorStore.asRetriever({
      k: k,
      searchType: "similarity", // ChromaDB supports similarity search by default
    }),
    rephrasePrompt: contextualizeQPrompt,
  });

  // Answer question
  const qaSystemPrompt = `
  You are an assistant for question-answering all things related to Olympics. Use
  the following pieces of retrieved context to answer the
  question. If you don't know the answer, just say that you
  don't know. Do not answer anything that is not directly or indirectly related to the Olympics. If you do not find answer use your own knowledge.
  Respond to greetings with a greeting.
  You can use your own knowledge and the context provided to answer the question. If you need more context, ask for it.
  \n\n
  {context}`;

  const qaPrompt = ChatPromptTemplate.fromMessages([
    ["system", qaSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  // Create question-answer chain
  const questionAnswerChain = await createStuffDocumentsChain({
    llm: model,
    prompt: qaPrompt,
  });

  // Create final RAG chain
  const ragChain = await createRetrievalChain({
    retriever: historyAwareRetriever,
    combineDocsChain: questionAnswerChain,
  });

  return ragChain;
};
