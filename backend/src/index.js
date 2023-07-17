import express from 'express'
import dotenv from 'dotenv'
import { generateResponse } from './utils/generateResponse.js'
import { initialisePineconeClient } from './gpt/index.js'
import {createQueryChain, queryModel } from './gpt/index.js'
import cors from 'cors'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

const pineconeClient = await initialisePineconeClient();
const chain = await createQueryChain(pineconeClient, 1, false);

app.get('/healthcheck', (req, res) => {
    res.status(200).json(generateResponse(req, res, { message: 'Server is running' }))
})

app.post('/query', async (req, res) => {
    const {query} = req.body; 
    const queryRes = await queryModel(chain, query)
    res.status(200).json(generateResponse(req, res, { queryRes }))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})