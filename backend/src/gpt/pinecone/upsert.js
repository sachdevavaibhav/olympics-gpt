import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { loadPdf, loadText,splitDocs, initialisePineconeClient } from "../index.js"
import dotenv from "dotenv"
dotenv.config()

console.log("Starting upsert")
// const olympicsDoc = await loadPdf("../medalOlympics.pdf")
// const olmypicsDocChunks = await splitDocs(olympicsDoc)
const olympicsDoc = await loadText("./src/gpt/future_hosts.txt")
const olmypicsDocChunks = await splitDocs(olympicsDoc)
// console.log(olmypicsDocChunks)

const pineconeClient = await initialisePineconeClient()
const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX)
const embeddings = new OpenAIEmbeddings()
await PineconeStore.fromDocuments(olmypicsDocChunks, embeddings, {pineconeIndex})
console.log("Upsert complete")