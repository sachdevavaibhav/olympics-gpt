import { db, createDocument } from "../utils/firebase/firebase.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "../config.js";


export const signup = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Invalid request');
    }
    // check if user exists
    const userExists = await db.collection('users').where('email', '==', email).get();
    if (!userExists.empty) {
        res.status(403);
        throw new Error('User already exists. Please login');
    }
    const username = email.split('@')[0];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
        email,
        username,
        hashedPassword,
    }
    const docRef = await createDocument('users', user);
    return docRef;
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Invalid request');
    }
    // check if user exists
    const userExists = await db.collection('users').where('email', '==', email).get();
    if (userExists.empty) {
        res.status(403);
        throw new Error('Auth failed');
    }
    const user = userExists.docs[0].data();
    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordCorrect) {
        res.status(403);
        throw new Error('Auth failed');
    }
    // generate token
    const token = jwt.sign({ email: user.email, id: user.id }, config.JWT_SECRET, { expiresIn: 1000 * 60 });
    return { token, user: { uid: user.id, username: user.username } };
}

export const getUser = async (req, res) => {
    // check if user exists based on the token received
    try {
        const { token } = req.body;
        if (!token) {
            return { error: { message: 'Invalid request', status: 400 } };
        }
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        // get id from token and check
        const userExists = await db.collection('users').doc(decodedToken.id).get();
        if (!userExists.exists) {
            return { error: { message: 'Auth failed', status: 401 } };
        }
        const user = userExists.data();
        return { user: { uid: user.id, username: user.username } };
    }
    catch (error) {
        return { error: { message: 'Auth failed', status: 401 } }
    }
}