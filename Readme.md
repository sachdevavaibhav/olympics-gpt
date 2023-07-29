# OlympicsGPT
An AI based web app that generates answers to questions related to the Olympics. The app is built powered by Open AI's GPT-3.5 model. It is built using langchain.js and React.js. This app can help users to get answers to their questions about the Olympics. The app can be used by sports enthusiasts, journalists, and anyone who wants to know more about the Olympics. **This can help enhance the olympics experience and increase fan engagement.**

The chatbot remembers the context of the conversation and users can switch between their chats with the chatbot. The chat history is stored in the firestore database. 

Responsive design is used to make the app mobile friendly. The app is built using React.js and Chakra UI. It uses Redux Toolkit for state management.


The app can be found at [https://olympics-gpt.netlify.app/](https://olympics-gpt.netlify.app/)

## Data
The data for the app is scraped from various sources. The data is scraped using the script in the data folder. It is then converted to vector embedding using Open AI's embedding model and then it is stored in Pinecone database, which is a vector database.

These vectors are then used to provide context to the chatbot. The chatbot uses the vectors to find the most similar vector to the user's question and then it generates an answer to the question. The chatbot is built using langchain.js. 

## The tech stack used is as follows:
#### Frontend
- React.js
- Chakra UI
- Redux Toolkit

#### Backend
- Node.js
- Express.js
- Firestore
- Pinecone
- Langchain.js

## Demo
Demo video can be found at [https://youtu.be/g2JIgqPMrlI](https://youtu.be/g2JIgqPMrlI)

## About the repository
The repository contains the code for the frontend and the backend of the app. The frontend is built using React.js and Chakra UI. The backend is built using Node.js and Express.js. The backend is hosted on Render and the frontend is hosted on Netlify. The data folder contains the script to scrape data about olympics from various sources.

## How to run the app

- **To run backend find the instructions in the backend folder.**

- **To run frontend find the instructions in the frontend folder.**
