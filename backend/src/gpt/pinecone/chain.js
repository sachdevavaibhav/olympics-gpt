import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
// import { ConversationalRetrievalQAChain } from "langchain/chains";
import { config } from "../../config.js";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { BaseMessage } from "@langchain/core/messages";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

export const createQueryChain = async (pineconeClient, k = 1, returnSourceDocs = false) => {
  const pineconeIndex = pineconeClient.Index(config.PINECONE_INDEX);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      pineconeIndex,
    }
  );

  /* Search the vector DB independently with meta filters */
  // const results = await vectorStore.similaritySearch(query, k);

  /* Use as part of a chain (currently no metadata filters) */
  const model = new ChatOpenAI({
    model: config.OPENAI_MODEL,
    temperature: 0.2,
  });
  console.log(model.modelName)

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
  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm: model,
    retriever: vectorStore.asRetriever({
      k: k,

    }),
    rephrasePrompt: contextualizeQPrompt,
  });

  // Answer question
  const qaSystemPrompt = `
  You are an assistant for question-answering all things related to Olympics. Use
  the following pieces of retrieved context to answer the
  question. If you don't know the answer, just say that you
  don't know. Do not answer anything that is not directly or indirectly related to the Olympics.
  You can use your own knowledge and the context provided to answer the question. If you need more context, ask for it.
  \n\n
  {context}`;
  const qaPrompt = ChatPromptTemplate.fromMessages([
    ["system", qaSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const questionAnswerChain = await createStuffDocumentsChain({
    llm: model,
    prompt: qaPrompt,
  });

  const ragChain = await createRetrievalChain({
    retriever: historyAwareRetriever,
    combineDocsChain: questionAnswerChain,
  });

  // const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
  //   k: 2,
  //   returnSourceDocuments: returnSourceDocs,
  // });
  return ragChain;
}

// import { ChatAnthropic } from "@langchain/anthropic";

// const retriever = ...your retriever;
// const llm = new ChatAnthropic();


// // Below we use createStuffDocuments_chain to feed all retrieved context
// // into the LLM. Note that we can also use StuffDocumentsChain and other
// // instances of BaseCombineDocumentsChain.

// // Usage:
// const chat_history: BaseMessage[] = [];
// const response = await ragChain.invoke({
//   chat_history,
//   input: "...",
// });