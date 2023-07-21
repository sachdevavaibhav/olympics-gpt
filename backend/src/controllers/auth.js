import { db, createDocument } from "../utils/firebase/firebase.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Invalid request');
    }
    // check if user exists
    const userExists = await db.collection('users').where('email', '==', email).get();
    if (!userExists.empty) {
        res.status(403);
        throw new Error('Signup failed');
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
    const {email, password} = req.body;
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
    const token = jwt.sign({email: user.email, id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return {token, user: {uid: user.id, username: user.username}};
}