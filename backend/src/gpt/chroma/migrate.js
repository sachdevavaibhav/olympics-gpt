import { loadPdf, loadText, splitDocs } from "./chroma.js";
import { upsertDocuments } from "./upsert.js";
import path from "path";

const migrateData = async () => {
  try {
    // List of all data files to migrate
    const dataFiles = [
      { path: "./src/gpt/athlete.txt", type: "text" },
      { path: "./src/gpt/future_hosts.txt", type: "text" },
      { path: "./src/gpt/medalOlympics.pdf", type: "pdf" },
      { path: "./src/gpt/sports.txt", type: "text" },
      { path: "./src/gpt/wiki_olympics.txt", type: "text" }
    ];

    console.log("Starting data migration to ChromaDB...");

    for (const file of dataFiles) {
      try {
        console.log(`Processing file: ${file.path}`);
        let docs;

        if (file.type === "text") {
          docs = await loadText(file.path);
        } else if (file.type === "pdf") {
          docs = await loadPdf(file.path, true);
        }

        if (docs) {
          const docChunks = await splitDocs(docs);
          console.log(`Split ${file.path} into ${docChunks.length} chunks`);
          await upsertDocuments(docChunks);
          console.log(`Successfully migrated ${file.path}`);
        }
      } catch (error) {
        console.error(`Error processing file ${file.path}:`, error);
        // Continue with next file even if one fails
      }
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
};

// Run migration
console.log("Starting migration process...");
migrateData()
  .then(() => console.log("Migration completed successfully!"))
  .catch((error) => console.error("Migration failed:", error));
