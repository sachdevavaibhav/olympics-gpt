import express from 'express'
import dotenv from 'dotenv'
import { generateResponse } from './utils/generateResponse.js'
// import { OpenAI } from "langchain/llms/openai";
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.get('/healthcheck', (req, res) => {
    res.status(200).json(generateResponse(req, res, { message: 'Server is running' }))
})

app.get('/', async (req, res) => {
    // const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });
    // const response = await model.call(
    //     "What would be a good company name a company that makes colorful socks?"
    //   );
    res.status(200).json(generateResponse(req, res, { message: "Hello World!" }))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})