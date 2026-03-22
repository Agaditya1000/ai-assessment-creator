# VedaAI – AI Assessment Creator

VedaAI is a powerful full-stack platform designed for educators to instantly generate professional, structured question papers using advanced AI. Optimized for both speed and visual excellence, VedaAI streamlines the assessment creation process from prompt to PDF.

## 🚀 Key Features

- **Smart AI Generation**: Leveraging **OpenRouter AI** (Mistral 7B) to create high-quality assessments in seconds.
- **Smart Metadata Extraction**: Automatically detects **Assignment Name**, **Subject**, and **Class Level** from your natural language instructions.
- **Dynamic Question Types**: Supports Multiple Choice, Short Answer, Numerical Problems, and Diagram-based questions.
- **Premium Mobile UI**: A fully responsive, "pill-style" mobile navigation and glassmorphic dashboard built for on-the-go productivity.
- **Robust Background Jobs**: Reliable processing using **BullMQ** and **Redis** to handle high-concurrency generation tasks.
- **Production Ready**: One-click PDF export and seamless deployment configurations for Render and Vercel.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Zustand, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Redis, BullMQ, Socket.io.
- **AI Engine**: OpenRouter (Mistral 7B).
- **Styling**: Vanilla CSS with modern HSL color palettes and glassmorphism.

## 📦 Deployment Guide

### Backend (Render)
1. **Connect Repository**: Link your GitHub repo to a new Render Web Service.
2. **Build Settings**:
   - Runtime: `Node`
   - Build Command: `npm install && npm run build` (Ensure `tsc` generates `dist/`)
   - Start Command: `node dist/index.js`
3. **Environment Variables**:
   - `MONGODB_URI`: Your Atlas connection string.
   - `REDIS_URL`: Your Redis instance (Internal or External).
   - `OPENROUTER_API_KEY`: Your OpenRouter key.

### Frontend (Vercel)
1. **Import Project**: Select the `client` directory as the root.
2. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL + `/api`.
   - `NEXT_PUBLIC_SOCKET_URL`: Your Render backend base URL.

## 🛠️ Local Development

1. **Clone the Repo**
2. **Backend**: Navigate to `/server`, `npm install`, add `.env` (with `OPENROUTER_API_KEY`), and `npm run dev`.
3. **Frontend**: Navigate to `/client`, `npm install`, add `.env.local`, and `npm run dev`.

---
*Built for excellence by VedaAI Team.*
