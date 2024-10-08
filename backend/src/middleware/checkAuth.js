import jwt from 'jsonwebtoken';
import { generateResponse } from '../utils/generateResponse.js';
import { config } from '../config.js';

export const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        req.userData = { email: decodedToken.email, userId: decodedToken.id };
        next();
    } catch (error) {
        res.status(401).json(generateResponse(req, res, { message: 'Auth failed' }));
    }
}