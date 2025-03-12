import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "../../config.js";

// Reuse the existing PDF loader function
export const loadPdf = async (path, splitPages = true) => {
  try {
    const loader = new PDFLoader(path, splitPages);
    const docs = await loader.load();
    return docs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Reuse the existing text loader function
export const loadText = async (path) => {
  try {
    const loader = new TextLoader(path);
    const docs = await loader.load();
    return docs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Reuse the existing document splitter function
export const splitDocs = async (docs, chunkSize = 1000, chunkOverlap = 200) => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: chunkSize,
      chunkOverlap: chunkOverlap,
    });
    const docChunks = await splitter.splitDocuments(docs);
    return docChunks;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Initialize ChromaDB client
export const initialiseChromaClient = async (collectionName = "olympics") => {
  try {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: config.OPENAI_API_KEY,
    });

    // Connect to ChromaDB using the URL from docker-compose
    const vectorStore = new Chroma(embeddings, {
      url: "http://localhost:8000",
      collectionName: collectionName,
    });

    return vectorStore;
  } catch (error) {
    console.error("Error initializing ChromaDB client:", error);
    throw error;
  }
};

// Create or get a ChromaDB collection
export const getOrCreateCollection = async (collectionName = "olympics") => {
  try {
    const vectorStore = await initialiseChromaClient(collectionName);
    return vectorStore;
  } catch (error) {
    console.error("Error getting/creating ChromaDB collection:", error);
    throw error;
  }
};
