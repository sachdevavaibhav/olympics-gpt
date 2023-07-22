// create auth routes
import express from 'express';
const router = express.Router();
import { generateResponse } from '../utils/generateResponse.js';
import { signup, login } from '../controllers/auth.js';

router.post('/login', async (req, res) => {
    try {
        const {user, token} = await login(req, res);
        res.status(200).json(generateResponse(req, res, {token, user}));
    } catch (error) {
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json(generateResponse(req, res, {message: error.message}));
    }
})
router.post('/signup', async (req, res) => {
    try {
        await signup(req, res);
        res.status(201).json(generateResponse(req, res, {message: "User created successfully"}));
    } catch (error) {
        const statusCode = res.statusCode || 500;
        res.status(statusCode).json(generateResponse(req, res, {message: error.message}));
    }
})
// router.post('/logout', async (req, res) => {})

export default router;