import express from 'express';
const router = express.Router();
import { generateResponse } from '../utils/generateResponse.js';
import { createChat, queryModel, updateChatHistory, getAllUserChats, getChatHistory, getRecentChatHistory } from '../controllers/chat.js';
import { chain } from '../index.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { v4 as uuidv4 } from 'uuid';

router.post('/create', checkAuth, async (req, res) => {
    try {
        const { message } = req.body;
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

router.post('/message', checkAuth, async (req, res) => {
    try {
        const { message, chatId } = req.body;
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

router.post('/query', checkAuth, async (req, res) => {
    try {
        let { query, chatId } = req.body;
        if (!query) {
            res.status(403);
            throw new Error("No query provided");
        }
        // if not chatId, create new chat
        let isFirstMessage = false;
        const message = { role: "user", text: query }
        if (!chatId) {
            const userId = req.userData.userId;
            chatId = uuidv4();
            if (!userId || !chatId || !query) {
                res.status(403);
                throw new Error("Missing required parameters");
            }
            isFirstMessage = true;
            await createChat(userId, chatId, message)
        }
        const queryRes = await queryModel(chain, query, chatId)
        if (isFirstMessage) {
            await updateChatHistory(chatId, queryRes)
        }
        else {
            await updateChatHistory(chatId, message)
            await updateChatHistory(chatId, queryRes)
        }
        res.status(200).json(generateResponse(req, res, { queryRes, chatId }))
    } catch (error) {
        console.log(error)
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json(generateResponse(req, res, { message: error.message }))
    }
})

router.get('/all', checkAuth, async (req, res) => {
    try {
        const userId = req.userData.userId;
        if (!userId) {
            res.status(403);
            throw new Error("No user id provided");
        }
        const chats = await getAllUserChats(userId)
        res.status(200).json(generateResponse(req, res, { chats }))
    } catch (error) {
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json(generateResponse(req, res, { message: error.message }))
    }
})

router.get('/history/:chatid', checkAuth, async (req, res) => {
    try {
        const { chatid } = req.params;
        if (!chatid) {
            res.status(403);
            throw new Error("No chat id provided");
        }
        const messages = await getChatHistory(chatid)
        res.status(200).json(generateResponse(req, res, messages))
    } catch (error) {
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json(generateResponse(req, res, { message: error.message }))
    }
})

router.get('/recent/:chatid', checkAuth, async (req, res) => {
    try {
        const { chatid } = req.params;
        if (!chatid) {
            res.status(403);
            throw new Error("No chat id provided");
        }
        const messages = await getRecentChatHistory(chatid, 6)
        res.status(200).json(generateResponse(req, res, { messages }))
    } catch (error) {
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json(generateResponse(req, res, { message: error.message }))
    }
})

export default router;