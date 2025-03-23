import { loadPdf, loadText, splitDocs, getOrCreateCollection } from "./chroma/chroma.js";
import { createQueryChain } from "./chroma/chain.js";
import { upsertDocuments, upsertTextFile, upsertPdfFile } from "./chroma/upsert.js";

export {
    loadPdf,
    loadText,
    splitDocs,
    getOrCreateCollection,
    createQueryChain,
    upsertDocuments,
    upsertTextFile,
    upsertPdfFile
};

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