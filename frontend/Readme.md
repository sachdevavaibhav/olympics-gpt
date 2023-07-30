# OlympicsGPT Frontend

## Getting Started

Fork this repository and clone it to your local machine. Then, run the following commands:

```bash
cd frontend
```

Create a `.env` file in the `frontend` directory and add the following line:

```bash
VITE_BASE_API_URL=[BACKEND_BASE_URL]/api
```

Replace `[BACKEND_BASE_URL]` with the base URL of the backend server. For example, if the backend server is running on `http://localhost:8000`, then the `.env` file should look like this:

```bash
VITE_BASE_API_URL=http://localhost:8000/api
```


**Install dependencies**

```bash
npm install
```

**Start the development server**

```bash
npm run dev
```