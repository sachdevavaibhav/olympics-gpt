import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { loadPdf, splitDocs, initialisePineconeClient } from "../index.js"
import dotenv from "dotenv"
dotenv.config()

const olympicsDoc = await loadPdf("./src/gpt/medalOlympics.pdf")
const olmypicsDocChunks = await splitDocs(olympicsDoc)

const pineconeClient = await initialisePineconeClient()
const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX)
const embeddings = new OpenAIEmbeddings()
await PineconeStore.fromDocuments(olmypicsDocChunks, embeddings, {pineconeIndex})