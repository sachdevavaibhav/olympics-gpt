import express from 'express';
const router = express.Router();
import { generateResponse } from '../utils/generateResponse.js';

router.get('', (req, res) => {
    try {
        res.status(200).json(generateResponse(req, res, { message: 'Server is running' }))
    }
    catch (error) {
        res.status(500).json(generateResponse(req, res, { message: error.message }))
    }
})

export default router;