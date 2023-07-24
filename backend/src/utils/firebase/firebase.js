import { initializeApp, cert } from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import firebaseServiceAccount from '../../../firebase.json' assert {type: 'json'};
import { v4 as uuidv4 } from 'uuid';

const app = initializeApp({
  credential: cert(firebaseServiceAccount)
});

export const db = getFirestore(app);

// util function to create document in collection
export const createDocument = async (collectionName, document) => {
  try {
    // add unique id to document,
    const id = uuidv4();
    document.id = id;
    const docRef = await db.collection(collectionName).doc(id).set(document);
    return docRef;
  } catch (error) {
    console.log(error);
  }
}




/*
 * Users - email, password, username(from email) -> create, signin, signup
    - each user document will be names by unique id, and will have fields:
      {
        email: string,
        username: string,
        password: string,
      }
 * Chats - all chats -> create, read
 * settings (may be)
 * chats = {
    *  chatId: string,
    *  userId: string,
    *  createdAt: timestamp,
    *  messages: [
        *  {
        *  role: string,
        *  text: string,
        *  createdAt: timestamp,
        * },
        * {
        *  role: string,
        *  text: string,
        *  createdAt: timestamp,
        * }
    * ]
 * }
 */

/*
 Functions to be created:
          1. getRecentChatHistory
          2. getChatHistory
          3. createChat
          4. getAllUserChats
          5. UpdateChatHistory
*/