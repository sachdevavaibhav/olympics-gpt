import express from 'express';
const router = express.Router();
import { generateResponse } from '../utils/generateResponse.js';
import { createChat, queryModel, updateChatHistory } from '../controllers/chat.js';
import { chain } from '../index.js';
import {checkAuth} from '../middleware/checkAuth.js';
import {v4 as uuidv4} from 'uuid';

router.post('/create',checkAuth ,async (req, res) => {
    try {
        const {message} = req.body;
        const userId = req.userData.userId;
        const chatId = uuidv4();
        if (!userId || !chatId || !message) {
            res.status(403);
            throw new Error("Missing required parameters");
        }
        const chatRes = await createChat(userId, chatId, message)
        res.status(200).json(generateResponse(req, res, { chatRes }))
    } catch (error) {
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json(generateResponse(req, res, { message: error.message }))
    }
})

router.put('/update',checkAuth ,async (req, res) => {
    try {
        const {message, chatId} = req.body;
        if (!chatId || !message) {
            res.status(403);
            throw new Error("Missing required parameters");
        }
        const chatRes = await updateChatHistory(chatId, message)
        res.status(200).json(generateResponse(req, res, { chatRes }))
    } catch (error) {
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json(generateResponse(req, res, { message: error.message }))
    }
})

router.post('/query',checkAuth ,async (req, res) => {
    try {
        const {query} = req.body; 
        if (!query) {
            res.status(403);
            throw new Error("No query provided");
        }
        const queryRes = await queryModel(chain, query)
        res.status(200).json(generateResponse(req, res, { queryRes }))
    } catch (error) {
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json(generateResponse(req, res, { message: error.message }))
    }
})

export default router;