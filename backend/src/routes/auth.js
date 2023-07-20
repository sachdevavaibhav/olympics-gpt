// create auth routes
import express from 'express';
const router = express.Router();
import { generateResponse } from '../utils/generateResponse.js';

router.post('/login', async (req, res) => {
    res.send("login")
})
router.post('/sign-up', async (req, res) => {
    res.send("sign-up")
})
// router.post('/logout', async (req, res) => {})

export default router;