import express from 'express'
import { generateResponse } from './utils/generateResponse.js'
import { getOrCreateCollection } from './gpt/chroma/chroma.js'
import { createQueryChain } from './gpt/chroma/chain.js'
import cors from 'cors'
import healthCheckRoutes from './routes/healthcheck.js'
import chatRoutes from './routes/chat.js'
import authRoutes from './routes/auth.js'
import { config } from './config.js'

const app = express()

const PORT = config.PORT || 5000

// middleware
app.use(express.json())
app.use(cors())

// Initialize ChromaDB client and create chain
export const chain = await createQueryChain(1);

// routes
app.use('/api/healthcheck', healthCheckRoutes)
app.use('/api/chat', chatRoutes)
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
    res.json(generateResponse(req, res, { message: error.message }))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

/* TODO:
* handle query fail error (done)
* implement auth (done)
* implement user chat history and move query to controller
* collect olympic data
* implement user settings
*/