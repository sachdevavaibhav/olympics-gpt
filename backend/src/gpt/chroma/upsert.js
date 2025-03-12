import { OpenAIEmbeddings } from "@langchain/openai";
import { loadPdf, loadText, splitDocs, getOrCreateCollection } from "./chroma.js";

export const upsertDocuments = async (documents) => {
  try {
    const vectorStore = await getOrCreateCollection();
    await vectorStore.addDocuments(documents);
    console.log("Documents successfully added to ChromaDB");
  } catch (error) {
    console.error("Error upserting documents to ChromaDB:", error);
    throw error;
  }
};

// Example usage for upserting text files
export const upsertTextFile = async (filePath) => {
  try {
    const docs = await loadText(filePath);
    const docChunks = await splitDocs(docs);
    await upsertDocuments(docChunks);
    console.log(`Text file ${filePath} successfully processed and added to ChromaDB`);
  } catch (error) {
    console.error(`Error processing text file ${filePath}:`, error);
    throw error;
  }
};

// Example usage for upserting PDF files
export const upsertPdfFile = async (filePath, splitPages = true) => {
  try {
    const docs = await loadPdf(filePath, splitPages);
    const docChunks = await splitDocs(docs);
    await upsertDocuments(docChunks);
    console.log(`PDF file ${filePath} successfully processed and added to ChromaDB`);
  } catch (error) {
    console.error(`Error processing PDF file ${filePath}:`, error);
    throw error;
  }
};
