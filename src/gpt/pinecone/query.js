import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { VectorDBQAChain } from "langchain/chains";
import dotenv from "dotenv";
dotenv.config();

export const queryModel = async (query, pineconeClient, k=1, returnSourceDocs=false) => {
    const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX);
    
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );
    
    /* Search the vector DB independently with meta filters */
    const results = await vectorStore.similaritySearch(query, k);
    console.log("similaritySearch:", results);
    
    /* Use as part of a chain (currently no metadata filters) */
    const model = new OpenAI();
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k: k,
      returnSourceDocuments: returnSourceDocs,
    });
    const response = await chain.call({ query: query });
    console.log(response);
    return response;
}