import express from 'express'
import dotenv from 'dotenv'
import { generateResponse } from './utils/generateResponse.js'
import { initialisePineconeClient } from './gpt/index.js'
import { queryModel } from './gpt/index.js'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

const pineconeClient = await initialisePineconeClient();

app.get('/healthcheck', (req, res) => {
    res.status(200).json(generateResponse(req, res, { message: 'Server is running' }))
})

app.post('/query', async (req, res) => {
    const {query} = req.body; 
    const queryRes = await queryModel(query, pineconeClient)
    res.status(200).json(generateResponse(req, res, { queryRes }))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})