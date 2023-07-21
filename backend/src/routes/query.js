import express from 'express';
const router = express.Router();
import { generateResponse } from '../utils/generateResponse.js';
import { queryModel } from '../gpt/index.js';
import { chain } from '../index.js';
import {checkAuth} from '../middleware/checkAuth.js';

router.post('',checkAuth ,async (req, res) => {
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