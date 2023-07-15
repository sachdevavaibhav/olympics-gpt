import { loadPdf, splitDocs,initialisePineconeClient } from "./pinecone/pinecone.js";
import { createQueryChain, queryModel } from "./pinecone/query.js";

export {loadPdf};
export {splitDocs};
export {initialisePineconeClient};

export {createQueryChain};
export {queryModel};













/*
TODO:
1. Load PDF
2. Split PDF into chunks
3. Generate embeddings for each chunk
4. Store embeddings in vector database
5. Query vector database for similar chunks
6. Provide query and similar chunks to llm model
7. Generate response from llm model
*/