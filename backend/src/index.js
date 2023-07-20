import express from 'express'
import dotenv from 'dotenv'
import { initialisePineconeClient } from './gpt/index.js'
import {createQueryChain } from './gpt/index.js'
import cors from 'cors'
import healthCheckRoutes from './routes/healthcheck.js'
import queryRoutes from './routes/query.js'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

const pineconeClient = await initialisePineconeClient();
export const chain = await createQueryChain(pineconeClient, 1, false);

app.use('/api/healthcheck', healthCheckRoutes)
app.use('/api/query', queryRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

/* TODO:
* handle query fail error
* implement auth
* implement user profile
* implement user chat history
* implement user settings
*/