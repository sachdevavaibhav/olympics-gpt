import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { config } from "../../config.js";

export const createQueryChain = async (pineconeClient, k = 1, returnSourceDocs = false) => {
  const pineconeIndex = pineconeClient.Index(config.PINECONE_INDEX);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  /* Search the vector DB independently with meta filters */
  // const results = await vectorStore.similaritySearch(query, k);

  /* Use as part of a chain (currently no metadata filters) */
  const model = new OpenAI({
    modelName: config.OPENAI_MODEL,
    temperature: 0.2,
  });
  console.log(model.modelName)

  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    k,
    returnSourceDocs
  });
  return chain;
}