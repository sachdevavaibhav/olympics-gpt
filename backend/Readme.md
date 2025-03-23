# OlympicsGPT Backend

## Getting Started

Fork this repository and clone it to your local machine. Then, run the following commands:

```bash
cd backend
```

Create a `.env` file in the `backend` directory and add the following environment variables:

```bash
OPENAI_API_KEY=YOUR_OPEN_AI_API_KEY
JWT_SECRET=YOUR_SECRET
OPEN_AI_MODEL=YOUR_OPEN_AI_MODEL
LANGCHAIN_ENDPOINT="YOUR_LANGCHAIN_ENDPOINT"
LANGCHAIN_API_KEY="YOUR_LANGCHAIN_API_KEY"
LANGCHAIN_PROJECT="YOUR_LANGCHAIN_PROJECT"
CHROMA_DB_URL="YOUR_CHROMA_DB_URL"
```

**Install dependencies**

```bash
npm install
```

**Start the development server**

```bash
npm run dev
```

**Using docker**

```bash
docker-compose up -d --build
```
