import express from 'express'
import dotenv from 'dotenv'
import { generateResponse } from './utils/generateResponse.js'
import { initialisePineconeClient } from './gpt/index.js'
import {createQueryChain } from './gpt/index.js'
import cors from 'cors'
import healthCheckRoutes from './routes/healthcheck.js'
import queryRoutes from './routes/query.js'
import authRoutes from './routes/auth.js'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(cors())

// initialise pinecone client
const pineconeClient = await initialisePineconeClient();
export const chain = await createQueryChain(pineconeClient, 1, false);

// routes
app.use('/api/healthcheck', healthCheckRoutes)
app.use('/api/query', queryRoutes)
app.use('/api/auth', authRoutes)

// 404 error handling
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
})

// Handle all errors
app.use((error, req, res, next) => {
    res.status(res.statusCode || 500)
    res.json(generateResponse(req, res, {message: error.message}))
  })

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