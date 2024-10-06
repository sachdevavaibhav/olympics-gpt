import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

export const config = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_INDEX: process.env.PINECONE_INDEX,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
}