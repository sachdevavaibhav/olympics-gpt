import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeClient } from "@pinecone-database/pinecone";
import dotenv from 'dotenv'
dotenv.config()

export const loadPdf = async (path, splitPages=true) => {
    try {
        const loader = new PDFLoader(path, splitPages); 
        const docs = await loader.load();
        return docs        
    } catch (error) {
        console.error(error)
    }
}

export const loadText = async (path) => {
    try {
        const loader = new TextLoader(path); 
        const docs = await loader.load();
        return docs        
    } catch (error) {
        console.error(error)
    }
}

export const splitDocs = async (docs, chunkSize=1000, chunkOverlap=200) => {
    try {
        const splitter = new RecursiveCharacterTextSplitter(
            {
                chunkSize: chunkSize,
                chunkOverlap: chunkOverlap
            }
        );
        const docChunks = await splitter.splitDocuments(docs);
        return docChunks
    } catch (error) {
        console.error(error)
    }
}

// Initialise Pincone Client
export const initialisePineconeClient = async () => {
    try {
        const pineconeClient = new PineconeClient();
        await pineconeClient.init({
            apiKey: process.env.PINECONE_API_KEY,
            environment: process.env.PINECONE_ENVIRONMENT
        })
        return pineconeClient
    }
    catch (error) {
        console.error(error)
    }
}


