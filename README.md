# Shopify CRO Opportunity Engine

An AI-powered, full-stack application that analyzes Shopify stores to generate Conversion Rate Optimization (CRO) audits. It uses Puppeteer to crawl store pages, extracts conversion signals, and leverages the NVIDIA AI API (using the OpenAI SDK) to provide a prioritized list of recommendations and experiment plans.

## Features

- **Automated Crawling:** Scrapes Homepage, Product Pages, Collections, and Cart flows.
- **AI Analysis:** Uses `moonshotai/kimi-k2-instruct-0905` via NVIDIA API to generate evidence-based CRO insights.
- **Premium UI:** Dark glassmorphism dashboard built with React, Tailwind CSS, Framer Motion, and Recharts.
- **Experiment Generator:** Automatically creates A/B testing hypotheses, metrics, and variants for top recommendations.

## Project Architecture

```
/backend
  ├── server.js               # Express entry point
  ├── routes/analyze.js       # API routes
  ├── controllers/            # Request handlers
  ├── services/               # Core logic (Crawler, Parser, AI)
  └── utils/prompt.js         # AI prompt engineering
/frontend
  ├── src/
      ├── pages/              # LandingPage, Dashboard
      ├── components/         # ScoreCard, RecommendationCard, LoadingScreen
      ├── services/api.js     # API communication
      └── App.jsx             # React Router setup
```

## Prerequisites

- Node.js (v18+)
- NVIDIA API Key

## Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory:
```env
PORT=3001
NVIDIA_API_KEY=your_api_key_here
NVIDIA_API_BASE_URL=https://integrate.api.nvidia.com/v1
```

Start the backend server:
```bash
npm run start
# OR for development
node server.js
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Deployment Instructions

### Frontend (Vercel)
1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Set the Root Directory to `frontend`.
4. Ensure the build command is `npm run build` and output directory is `dist`.
5. (Optional) Set `VITE_API_BASE_URL` if you host the backend remotely.

### Backend (Render / Railway)
1. Create a new Web Service in Render/Railway.
2. Set the Root Directory to `backend`.
3. Set the build command to `npm install`.
4. Set the start command to `node server.js`.
5. Add the `NVIDIA_API_KEY` and `NVIDIA_API_BASE_URL` to the environment variables.
*(Note: Puppeteer on free tiers might require additional buildpacks for Chromium. If memory limits are hit, consider switching the crawler to Axios+Cheerio only for static extraction.)*
