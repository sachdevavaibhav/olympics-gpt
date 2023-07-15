import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeClient } from "@pinecone-database/pinecone";
import dotenv from 'dotenv'
dotenv.config()

export const loadPdf = async (path, splitPages=true) => {
    const loader = new PDFLoader(path, splitPages); 
    const docs = await loader.load();
    return docs
}

export const splitDocs = async (docs, chunkSize=1000, chunkOverlap=200) => {
    const splitter = new RecursiveCharacterTextSplitter(
        {
            chunkSize: chunkSize,
            chunkOverlap: chunkOverlap
        }
    );
    const docChunks = await splitter.splitDocuments(docs);
    return docChunks
}

// Initialise Pincone Client
export const initialisePineconeClient = async () => {
    const pineconeClient = new PineconeClient();
    await pineconeClient.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT
    })
    return pineconeClient
}


